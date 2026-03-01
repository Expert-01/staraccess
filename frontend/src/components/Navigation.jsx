import { Link } from 'react-router-dom'

function Navigation({ isAuthenticated, isAdmin }) {
  return (
    <nav className="bg-primary-darkBg border-b border-accent-gold/20 px-6 md:px-8 py-5 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <Link to="/" className="font-serif text-2xl md:text-3xl font-bold text-accent-gold tracking-wider">
        StarAccess
      </Link>
      
      {/* Center Navigation Links */}
      <div className="hidden md:flex gap-12 items-center text-accent-gold/80">
        <Link to="/" className="hover:text-accent-gold transition duration-300 text-sm uppercase tracking-wider">
          Experiences
        </Link>
        <Link to="/home" className="hover:text-accent-gold transition duration-300 text-sm uppercase tracking-wider">
          Celebrities
        </Link>
        <a href="#" className="hover:text-accent-gold transition duration-300 text-sm uppercase tracking-wider">
          Membership
        </a>
      </div>

      {/* Right Section */}
      <div className="flex gap-4 md:gap-6 items-center">
        {isAuthenticated && (
          <>
            <Link to="/cart" className="text-accent-gold/80 hover:text-accent-gold transition text-sm">
              Cart
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-accent-gold/80 hover:text-accent-gold transition text-sm">
                Admin
              </Link>
            )}
            <button className="bg-accent-gold text-primary-darkBg px-6 py-2 rounded-sm font-semibold hover:bg-accent-goldLight transition text-sm uppercase tracking-wider">
              Logout
            </button>
          </>
        )}
        {!isAuthenticated && (
          <Link 
            to="/login" 
            className="bg-accent-gold text-primary-darkBg px-6 py-2 rounded-sm font-semibold hover:bg-accent-goldLight transition text-sm uppercase tracking-wider"
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
