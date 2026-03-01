import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CelebrityCard from '../components/CelebrityCard'

// Mock celebrities data
const MOCK_CELEBRITIES = [
  {
    id: 101,
    name: 'Neil Diamond',
    category: 'Musician',
    bio: 'Legendary singer-songwriter known for iconic ballads',
    image: 'neildiamond.jpg',
    followers: '1.8M',
    years_active: '1966-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 102,
    name: 'Lainey Wilson',
    category: 'Musician',
    bio: 'Country music star with a powerful voice and presence',
    image: 'laineywilson.jpg',
    followers: '2.3M',
    years_active: '2005-Present',
    response_time: '1-2 weeks',
    items: []
  },
  {
    id: 103,
    name: 'Mary Padian',
    category: 'Actor',
    bio: 'TV personality and actress known for reality shows',
    image: 'marypadian.jpg',
    followers: '1.2M',
    years_active: '2010-Present',
    response_time: '2-4 weeks',
    items: []
  },
  {
    id: 104,
    name: 'Sandra Bullock',
    category: 'Actor',
    bio: 'Academy Award-winning actress with diverse filmography',
    image: 'sandrabullocks.jpg',
    followers: '2.9M',
    years_active: '1987-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 105,
    name: 'Mark Wahlberg',
    category: 'Actor',
    bio: 'Former rapper turned acclaimed actor and producer',
    image: 'markwahlberg.jpg',
    followers: '3.1M',
    years_active: '1992-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 106,
    name: 'Skeet Ulrich',
    category: 'Actor',
    bio: 'Talented actor known for horror and thriller roles',
    image: 'skeeetulrich.jpg',
    followers: '1.4M',
    years_active: '1991-Present',
    response_time: '1-2 weeks',
    items: []
  },
  {
    id: 107,
    name: 'Matthew Lillard',
    category: 'Actor',
    bio: 'Versatile actor with impressive range across genres',
    image: 'matthewlillard.jpg',
    followers: '1.6M',
    years_active: '1989-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 108,
    name: 'Ian Somerhalder',
    category: 'Actor',
    bio: 'Actor and environmental activist, known for TV roles',
    image: 'iansomerhalder.jpg',
    followers: '2.7M',
    years_active: '2003-Present',
    response_time: '2-4 weeks',
    items: []
  },
  {
    id: 109,
    name: 'Luke Perry',
    category: 'Actor',
    bio: 'Iconic actor remembered for beloved television roles',
    image: 'lukeperry.jpg',
    followers: '1.9M',
    years_active: '1987-2019',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 110,
    name: 'Zac Efron',
    category: 'Actor',
    bio: 'Pop star and actor known for musical and dramatic roles',
    image: 'zacefron.jpg',
    followers: '3.3M',
    years_active: '2003-Present',
    response_time: '2-3 weeks',
    items: []
  },
  {
    id: 111,
    name: 'Jay-Z',
    category: 'Musician',
    bio: 'Hip-hop mogul and business entrepreneur',
    image: 'jayz.jpg',
    followers: '3.8M',
    years_active: '1994-Present',
    response_time: '3-4 weeks',
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
