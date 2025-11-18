import { useEffect, useState, useRef } from 'react';
import { apiService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import { Send } from 'lucide-react';
import type { Message } from '@shared/api';

interface ConversationProps {
  partnerId?: number; // optional if deriving from active connection
}

export default function ConnectionChat(_props: ConversationProps) {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [partnerId, setPartnerId] = useState<number | null>(null);
  const [partnerName, setPartnerName] = useState<string>('');
  const [input, setInput] = useState('');
  const pollRef = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    init();
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, []);

  const init = async () => {
    try {
      // Get accepted conversations and pick first (only one active connection allowed)
      const conv = await apiService.getConversations();
      const accepted = conv.conversations?.find((c: any) => c.connectionStatus === 'accepted');
      if (!accepted) {
        setError('No accepted connection available for chat yet. Accept a match first.');
        setLoading(false);
        return;
      }
      setPartnerId(accepted.userId);
      setPartnerName(accepted.profile?.firstname || accepted.username);
      await loadMessages(accepted.userId);
      // Poll every 5s
      pollRef.current = window.setInterval(() => loadMessages(accepted.userId, true), 5000);
    } catch (e: any) {
      setError(e.message || 'Failed to initialize chat');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (pid: number, silent = false) => {
    try {
      const resp = await apiService.getConversation(pid);
      if (resp.success) {
        setMessages(resp.messages);
        if (!silent) scrollToBottom();
      }
    } catch (e: any) {
      if (!silent) setError(e.message || 'Failed to load messages');
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSend = async () => {
    if (!partnerId || input.trim() === '') return;
    setSending(true);
    try {
      const resp = await apiService.sendMessage(partnerId, input.trim());
      if (resp.success) {
        setInput('');
        await loadMessages(partnerId, true);
        scrollToBottom();
      }
    } catch (e: any) {
      setError(e.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Chat with {partnerName}</h2>
        <Button
          variant="ghost"
          className="text-sm bg-gradient-to-r from-blind-purple to-blind-pink text-white hover:from-blind-purple/90 hover:to-blind-pink/90"
          onClick={() => { window.location.href = '/plan-date'; }}
        >
          Plan Date
        </Button>
      </div>
      <Card className="border border-blind-pink/30">
        <CardContent className="p-0">
          <div className="h-[60vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map(m => {
                const isMine = (apiService.getCurrentUser()?.userId) === m.senderId;
                return (
                  <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-3 py-2 text-sm max-w-xs shadow ${isMine ? 'bg-gradient-to-r from-blind-pink to-blind-purple text-white' : 'bg-white border'}`}> 
                      <p>{m.content}</p>
                      <div className="text-[10px] opacity-70 mt-1 text-right">
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="border-t p-3 flex gap-2">
              <Input 
                placeholder="Type a message..." 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <Button disabled={sending || input.trim()===''} onClick={handleSend} className="bg-gradient-to-r from-blind-pink to-blind-purple">
                <Send className="h-4 w-4 mr-1" /> {sending ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
