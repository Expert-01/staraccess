import { useState, useEffect } from 'react'

function AdminPage() {
  const [activeTab, setActiveTab] = useState('celebrities')
  const [celebrities, setCelebrities] = useState([])
  const [newCelebrity, setNewCelebrity] = useState({
    name: '',
    category: '',
    bio: '',
    image: ''
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/celebrities`)
        const data = await response.json()
        setCelebrities(data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    
    fetchData()
  }, [])

  const handleAddCelebrity = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/celebrities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newCelebrity)
      })

      if (response.ok) {
        const added = await response.json()
        setCelebrities([...celebrities, added])
        setNewCelebrity({ name: '', category: '', bio: '', image: '' })
        setPhotoPreview(null)
        alert('Celebrity added successfully!')
      }
    } catch (err) {
      alert('Error adding celebrity')
    }
  }

  const handleDeleteCelebrity = async (id) => {
    if (!window.confirm('Are you sure?')) return

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/celebrities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      setCelebrities(celebrities.filter(c => c._id !== id))
      alert('Celebrity deleted!')
    } catch (err) {
      alert('Error deleting celebrity')
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingPhoto(true)
    const formData = new FormData()
    formData.append('photo', file)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/celebrities/upload-photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        const photoUrl = `http://localhost:5001${data.path}`
        setNewCelebrity({ ...newCelebrity, image: photoUrl })
        setPhotoPreview(photoUrl)
        alert('Photo uploaded successfully!')
      } else {
        alert('Photo upload failed')
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Error uploading photo')
    } finally {
      setUploadingPhoto(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('celebrities')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'celebrities'
                ? 'bg-accent-blue text-white'
                : 'bg-primary-lightGray text-black hover:bg-primary-mediumGray'
            }`}
          >
            Celebrities
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'items'
                ? 'bg-accent-blue text-white'
                : 'bg-primary-lightGray text-black hover:bg-primary-mediumGray'
            }`}
          >
            Items
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-accent-blue text-white'
                : 'bg-primary-lightGray text-black hover:bg-primary-mediumGray'
            }`}
          >
            Orders
          </button>
        </div>

        {activeTab === 'celebrities' && (
          <div className="space-y-8">
            <div className="bg-primary-lightGray p-8 rounded-lg border border-primary-mediumGray">
              <h2 className="text-2xl font-bold text-black mb-6">Add New Celebrity</h2>
              <form onSubmit={handleAddCelebrity} className="space-y-4">
                <input
                  type="text"
                  placeholder="Celebrity Name"
                  value={newCelebrity.name}
                  onChange={(e) => setNewCelebrity({...newCelebrity, name: e.target.value})}
                  className="w-full border border-primary-mediumGray rounded px-4 py-2 text-black"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newCelebrity.category}
                  onChange={(e) => setNewCelebrity({...newCelebrity, category: e.target.value})}
                  className="w-full border border-primary-mediumGray rounded px-4 py-2 text-black"
                  required
                />
                <textarea
                  placeholder="Bio"
                  value={newCelebrity.bio}
                  onChange={(e) => setNewCelebrity({...newCelebrity, bio: e.target.value})}
                  className="w-full border border-primary-mediumGray rounded px-4 py-2 text-black"
                  rows="4"
                  required
                />
                
                <div className="border-2 border-dashed border-primary-mediumGray rounded p-4">
                  <p className="text-sm font-semibold text-black mb-3">Upload Celebrity Photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    className="w-full text-sm text-neutral-gray file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent-blue file:text-white hover:file:bg-blue-700"
                  />
                  {uploadingPhoto && <p className="text-sm text-neutral-gray mt-2">Uploading...</p>}
                </div>
                
                {photoPreview && (
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-black mb-2">Photo Preview</p>
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="max-h-48 rounded border border-primary-mediumGray"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!newCelebrity.name || !newCelebrity.category || !newCelebrity.bio}
                  className="w-full bg-accent-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:bg-neutral-gray disabled:cursor-not-allowed"
                >
                  Add Celebrity
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-6">Current Celebrities</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-lightGray">
                      <th className="border border-primary-mediumGray px-6 py-3 text-left font-semibold text-black">Name</th>
                      <th className="border border-primary-mediumGray px-6 py-3 text-left font-semibold text-black">Category</th>
                      <th className="border border-primary-mediumGray px-6 py-3 text-left font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {celebrities.map(celeb => (
                      <tr key={celeb.id} className="hover:bg-primary-mediumGray">
                        <td className="border border-primary-mediumGray px-6 py-3 text-black">{celeb.name}</td>
                        <td className="border border-primary-mediumGray px-6 py-3 text-black">{celeb.category}</td>
                        <td className="border border-primary-mediumGray px-6 py-3">
                          <button
                            onClick={() => handleDeleteCelebrity(celeb.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="p-8 bg-primary-lightGray rounded-lg border border-primary-mediumGray">
            <p className="text-neutral-gray">Items management coming soon...</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-8 bg-primary-lightGray rounded-lg border border-primary-mediumGray">
            <p className="text-neutral-gray">Orders management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
