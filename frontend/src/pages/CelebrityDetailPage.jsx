import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ITEM_TYPE_LABELS, getItemIcon, ITEM_DESCRIPTIONS } from '../constants/itemTypes'

// Fixed items configuration with all 5 item types and pricing
const FIXED_ITEMS = [
  {
    id: 1,
    item_type: 'fan_card',
    description: 'Get your personalized fan card signed by your favorite celebrity',
    tiers: [
      { id: 1, tier_name: 'Bronze', price: 500 },
      { id: 2, tier_name: 'Silver', price: 750 },
      { id: 3, tier_name: 'Gold', price: 1000 },
      { id: 4, tier_name: 'Platinum', price: 1750 }
    ]
  },
  {
    id: 2,
    item_type: 'membership_card',
    description: 'Exclusive membership benefits and perks access.',
    tiers: [
      { id: 5, tier_name: 'Bronze', price: 500 },
      { id: 6, tier_name: 'Silver', price: 750 },
      { id: 7, tier_name: 'Gold', price: 1000 },
      { id: 8, tier_name: 'Platinum', price: 1750 }
    ]
  },
  {
    id: 3,
    item_type: 'vip_access',
    description: 'VIP event access and exclusive backstage experience.',
    tiers: [
      { id: 9, tier_name: 'Bronze', price: 500 },
      { id: 10, tier_name: 'Silver', price: 750 },
      { id: 11, tier_name: 'Gold', price: 1000 },
      { id: 12, tier_name: 'Platinum', price: 1750 }
    ]
  },
  {
    id: 4,
    item_type: 'meet_and_greet',
    description: 'Meet and greet with your favorite celebrity.',
    tiers: [
      { id: 13, tier_name: 'Bronze', price: 500 },
      { id: 14, tier_name: 'Silver', price: 750 },
      { id: 15, tier_name: 'Gold', price: 1000 },
      { id: 16, tier_name: 'Platinum', price: 1750 }
    ]
  },
  {
    id: 5,
    item_type: 'call_permit',
    description: 'One-on-one phone call with the celebrity (30 minutes).',
    tiers: [
      { id: 17, tier_name: 'Standard', price: 1000 }
    ]
  }
]

function CelebrityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [celebrity, setCelebrity] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Construct image URL - use public folder for local files, keep online URLs as-is
  const getImageUrl = (filename) => {
    if (!filename) return '/placeholder.jpg'
    // If filename is a full URL (starts with http), return as-is
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename
    }
    // For local files, serve from public/uploads/celebrities folder
    return `/uploads/celebrities/${filename}`
  }

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/celebrities/${id}`)
        const data = await response.json()
        console.log('[API] FULL Celebrity API Response:', data)
        // For now, ALWAYS use FIXED_ITEMS to test price display
        setCelebrity({ ...data, items: FIXED_ITEMS })
        setLoading(false)
      } catch (err) {
        console.error('Error fetching celebrity:', err)
        // Create a celebrity object with fixed items even if fetch fails
        setCelebrity({ 
          id, 
          name: 'Celebrity',
          category: 'Unknown',
          bio: '',
          items: FIXED_ITEMS 
        })
        setLoading(false)
      }
    }
    
    fetchCelebrity()
  }, [id])

  const handleItemClick = (itemId) => {
    navigate(`/celebrity/${id}/item/${itemId}`)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-neutral-gray">Loading...</div>
  }

  if (!celebrity) {
    return <div className="flex items-center justify-center min-h-screen text-neutral-gray">Celebrity not found</div>
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="aspect-square bg-primary-lightGray rounded-lg overflow-hidden mb-6 border border-primary-mediumGray">
              <img 
                src={getImageUrl(celebrity.image)}
                alt={celebrity.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold text-primary-black mb-4">{celebrity.name}</h1>
            <p className="text-xl text-neutral-gray mb-6">{celebrity.category}</p>
            <p className="text-neutral-darkGray mb-8 leading-relaxed">{celebrity.bio}</p>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary-black">About</h3>
              <ul className="space-y-2 text-neutral-darkGray">
                <li><strong>Followers:</strong> {celebrity.followers?.toLocaleString() || '0'}</li>
                <li><strong>Years Active:</strong> {celebrity.yearsActive || '20+ Years'}</li>
                <li><strong>Response Time:</strong> {celebrity.responseTime || '24-48 hours'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-primary-black mb-8">Available Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrity.items && celebrity.items.length > 0 ? (
              celebrity.items.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="bg-white border border-primary-mediumGray rounded-lg p-6 hover:shadow-lg hover:border-accent-blue transition cursor-pointer"
                >
                  {/* Item Icon */}
                  <div className="text-5xl mb-4">{getItemIcon(item.item_type)}</div>
                  
                  {/* Item Name */}
                  <h3 className="text-xl font-bold text-primary-black mb-2">
                    {ITEM_TYPE_LABELS[item.item_type]}
                  </h3>
                  
                  {/* Item Description  */}
                  <p className="text-neutral-gray text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Tier Badges */}
                  {item.tiers && item.tiers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-neutral-gray mb-2 font-semibold">Available Tiers:</p>
                      <div className="flex gap-2 flex-wrap">
                        {item.tiers.map(tier => (
                          <span
                            key={tier.id}
                            className="px-2 py-1 bg-primary-lightGray text-xs font-semibold text-primary-black rounded capitalize"
                          >
                            {tier.tier_name}
                            <div>
                            ${tier.price}
                            </div>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Price Range */}
                  <div className="pt-4 border-t border-primary-mediumGray">
                    {item.tiers && Array.isArray(item.tiers) && item.tiers.length > 1 ? (
                      <p className="text-accent-blue font-bold text-lg">
                        ${Math.min(...item.tiers.map(t => t.price || 0))} - ${Math.max(...item.tiers.map(t => t.price || 0))}
                      </p>
                    ) : item.tiers && Array.isArray(item.tiers) && item.tiers.length === 1 ? (
                      <p className="text-accent-blue font-bold text-lg">
                        ${item.tiers[0].price}
                      </p>
                    ) : item.item_type === 'call_permit' ? (
                      <p className="text-accent-blue font-bold text-lg">$1000</p>
                    ) : (
                      <p className="text-accent-blue font-bold text-lg">$500 - $1750</p>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <button className="w-full mt-4 px-4 py-2 bg-accent-blue text-white rounded font-semibold hover:bg-accent-blueDark transition">
                    View Details
                  </button>
                </div>
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
