import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignupPage({ setIsAuthenticated }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
        navigate('/home')
      } else {
        setError('Signup failed')
      }
    } catch (err) {
      setError('Error creating account')
    }
  }

  return (
    <div className="min-h-screen bg-primary-darkBg flex items-center justify-center px-6">
      <div className="bg-primary-charcoal rounded-lg shadow-xl p-8 w-full max-w-md border border-accent-gold/20">
        <h2 className="font-serif text-3xl font-bold text-accent-gold mb-8 text-center">Create Account</h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-accent-gold font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-accent-gold/30 rounded-sm px-4 py-2 focus:outline-none focus:border-accent-gold text-white bg-primary-darkBg"
              required
            />
          </div>

          <div>
            <label className="block text-accent-gold font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-accent-gold/30 rounded-sm px-4 py-2 focus:outline-none focus:border-accent-gold text-white bg-primary-darkBg"
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
              className="w-full border border-accent-gold/30 rounded-sm px-4 py-2 focus:outline-none focus:border-accent-gold text-white bg-primary-darkBg"
              required
            />
          </div>

          <div>
            <label className="block text-accent-gold font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-accent-gold/30 rounded-sm px-4 py-2 focus:outline-none focus:border-accent-gold text-white bg-primary-darkBg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-gold text-primary-darkBg font-bold py-2 rounded-sm hover:bg-accent-goldLight transition uppercase tracking-wider"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-accent-gold/60 mt-6">
          Already have an account? <a href="/login" className="text-accent-gold hover:text-accent-goldLight transition">Login</a>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
