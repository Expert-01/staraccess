import { useState, useEffect } from 'react'

function PhotoFanCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Placeholder images - replace with actual celebrity photos
  const photos = [
    {
      id: 1,
      src: 'https://via.placeholder.com/400x500/333333/ffffff?text=Celebrity+1',
      alt: 'Celebrity 1',
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/400x500/333333/ffffff?text=Celebrity+2',
      alt: 'Celebrity 2',
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/400x500/333333/ffffff?text=Celebrity+3',
      alt: 'Celebrity 3',
    },
    {
      id: 4,
      src: 'https://via.placeholder.com/400x500/333333/ffffff?text=Celebrity+4',
      alt: 'Celebrity 4',
    },
    {
      id: 5,
      src: 'https://via.placeholder.com/400x500/333333/ffffff?text=Celebrity+5',
      alt: 'Celebrity 5',
    },
  ]

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [photos.length])

  const getPhotoIndex = (offset) => {
    return (currentIndex + offset + photos.length) % photos.length
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  // Responsive dimensions
  const cardWidth = isMobile ? 200 : 320 // w-48 vs w-80
  const cardHeight = isMobile ? 280 : 450 // h-[280px] vs h-[450px]
  const translateX = isMobile ? 110 : 180 // Responsive horizontal spacing
  const scale = isMobile ? 0.75 : 0.85 // Mobile cards scale down more
  const containerHeight = isMobile ? 400 : 600

  return (
    <div className="flex items-center justify-center py-8 md:py-20 px-3 md:px-6">
      <div className="relative w-full max-w-4xl" style={{ height: containerHeight }}>
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-accent-blue hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition duration-300 hidden md:flex"
          style={{
            width: isMobile ? '32px' : '48px',
            height: isMobile ? '32px' : '48px',
            marginLeft: isMobile ? '-50px' : '-70px',
          }}
          aria-label="Previous photo"
        >
          <span className={isMobile ? 'text-lg' : 'text-xl'}>‹</span>
        </button>

        {/* Carousel Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Left Card (rotated left) */}
          <div
            className="absolute bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden transition-all duration-500 border-2 md:border-4 border-gray-200"
            style={{
              width: cardWidth,
              height: cardHeight,
              transform: `translateX(-${translateX}px) rotateY(25deg) rotateZ(-15deg) scale(${scale})`,
              zIndex: 10,
              opacity: 0.8,
            }}
          >
            <img
              src={photos[getPhotoIndex(-1)].src}
              alt={photos[getPhotoIndex(-1)].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Card (front) */}
          <div
            className="absolute bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden transition-all duration-500 border-2 md:border-4 border-gray-200"
            style={{
              width: cardWidth,
              height: cardHeight,
              transform: `translateX(0) rotateY(0) rotateZ(0deg) scale(1)`,
              zIndex: 20,
            }}
          >
            <img
              src={photos[getPhotoIndex(0)].src}
              alt={photos[getPhotoIndex(0)].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Card (rotated right) */}
          <div
            className="absolute bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden transition-all duration-500 border-2 md:border-4 border-gray-200"
            style={{
              width: cardWidth,
              height: cardHeight,
              transform: `translateX(${translateX}px) rotateY(-25deg) rotateZ(15deg) scale(${scale})`,
              zIndex: 10,
              opacity: 0.8,
            }}
          >
            <img
              src={photos[getPhotoIndex(1)].src}
              alt={photos[getPhotoIndex(1)].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-accent-blue hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition duration-300 hidden md:flex"
          style={{
            width: isMobile ? '32px' : '48px',
            height: isMobile ? '32px' : '48px',
            marginRight: isMobile ? '-50px' : '-70px',
          }}
          aria-label="Next photo"
        >
          <span className={isMobile ? 'text-lg' : 'text-xl'}>›</span>
        </button>

        {/* Mobile Navigation Buttons */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3 md:hidden" style={{ marginTop: `${cardHeight + 20}px` }}>
          <button
            onClick={handlePrevious}
            className="bg-accent-blue hover:bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center transition duration-300"
            aria-label="Previous photo"
          >
            <span className="text-base">‹</span>
          </button>
          <button
            onClick={handleNext}
            className="bg-accent-blue hover:bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center transition duration-300"
            aria-label="Next photo"
          >
            <span className="text-base">›</span>
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute flex gap-1.5 md:gap-2" style={{ marginTop: `${containerHeight + 80}px` }}>
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-accent-blue'
                : 'bg-primary-mediumGray hover:bg-neutral-gray'
            }`}
            style={{
              height: isMobile ? '8px' : '12px',
              width: index === currentIndex ? (isMobile ? '20px' : '32px') : (isMobile ? '8px' : '12px'),
            }}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PhotoFanCarousel
