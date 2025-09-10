// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { apiService } from '../services/api';
// import { Heart, Mail, Lock, User, MapPin, Calendar, Upload } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Textarea } from '../components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { Checkbox } from '../components/ui/checkbox';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     age: '',
//     location: '',
//     bio: '',
//     interests: '',
//     lookingFor: '',
//     agreeTerms: false,
//     agreePolicy: false
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
    
//     try {
//       const response = await apiService.register({
//         username: `${formData.firstName}_${formData.lastName}`.toLowerCase(),
//         email: formData.email,
//         password: formData.password,
//         role: 'user'
//       });
      
//       if (response.success) {
//         // Redirect to login page
//         window.location.href = '/login';
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//       // Handle error (show toast, etc.)
//     }
//   };

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
//             <Heart className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Join Blind Date</h1>
//           <p className="text-gray-600 mt-2">Create your verified profile and start meaningful connections</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input
//                   id="firstName"
//                   type="text"
//                   value={formData.firstName}
//                   onChange={(e) => handleInputChange('firstName', e.target.value)}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   id="lastName"
//                   type="text"
//                   value={formData.lastName}
//                   onChange={(e) => handleInputChange('lastName', e.target.value)}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <Label htmlFor="email">Email Address</Label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   required
//                   className="pl-10"
//                   placeholder="your@email.com"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative mt-1">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={(e) => handleInputChange('password', e.target.value)}
//                     required
//                     className="pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative mt-1">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     value={formData.confirmPassword}
//                     onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                     required
//                     className="pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Age and Location */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="age">Age</Label>
//                 <div className="relative mt-1">
//                   <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="age"
//                     type="number"
//                     min="18"
//                     max="100"
//                     value={formData.age}
//                     onChange={(e) => handleInputChange('age', e.target.value)}
//                     required
//                     className="pl-10"
//                     placeholder="25"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="location">Location</Label>
//                 <div className="relative mt-1">
//                   <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="location"
//                     type="text"
//                     value={formData.location}
//                     onChange={(e) => handleInputChange('location', e.target.value)}
//                     required
//                     className="pl-10"
//                     placeholder="Lagos, Nigeria"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Looking For */}
//             <div>
//               <Label htmlFor="lookingFor">Looking For</Label>
//               <Select onValueChange={(value) => handleInputChange('lookingFor', value)}>
//                 <SelectTrigger className="mt-1">
//                   <SelectValue placeholder="What are you looking for?" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="serious-relationship">Serious Relationship</SelectItem>
//                   <SelectItem value="marriage">Marriage</SelectItem>
//                   <SelectItem value="dating">Dating</SelectItem>
//                   <SelectItem value="companionship">Companionship</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Bio */}
//             <div>
//               <Label htmlFor="bio">About You</Label>
//               <Textarea
//                 id="bio"
//                 value={formData.bio}
//                 onChange={(e) => handleInputChange('bio', e.target.value)}
//                 required
//                 className="mt-1"
//                 placeholder="Tell us about yourself, your interests, and what you're looking for in a partner..."
//                 rows={4}
//               />
//             </div>

//             {/* Interests */}
//             <div>
//               <Label htmlFor="interests">Interests & Hobbies</Label>
//               <Input
//                 id="interests"
//                 type="text"
//                 value={formData.interests}
//                 onChange={(e) => handleInputChange('interests', e.target.value)}
//                 className="mt-1"
//                 placeholder="e.g., Cooking, Travel, Music, Reading, Sports..."
//               />
//             </div>

//             {/* Photo Upload */}
//             <div>
//               <Label>Profile Photo</Label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blind-pink transition-colors">
//                 <div className="space-y-1 text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label className="relative cursor-pointer bg-white rounded-md font-medium text-blind-pink hover:text-blind-pink/80">
//                       <span>Upload a photo</span>
//                       <input type="file" className="sr-only" accept="image/*" />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 📸 Your photo will be reviewed by our team before your profile goes live.
//               </p>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="space-y-4">
//               <div className="flex items-start space-x-3">
//                 <Checkbox
//                   id="agreeTerms"
//                   checked={formData.agreeTerms}
//                   onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
//                 />
//                 <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
//                   I agree to the{' '}
//                   <Link to="/terms" className="text-blind-pink hover:underline">
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link to="/no-show-policy" className="text-blind-pink hover:underline">
//                     No-Show Policy
//                   </Link>
//                 </Label>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <Checkbox
//                   id="agreePolicy"
//                   checked={formData.agreePolicy}
//                   onCheckedChange={(checked) => handleInputChange('agreePolicy', checked as boolean)}
//                 />
//                 <Label htmlFor="agreePolicy" className="text-sm leading-relaxed">
//                   I agree to the{' '}
//                   <Link to="/privacy" className="text-blind-pink hover:underline">
//                     Privacy Policy
//                   </Link>{' '}
//                   and consent to identity verification
//                 </Label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 py-3 text-lg"
//               disabled={!formData.agreeTerms || !formData.agreePolicy}
//             >
//               Create My Profile
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-blind-pink hover:underline font-medium">
//                 Sign in here
//               </Link>
//             </p>
//           </div>

//           <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//             <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
//             <ul className="text-sm text-blue-800 space-y-1">
//               <li>• Your profile will be reviewed by our team (24-48 hours)</li>
//               <li>• We'll verify your identity and approve your account</li>
//               <li>• Once approved, you'll start receiving curated match suggestions</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService, ApiError } from '../services/api';
import { Heart, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    
    try {
      const response = await apiService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user'
      });
      
      if (response.success) {
        alert('Registration successful! Please login to continue.');
        window.location.href = '/login';
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join Blind Date</h1>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="pl-10"
                  placeholder="your_username"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="pl-10"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
              />
              <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-blind-pink hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blind-pink hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 py-3 text-lg"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blind-pink hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800">
            📝 <strong>Next Step:</strong> After registration, login and complete your profile to start matching!
          </p>
        </div>
      </div>
    </div>
  );
}

