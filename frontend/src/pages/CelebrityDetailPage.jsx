import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard'

function CelebrityDetailPage() {
  const { id } = useParams()
  const [celebrity, setCelebrity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const response = await fetch(`/api/celebrities/${id}`)
        const data = await response.json()
        setCelebrity(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching celebrity:', err)
        setLoading(false)
      }
    }
    
    fetchCelebrity()
  }, [id])

  const handleAddToCart = (item, quantity) => {
    const cartItem = {
      ...item,
      quantity,
      cartId: Date.now()
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart))
    
    alert('Added to cart!')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!celebrity) {
    return <div className="flex items-center justify-center min-h-screen">Celebrity not found</div>
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="aspect-square bg-primary-lightGray rounded-lg overflow-hidden mb-6 border border-primary-mediumGray">
              <img 
                src={celebrity.image || '/placeholder.jpg'}
                alt={celebrity.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold text-black mb-4">{celebrity.name}</h1>
            <p className="text-xl text-neutral-gray mb-6">{celebrity.category}</p>
            <p className="text-neutral-darkGray mb-8 leading-relaxed">{celebrity.bio}</p>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-black">About</h3>
              <ul className="space-y-2 text-neutral-darkGray">
                <li><strong>Followers:</strong> {celebrity.followers?.toLocaleString() || '0'}</li>
                <li><strong>Years Active:</strong> {celebrity.yearsActive || 'N/A'}</li>
                <li><strong>Response Time:</strong> {celebrity.responseTime || 'Variable'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-black mb-8">Available Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrity.items && celebrity.items.length > 0 ? (
              celebrity.items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onAdd={handleAddToCart}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-gray text-lg">No items available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CelebrityDetailPage
