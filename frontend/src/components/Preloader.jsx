import './Preloader.css'

function Preloader() {
  return (
    <div className="preloader-overlay">
      <div className="preloader-container">
        <div className="preloader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="preloader-text">Loading...</p>
      </div>
    </div>
  )
}

export default Preloader
