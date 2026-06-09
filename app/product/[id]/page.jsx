import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default async function ProductPage({ params }) {
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single()
  const { data: related } = await supabase
    .from('products')
    .select('*')
    .eq('category', product?.category || '')
    .neq('id', params.id)
    .limit(4)

  if (!product) return <div className="mx-auto max-w-4xl px-4 py-10">Product not found.</div>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <img src={product.image} alt={product.title} className="w-full rounded-2xl bg-white object-cover shadow-sm" />
        <div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#2874f0]">{product.category}</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>
          {product.price ? <p className="mt-4 text-2xl font-bold text-green-600">₹{product.price}</p> : null}
          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-lg bg-[#2874f0] px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            BUY NOW
          </a>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related?.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
