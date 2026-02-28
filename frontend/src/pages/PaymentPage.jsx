import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: cart,
          payment: formData
        })
      })

      if (response.ok) {
        localStorage.setItem('cart', '[]')
        alert('Payment successful!')
        navigate('/home')
      } else {
        alert('Payment failed. Please try again.')
      }
    } catch (err) {
      alert('Error processing payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Payment</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-black font-semibold mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              className="w-full border border-primary-mediumGray rounded px-4 py-2 focus:outline-none focus:border-accent-blue text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="w-full border border-primary-mediumGray rounded px-4 py-2 focus:outline-none focus:border-accent-blue text-black"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-semibold mb-2">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full border border-primary-mediumGray rounded px-4 py-2 focus:outline-none focus:border-accent-blue text-black"
                required
              />
            </div>
            <div>
              <label className="block text-black font-semibold mb-2">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-full border border-primary-mediumGray rounded px-4 py-2 focus:outline-none focus:border-accent-blue text-black"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-blue text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:bg-neutral-gray"
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>

        <div className="mt-8 p-6 bg-primary-lightGray rounded-lg border border-primary-mediumGray">
          <p className="text-neutral-gray text-sm">
            This is a demo payment form. In production, integrate with Stripe for secure payment processing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
