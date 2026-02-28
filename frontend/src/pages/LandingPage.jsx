import { Link } from 'react-router-dom'
import PhotoFanCarousel from '../components/PhotoFanCarousel'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-lightGray to-white text-black">
      {/* Hero Section */}
      <div className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">Celebrity Browser</h1>
        <p className="text-2xl text-neutral-darkGray mb-12">
          Connect with your favorite celebrities. Purchase exclusive items, meet & greets, and more.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="p-6 bg-white rounded-lg border border-primary-mediumGray shadow-sm">
            <p className="text-3xl font-bold text-accent-blue">1000+</p>
            <p className="text-neutral-gray">Celebrities</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-primary-mediumGray shadow-sm">
            <p className="text-3xl font-bold text-accent-blue">50K+</p>
            <p className="text-neutral-gray">Happy Users</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-primary-mediumGray shadow-sm">
            <p className="text-3xl font-bold text-accent-blue">100K+</p>
            <p className="text-neutral-gray">Items</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-primary-mediumGray shadow-sm">
            <p className="text-3xl font-bold text-accent-blue">24/7</p>
            <p className="text-neutral-gray">Support</p>
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <Link 
            to="/signup"
            className="bg-accent-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link 
            to="/login"
            className="border-2 border-accent-blue text-accent-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-blue hover:text-white transition"
          >
            Sign In
          </Link>
        </div>

        {/* Photo Fan Carousel */}
        <div className="mt-20">
          <p className="text-xl text-neutral-gray mb-12">Browse Our Featured Celebrities</p>
          <PhotoFanCarousel />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary-lightGray py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-lg border border-primary-mediumGray">
              <h3 className="text-xl font-bold text-black mb-4">Fan Cards</h3>
              <p className="text-neutral-gray">Collect exclusive autographed fan cards from your favorite celebrities.</p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-primary-mediumGray">
              <h3 className="text-xl font-bold text-black mb-4">Meet & Greets</h3>
              <p className="text-neutral-gray">Book exclusive meet and greet sessions with your celebrity idols.</p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-primary-mediumGray">
              <h3 className="text-xl font-bold text-black mb-4">VIP Access</h3>
              <p className="text-neutral-gray">Unlock VIP experiences and backstage access to events.</p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-primary-mediumGray">
              <h3 className="text-xl font-bold text-black mb-4">Call Permits</h3>
              <p className="text-neutral-gray">Get direct call permits to connect with your celebrity crushes.</p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-primary-mediumGray">
              <h3 className="text-xl font-bold text-black mb-4">Secure Payment</h3>
              <p className="text-neutral-gray">Safe and secure payment processing with multiple payment methods.</p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-primary-mediumGray">
              <h3 className="text-xl font-bold text-black mb-4">24/7 Support</h3>
              <p className="text-neutral-gray">Round the clock customer support to assist you anytime.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-black">Ready to Start?</h2>
        <p className="text-xl text-neutral-darkGray mb-8">Join thousands of celebrity fans today.</p>
        <Link 
          to="/signup"
          className="inline-block bg-accent-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
