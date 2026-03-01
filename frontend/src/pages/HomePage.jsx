import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CelebrityCard from '../components/CelebrityCard'

function HomePage() {
  const navigate = useNavigate()
  const [celebrities, setCelebrities] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    // Fetch real data from API
    const fetchCelebrities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/celebrities`)
        if (!response.ok) throw new Error('API not available')
        const data = await response.json()
        // Limit to 10 celebrities
        setCelebrities(data.slice(0, 10))
        setLoading(false)
      } catch (err) {
        console.error('Error fetching celebrities:', err)
        // Show empty state if API fails
        setCelebrities([])
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
              <div className="text-6xl">⭐</div>
              <p className="text-accent-gold/70 text-xl">No celebrities found yet</p>
              <p className="text-accent-gold/50 text-sm">Check back soon for updates</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
