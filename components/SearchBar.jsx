'use client'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#2874f0]"
      />
    </div>
  )
}
