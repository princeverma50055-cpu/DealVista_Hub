import { supabase } from '@/lib/supabase'

export default async function BlogDetailPage({ params }) {
  const { data: blog } = await supabase.from('blogs').select('*').eq('slug', params.slug).single()

  if (!blog) return <div className="mx-auto max-w-4xl px-4 py-10">Blog not found.</div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
      <div className="prose mt-6 max-w-none text-gray-700">
        <p>{blog.content}</p>
      </div>
    </div>
  )
}
