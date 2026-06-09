'use client'

const categories = ['All', 'Mobiles', 'Electronics', 'Fashion', 'Home & Kitchen', 'Gaming', 'Beauty']

export default function CategoryRow({ active, setActive }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
            active === cat ? 'bg-[#2874f0] text-white' : 'bg-white text-gray-700'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
