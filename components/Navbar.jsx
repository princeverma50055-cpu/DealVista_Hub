'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Navbar() {
  const [session, setSession] = useState(null)
  const [showLogin, setShowLogin] useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowLogin(false)
  }

  return (
    <nav className="bg-flipkart-primary sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-white font-bold text-xl">DealVista Hub</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-800 rounded px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div className="hidden md:flex items-center space-x-6 text-white">
            <Link href="#mobiles" className="hover:text-gray-200">Mobiles</Link>
            <Link href="#electronics" className="hover:text-gray-200">Electronics</Link>
            <Link href="#fashion" className="hover:text-gray-200">Fashion</Link>
            <Link href="#home" className="hover:text-gray-200">Home & Kitchen</Link>
            <Link href="#gaming" className="hover:text-gray-200">Gaming</Link>
            <Link href="#beauty" className="hover:text-gray-200">Beauty</Link>
          </div>

          {/* Login Button */}
          <div>
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{session.user.email}</span>
                {session.user.email === 'princeverma50055@gmail.com' && (
                  <Link href="/admin" className="bg-white text-flipkart-primary px-3 py-1 rounded font-semibold">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-white hover:text-gray-200">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-white text-flipkart-primary px-4 py-2 rounded font-semibold hover:bg-gray-100"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
