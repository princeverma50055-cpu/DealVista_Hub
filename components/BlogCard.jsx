import Link from 'next/link'

export default function BlogCard({ blog }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <Link href={`/blog/${blog.slug}`}>
        <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
      </Link>
      <p className="mt-2 line-clamp-3 text-sm text-gray-600">{blog.content}</p>
      <Link href={`/blog/${blog.slug}`} className="mt-4 inline-block text-sm font-semibold text-[#2874f0]">
        Read more
      </Link>
    </div>
  )
}
