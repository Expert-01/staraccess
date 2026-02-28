import { useState } from 'react'

function CelebrityCard({ celebrity, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate aesthetic gradient backgrounds based on index
  const gradients = [
    'from-slate-900 to-slate-700',
    'from-gray-800 to-gray-600',
    'from-neutral-900 to-neutral-700',
    'from-stone-800 to-stone-600',
    'from-zinc-900 to-zinc-700',
    'from-slate-800 to-slate-500',
    'from-gray-900 to-gray-600',
    'from-neutral-800 to-neutral-600',
    'from-stone-900 to-stone-700',
    'from-zinc-800 to-zinc-600',
  ]

  const gradient = gradients[index % gradients.length]

  // Category icons
  const getCategoryIcon = (category) => {
    const icons = {
      'Actor': '🎬',
      'Performer': '🎤',
      'Musician': '🎵',
      'Athlete': '⚽',
      'Director': '🎥',
      'Producer': '🎞️',
      'Other': '⭐'
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
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
        
        {/* Image Container */}
        <div className={`relative aspect-square bg-gradient-to-br ${gradient} overflow-hidden`}>
          {/* Placeholder Image */}
          <div className="w-full h-full flex items-center justify-center">
            {celebrity.image ? (
              <img
                src={celebrity.image}
                alt={celebrity.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                <div className="text-6xl mb-4">✨</div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold mb-2">{celebrity.name.split(' ')[0]}</div>
                  <div className="text-sm opacity-70">{celebrity.category}</div>
                </div>
              </div>
            )}
          </div>

          {/* Overlay on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end p-4 animate-fadeIn">
              <div className="text-white">
                <div className="text-sm font-semibold opacity-90">{celebrity.response_time}</div>
                <div className="text-xs opacity-70">Response time</div>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <span className="text-lg">{getCategoryIcon(celebrity.category)}</span>
            <span className="text-xs font-semibold text-black">{celebrity.category}</span>
          </div>

          {/* Followers Badge */}
          <div className="absolute top-3 left-3 bg-accent-blue text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            ⭐ {celebrity.followers}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Name */}
          <h3 className="text-lg font-bold text-black mb-1 line-clamp-1 group-hover:text-accent-blue transition-colors">
            {celebrity.name}
          </h3>

          {/* Bio */}
          <p className="text-xs text-neutral-lightGray mb-3 line-clamp-1">
            {celebrity.bio}
          </p>

          {/* Years Active */}
          <div className="text-xs text-neutral-gray mb-4 flex items-center gap-1">
            📅 {celebrity.years_active}
          </div>

          {/* Items Tags */}
          <div className="flex flex-wrap gap-2">
            {celebrity.items?.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="bg-primary-mediumGray hover:bg-accent-blue hover:text-white text-black px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200"
              >
                {item.name}
              </span>
            ))}
            {celebrity.items?.length > 2 && (
              <span className="text-xs text-neutral-lightGray">
                +{celebrity.items.length - 2} more
              </span>
            )}
          </div>

          {/* CTA Button */}
          <button
            className={`w-full mt-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              isHovered
                ? 'bg-black text-white shadow-lg'
                : 'bg-primary-mediumGray text-black hover:bg-primary-lightGray'
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
