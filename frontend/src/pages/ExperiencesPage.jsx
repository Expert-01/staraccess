import { Link } from 'react-router-dom'
import { FaStar, FaTheaterMasks, FaGift, FaGem, FaCheckCircle, FaLock, FaAward, FaRocket, FaTicketAlt, FaCreditCard, FaCrown, FaHandshake, FaPhone } from 'react-icons/fa'

function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-primary-darkBg">
      {/* Hero Section */}
      <div className="px-6 md:px-8 py-20 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-accent-gold mb-6">
          Exclusive Experiences
        </h1>
        <p className="text-accent-gold/70 text-xl md:text-2xl max-w-3xl mx-auto">
          Connect with your favorite celebrities and unlock unforgettable moments through StarAccess
        </p>
      </div>

      {/* Main Benefits Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Direct Connection */}
          <div className="bg-primary-charcoal rounded-lg p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition">
            <div className="text-6xl mb-6"><FaStar className="w-16 h-16 text-accent-gold" /></div>
            <h2 className="font-serif text-3xl font-bold text-accent-gold mb-4">Direct Celebrity Connection</h2>
            <p className="text-accent-gold/70 leading-relaxed mb-6">
              Access exclusive one-on-one interactions with your favorite celebrities. From personalized messages to direct phone calls, experience genuine connections that transcend traditional fan experiences.
            </p>
            <ul className="space-y-3 text-accent-gold/60">
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Direct messaging and call permits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Personalized video messages</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Priority response times</span>
              </li>
            </ul>
          </div>

          {/* Premium Access */}
          <div className="bg-primary-charcoal rounded-lg p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition">
            <div className="text-6xl mb-6"><FaTheaterMasks className="w-16 h-16 text-accent-gold" /></div>
            <h2 className="font-serif text-3xl font-bold text-accent-gold mb-4">VIP Event Access</h2>
            <p className="text-accent-gold/70 leading-relaxed mb-6">
              Step behind the velvet rope and experience exclusive events. From premiere parties to intimate meet & greets, access experiences that aren't available to the general public.
            </p>
            <ul className="space-y-3 text-accent-gold/60">
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Exclusive premiere invitations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Backstage access and meet & greets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Priority seating and special treatment</span>
              </li>
            </ul>
          </div>

          {/* Exclusive Merchandise */}
          <div className="bg-primary-charcoal rounded-lg p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition">
            <div className="text-6xl mb-6"><FaGift className="w-16 h-16 text-accent-gold" /></div>
            <h2 className="font-serif text-3xl font-bold text-accent-gold mb-4">Exclusive Merchandise</h2>
            <p className="text-accent-gold/70 leading-relaxed mb-6">
              Own signed memorabilia and limited edition fan cards personally curated by your favorite celebrities. Each piece is authenticated and comes with a certificate of authenticity.
            </p>
            <ul className="space-y-3 text-accent-gold/60">
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Signed fan cards and photos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Limited edition collectibles</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Certificate of authenticity included</span>
              </li>
            </ul>
          </div>

          {/* Premium Membership */}
          <div className="bg-primary-charcoal rounded-lg p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition">
            <div className="text-6xl mb-6"><FaGem className="w-16 h-16 text-accent-gold" /></div>
            <h2 className="font-serif text-3xl font-bold text-accent-gold mb-4">Premium Membership Tiers</h2>
            <p className="text-accent-gold/70 leading-relaxed mb-6">
              Choose your tier and unlock benefits that match your lifestyle. From Bronze to Platinum, each tier offers increasing levels of exclusivity and access.
            </p>
            <ul className="space-y-3 text-accent-gold/60">
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Four exclusive membership levels</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Escalating benefits and perks</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold"><FaCheckCircle /></span>
                <span>Member-only discounts and rewards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Five Pillar Items */}
        <div className="py-16 border-t border-accent-gold/20">
          <h2 className="font-serif text-4xl font-bold text-accent-gold mb-12 text-center">Our Five Experience Pillars</h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            {/* Fan Card */}
            <div className="bg-gradient-to-br from-primary-charcoal to-primary-darkBg rounded-lg p-6 border border-accent-gold/10 text-center">
              <div className="text-5xl mb-4"><FaTicketAlt className="w-14 h-14 text-accent-gold mx-auto" /></div>
              <h3 className="text-xl font-bold text-accent-gold mb-2">Fan Card</h3>
              <p className="text-accent-gold/60 text-sm mb-4">Personalized signed cards with tiered benefits</p>
              <div className="text-accent-gold/80 text-sm space-y-1">
                <p className="font-semibold">$500 - $1,750</p>
                <p className="text-xs text-accent-gold/50">4 Tiers Available</p>
              </div>
            </div>

            {/* Membership Card */}
            <div className="bg-gradient-to-br from-primary-charcoal to-primary-darkBg rounded-lg p-6 border border-accent-gold/10 text-center">
              <div className="text-5xl mb-4"><FaCreditCard className="w-14 h-14 text-accent-gold mx-auto" /></div>
              <h3 className="text-xl font-bold text-accent-gold mb-2">Membership</h3>
              <p className="text-accent-gold/60 text-sm mb-4">Exclusive benefits and perks access</p>
              <div className="text-accent-gold/80 text-sm space-y-1">
                <p className="font-semibold">$500 - $1,750</p>
                <p className="text-xs text-accent-gold/50">4 Tiers Available</p>
              </div>
            </div>

            {/* VIP Access */}
            <div className="bg-gradient-to-br from-primary-charcoal to-primary-darkBg rounded-lg p-6 border border-accent-gold/10 text-center">
              <div className="text-5xl mb-4"><FaCrown className="w-14 h-14 text-accent-gold mx-auto" /></div>
              <h3 className="text-xl font-bold text-accent-gold mb-2">VIP Access</h3>
              <p className="text-accent-gold/60 text-sm mb-4">Events, premieres & exclusive experiences</p>
              <div className="text-accent-gold/80 text-sm space-y-1">
                <p className="font-semibold">$500 - $1,750</p>
                <p className="text-xs text-accent-gold/50">4 Tiers Available</p>
              </div>
            </div>

            {/* Meet & Greet */}
            <div className="bg-gradient-to-br from-primary-charcoal to-primary-darkBg rounded-lg p-6 border border-accent-gold/10 text-center">
              <div className="text-5xl mb-4"><FaHandshake className="w-14 h-14 text-accent-gold mx-auto" /></div>
              <h3 className="text-xl font-bold text-accent-gold mb-2">Meet & Greet</h3>
              <p className="text-accent-gold/60 text-sm mb-4">Personal face-to-face interactions</p>
              <div className="text-accent-gold/80 text-sm space-y-1">
                <p className="font-semibold">$500 - $1,750</p>
                <p className="text-xs text-accent-gold/50">4 Tiers Available</p>
              </div>
            </div>

            {/* Call Permit */}
            <div className="bg-gradient-to-br from-primary-charcoal to-primary-darkBg rounded-lg p-6 border border-accent-gold/10 text-center">
              <div className="text-5xl mb-4"><FaPhone className="w-14 h-14 text-accent-gold mx-auto" /></div>
              <h3 className="text-xl font-bold text-accent-gold mb-2">Call Permit</h3>
              <p className="text-accent-gold/60 text-sm mb-4">30-minute direct phone conversation</p>
              <div className="text-accent-gold/80 text-sm space-y-1">
                <p className="font-semibold">$1,000</p>
                <p className="text-xs text-accent-gold/50">Standard Tier</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose StarAccess */}
        <div className="py-16 border-t border-accent-gold/20">
          <h2 className="font-serif text-4xl font-bold text-accent-gold mb-12 text-center">Why Choose StarAccess</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4"><FaLock className="w-16 h-16 text-accent-gold mx-auto" /></div>
              <h3 className="text-2xl font-bold text-accent-gold mb-3">Verified & Safe</h3>
              <p className="text-accent-gold/70">All celebrities and interactions are verified. Your privacy and security are our top priorities.</p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4"><FaAward className="w-16 h-16 text-accent-gold mx-auto" /></div>
              <h3 className="text-2xl font-bold text-accent-gold mb-3">Authentic Connections</h3>
              <p className="text-accent-gold/70">Genuine interactions directly from the celebrities themselves. No middlemen, no pretense.</p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4"><FaRocket className="w-16 h-16 text-accent-gold mx-auto" /></div>
              <h3 className="text-2xl font-bold text-accent-gold mb-3">Flexible Options</h3>
              <p className="text-accent-gold/70">Choose from multiple tiers and experience types to fit your preferences and budget.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 border-y border-accent-gold/20 px-6 md:px-8 py-20 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent-gold mb-6">
            Ready to Experience StarAccess?
          </h2>
          <p className="text-accent-gold/70 text-lg mb-10">
            Browse our roster of exclusive celebrities and choose your experience today
          </p>
          <Link 
            to="/home" 
            className="inline-block bg-accent-gold text-primary-darkBg px-10 py-4 rounded-lg font-bold text-lg hover:bg-accent-goldLight transition"
          >
            Explore Celebrities
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExperiencesPage
