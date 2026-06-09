import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import BlogCard from '@/components/BlogCard'

export default async function HomePage() {
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })
  const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <section className="rounded-2xl bg-[#2874f0] p-6 text-white">
        <h1 className="text-3xl font-bold">Welcome to DealVista Hub</h1>
        <p className="mt-2 max-w-2xl text-white/90">
          Discover top affiliate deals, trending products, and SEO-friendly blogs built for traffic and conversions.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Trending Blogs</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      </section>
    </div>
  )
}
