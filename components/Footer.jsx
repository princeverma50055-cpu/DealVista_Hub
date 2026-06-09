export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} DealVista Hub. All rights reserved.</p>
        <p className="mt-2">Affiliate deals, blogs, and trusted recommendations.</p>
      </div>
    </footer>
  )
}
