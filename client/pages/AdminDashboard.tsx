import { useState } from 'react';
import { Users, Building, Calendar, AlertTriangle, CheckCircle, XCircle, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 10547,
  pendingApprovals: 23,
  activeMatches: 1234,
  totalVenues: 156,
  todayBookings: 45,
  noShows: 3
};

const mockPendingUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    age: 28,
    location: "Lagos Island",
    registeredAt: "2025-01-15",
    profileImage: "/placeholder.svg",
    verificationStatus: "pending",
    documents: ["ID Card", "Selfie"]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    age: 26,
    location: "Victoria Island",
    registeredAt: "2025-01-14",
    profileImage: "/placeholder.svg",
    verificationStatus: "pending",
    documents: ["Passport", "Selfie"]
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    age: 32,
    location: "Lekki",
    registeredAt: "2025-01-13",
    profileImage: "/placeholder.svg",
    verificationStatus: "under_review",
    documents: ["Driver's License", "Selfie", "Proof of Address"]
  }
];

const mockActiveMatches = [
  {
    id: 1,
    user1: "Sarah M.",
    user2: "David K.",
    matchedAt: "2025-01-14",
    status: "venue_selection",
    suggestedVenues: ["Ocean View Restaurant", "Sunset Lounge", "Garden Bistro"]
  },
  {
    id: 2,
    user1: "Emma L.",
    user2: "James R.",
    matchedAt: "2025-01-13",
    status: "confirmed",
    venue: "Skyline Restaurant",
    dateTime: "2025-01-16 19:00"
  },
  {
    id: 3,
    user1: "Lisa W.",
    user2: "Chris B.",
    matchedAt: "2025-01-12",
    status: "awaiting_confirmation",
    venue: "Rooftop Bar",
    dateTime: "2025-01-15 20:00"
  }
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleApproveUser = (userId: number) => {
    // TODO: Implement API call to approve user
  };

  const handleRejectUser = (userId: number) => {
    // TODO: Implement API call to reject user
  };

  const handleSuggestVenues = (matchId: number) => {
    // TODO: Implement API call to suggest venues
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users, matches, and venues</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive" className="text-sm">
                {mockStats.pendingApprovals} Pending Approvals
              </Badge>
              <Button className="bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blind-pink" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{mockStats.pendingApprovals}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Matches</p>
                  <p className="text-2xl font-bold text-green-600">{mockStats.activeMatches}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Partner Venues</p>
                  <p className="text-2xl font-bold text-blind-purple">{mockStats.totalVenues}</p>
                </div>
                <Building className="h-8 w-8 text-blind-purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                  <p className="text-2xl font-bold text-blind-gold">{mockStats.todayBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-blind-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">No-Shows</p>
                  <p className="text-2xl font-bold text-red-600">{mockStats.noShows}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending-users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending-users">Pending Users</TabsTrigger>
            <TabsTrigger value="active-matches">Active Matches</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
          </TabsList>

          {/* Pending Users Tab */}
          <TabsContent value="pending-users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Approvals ({mockStats.pendingApprovals})</CardTitle>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.profileImage} />
                          <AvatarFallback className="bg-gradient-to-r from-blind-pink to-blind-purple text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Age: {user.age}</span>
                            <span>{user.location}</span>
                            <span>Registered: {user.registeredAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={user.verificationStatus === 'pending' ? 'secondary' : 'default'}
                          className={user.verificationStatus === 'under_review' ? 'bg-yellow-100 text-yellow-800' : ''}
                        >
                          {user.verificationStatus.replace('_', ' ')}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRejectUser(user.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Matches Tab */}
          <TabsContent value="active-matches" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Matches ({mockStats.activeMatches})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActiveMatches.map((match) => (
                    <div key={match.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {match.user1} ↔ {match.user2}
                          </h3>
                          <p className="text-sm text-gray-600">Matched on {match.matchedAt}</p>
                        </div>
                        <Badge 
                          className={
                            match.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            match.status === 'venue_selection' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }
                        >
                          {match.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {match.status === 'venue_selection' && (
                          <div>
                            <p className="mb-2">Suggested venues:</p>
                            <div className="flex flex-wrap gap-2">
                              {match.suggestedVenues?.map((venue, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {venue}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {match.venue && (
                          <div>
                            <p><strong>Venue:</strong> {match.venue}</p>
                            <p><strong>Date & Time:</strong> {match.dateTime}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        {match.status === 'venue_selection' && (
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90"
                            onClick={() => handleSuggestVenues(match.id)}
                          >
                            Suggest Venues
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Venues Tab */}
          <TabsContent value="venues" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Partner Venues ({mockStats.totalVenues})</CardTitle>
                  <Button className="bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90">
                    Add New Venue
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Building className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Venue Management</h3>
                  <p>Venue management interface coming soon...</p>
                  <p className="text-sm mt-2">Continue prompting to build out this section!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
