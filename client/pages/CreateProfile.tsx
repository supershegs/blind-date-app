// import { useState } from 'react';
// import { apiService, ApiError } from '../services/api';
// import { Heart, User, Calendar, MapPin, Upload } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Textarea } from '../components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// export default function CreateProfile() {
//     const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     middlename: '',
//     dob: '',
//     phoneNum: '',
//     sex: '',
//     address: '',
//     state: '',
//     city: '',
//     localGovt: '',
//     bio: '',
//     interest: '',
//     heightFt: '',
//     weightKg: '',
//     complexion: '',
//     hobbies: ''
//     });
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     // Change the handleSubmit function:
//     const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//         const currentUser = apiService.getCurrentUser();
//         if (!currentUser) {
//         setError('Please login again');
//         return;
//         }

//         // Convert date to ISO format if provided
//         const profileData = {
//         ...formData,
//         dob: formData.dob ? new Date(formData.dob).toISOString() : ''
//         };

//         const response = await apiService.createUserProfile(
//         currentUser.userId,
//         profileData,
//         imageFile || undefined
//         );
        
//         if (response.success) {
//         alert('Profile created successfully!');
//         window.location.href = '/dashboard';
//         }
//     } catch (error) {
//         if (error instanceof ApiError) {
//         setError(error.message);
//         } else {
//         setError('Failed to create profile. Please try again.');
//         }
//     } finally {
//         setLoading(false);
//     }
//     };

//     const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//         setImageFile(e.target.files[0]);
//     }
//     };

//     return (
//     <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
//             <Heart className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
//             <p className="text-gray-600 mt-2">Tell us about yourself to find your perfect match</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
//                 {error}
//                 </div>
//             )}

//             {/* Personal Information */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                 <Label htmlFor="firstname">First Name *</Label>
//                 <Input
//                     id="firstname"
//                     type="text"
//                     value={formData.firstname}
//                     onChange={(e) => handleInputChange('firstname', e.target.value)}
//                     required
//                     className="mt-1"
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="lastname">Last Name *</Label>
//                 <Input
//                     id="lastname"
//                     type="text"
//                     value={formData.lastname}
//                     onChange={(e) => handleInputChange('lastname', e.target.value)}
//                     required
//                     className="mt-1"
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="middlename">Middle Name</Label>
//                 <Input
//                     id="middlename"
//                     type="text"
//                     value={formData.middlename}
//                     onChange={(e) => handleInputChange('middlename', e.target.value)}
//                     className="mt-1"
//                 />
//                 </div>
//             </div>

//             {/* Date of Birth and Contact */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                 <Label htmlFor="dob">Date of Birth</Label>
//                 <div className="relative mt-1">
//                     <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                     id="dob"
//                     type="date"
//                     value={formData.dob}
//                     onChange={(e) => handleInputChange('dob', e.target.value)}
//                     className="pl-10"
//                     />
//                 </div>
//                 </div>
//                 <div>
//                 <Label htmlFor="phoneNum">Phone Number</Label>
//                 <Input
//                     id="phoneNum"
//                     type="tel"
//                     value={formData.phoneNum}
//                     onChange={(e) => handleInputChange('phoneNum', e.target.value)}
//                     className="mt-1"
//                     placeholder="+234..."
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="sex">Gender</Label>
//                 <Select onValueChange={(value) => handleInputChange('sex', value)}>
//                     <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Select gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                     <SelectItem value="male">Male</SelectItem>
//                     <SelectItem value="female">Female</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                 </Select>
//                 </div>
//             </div>

//             {/* Location */}
//             <div>
//                 <Label htmlFor="address">Address *</Label>
//                 <div className="relative mt-1">
//                 <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                     id="address"
//                     type="text"
//                     value={formData.address}
//                     onChange={(e) => handleInputChange('address', e.target.value)}
//                     required
//                     className="pl-10"
//                     placeholder="Your full address"
//                 />
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                 <Label htmlFor="state">State *</Label>
//                 <Input
//                     id="state"
//                     type="text"
//                     value={formData.state}
//                     onChange={(e) => handleInputChange('state', e.target.value)}
//                     required
//                     className="mt-1"
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="city">City *</Label>
//                 <Input
//                     id="city"
//                     type="text"
//                     value={formData.city}
//                     onChange={(e) => handleInputChange('city', e.target.value)}
//                     required
//                     className="mt-1"
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="localGovt">Local Government *</Label>
//                 <Input
//                     id="localGovt"
//                     type="text"
//                     value={formData.localGovt}
//                     onChange={(e) => handleInputChange('localGovt', e.target.value)}
//                     required
//                     className="mt-1"
//                 />
//                 </div>
//             </div>

//             {/* Physical Attributes */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                 <Label htmlFor="heightFt">Height (ft)</Label>
//                 <Input
//                     id="heightFt"
//                     type="number"
//                     step="0.1"
//                     value={formData.heightFt}
//                     onChange={(e) => handleInputChange('heightFt', e.target.value)}
//                     className="mt-1"
//                     placeholder="5.6"
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="weightKg">Weight (kg)</Label>
//                 <Input
//                     id="weightKg"
//                     type="number"
//                     value={formData.weightKg}
//                     onChange={(e) => handleInputChange('weightKg', e.target.value)}
//                     className="mt-1"
//                     placeholder="65"
//                 />
//                 </div>
//                 <div>
//                 <Label htmlFor="complexion">Complexion</Label>
//                 <Select 
//                     onValueChange={(value) => handleInputChange('complexion', value)}
//                 >
//                     <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Select complexion" />
//                     </SelectTrigger>
//                     <SelectContent>
//                     <SelectItem value="Fair">Fair</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Tan">Tan</SelectItem>
//                     <SelectItem value="Dark">Dark</SelectItem>
//                     </SelectContent>
//                 </Select>
//                 </div>
//             </div>

//             {/* Bio and Interests */}
//             <div>
//                 <Label htmlFor="bio">About You</Label>
//                 <Textarea
//                 id="bio"
//                 value={formData.bio}
//                 onChange={(e) => handleInputChange('bio', e.target.value)}
//                 className="mt-1"
//                 placeholder="Tell us about yourself..."
//                 rows={4}
//                 />
//             </div>

//             <div>
//                 <Label htmlFor="interest">Interests</Label>
//                 <Input
//                 id="interest"
//                 type="text"
//                 value={formData.interest}
//                 onChange={(e) => handleInputChange('interest', e.target.value)}
//                 className="mt-1"
//                 placeholder="Technology, Reading, Travel..."
//                 />
//             </div>

//             <div>
//                 <Label htmlFor="hobbies">Hobbies</Label>
//                 <Input
//                 id="hobbies"
//                 type="text"
//                 value={formData.hobbies}
//                 onChange={(e) => handleInputChange('hobbies', e.target.value)}
//                 className="mt-1"
//                 placeholder="Coding, Photography, Hiking..."
//                 />
//             </div>

//             {/* Photo Upload */}
//             <div>
//                 <Label>Profile Photo</Label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blind-pink transition-colors">
//                 <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <div className="flex text-sm text-gray-600">
//                     <label className="relative cursor-pointer bg-white rounded-md font-medium text-blind-pink hover:text-blind-pink/80">
//                         <span>Upload a photo</span>
//                         <input 
//                         type="file" 
//                         className="sr-only" 
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         />
//                     </label>
//                     </div>
//                     {imageFile && (
//                     <p className="text-sm text-green-600">Selected: {imageFile.name}</p>
//                     )}
//                 </div>
//                 </div>
//             </div>

//             <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 py-3 text-lg"
//             >
//                 {loading ? 'Creating Profile...' : 'Create Profile'}
//             </Button>
//             </form>
//         </div>
//         </div>
//     </div>
//   );
// }
// Add type declarations at the top
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: any;
        };
        Geocoder: any;
      };
    };
  }
}

import { useState, useRef, useEffect } from 'react';
import { apiService, ApiError } from '../services/api';
import { Heart, Calendar, MapPin, Upload, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', middlename: '', dob: '', phoneNum: '', sex: '',
    address: '', state: '', city: '', localGovt: '', bio: '', interest: '',
    heightFt: '', weightKg: '', complexion: '', hobbies: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((window as any).google && addressInputRef.current && !useCurrentLocation) {
      const autocomplete = new (window as any).google.maps.places.Autocomplete(addressInputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          handleInputChange('address', place.formatted_address);
          
          const components = place.address_components || [];
          components.forEach((component: any) => {
            const types = component.types;
            if (types.includes('administrative_area_level_1')) {
              handleInputChange('state', component.long_name);
            }
            if (types.includes('locality')) {
              handleInputChange('city', component.long_name);
            }
            if (types.includes('administrative_area_level_2')) {
              handleInputChange('localGovt', component.long_name);
            }
          });
        }
      });
    }
  }, [useCurrentLocation]);

  const getCurrentLocation = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if ((window as any).google) {
            const geocoder = new (window as any).google.maps.Geocoder();
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results: any, status: any) => {
                if (status === 'OK' && results[0]) {
                  handleInputChange('address', results[0].formatted_address);
                  
                  const components = results[0].address_components || [];
                  components.forEach((component: any) => {
                    const types = component.types;
                    if (types.includes('administrative_area_level_1')) {
                      handleInputChange('state', component.long_name);
                    }
                    if (types.includes('locality')) {
                      handleInputChange('city', component.long_name);
                    }
                    if (types.includes('administrative_area_level_2')) {
                      handleInputChange('localGovt', component.long_name);
                    }
                  });
                }
                setUseCurrentLocation(false);
              }
            );
          }
        },
        () => {
          setError('Unable to get your location');
          setUseCurrentLocation(false);
        }
      );
    }
  };

  // ... rest of the component remains the same


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const currentUser = apiService.getCurrentUser();
      if (!currentUser) {
        setError('Please login again');
        return;
      }

      const profileData = {
        ...formData,
        dob: formData.dob ? new Date(formData.dob).toISOString() : ''
      };

      const response = await apiService.createUserProfile(
        currentUser.userId,
        profileData,
        imageFile || undefined
      );
      
      if (response.success) {
        alert('Profile created successfully!');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError('Failed to create profile. Please try again.');
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
          <p className="text-gray-600 mt-2">Tell us about yourself to find your perfect match</p>
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
                <Label htmlFor="firstname">First Name *</Label>
                <Input
                  id="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => handleInputChange('firstname', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name *</Label>
                <Input
                  id="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="middlename">Middle Name</Label>
                <Input
                  id="middlename"
                  type="text"
                  value={formData.middlename}
                  onChange={(e) => handleInputChange('middlename', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Date of Birth and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <Label htmlFor="sex">Gender</Label>
                <Select onValueChange={(value) => handleInputChange('sex', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="address">Address *</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  ref={addressInputRef}
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                  className="pl-10 pr-12"
                  placeholder="Type address or use location"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={useCurrentLocation}
                  className="absolute right-3 top-3 text-blind-pink hover:text-blind-pink/80 disabled:opacity-50"
                  title="Use current location"
                >
                  <Navigation className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click the location icon to use your current location or type manually
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="localGovt">Local Government *</Label>
                <Input
                  id="localGovt"
                  type="text"
                  value={formData.localGovt}
                  onChange={(e) => handleInputChange('localGovt', e.target.value)}
                  required
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
                <Select onValueChange={(value) => handleInputChange('complexion', value)}>
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

            <div>
              <Label htmlFor="interest">Interests</Label>
              <Input
                id="interest"
                type="text"
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
                type="text"
                value={formData.hobbies}
                onChange={(e) => handleInputChange('hobbies', e.target.value)}
                className="mt-1"
                placeholder="Coding, Photography, Hiking..."
              />
            </div>

            {/* Photo Upload */}
            <div>
              <Label>Profile Photo</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blind-pink transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blind-pink hover:text-blind-pink/80">
                      <span>Upload a photo</span>
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
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
