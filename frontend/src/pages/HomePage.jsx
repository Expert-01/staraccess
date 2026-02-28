import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CelebrityCard from '../components/CelebrityCard'

function HomePage() {
  const navigate = useNavigate()
  const [celebrities, setCelebrities] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock celebrity data for demonstration
  const mockCelebrities = [
    {
      id: 1,
      name: 'Mark Wahlberg',
      category: 'Actor',
      bio: 'Hollywood Action Star',
      image: null,
      followers: '15.2M',
      years_active: '1989-present',
      response_time: '24 hours',
      items: [
        { name: 'Meet & Greet' },
        { name: 'Signed Photo' },
        { name: 'VIP Access' }
      ]
    },
    {
      id: 2,
      name: 'Benedict Cumberbatch',
      category: 'Actor',
      bio: 'British Mystique',
      image: null,
      followers: '18.5M',
      years_active: '2001-present',
      response_time: '48 hours',
      items: [
        { name: 'Virtual Meet' },
        { name: 'Autographed Item' },
        { name: 'Fan Call' }
      ]
    },
    {
      id: 3,
      name: 'Timothée Chalamet',
      category: 'Actor',
      bio: 'Rising Star',
      image: null,
      followers: '12.8M',
      years_active: '2008-present',
      response_time: '72 hours',
      items: [
        { name: 'Photo Op' },
        { name: 'Fan Card' },
        { name: 'Call Permit' }
      ]
    },
    {
      id: 4,
      name: 'Ryan Gosling',
      category: 'Actor',
      bio: 'Modern Icon',
      image: null,
      followers: '20.1M',
      years_active: '2001-present',
      response_time: '24 hours',
      items: [
        { name: 'Meet & Greet' },
        { name: 'Private Session' },
        { name: 'VIP Access' }
      ]
    },
    {
      id: 5,
      name: 'Michael Shaw',
      category: 'Performer',
      bio: 'Talent & Class',
      image: null,
      followers: '8.9M',
      years_active: '2005-present',
      response_time: '48 hours',
      items: [
        { name: 'Meet & Greet' },
        { name: 'Signed Poster' },
        { name: 'Photo Album' }
      ]
    },
    {
      id: 6,
      name: 'Tom Hardy',
      category: 'Actor',
      bio: 'Intense & Versatile',
      image: null,
      followers: '14.3M',
      years_active: '2003-present',
      response_time: '72 hours',
      items: [
        { name: 'Virtual Meet' },
        { name: 'Fan Card' },
        { name: 'Exclusive Chat' }
      ]
    },
    {
      id: 7,
      name: 'Oscar Isaac',
      category: 'Actor',
      bio: 'Multi-talented Star',
      image: null,
      followers: '11.2M',
      years_active: '2002-present',
      response_time: '48 hours',
      items: [
        { name: 'Meet & Greet' },
        { name: 'Signed Photo' },
        { name: 'Personal Note' }
      ]
    },
    {
      id: 8,
      name: 'Jake Gyllenhaal',
      category: 'Actor',
      bio: 'Dedicated Performer',
      image: null,
      followers: '16.7M',
      years_active: '2000-present',
      response_time: '24 hours',
      items: [
        { name: 'VIP Experience' },
        { name: 'Phone Call' },
        { name: 'Fan Card' }
      ]
    },
    {
      id: 9,
      name: 'Michael B. Jordan',
      category: 'Actor',
      bio: 'Charismatic Force',
      image: null,
      followers: '19.4M',
      years_active: '2006-present',
      response_time: '72 hours',
      items: [
        { name: 'Meet & Greet' },
        { name: 'Exclusive Video' },
        { name: 'VIP Access' }
      ]
    },
    {
      id: 10,
      name: 'Ansel Elgort',
      category: 'Actor',
      bio: 'Young Talent',
      image: null,
      followers: '9.6M',
      years_active: '2013-present',
      response_time: '48 hours',
      items: [
        { name: 'Meet & Greet' },
        { name: 'Signed Photo' },
        { name: 'Fan Card' }
      ]
    }
  ]

  useEffect(() => {
    // Show mock data immediately
    setCelebrities(mockCelebrities)
    setLoading(false)
    
    // Try to fetch real data from API
    const fetchCelebrities = async () => {
      try {
        const response = await fetch('/api/celebrities')
        if (!response.ok) throw new Error('API not available')
        const data = await response.json()
        // Limit to 10 celebrities - only update if we have real data
        if (Array.isArray(data) && data.length > 0) {
          setCelebrities(data.slice(0, 10))
        }
        // If API returns empty array, keep mock data
      } catch (err) {
        console.log('Using mock data:', err.message)
        // Keep mock data if API fails
      }
    }
    
    // Wait a bit before trying to fetch real data
    setTimeout(() => fetchCelebrities(), 500)
  }, [])

  const handleCelebrityClick = (id) => {
    navigate(`/celebrity/${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-64 bg-primary-mediumGray rounded mx-auto"></div>
            <div className="h-6 w-96 bg-primary-mediumGray rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Your Celebrity Feed</h1>
          <p className="text-neutral-lightGray text-lg">Discover and support your favorite celebrities</p>
        </div>

        {/* Masonry Grid - Pinterest Style */}
        {celebrities.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {celebrities.map((celebrity, index) => (
              <div key={celebrity.id} className="break-inside-avoid">
                <CelebrityCard
                  celebrity={celebrity}
                  onClick={() => handleCelebrityClick(celebrity.id)}
                  index={index}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="space-y-4">
              <div className="text-6xl">🌟</div>
              <p className="text-neutral-lightGray text-xl">No celebrities found yet</p>
              <p className="text-neutral-gray text-sm">Check back soon for updates</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
