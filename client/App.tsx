import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PlaceholderPage } from './components/PlaceholderPage';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProfile from './pages/CreateProfile';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Partners from './pages/Partners';
import NotFound from './pages/NotFound';
import EditProfile from './pages/EditProfile';
import Matches from './pages/Matches';
import CreateProfileRoute from './components/CreateProfileRoute';
import EditProfileRoute from './components/EditProfileRoute';
import ConnectionChat from './pages/ConnectionChat';
import PlanDate from './pages/PlanDate';




function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={
              <PlaceholderPage
                title="Reset Password"
                description="Enter your email to receive password reset instructions."
              />
            } />
            
            {/* App Features */}
            <Route 
              path="/dashboard" 
              element={ 
                <ProtectedRoute> 
                  <Dashboard />  
                </ProtectedRoute> 
              } 
            />
   
            <Route 
              path="/create-profile" 
              element={
                <CreateProfileRoute>
                  <CreateProfile />
                </CreateProfileRoute>
              } 
            />
            <Route 
              path="/edit-profile" 
              element={
                <EditProfileRoute>
                  <EditProfile />
                </EditProfileRoute>
              } 
            />
            <Route 
              path="/matches" 
              element={
                <ProtectedRoute>
                  <Matches />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/connection-chat" 
              element={
                <ProtectedRoute>
                  <ConnectionChat />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/plan-date" 
              element={
                <ProtectedRoute>
                  <PlanDate />
                </ProtectedRoute>
              }
            />
            <Route path="/dates" element={
              <PlaceholderPage
                title="Your Dates"
                description="Manage your scheduled dates and venue selections."
              />
            } />
            
            {/* Information Pages */}
            <Route path="/how-it-works" element={
              <PlaceholderPage 
                title="How It Works" 
                description="Learn about our unique blind dating process and how to make the most of your experience." 
              />
            } />
            <Route path="/safety" element={
              <PlaceholderPage 
                title="Safety & Privacy" 
                description="Your safety is our priority. Learn about our verification process and safety measures." 
              />
            } />
            <Route path="/partners" element={<Partners />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/venues" element={<AdminDashboard />} />
            
            {/* Support Pages */}
            <Route path="/about" element={
              <PlaceholderPage 
                title="About Us" 
                description="Learn more about our mission to create meaningful connections through blind dating." 
              />
            } />
            <Route path="/contact" element={
              <PlaceholderPage 
                title="Contact Us" 
                description="Get in touch with our team for support, partnerships, or general inquiries." 
              />
            } />
            <Route path="/help" element={
              <PlaceholderPage 
                title="Help Center" 
                description="Find answers to common questions and get support for your Blind Date experience." 
              />
            } />
            <Route path="/faq" element={
              <PlaceholderPage 
                title="FAQ" 
                description="Frequently asked questions about our platform, safety, and dating process." 
              />
            } />
            
            {/* Legal Pages */}
            <Route path="/terms" element={
              <PlaceholderPage 
                title="Terms of Service" 
                description="Read our terms of service and user agreement." 
              />
            } />
            <Route path="/privacy" element={
              <PlaceholderPage 
                title="Privacy Policy" 
                description="Learn how we protect and handle your personal information." 
              />
            } />
            <Route path="/no-show-policy" element={
              <PlaceholderPage 
                title="No-Show Policy" 
                description="Understand our attendance requirements and accountability measures." 
              />
            } />
            <Route path="/refund" element={
              <PlaceholderPage 
                title="Refund Policy" 
                description="Information about refunds and cancellations." 
              />
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
