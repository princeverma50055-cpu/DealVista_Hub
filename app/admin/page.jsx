'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const adminEmail = 'princeverma50055@gmail.com'

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [products, setProducts] = useState([])
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState({ title: '', description: '', image: '', affiliate_link: '', category: '', price: '' })
  const [blogForm, setBlogForm] = useState({ title: '', content: '', slug: '' })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    fetchData()
    return () => listener.subscription.unsubscribe()
  }, [])

  const fetchData = async () => {
    const { data: p } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    const { data: b } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    setProducts(p || [])
    setBlogs(b || [])
  }

  if (!session || session.user.email !== adminEmail) {
    return <div className="mx-auto max-w-4xl px-4 py-10">Access denied.</div>
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    await supabase.from('products').insert([form])
    setForm({ title: '', description: '', image: '', affiliate_link: '', category: '', price: '' })
    fetchData()
  }

  const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id)
    fetchData()
  }

  const saveBlog = async (e) => {
    e.preventDefault()
    await supabase.from('blogs').insert([blogForm])
    setBlogForm({ title: '', content: '', slug: '' })
    fetchData()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <form onSubmit={saveProduct} className="mt-4 grid gap-3 md:grid-cols-2">
          <input className="rounded border p-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
          <input className="rounded border p-2" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} />
          <input className="rounded border p-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
          <input className="rounded border p-2 md:col-span-2" placeholder="Image URL" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} />
          <input className="rounded border p-2 md:col-span-2" placeholder="Affiliate Link" value={form.affiliate_link} onChange={(e)=>setForm({...form,affiliate_link:e.target.value})} />
          <input className="rounded border p-2" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
          <button className="rounded bg-[#2874f0] px-4 py-2 font-semibold text-white">Save Product</button>
        </form>
      </section>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Add Blog</h2>
        <form onSubmit={saveBlog} className="mt-4 grid gap-3">
          <input className="rounded border p-2" placeholder="Title" value={blogForm.title} onChange={(e)=>setBlogForm({...blogForm,title:e.target.value})} />
          <input className="rounded border p-2" placeholder="Slug" value={blogForm.slug} onChange={(e)=>setBlogForm({...blogForm,slug:e.target.value})} />
          <textarea className="rounded border p-2" placeholder="Content" value={blogForm.content} onChange={(e)=>setBlogForm({...blogForm,content:e.target.value})} />
          <button className="rounded bg-[#2874f0] px-4 py-2 font-semibold text-white">Save Blog</button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold">{p.title}</p>
              <button onClick={() => deleteProduct(p.id)} className="mt-3 rounded bg-red-500 px-3 py-2 text-white">Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
