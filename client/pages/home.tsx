import { useState } from 'react';
import { Heart, MapPin, Calendar, Clock, Star, User, Settings, LogOut, Bell, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

// Mock data - in real app this would come from API
const mockUser = {
  name: "Sarah Johnson",
  age: 28,
  location: "Lagos Island",
  avatar: "/placeholder.svg",
  profileComplete: 85,
  activeMatches: 3,
  pendingRequests: 2,
  upcomingDates: 1
};

const mockMatches = [
  {
    id: 1,
    firstName: "Michael",
    age: 30,
    location: "Victoria Island",
    interests: ["Photography", "Travel", "Cooking"],
    compatibility: 89,
    distance: "2.5 km away",
    verified: true,
    lastSeen: "2 hours ago"
  },
  {
    id: 2,
    firstName: "David",
    age: 32,
    location: "Lekki",
    interests: ["Music", "Fitness", "Reading"],
    compatibility: 84,
    distance: "4.1 km away",
    verified: true,
    lastSeen: "1 day ago"
  },
  {
    id: 3,
    firstName: "James",
    age: 29,
    location: "Ikeja",
    interests: ["Sports", "Movies", "Art"],
    compatibility: 78,
    distance: "6.8 km away",
    verified: true,
    lastSeen: "3 days ago"
  }
];

const mockUpcomingDate = {
  partnerName: "Emma",
  venue: "Ocean View Restaurant",
  date: "Tomorrow",
  time: "7:00 PM",
  address: "1234 Victoria Island, Lagos",
  status: "confirmed"
};

export default function Dashboard() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  const handleSendRequest = (matchId: number) => {
    // TODO: Implement API call to send match request
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blind-pink to-blind-purple text-white">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
                <p className="text-gray-600">{mockUser.location} • Profile {mockUser.profileComplete}% complete</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats and Upcoming */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blind-pink/10 rounded-lg">
                    <div className="text-2xl font-bold text-blind-pink">{mockUser.activeMatches}</div>
                    <div className="text-sm text-gray-600">Active Matches</div>
                  </div>
                  <div className="text-center p-3 bg-blind-purple/10 rounded-lg">
                    <div className="text-2xl font-bold text-blind-purple">{mockUser.pendingRequests}</div>
                    <div className="text-sm text-gray-600">Pending Requests</div>
                  </div>
                </div>
                <div className="mt-4 text-center p-3 bg-blind-gold/10 rounded-lg">
                  <div className="text-2xl font-bold text-blind-gold">{mockUser.upcomingDates}</div>
                  <div className="text-sm text-gray-600">Upcoming Dates</div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Date */}
            {mockUpcomingDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blind-pink" />
                    Next Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">With {mockUpcomingDate.partnerName}</span>
                      <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {mockUpcomingDate.venue}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {mockUpcomingDate.date} at {mockUpcomingDate.time}
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90">
                      View Date Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span>{mockUser.profileComplete}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blind-pink to-blind-purple h-2 rounded-full" 
                      style={{ width: `${mockUser.profileComplete}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Add more photos and interests to improve your match quality!
                  </div>
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Match Suggestions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Suggested Matches</h2>
              <Button variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                View All Matches
              </Button>
            </div>

            <div className="space-y-6">
              {mockMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      
                      {/* Profile Image Placeholder */}
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <User className="h-16 w-16 mx-auto mb-2 opacity-50" />
                            <div className="text-sm">Photo Hidden</div>
                            <div className="text-xs">Until Match Confirmed</div>
                          </div>
                        </div>
                        {match.verified && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              ✓ Verified
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Match Info */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {match.firstName}, {match.age}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-blind-gold fill-current" />
                              <span className="text-sm font-medium text-blind-gold">
                                {match.compatibility}% Match
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            {match.location} • {match.distance}
                          </div>
                        </div>

                        {/* Interests */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Shared Interests</h4>
                          <div className="flex flex-wrap gap-2">
                            {match.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            Last seen {match.lastSeen}
                          </div>
                          <div className="flex space-x-3">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              View Profile
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90"
                              onClick={() => handleSendRequest(match.id)}
                            >
                              <Heart className="h-4 w-4 mr-2" />
                              Send Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Matches
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action for Emergency */}
      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg" 
          className="rounded-full h-14 w-14 bg-red-500 hover:bg-red-600 shadow-lg"
          title="Emergency Contact"
        >
          🆘
        </Button>
      </div>
    </div>
  );
}
