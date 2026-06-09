import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  const isAdmin = path.startsWith('/admin')

  if (isAdmin) {
    const adminEmail = request.cookies.get('admin_email')?.value
    if (adminEmail !== 'princeverma50055@gmail.com') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
