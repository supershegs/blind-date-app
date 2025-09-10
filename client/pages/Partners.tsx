import { useState } from 'react';
import { CheckCircle, Star, Calendar, MapPin, Phone, Mail, ArrowRight, Upload, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';

const benefits = [
  {
    icon: Calendar,
    title: "Guaranteed Bookings",
    description: "Receive consistent foot traffic from verified users with confirmed reservations."
  },
  {
    icon: Star,
    title: "Free Publicity",
    description: "Your venue is promoted on our platform as a premium dating destination."
  },
  {
    icon: MapPin,
    title: "No Setup Costs",
    description: "No tech integration required. We handle reservations, alerts, and performance feedback."
  }
];

const partnerTestimonials = [
  {
    name: "Ocean View Restaurant",
    location: "Victoria Island",
    rating: 4.8,
    review: "Blind Date has brought us amazing customers. The dates are always well-planned and our revenue has increased by 30%.",
    manager: "Sarah Adebayo"
  },
  {
    name: "Sunset Lounge",
    location: "Lekki",
    rating: 4.9,
    review: "Professional service and great communication. The 'Blind Date Reserved' cards add a special touch to our dining experience.",
    manager: "David Okonkwo"
  },
  {
    name: "Garden Bistro",
    location: "Ikeja",
    rating: 4.7,
    review: "We've been a partner for 6 months and love the consistent bookings. Perfect for our romantic ambiance.",
    manager: "Mary Johnson"
  }
];

export default function Partners() {
  const [formData, setFormData] = useState({
    venueName: '',
    contactName: '',
    email: '',
    phone: '',
    venueType: '',
    location: '',
    address: '',
    capacity: '',
    description: '',
    specialOffers: '',
    operatingHours: '',
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner application:', formData);
    // Handle partner application submission
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blind-pink via-blind-purple to-blind-gold py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Partner With Blind Date
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Where Singles Meet, Love Blossoms, and Your Tables Get Booked!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blind-purple hover:bg-white/90 px-8 py-4 text-lg font-semibold">
              💌 Partner With Us Today!
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
              📧 partners@blinddate.app
            </Button>
          </div>
          <div className="mt-8 text-white/80">
            <p>📱 +234 XXX XXX XXXX | 🌐 www.blinddate.app</p>
          </div>
        </div>
      </section>

      {/* How It Works for Venues */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works for Venues
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple integration, no tech requirements, just great results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Match Made</h3>
              <p className="text-gray-600 text-sm">A couple gets matched on our app</p>
            </div>

            <div className="hidden md:block text-center">
              <ArrowRight className="w-8 h-8 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blind-purple to-blind-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Venue Suggested</h3>
              <p className="text-gray-600 text-sm">We suggest your venue based on proximity</p>
            </div>

            <div className="hidden md:block text-center">
              <ArrowRight className="w-8 h-8 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blind-gold to-blind-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reservation Confirmed</h3>
              <p className="text-gray-600 text-sm">You get a reservation with "Blind Date Reserved" card</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Benefits to Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTestimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{testimonial.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                  <div className="text-sm text-gray-500">
                    <p>{testimonial.manager}</p>
                    <p>{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join Our Partner Network
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to start your partnership with Blind Date.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Partner Application</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Venue Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="venueName">Venue Name</Label>
                    <Input
                      id="venueName"
                      value={formData.venueName}
                      onChange={(e) => handleInputChange('venueName', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Ocean View Restaurant"
                    />
                  </div>
                  <div>
                    <Label htmlFor="venueType">Venue Type</Label>
                    <Select onValueChange={(value) => handleInputChange('venueType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select venue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="lounge">Lounge</SelectItem>
                        <SelectItem value="cafe">Cafe</SelectItem>
                        <SelectItem value="bistro">Bistro</SelectItem>
                        <SelectItem value="hotel-restaurant">Hotel Restaurant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Person</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="John Doe"
                    />
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
                        placeholder="manager@restaurant.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="pl-10"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Seating Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="50"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">City/Area</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                      className="pl-10"
                      placeholder="Victoria Island, Lagos"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Complete address with landmarks..."
                    rows={3}
                  />
                </div>

                {/* Venue Details */}
                <div>
                  <Label htmlFor="description">Venue Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Describe your venue's ambiance, cuisine type, and what makes it special for romantic dates..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="specialOffers">Special Offers for Blind Date Customers</Label>
                  <Textarea
                    id="specialOffers"
                    value={formData.specialOffers}
                    onChange={(e) => handleInputChange('specialOffers', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 15% discount on couples menu, complimentary dessert, etc."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="e.g., Mon-Sun: 6:00 PM - 11:00 PM"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <Label>Venue Photos</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blind-pink transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blind-pink hover:text-blind-pink/80">
                          <span>Upload venue photos</span>
                          <input type="file" className="sr-only" accept="image/*" multiple />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                    I agree to the Partner Terms & Conditions and understand that venue details will be reviewed before approval.
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 py-3 text-lg"
                  disabled={!formData.agreeTerms}
                >
                  <Building className="mr-2 h-5 w-5" />
                  Submit Partner Application
                </Button>
              </form>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Our team will review your application within 3-5 business days</li>
                  <li>• We'll schedule a venue visit and discuss partnership terms</li>
                  <li>• Once approved, we'll add you to our platform and start sending bookings</li>
                  <li>• You'll receive branded "Blind Date Reserved" cards and booking notifications</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
