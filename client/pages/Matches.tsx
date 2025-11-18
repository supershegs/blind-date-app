import { useState, useEffect } from 'react';
import { Heart, User, Mail, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { apiService } from '../services/api';
import { Skeleton } from '../components/ui/skeleton';
import ProfileViewModal from '../components/ProfileViewModal';

interface MatchProfile {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  city: string;
  state: string;
  bio?: string;
  imageUpload?: string;
  matchPercentage: number;
  hobbies?: string;
  interest?: string;
  userId: number;
  user: {
    id: number;
    username: string;
    isVerified: boolean;
  };
}

export default function Matches() {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [connectingTo, setConnectingTo] = useState<number | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [hasActiveConnection, setHasActiveConnection] = useState(false);
  const [connectedUserId, setConnectedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    loadMatches();
    checkConnectionStatus();
  }, []);

  const loadMatches = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (!currentUser) {
        throw new Error('No user found');
      }

      const response = await apiService.findMatches(currentUser.userId);
      
      if (response.success) {
        setMatches(response.matches);
        setHasActiveConnection(response.hasActiveConnection || false);
        setConnectedUserId(response.connectedUserId || null);
        if (response.connection) {
          setConnectionStatus(response.connection);
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const checkConnectionStatus = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (!currentUser) return;

      const response = await apiService.getConnectionStatus(currentUser.userId);
      if (response.success) {
        setConnectionStatus(response.connection);
      }
    } catch (error: any) {
      console.error('Failed to check connection status:', error);
    }
  };

  const handleAcceptPending = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (!currentUser || !connectionStatus) return;
      if (connectionStatus.status !== 'pending') return;
      setConnectingTo(connectionStatus.senderId); // reuse state for loading indicator
      const resp = await apiService.acceptConnection(currentUser.userId, connectionStatus.id);
      if (resp.success) {
        setConnectionStatus(resp.connection);
        setHasActiveConnection(true);
        const partnerId = resp.connection.senderId === currentUser.userId ? resp.connection.receiverId : resp.connection.senderId;
        setConnectedUserId(partnerId);
        await loadMatches();
      }
    } catch (e:any) {
      console.error('Accept connection error', e);
    } finally {
      setConnectingTo(null);
    }
  };

  const handleConnect = async (receiverId: number) => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (!currentUser) {
        throw new Error('No user found');
      }

      setConnectingTo(receiverId);

      const response = await apiService.sendConnection(currentUser.userId, receiverId);
      
      if (response.success) {
        setConnectionStatus(response.connection);
        alert('Connection request sent successfully! 🎉');
        await checkConnectionStatus();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to send connection request');
    } finally {
      setConnectingTo(null);
    }
  };

  const handleViewProfile = (userId: number) => {
    setSelectedProfileId(userId);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedProfileId(null);
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-48 w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <Button
            className="mt-4"
            onClick={() => {
              setError('');
              loadMatches();
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Top 3 Matches</h1>
          <p className="text-gray-600">
            Discover your best compatibility matches - connect with one to continue
          </p>
          
          {hasActiveConnection && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>ℹ️ Active Connection:</strong> You have connected with someone. 
                Other matches are shown but disabled until you disconnect.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches available</h2>
            <p className="text-gray-600">
              {hasActiveConnection 
                ? 'Your current connection is being processed'
                : 'Complete your profile or check back later for new matches'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => {
                const isThisUserConnected = match.userId === connectedUserId;
                const shouldGrayOut = hasActiveConnection && !isThisUserConnected;
                
                return (
                <Card 
                  key={match.id} 
                  className={`overflow-hidden hover:shadow-lg transition-shadow ${
                    shouldGrayOut ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="w-full h-64 overflow-hidden">
                        {match.imageUpload ? (
                          <img
                            src={match.imageUpload}
                            alt={`${match.firstname}'s profile`}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <User className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-blind-pink shadow-lg">
                        {match.matchPercentage}% Match
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 
                          className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blind-pink transition-colors"
                          onClick={() => handleViewProfile(match.userId)}
                        >
                          {match.firstname} {match.lastname?.[0]}.
                          {match.user.isVerified && (
                            <span className="ml-2 text-blue-500">✓</span>
                          )}
                        </h3>
                      </div>

                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {match.city}, {match.state}
                      </div>

                      {match.bio && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {match.bio}
                        </p>
                      )}

                      {match.hobbies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {match.hobbies.split(',').slice(0, 3).map((hobby, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blind-pink/10 text-blind-pink"
                            >
                              {hobby.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <Button
                        className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90"
                        onClick={() => handleConnect(match.user.id)}
                        disabled={
                          shouldGrayOut ||
                          (!!connectionStatus && !isThisUserConnected) || 
                          connectingTo === match.user.id
                        }
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {connectingTo === match.user.id 
                          ? 'Building...' 
                          : isThisUserConnected && hasActiveConnection
                            ? 'Connection Built'
                            : shouldGrayOut
                              ? 'Unavailable'
                              : 'Build Connection'
                        }
                      </Button>
                      {isThisUserConnected && connectionStatus?.status === 'accepted' && (
                        <Button
                          className="w-full mt-2 bg-gradient-to-r from-blind-purple to-blind-pink hover:from-blind-purple/90 hover:to-blind-pink/90"
                          onClick={() => window.location.href = '/connection-chat'}
                        >
                          Open Chat
                        </Button>
                      )}
                      {connectionStatus?.status === 'pending' && match.user.id === connectionStatus.senderId && (
                        <Button
                          className="w-full mt-2 bg-green-600 hover:bg-green-700"
                          disabled={connectingTo !== null}
                          onClick={handleAcceptPending}
                        >
                          {connectingTo !== null ? 'Accepting...' : 'Accept Connection'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
              })}
            </div>
          </>
        )}
      </div>

      {/* Profile View Modal */}
      {selectedProfileId && (
        <ProfileViewModal
          userId={selectedProfileId}
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
          onConnect={handleConnect}
          hasActiveConnection={!!connectionStatus}
        />
      )}
    </div>
  );
}