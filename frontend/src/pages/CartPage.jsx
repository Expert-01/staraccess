import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    calculateTotal(cart)
  }, [])

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    setTotal(sum)
  }

  const removeItem = (cartId) => {
    const updated = cartItems.filter(item => item.cartId !== cartId)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    calculateTotal(updated)
  }

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartId)
      return
    }
    
    const updated = cartItems.map(item =>
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    calculateTotal(updated)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty')
      return
    }
    navigate('/payment')
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-gray text-lg mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-accent-blue text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.cartId} className="bg-primary-lightGray p-6 rounded-lg border border-primary-mediumGray">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-primary-mediumGray rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/placeholder.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-black mb-2">{item.name}</h3>
                        <p className="text-neutral-gray mb-4">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.cartId, parseInt(e.target.value) || 1)}
                            className="border border-primary-mediumGray rounded px-3 py-2 w-20 text-black"
                          />
                          <button
                            onClick={() => removeItem(item.cartId)}
                            className="text-red-600 hover:text-red-700 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-lightGray p-6 rounded-lg border border-primary-mediumGray h-fit">
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-gray">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-gray">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-neutral-gray">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <hr className="my-4 border-primary-mediumGray" />
                <div className="flex justify-between text-xl font-bold text-black">
                  <span>Total</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-accent-blue text-white font-bold py-3 rounded hover:bg-blue-700 transition"
              >
                Proceed to Payment
              </button>

              <button
                onClick={() => navigate('/home')}
                className="w-full bg-white text-black font-bold py-3 rounded hover:bg-primary-lightGray transition mt-3 border border-primary-mediumGray"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
