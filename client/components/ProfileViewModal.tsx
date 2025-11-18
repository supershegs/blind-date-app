import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Heart, Ruler, Weight, User as UserIcon, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { apiService } from '../services/api';

interface ProfileViewModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (userId: number) => void;
  hasActiveConnection?: boolean;
}

interface UserProfileData {
  id: number;
  firstname: string;
  lastname: string;
  middlename?: string;
  dob?: string;
  phoneNum?: string;
  sex?: string;
  imageUpload?: string;
  address: string;
  state: string;
  city: string;
  localGovt: string;
  bio?: string;
  interest?: string;
  heightFt?: number;
  weightKg?: number;
  complexion?: string;
  hobbies?: string;
  user: {
    id: number;
    username: string;
    isVerified: boolean;
    email: string;
  };
}

export default function ProfileViewModal({ userId, isOpen, onClose, onConnect, hasActiveConnection }: ProfileViewModalProps) {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && userId) {
      loadProfile();
    }
  }, [isOpen, userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiService.getUserProfile(userId);
      
      if (response.success) {
        setProfile(response.profile);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load profile');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blind-pink"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !profile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <div className="text-center py-8">
            <p className="text-red-600">{error || 'Profile not found'}</p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {profile.imageUpload ? (
                <img
                  src={profile.imageUpload}
                  alt={`${profile.firstname}'s profile`}
                  className="w-48 h-48 rounded-lg object-cover shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 rounded-lg bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-20 w-20 text-gray-400" />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstname} {profile.middlename && `${profile.middlename} `}{profile.lastname}
                </h2>
                {profile.user.isVerified && (
                  <span className="text-blue-500 text-xl">✓</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">@{profile.user.username}</p>

              <div className="space-y-2 text-sm">
                {profile.dob && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span>{calculateAge(profile.dob)} years old</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.city}, {profile.state}</span>
                </div>

                {profile.sex && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <UserIcon className="h-4 w-4" />
                    <span>{profile.sex}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">About Me</h3>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}

          {/* Physical Attributes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.heightFt && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Ruler className="h-5 w-5 mx-auto mb-1 text-blind-pink" />
                <p className="text-xs text-gray-600">Height</p>
                <p className="font-semibold text-gray-900">{profile.heightFt} ft</p>
              </div>
            )}

            {profile.weightKg && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Weight className="h-5 w-5 mx-auto mb-1 text-blind-pink" />
                <p className="text-xs text-gray-600">Weight</p>
                <p className="font-semibold text-gray-900">{profile.weightKg} kg</p>
              </div>
            )}

            {profile.complexion && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <UserIcon className="h-5 w-5 mx-auto mb-1 text-blind-pink" />
                <p className="text-xs text-gray-600">Complexion</p>
                <p className="font-semibold text-gray-900">{profile.complexion}</p>
              </div>
            )}

            {profile.interest && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Heart className="h-5 w-5 mx-auto mb-1 text-blind-pink" />
                <p className="text-xs text-gray-600">Interest</p>
                <p className="font-semibold text-gray-900">{profile.interest}</p>
              </div>
            )}
          </div>

          {/* Hobbies */}
          {profile.hobbies && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Hobbies & Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.split(',').map((hobby, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blind-pink/10 text-blind-pink"
                  >
                    {hobby.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium text-gray-900">{profile.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City:</span>
                <span className="font-medium text-gray-900">{profile.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">State:</span>
                <span className="font-medium text-gray-900">{profile.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Local Government:</span>
                <span className="font-medium text-gray-900">{profile.localGovt}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            {onConnect && (
              <Button
                onClick={() => {
                  onConnect(userId);
                  onClose();
                }}
                disabled={hasActiveConnection}
                className="flex-1 bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90"
              >
                {hasActiveConnection ? 'Already Connected' : 'Connect'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}