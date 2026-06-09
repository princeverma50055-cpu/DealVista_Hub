'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthModal({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('login')
  const [message, setMessage] = useState('')

  if (!open) return null

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMessage('Login successful.')
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Signup successful. Check your email if confirmation is enabled.')
      }
      onClose()
    } catch (err) {
      setMessage(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{mode === 'login' ? 'Login' : 'Signup'}</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium hover:bg-gray-50"
          disabled={loading}
        >
          Continue with Google
        </button>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-[#2874f0]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-[#2874f0]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#2874f0] px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}

        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="mt-4 text-sm text-[#2874f0]"
        >
          {mode === 'login' ? 'Need an account? Signup' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  )
}
