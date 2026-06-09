import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'DealVista Hub - Best Deals & Affiliate Products',
  description: 'Discover the best deals on mobiles, electronics, fashion, and more. Affiliate marketing platform withexclusive offers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="bg-f1f3f6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
