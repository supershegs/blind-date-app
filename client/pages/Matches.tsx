import { useState, useEffect } from 'react';
import { Heart, User, Mail, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { apiService } from '../services/api';
import { Skeleton } from '../components/ui/skeleton';

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
  user: {
    username: string;
    isVerified: boolean;
  };
}

export default function Matches() {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    loadMatches();
  }, [page]);

  const loadMatches = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (!currentUser) {
        throw new Error('No user found');
      }

      const response = await apiService.findMatches(currentUser.userId, page);
      
      if (response.success) {
        if (page === 1) {
          setMatches(response.matches);
        } else {
          setMatches(prev => [...prev, ...response.matches]);
        }
        setHasMore(page < response.pagination.totalPages);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load matches');
    } finally {
      setLoading(false);
    }
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

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
              setPage(1);
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
          <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
          <p className="text-gray-600">Discover people who share your interests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h2>
            <p className="text-gray-600">Try adjusting your preferences or check back later</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-w-3 aspect-h-2">
                        {match.imageUpload ? (
                          <img
                            src={match.imageUpload}
                            alt={`${match.firstname}'s profile`}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <User className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-blind-pink shadow-lg">
                        {match.matchPercentage}% Match
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
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
                        onClick={() => {/* TODO: Implement connect/message functionality */}}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Matches'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}