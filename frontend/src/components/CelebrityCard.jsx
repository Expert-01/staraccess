import { useState } from 'react'
import { FaFilm, FaMicrophone, FaMusic, FaFootball, FaVideo, FaFilmStrip, FaStar, FaSparkles, FaCalendar } from 'react-icons/fa'

function CelebrityCard({ celebrity, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Construct image URL - use public folder for local files, keep online URLs as-is
  const getImageUrl = () => {
    if (!celebrity.image) return null
    // If image is a full URL (starts with http), return as-is
    if (celebrity.image.startsWith('http://') || celebrity.image.startsWith('https://')) {
      return celebrity.image  
    }
    // For local files, serve from public/uploads/celebrities folder
    return `/uploads/celebrities/${celebrity.image}`
  }

  // Generate aesthetic gradient backgrounds based on index
  const gradients = [
    'from-primary-charcoal to-primary-darkBg',
    'from-primary-darkGray to-primary-charcoal',
    'from-accent-gold/10 to-accent-bronze/5',
    'from-primary-charcoal via-accent-gold/5 to-primary-darkBg',
    'from-accent-bronze/10 to-accent-gold/5',
    'from-primary-darkGray to-primary-darkerBg',
    'from-accent-gold/5 to-primary-charcoal',
    'from-primary-charcoal to-accent-bronze/10',
    'from-accent-gold/15 to-primary-darkBg',
    'from-primary-darkGray via-accent-gold/5 to-primary-darkBg',
  ]

  const gradient = gradients[index % gradients.length]

  // Category icons
  const getCategoryIcon = (category) => {
    const icons = {
      'Actor': <FaFilm className="w-4 h-4" />,
      'Performer': <FaMicrophone className="w-4 h-4" />,
      'Musician': <FaMusic className="w-4 h-4" />,
      'Athlete': <FaFootball className="w-4 h-4" />,
      'Director': <FaVideo className="w-4 h-4" />,
      'Producer': <FaFilmStrip className="w-4 h-4" />,
      'Other': <FaStar className="w-4 h-4" />
    }
    return icons[category] || icons['Other']
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      {/* Card Container */}
      <div className="bg-primary-charcoal rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-accent-gold/20 transition-all duration-300 border border-accent-gold/10">
        
        {/* Image Container */}
        <div className={`relative aspect-square bg-gradient-to-br ${gradient} overflow-hidden`}>
          {/* Actual Image or Placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            {celebrity.image ? (
              <img
                src={getImageUrl()}
                alt={celebrity.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-accent-gold/60 bg-gradient-to-br from-primary-charcoal via-primary-darkBg to-primary-charcoal">
                <div className="mb-4"><FaSparkles className="w-16 h-16" /></div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold mb-2 text-accent-gold">{celebrity.name.split(' ')[0]}</div>
                  <div className="text-sm text-accent-gold/60">{celebrity.category}</div>
                </div>
              </div>
            )}
            {celebrity.image && (
              <div style={{ display: 'none' }} className="w-full h-full flex flex-col items-center justify-center text-accent-gold/60 bg-gradient-to-br from-primary-charcoal via-primary-darkBg to-primary-charcoal">
                <div className="mb-4"><FaSparkles className="w-16 h-16" /></div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold mb-2 text-accent-gold">{celebrity.name.split(' ')[0]}</div>
                  <div className="text-sm text-accent-gold/60">{celebrity.category}</div>
                </div>
              </div>
            )}
          </div>

          {/* Overlay on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-primary-darkBg/70 backdrop-blur-sm flex items-end p-4 animate-fadeIn">
              <div className="text-accent-gold">
                <div className="text-sm font-semibold opacity-90">{celebrity.response_time}</div>
                <div className="text-xs opacity-70">Response time</div>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-primary-darkBg/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-accent-gold/30">
            <span className="text-lg">{getCategoryIcon(celebrity.category)}</span>
            <span className="text-xs font-semibold text-accent-gold">{celebrity.category}</span>
          </div>

          {/* Followers Badge */}
          <div className="absolute top-3 left-3 bg-accent-gold/90 text-primary-darkBg px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            <FaStar className="w-3 h-3" /> {celebrity.followers}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Name */}
          <h3 className="text-lg font-bold text-accent-gold mb-1 line-clamp-1 group-hover:text-accent-goldLight transition-colors">
            {celebrity.name}
          </h3>

          {/* Bio */}
          <p className="text-xs text-accent-gold/60 mb-3 line-clamp-1">
            {celebrity.bio}
          </p>

          {/* Years Active */}
          <div className="text-xs text-accent-gold/50 mb-4 flex items-center gap-1">
            <FaCalendar className="w-3 h-3" /> {celebrity.years_active}
          </div>

          {/* Items Tags */}
          <div className="flex flex-wrap gap-2">
            {celebrity.items?.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="bg-primary-darkGray hover:bg-accent-gold hover:text-primary-darkBg text-accent-gold/80 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 border border-accent-gold/20"
              >
                {item.name}
              </span>
            ))}
            {celebrity.items?.length > 2 && (
              <span className="text-xs text-accent-gold/50">
                +{celebrity.items.length - 2} more
              </span>
            )}
          </div>

          {/* CTA Button */}
          <button
            className={`w-full mt-4 py-2 rounded-sm font-semibold text-sm transition-all duration-300 ${
              isHovered
                ? 'bg-accent-gold text-primary-darkBg shadow-lg shadow-accent-gold/20'
                : 'bg-primary-darkGray text-accent-gold hover:bg-accent-gold hover:text-primary-darkBg border border-accent-gold/20'
            }`}
          >
            {isHovered ? 'View Profile' : 'Explore'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CelebrityCard
