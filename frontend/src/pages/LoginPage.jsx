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
      const response = await fetch('/api/auth/login', {
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
    <div className="min-h-screen bg-gradient-to-br from-white to-primary-lightGray flex items-center justify-center px-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md border border-primary-mediumGray">
        <h2 className="text-3xl font-bold text-black mb-8 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-black font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-primary-mediumGray rounded px-4 py-2 focus:outline-none focus:border-accent-blue text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-primary-mediumGray rounded px-4 py-2 focus:outline-none focus:border-accent-blue text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-blue text-white font-bold py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-neutral-gray mt-6">
          Don't have an account? <a href="/signup" className="text-accent-blue hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
