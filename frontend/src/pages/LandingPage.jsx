import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="bg-primary-darkBg text-white min-h-screen">
      {/* Hero Section with Overlay */}
      <div className="relative h-screen bg-gradient-to-br from-primary-darkBg via-primary-charcoal to-primary-darkBg overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-bronze/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Exclusive Access to the <br className="hidden md:block" />
            <span className="text-accent-gold">World's Most Influential Icons</span>
          </h1>
          
          <p className="text-lg md:text-xl text-accent-gold/90 mb-12 max-w-2xl">
            Official meet & greets. Verified fan experiences. Premium collectibles.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 mb-24">
            <Link
              to="/home"
              className="bg-accent-gold text-primary-darkBg px-8 md:px-10 py-4 rounded-sm font-bold text-lg hover:bg-accent-goldLight transition duration-300 uppercase tracking-wider"
            >
              Explore Experiences
            </Link>
            <Link
              to="/signup"
              className="border-2 border-accent-gold text-accent-gold px-8 md:px-10 py-4 rounded-sm font-bold text-lg hover:bg-accent-gold hover:text-primary-darkBg transition duration-300 uppercase tracking-wider"
            >
              Join the Inner Circle
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-primary-charcoal py-16 border-t border-b border-accent-gold/20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl">🔒</div>
            <p className="text-accent-gold font-semibold">Secure Payments</p>
            <p className="text-accent-gold/60 text-sm">Industry-standard encryption</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl">✓</div>
            <p className="text-accent-gold font-semibold">Verified Partnerships</p>
            <p className="text-accent-gold/60 text-sm">Directly managed celebrities</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl">👔</div>
            <p className="text-accent-gold font-semibold">Licensed Management Team</p>
            <p className="text-accent-gold/60 text-sm">Professional coordination</p>
          </div>
        </div>
      </div>

      {/* Exclusive Celebrity Experiences Section */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-5xl font-bold text-center mb-4 text-white">
            Exclusive Celebrity<br className="hidden md:block" /> Experiences
          </h2>
          <p className="text-center text-accent-gold/70 mb-16 text-lg">
            Connect directly with world-renowned personalities
          </p>

          {/* Celebrity Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {[
              { name: 'Leonardo DiCaprio', status: 'Officially Managed' },
              { name: 'Zendaya', status: 'Officially Managed' },
              { name: 'Chris Hemsworth', status: 'Officially Managed' },
              { name: 'Cardi B', status: 'Officially Managed' },
              { name: 'Keanu Reeves', status: 'Officially Managed' },
              { name: 'Sandra Bullock', status: 'Officially Managed' },
            ].map((celebrity, idx) => (
              <div key={idx} className="text-center group cursor-pointer">
                <div className="w-full aspect-square rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-bronze/30 mb-4 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent-gold/20 transition duration-300 overflow-hidden">
                  <div className="text-5xl">⭐</div>
                </div>
                <h3 className="text-accent-gold font-semibold text-sm mb-1">{celebrity.name}</h3>
                <p className="text-accent-gold/60 text-xs">{celebrity.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Cards Section */}
      <div className="bg-primary-charcoal py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Backstage Meet & Greet',
                desc: 'Meet your idol behind the scenes',
                icon: '🎭'
              },
              {
                title: 'VIP Premiere Access',
                desc: 'Exclusive invitations to red carpet events',
                icon: '🎬'
              },
              {
                title: 'Signed Memorabilia',
                desc: 'Own limited edition autographed items',
                icon: '📝'
              }
            ].map((exp, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="h-72 rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-accent-gold/10 to-accent-bronze/10 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-accent-gold/20 transition duration-300">
                  <div className="text-7xl">{exp.icon}</div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-accent-gold mb-2">{exp.title}</h3>
                <p className="text-accent-gold/70">{exp.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/home"
              className="border border-accent-gold text-accent-gold px-8 py-3 rounded-sm font-semibold hover:bg-accent-gold hover:text-primary-charcoal transition duration-300 inline-block uppercase tracking-wider"
            >
              Browse All Experiences
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-darkBg border-t border-accent-gold/20 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-accent-gold mb-4">StarAccess</h3>
              <p className="text-accent-gold/60 text-sm">© 2024 StarAccess Management</p>
            </div>
            <div>
              <p className="text-accent-gold font-semibold mb-4 uppercase tracking-wider text-sm">Experiences</p>
              <ul className="space-y-2 text-accent-gold/60 text-sm">
                <li><a href="#" className="hover:text-accent-gold transition">Celebrities</a></li>
              </ul>
            </div>
            <div>
              <p className="text-accent-gold font-semibold mb-4 uppercase tracking-wider text-sm">Company</p>
              <ul className="space-y-2 text-accent-gold/60 text-sm">
                <li><a href="#" className="hover:text-accent-gold transition">Membership</a></li>
              </ul>
            </div>
            <div>
              <p className="text-accent-gold font-semibold mb-4 uppercase tracking-wider text-sm">Legal</p>
              <ul className="space-y-2 text-accent-gold/60 text-sm">
                <li><a href="#" className="hover:text-accent-gold transition">Terms of Use</a></li>
                <li><a href="#" className="hover:text-accent-gold transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <p className="text-accent-gold font-semibold mb-4 uppercase tracking-wider text-sm">Contact</p>
              <p className="text-accent-gold/60 text-sm">support@staraccess.com</p>
            </div>
          </div>

          <div className="border-t border-accent-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center text-accent-gold/60 text-sm">
            <p>12-54 Sunset Blvd, Los Angeles, CA 🏙️</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent-gold transition">Partnerships</a>
              <a href="#" className="hover:text-accent-gold transition">Milboard</a>
              <a href="#" className="hover:text-accent-gold transition">RatingStarAI</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
