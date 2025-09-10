import { ArrowRight, Heart, Shield, MapPin, Star, Users, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blind-pink via-blind-purple to-blind-gold">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Where Singles Meet, 
                <span className="block bg-gradient-to-r from-blind-gold to-white bg-clip-text text-transparent">
                  Love Blossoms
                </span>
              </h1>
              <p className="text-xl text-white/90 mt-6 leading-relaxed">
                Join the only dating platform that brings real people into real places. 
                Experience authentic blind dates at verified partner venues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blind-purple hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                    Start Dating Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                    How It Works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-white/80 text-sm">Active Singles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-white/80 text-sm">Partner Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-white/80 text-sm">Show-Up Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 lg:h-[500px] bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <Heart className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">Your next meaningful connection awaits...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Blind Date Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, safe, and designed for real connections. No endless swiping, just meaningful dates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Matched</h3>
              <p className="text-gray-600">
                Complete your verified profile and receive curated match suggestions based on compatibility and proximity.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blind-purple to-blind-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Venue</h3>
              <p className="text-gray-600">
                Select from our curated list of partner restaurants, bars, and lounges for your blind date experience.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blind-gold to-blind-pink rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Meet & Connect</h3>
              <p className="text-gray-600">
                Enjoy your blind date at the reserved table with our signature "Blind Date Reserved" card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Blind Date?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blind-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-blind-pink" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Verified Members Only</h3>
                    <p className="text-gray-600">Every profile is manually verified with ID checks and background verification for your safety.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blind-purple/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-blind-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">No-Show Accountability</h3>
                    <p className="text-gray-600">Our strict attendance policy ensures serious daters only. No-shows are automatically blocked.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blind-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-blind-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Curated Experiences</h3>
                    <p className="text-gray-600">Premium venues, special offers, and authentic blind date experiences designed for meaningful connections.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blind-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-4 h-4 text-blind-pink" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Real Reservations</h3>
                    <p className="text-gray-600">We handle all booking logistics. Just show up and enjoy your date at a pre-reserved table.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blind-pink/20 via-blind-purple/20 to-blind-gold/20 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Your Person</h3>
                  <p className="text-gray-600">Join thousands of verified singles looking for lasting relationships and marriage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Partner With Blind Date
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our network of premium venues and turn your empty tables into love stories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blind-pink to-blind-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guaranteed Bookings</h3>
              <p className="text-gray-300">Receive consistent foot traffic from verified users with confirmed reservations.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blind-purple to-blind-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Publicity</h3>
              <p className="text-gray-300">Your venue is promoted on our platform as a premium dating destination.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blind-gold to-blind-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Setup Costs</h3>
              <p className="text-gray-300">No tech integration required. We handle reservations, alerts, and performance feedback.</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/partners">
              <Button size="lg" className="bg-gradient-to-r from-blind-pink to-blind-purple hover:from-blind-pink/90 hover:to-blind-purple/90 px-8 py-4 text-lg">
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blind-pink to-blind-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Find Your Person?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of verified singles who are serious about finding love. 
            Your next meaningful relationship starts with one blind date.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blind-purple hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                💌 Get Started Today
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-white/80">
            <p className="text-sm">
              📧 partners@blinddate.app | 🌐 www.blinddate.app | 📱 +234 XXX XXX XXXX
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
