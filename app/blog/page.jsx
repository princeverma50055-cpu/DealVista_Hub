import { supabase } from '@/lib/supabase'
import BlogCard from '@/components/BlogCard'

export default async function BlogPage() {
  const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <p className="mt-2 text-gray-600">SEO-focused articles to drive organic affiliate traffic.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}
