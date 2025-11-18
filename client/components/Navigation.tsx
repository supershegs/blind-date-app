import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User, Edit, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { apiService } from '../services/api';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [acceptedConnectionUserId, setAcceptedConnectionUserId] = useState<number | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]);

  const checkAuthStatus = async () => {
    const authenticated = apiService.isAuthenticated();
    setIsAuthenticated(authenticated);

    if (authenticated) {
      const currentUser = apiService.getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        try {
          const profileResponse = await apiService.getUserProfile(currentUser.userId);
          const profile = profileResponse.profile || profileResponse;
          setHasProfile(true);
          
          // Set user image if available
          if (profile.imageUpload) {
            setUserImage(`data:image/jpeg;base64,${profile.imageUpload}`);
          } else {
            setUserImage(null);
          }
        } catch (error) {
          setHasProfile(false);
          setUserImage(null);
        }

        // Fetch connection status to see if there's an accepted connection for chat
        try {
          const connectionResp = await apiService.getConnectionStatus(currentUser.userId);
          if (connectionResp.success && connectionResp.connection && connectionResp.connection.status === 'accepted') {
            // Determine partner id
            const c = connectionResp.connection;
            const partnerId = c.senderId === currentUser.userId ? c.receiverId : c.senderId;
            setAcceptedConnectionUserId(partnerId);
          } else {
            setAcceptedConnectionUserId(null);
          }
        } catch {
          setAcceptedConnectionUserId(null);
        }
      }
    } else {
      setUserImage(null);
      setAcceptedConnectionUserId(null);
    }
  };


  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setHasProfile(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blind-pink to-blind-purple bg-clip-text text-transparent">
              Blind Date
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && (
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-blind-pink' : 'text-gray-600 hover:text-blind-pink'
                }`}
              >
                Home
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-blind-pink' : 'text-gray-600 hover:text-blind-pink'
                }`}
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated && acceptedConnectionUserId && (
              <Link
                to="/connection-chat"
                className={`text-sm font-medium transition-colors ${
                  isActive('/connection-chat') ? 'text-blind-pink' : 'text-gray-600 hover:text-blind-pink'
                }`}
              >
                Chat
              </Link>
            )}
            {isAuthenticated && acceptedConnectionUserId && (
              <Link
                to="/plan-date"
                className={`text-sm font-medium transition-colors ${
                  isActive('/plan-date') ? 'text-blind-pink' : 'text-gray-600 hover:text-blind-pink'
                }`}
              >
                Plan Date
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/how-it-works"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/how-it-works') ? 'text-blind-pink' : 'text-gray-600 hover:text-blind-pink'
                  }`}
                >
                  How It Works
                </Link>
                <Link
                  to="/partners"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/partners') ? 'text-blind-pink' : 'text-gray-600 hover:text-blind-pink'
                  }`}
                >
                  Partners
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {hasProfile && (
                  <Button 
                    variant="ghost" size="sm"
                      onClick={() => {
                        window.location.href = '/edit-profile';
                        setIsMenuOpen(false);
                      }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  {userImage ? (
                    <img 
                      src={userImage} 
                      alt={user?.username} 
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span>{user?.username}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAuthenticated && (
              <Link
                to="/"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive('/') ? 'text-blind-pink bg-blind-pink/10' : 'text-gray-600 hover:text-blind-pink hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive('/dashboard') ? 'text-blind-pink bg-blind-pink/10' : 'text-gray-600 hover:text-blind-pink hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated && acceptedConnectionUserId && (
              <Link
                to="/connection-chat"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive('/connection-chat') ? 'text-blind-pink bg-blind-pink/10' : 'text-gray-600 hover:text-blind-pink hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chat
              </Link>
            )}
            {isAuthenticated && acceptedConnectionUserId && (
              <Link
                to="/plan-date"
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive('/plan-date') ? 'text-blind-pink bg-blind-pink/10' : 'text-gray-600 hover:text-blind-pink hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Date
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/how-it-works"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    isActive('/how-it-works') ? 'text-blind-pink bg-blind-pink/10' : 'text-gray-600 hover:text-blind-pink hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  to="/partners"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    isActive('/partners') ? 'text-blind-pink bg-blind-pink/10' : 'text-gray-600 hover:text-blind-pink hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Partners
                </Link>
              </>
            )}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {isAuthenticated ? (
                <>
                  {hasProfile && (
                    <button
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blind-pink hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Edit className="h-4 w-4 mr-2 inline" />
                      Edit Profile
                    </button>
                  )}
                  <button
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blind-pink hover:bg-gray-50 rounded-md"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2 inline" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blind-pink hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blind-pink to-blind-purple rounded-md mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
