import { useState, useEffect } from 'react';
import { apiService, ApiError } from '../services/api';
import { Heart, Save, Upload, Calendar, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', middlename: '', dob: '', phoneNum: '', sex: '',
    address: '', state: '', city: '', localGovt: '', bio: '', interest: '',
    heightFt: '', weightKg: '', complexion: '', hobbies: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const  [currentImage, setCurrentImage] = useState<string>(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = apiService.getCurrentUser();
      if (user) {
        const response = await apiService.getUserProfile(user.userId);
        console.log('Profile response:', response); // Debug log
        
        const profile = response.profile || response;
        console.log('Profile data:', profile); // Debug log
        
        setFormData({
          firstname: profile.firstname || '',
          lastname: profile.lastname || '',
          middlename: profile.middlename || '',
          dob: profile.dob ? profile.dob.split('T')[0] : '',
          phoneNum: profile.phoneNum || '',
          sex: profile.sex || '',
          address: profile.address || '',
          state: profile.state || '',
          city: profile.city || '',
          localGovt: profile.localGovt || '',
          bio: profile.bio || '',
          interest: profile.interest || '',
          heightFt: profile.heightFt?.toString() || '',
          weightKg: profile.weightKg?.toString() || '',
          complexion: profile.complexion || '', // Keep original value
          hobbies: profile.hobbies || ''
        });

         // Set current image if available
        // setCurrentImage(profile.imageUpload || '');
        if (profile.imageUpload) {
          setCurrentImage(`data:image/jpeg;base64,${profile.imageUpload}`);
        } else {
          setCurrentImage(null);
        }
        
        
        console.log('Form data set:', {
          complexion: profile.complexion
        }); // Debug log
      }
    } catch (error) {
      console.error('Load profile error:', error);
      setError('Failed to load profile');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = apiService.getCurrentUser();
      if (user) {
        const profileData = {
          ...formData,
          dob: formData.dob ? new Date(formData.dob).toISOString() : ''
        };
        
        const response = await apiService.updateUserProfile(user.userId, profileData, imageFile || undefined);
        
        if (response.success) {
          alert('Profile updated successfully!');
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError('Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  value={formData.firstname}
                  onChange={(e) => handleInputChange('firstname', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="middlename">Middle Name</Label>
                <Input
                  id="middlename"
                  value={formData.middlename}
                  onChange={(e) => handleInputChange('middlename', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Date of Birth and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phoneNum">Phone Number</Label>
                <Input
                  id="phoneNum"
                  type="tel"
                  value={formData.phoneNum}
                  onChange={(e) => handleInputChange('phoneNum', e.target.value)}
                  className="mt-1"
                  placeholder="+234..."
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="sex">Gender</Label>
              <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10"
                  placeholder="Your full address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="localGovt">Local Government</Label>
                <Input
                  id="localGovt"
                  value={formData.localGovt}
                  onChange={(e) => handleInputChange('localGovt', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="heightFt">Height (ft)</Label>
                <Input
                  id="heightFt"
                  type="number"
                  step="0.1"
                  value={formData.heightFt}
                  onChange={(e) => handleInputChange('heightFt', e.target.value)}
                  className="mt-1"
                  placeholder="5.6"
                />
              </div>
              <div>
                <Label htmlFor="weightKg">Weight (kg)</Label>
                <Input
                  id="weightKg"
                  type="number"
                  value={formData.weightKg}
                  onChange={(e) => handleInputChange('weightKg', e.target.value)}
                  className="mt-1"
                  placeholder="65"
                />
              </div>
              <div>
                <Label htmlFor="complexion">Complexion</Label>
                <Select 
                  value={formData.complexion} 
                  onValueChange={(value) => handleInputChange('complexion', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select complexion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Tan">Tan</SelectItem>
                    <SelectItem value="Dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bio and Interests */}
            <div>
              <Label htmlFor="bio">About You</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="mt-1"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interest">Interests</Label>
                <Input
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => handleInputChange('interest', e.target.value)}
                  className="mt-1"
                  placeholder="Technology, Reading, Travel..."
                />
              </div>
              <div>
                <Label htmlFor="hobbies">Hobbies</Label>
                <Input
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  className="mt-1"
                  placeholder="Coding, Photography, Hiking..."
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <Label>Update Profile Photo</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blind-pink transition-colors">
                <div className="space-y-1 text-center">
                  {currentImage && !imageFile ? (
                    <div className="space-y-2">
                      <img 
                        src={currentImage} 
                        alt="Current profile" 
                        className="mx-auto h-24 w-24 rounded-full object-cover"
                      />
                      {/* <p className="text-sm text-gray-600">Current photo</p> */}
                    </div>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blind-pink hover:text-blind-pink/80">
                      <span>{currentImage ? 'Change current photo' : 'Click here to change photo'}</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {imageFile && (
                    <p className="text-sm text-green-600">Selected: {imageFile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 py-3 text-lg"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
