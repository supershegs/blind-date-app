import { useState, useEffect } from 'react';
import { Heart, User, Plus, Edit, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { apiService } from '../services/api';

interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDashboard = async () => {
      if (!apiService.isAuthenticated()) {
        window.location.href = '/login';
        return;
      }
      
      await checkUserProfile();
    };
    
    initDashboard();
  }, []);

  const checkUserProfile = async () => {
    try {
      const currentUser = apiService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        
        try {
          await apiService.getUserProfile(currentUser.userId);
          setHasProfile(true);
        } catch (error) {
          setHasProfile(false);
        }
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blind-pink mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Blind Date!</h1>
            <p className="text-gray-600 mt-2">Let's create your dating profile to get started</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-6">
                  Create your profile with photos, interests, and preferences to start matching with compatible partners.
                </p>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 py-3 text-lg"
                onClick={() => window.location.href = '/create-profile'}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create My Profile
              </Button>
            </CardContent>
          </Card>

          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              🔒 <strong>Privacy First:</strong> Your photos will only be visible to verified matches.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username}!</h1>
              <p className="text-gray-600">Ready to find your perfect match?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Dating Journey Starts Here</h2>
          <p className="text-gray-600">Browse matches, send requests, and plan amazing dates!</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto text-blind-pink mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Find Matches</h3>
                <p className="text-gray-600 text-sm">Discover compatible partners based on your preferences</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 mx-auto text-blind-purple mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Build Connections</h3>
                <p className="text-gray-600 text-sm">Send requests and start meaningful conversations</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Plus className="h-12 w-12 mx-auto text-blind-gold mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Plan Dates</h3>
                <p className="text-gray-600 text-sm">Arrange safe and exciting meetups with your matches</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
