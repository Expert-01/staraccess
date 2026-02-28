import { useState, useEffect } from 'react'

function ItemCard({ item, onAdd }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white border border-primary-mediumGray rounded-lg p-6 shadow">
      <div className="aspect-square bg-primary-lightGray mb-4 rounded flex items-center justify-center">
        <img 
          src={item.image || '/placeholder.jpg'} 
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <h3 className="text-lg font-bold text-black mb-2">{item.name}</h3>
      <p className="text-neutral-gray text-sm mb-4">{item.description}</p>
      <p className="text-2xl font-bold text-black mb-4">${item.price.toFixed(2)}</p>
      
      <div className="flex items-center gap-4">
        <input 
          type="number" 
          min="1" 
          max={item.stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="border border-primary-mediumGray rounded px-3 py-2 w-20 text-black"
        />
        <button
          onClick={() => onAdd(item, quantity)}
          className="flex-1 bg-accent-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ItemCard
