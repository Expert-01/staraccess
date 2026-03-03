import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ITEM_TYPE_LABELS, ITEM_DESCRIPTIONS, getTierColor } from '../constants/itemTypes'
import { FaBox, FaGift, FaTruck, FaLock, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa'

const ItemDetailPage = () => {
  const { celebrityId, itemId } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [celebrity, setCelebrity] = useState(null)
  const [selectedTier, setSelectedTier] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItemDetails()
  }, [itemId, celebrityId])

  const fetchItemDetails = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'
      const response = await fetch(
        `${apiUrl}/api/items/celebrity/${celebrityId}/item/${itemId}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch item details')
      }

      const data = await response.json()
      setItem(data.item)
      setCelebrity(data.celebrity)
      
      // Auto-select first tier
      if (data.item.tiers && data.item.tiers.length > 0) {
        setSelectedTier(data.item.tiers[0])
      }
      
      setError('')
    } catch (err) {
      setError(err.message)
      console.error('Error fetching item:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!selectedTier) {
      setError('Please select a tier')
      return
    }

    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    // Create cart item
    const cartItem = {
      id: item.id,
      tierId: selectedTier.id,
      itemName: item.name,
      tierName: selectedTier.tier_name,
      price: selectedTier.price,
      quantity: parseInt(quantity),
      celebrityId,
      celebrityName: celebrity.name
    }

    // Add or update in cart
    const existingIndex = cart.findIndex(
      c => c.id === item.id && c.tierId === selectedTier.id
    )

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += parseInt(quantity)
    } else {
      cart.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/cart')
  }

  const handleBack = () => {
    navigate(`/celebrity/${celebrityId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-accent-blue text-4xl mb-4">Loading...</div>
          <p className="text-neutral-gray">Getting item details</p>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">Error</div>
          <p className="text-neutral-gray mb-6">{error || 'Item not found'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-accent-blue text-white rounded hover:bg-accent-blueDark transition"
          >
            Back to Celebrity
          </button>
        </div>
      </div>
    )
  }

  const totalPrice = selectedTier ? selectedTier.price * quantity : 0

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary-lightGray border-b border-primary-mediumGray">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="text-accent-blue hover:text-accent-blueDark mb-4 transition flex items-center gap-2"
          >
            <FaArrowLeft className="w-4 h-4" /> Back to {celebrity.name}
          </button>
          <h1 className="text-4xl font-bold text-primary-black">
            {ITEM_TYPE_LABELS[item.item_type]}
          </h1>
          <p className="text-neutral-gray mt-2">from {celebrity.name}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side - Image and Description */}
          <div>
            <div className="bg-primary-lightGray rounded-lg p-8 mb-8 flex items-center justify-center h-96">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-neutral-gray text-center">
                  <div className="mb-2"><FaBox className="w-16 h-16 mx-auto text-accent-gold" /></div>
                  <p>No image available</p>
                </div>
              )}
            </div>

            <div className="bg-primary-lightGray p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary-black mb-4">About</h3>
              <p className="text-neutral-darkGray leading-relaxed">
                {item.description || ITEM_DESCRIPTIONS[item.item_type]}
              </p>
            </div>
          </div>

          {/* Right side - Tiers and Selection */}
          <div>
            {/* Tiers */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-primary-black mb-6">Choose Your Tier</h3>

              {item.tiers && item.tiers.length > 0 ? (
                <div className="space-y-4">
                  {item.tiers.map(tier => (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedTier?.id === tier.id
                          ? 'border-accent-blue bg-accent-blue bg-opacity-5'
                          : 'border-primary-mediumGray hover:border-accent-blue'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-primary-black capitalize">
                            {tier.tier_name}
                          </h4>
                          {tier.description && (
                            <p className="text-neutral-gray text-sm mt-1">{tier.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent-blue">
                            ${tier.price}
                          </div>
                          {tier.stock <= 0 && (
                            <div className="text-red-500 text-xs mt-1">Out of Stock</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-neutral-gray">No tiers available</div>
              )}
            </div>

            {/* Quantity Selection */}
            {selectedTier && selectedTier.stock > 0 && (
              <div className="mb-8 bg-primary-lightGray p-6 rounded-lg">
                <label className="block text-neutral-darkGray font-semibold mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-4 py-2 border border-primary-mediumGray rounded hover:bg-primary-mediumGray transition flex items-center justify-center"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedTier.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border border-primary-mediumGray rounded text-center"
                  />
                  <button
                    onClick={() => quantity < selectedTier.stock && setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-primary-mediumGray rounded hover:bg-primary-mediumGray transition flex items-center justify-center"
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-neutral-gray text-sm mt-2">Available: {selectedTier.stock}</p>
              </div>
            )}

            {/* Price Summary */}
            <div className="bg-primary-mediumGray p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-darkGray">Subtotal:</span>
                <span className="text-primary-black font-semibold">${selectedTier?.price || 0}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-darkGray">Quantity:</span>
                <span className="text-primary-black font-semibold">{quantity}</span>
              </div>
              <div className="border-t border-primary-lightGray pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-primary-black">Total:</span>
                <span className="text-3xl font-bold text-accent-blue">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            {selectedTier && selectedTier.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 bg-accent-blue text-white font-semibold rounded-lg hover:bg-accent-blueDark transition"
              >
                Add to Cart
              </button>
            ) : (
              <button
                disabled
                className="w-full px-6 py-3 bg-neutral-lightGray text-neutral-gray font-semibold rounded-lg cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}

            {/* Share Button */}
            <button className="w-full mt-3 px-6 py-3 border border-primary-mediumGray text-primary-black font-semibold rounded-lg hover:bg-primary-lightGray transition">
              Share This Item
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-lightGray p-6 rounded-lg text-center">
            <div className="mb-2"><FaGift className="w-8 h-8 mx-auto text-accent-blue" /></div>
            <h4 className="font-semibold text-primary-black mb-2">Premium Quality</h4>
            <p className="text-neutral-gray text-sm">Authentic items from verified celebrities</p>
          </div>
          <div className="bg-primary-lightGray p-6 rounded-lg text-center">
            <div className="mb-2"><FaTruck className="w-8 h-8 mx-auto text-accent-blue" /></div>
            <h4 className="font-semibold text-primary-black mb-2">Fast Delivery</h4>
            <p className="text-neutral-gray text-sm">Secure shipping to your location</p>
          </div>
          <div className="bg-primary-lightGray p-6 rounded-lg text-center">
            <div className="mb-2"><FaLock className="w-8 h-8 mx-auto text-accent-blue" /></div>
            <h4 className="font-semibold text-primary-black mb-2">Secure Payment</h4>
            <p className="text-neutral-gray text-sm">Safe checkout with encrypted payment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailPage
