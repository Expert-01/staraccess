import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CelebrityCard from '../components/CelebrityCard'

// Mock celebrities data
const MOCK_CELEBRITIES = [
  {
    id: 101,
    name: 'Leonardo DiCaprio',
    category: 'Actor',
    bio: 'Academy Award-winning actor and environmental activist',
    image: 'leonardo-dicaprio.jpg',
    followers: '2.5M',
    years_active: '1990-Present',
    response_time: '1-2 weeks',
    items: []
  },
  {
    id: 102,
    name: 'Taylor Swift',
    category: 'Musician',
    bio: 'Singer-songwriter with multiple Grammy Awards',
    image: 'markwahlberg.jpg',
    followers: '4.8M',
    years_active: '2004-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 103,
    name: 'Zendaya',
    category: 'Actor',
    bio: 'Multi-talented actress and fashion icon',
    image: 'zendaya.jpg',
    followers: '3.2M',
    years_active: '2009-Present',
    response_time: '1-2 weeks',
    items: []
  },
  {
    id: 104,
    name: 'The Weeknd',
    category: 'Musician',
    bio: 'Gramophone-nominated artist and producer',
    image: 'the-weeknd.jpg',
    followers: '3.8M',
    years_active: '2010-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 105,
    name: 'Timothée Chalamet',
    category: 'Actor',
    bio: 'Award-winning actor known for indie and Hollywood films',
    image: 'timothee-chalamet.jpg',
    followers: '1.9M',
    years_active: '2014-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 106,
    name: 'Dua Lipa',
    category: 'Musician',
    bio: 'Grammy Award-winning singer and songwriter',
    image: 'dua-lipa.jpg',
    followers: '2.1M',
    years_active: '2017-Present',
    response_time: '1-2 weeks',
    items: []
  },
  {
    id: 107,
    name: 'Margot Robbie',
    category: 'Actor',
    bio: 'Australian actress known for major film roles',
    image: 'margot-robbie.jpg',
    followers: '2.8M',
    years_active: '2008-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 108,
    name: 'Harry Styles',
    category: 'Musician',
    bio: 'Singer-songwriter and actor formerly of One Direction',
    image: 'harry-styles.jpg',
    followers: '3.5M',
    years_active: '2010-Present',
    response_time: '2-4 weeks',
    items: []
  },
  {
    id: 109,
    name: 'Euphoria Star',
    category: 'Actor',
    bio: 'Talented young actor breaking through in Hollywood',
    image: 'euphoria-star.jpg',
    followers: '1.5M',
    years_active: '2015-Present',
    response_time: '1-2 weeks',
    items: []
  },
  {
    id: 110,
    name: 'Rising DJ Star',
    category: 'Performer',
    bio: 'Award-winning DJ and music producer',
    image: 'rising-dj.jpg',
    followers: '2.2M',
    years_active: '2012-Present',
    response_time: '2-3 weeks',
    items: []
  }
]

function HomePage() {
  const navigate = useNavigate()
  const [celebrities, setCelebrities] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    // Fetch real data from API, fall back to mock celebrities
    const fetchCelebrities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/celebrities`)
        if (!response.ok) throw new Error('API not available')
        const data = await response.json()
        
        // If API returns data, use it; otherwise fall back to mock celebrities
        if (data && data.length > 0) {
          setCelebrities(data.slice(0, 10))
        } else {
          setCelebrities(MOCK_CELEBRITIES)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching celebrities, using mock data:', err)
        // Fall back to mock celebrities on API error
        setCelebrities(MOCK_CELEBRITIES)
        setLoading(false)
      }
    }
    
    fetchCelebrities()
  }, [])

  const handleCelebrityClick = (id) => {
    navigate(`/celebrity/${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-darkBg">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-64 bg-primary-charcoal rounded mx-auto"></div>
            <div className="h-6 w-96 bg-primary-charcoal rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-darkBg px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-accent-gold mb-4">Your Celebrity Feed</h1>
          <p className="text-accent-gold/70 text-lg">Discover and support your favorite celebrities</p>
        </div>

        {/* Masonry Grid - Pinterest Style */}
        {celebrities && celebrities.length > 0 ? (
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
              <div className="text-6xl">⭐</div>
              <p className="text-accent-gold/70 text-xl">No celebrities available</p>
              <p className="text-accent-gold/50 text-sm">Check back soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
