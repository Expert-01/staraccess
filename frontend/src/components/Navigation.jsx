import { Link } from 'react-router-dom'

function Navigation({ isAuthenticated, isAdmin }) {
  return (
    <nav className="bg-white border-b border-neutral-gray px-6 py-4 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-2xl font-bold text-black">
        CelebBrowser
      </Link>
      
      <div className="flex gap-6 items-center">
        {isAuthenticated && (
          <>
            <Link to="/home" className="text-black hover:text-accent-blue transition">Home</Link>
            <Link to="/cart" className="text-black hover:text-accent-blue transition">Cart</Link>
            {isAdmin && (
              <Link to="/admin" className="text-black hover:text-accent-blue transition">Admin</Link>
            )}
            <button className="bg-accent-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Logout
            </button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-black hover:text-accent-blue transition">Login</Link>
            <Link to="/signup" className="bg-accent-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation
