import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Skeleton } from '../components/ui/skeleton';
import type { DatePlan } from '@shared/api';

export default function PlanDate() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState<DatePlan | null>(null);
  const [error, setError] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    loadPlan();
  }, []);

  const loadPlan = async () => {
    try {
      setLoading(true);
      const resp = await apiService.getCurrentDatePlan();
      if (resp.success) setPlan(resp.plan);
    } catch (e: any) {
      setError(e.message || 'Failed to load date plan');
    } finally {
      setLoading(false);
    }
  };

  const handlePropose = async () => {
    if (!dateTime || !location) return;
    setSubmitting(true);
    try {
      const resp = await apiService.proposeDate(dateTime, location, notes);
      if (resp.success) {
        setPlan(resp.plan);
        setDateTime('');
        setLocation('');
        setNotes('');
      }
    } catch (e: any) {
      setError(e.message || 'Failed to propose date');
    } finally {
      setSubmitting(false);
    }
  };

  const respond = async (action: 'accept' | 'decline' | 'cancel') => {
    if (!plan) return;
    setSubmitting(true);
    try {
      let resp;
      if (action === 'accept') resp = await apiService.acceptDatePlan(plan.id);
      else if (action === 'decline') resp = await apiService.declineDatePlan(plan.id);
      else resp = await apiService.cancelDatePlan(plan.id);
      if (resp.success) {
        setPlan(resp.plan);
        if (resp.plan.status === 'cancelled' || resp.plan.status === 'declined') {
          // allow new proposal after cancellation/decline
          setPlan(resp.plan);
        }
      }
    } catch (e: any) {
      setError(e.message || 'Failed to update plan');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6"><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Plan Your Date</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}

  {!plan || (plan.status !== 'proposed' && plan.status !== 'accepted') ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Propose a New Date</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <Input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="e.g. Cafe at Main Street" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea placeholder="Any preferences, dress code, etc" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <Button disabled={submitting || !dateTime || !location} onClick={handlePropose} className="bg-gradient-to-r from-blind-pink to-blind-purple">
              {submitting ? 'Submitting...' : 'Propose Date'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Current Date Plan</h3>
            <p><strong>Status:</strong> {plan.status}</p>
            <p><strong>Date & Time:</strong> {new Date(plan.dateTime).toLocaleString()}</p>
            <p><strong>Location:</strong> {plan.location}</p>
            {plan.notes && <p><strong>Notes:</strong> {plan.notes}</p>}
            <div className="flex flex-wrap gap-2 pt-2">
              {plan.status === 'proposed' && (
                <>
                  <Button disabled={submitting} onClick={() => respond('accept')} className="bg-green-600 hover:bg-green-700">Accept</Button>
                  <Button disabled={submitting} onClick={() => respond('decline')} className="bg-red-600 hover:bg-red-700">Decline</Button>
                </>
              )}
              {plan.status === 'accepted' && (
                <Button disabled={submitting} onClick={() => respond('cancel')} className="bg-red-600 hover:bg-red-700">Cancel</Button>
              )}
              {(plan.status !== 'proposed' && plan.status !== 'accepted') && (
                <Button disabled={submitting} onClick={() => { setPlan(null); }} className="bg-gradient-to-r from-blind-pink to-blind-purple">New Proposal</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
