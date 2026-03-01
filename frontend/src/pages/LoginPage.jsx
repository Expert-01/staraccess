import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ setIsAuthenticated, setIsAdmin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        setIsAuthenticated(true)
        if (data.isAdmin) {
          setIsAdmin(true)
          navigate('/admin')
        } else {
          navigate('/home')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-primary-darkBg flex items-center justify-center px-6">
      <div className="bg-primary-charcoal rounded-lg shadow-xl p-8 w-full max-w-md border border-accent-gold/20">
        <h2 className="font-serif text-3xl font-bold text-accent-gold mb-8 text-center">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-accent-gold font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-accent-gold/50 rounded-sm px-4 py-2 focus:outline-none focus:border-accent-gold text-black bg-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-accent-gold font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-accent-gold/50 rounded-sm px-4 py-2 focus:outline-none focus:border-accent-gold text-black bg-white placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-gold text-primary-darkBg font-bold py-2 rounded-sm hover:bg-accent-goldLight transition uppercase tracking-wider"
          >
            Login
          </button>
        </form>

        <p className="text-center text-accent-gold/60 mt-6">
          Don't have an account? <a href="/signup" className="text-accent-gold hover:text-accent-goldLight transition">Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
