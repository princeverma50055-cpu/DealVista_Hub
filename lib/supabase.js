import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isAdmin = async (email) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'princeverma50055@gmail.com'
  return email === adminEmail
}
