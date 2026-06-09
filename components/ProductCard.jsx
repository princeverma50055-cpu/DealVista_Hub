import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square w-full bg-gray-100">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#2874f0]">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">{product.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
        {product.price ? <p className="mt-2 font-bold text-green-600">₹{product.price}</p> : null}
        <a
          href={product.affiliate_link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full rounded-lg bg-[#2874f0] px-4 py-2 text-center font-semibold text-white hover:bg-blue-700"
        >
          BUY NOW
        </a>
      </div>
    </div>
  )
}
