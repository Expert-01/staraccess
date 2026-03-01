import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import CelebrityDetailPage from './pages/CelebrityDetailPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-primary-darkBg flex flex-col">
        <Navigation isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/celebrity/:id" element={<CelebrityDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
