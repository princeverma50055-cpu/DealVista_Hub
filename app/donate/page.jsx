export default function DonatePage() {
  const upiLink = 'upi://pay?pa=princeverma8753-1@oksbi&pn=DealVista%20Hub&cu=INR'

  return (
    <div className="mx-auto max-w-xl px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Support DealVista Hub</h1>
      <p className="mt-3 text-gray-600">Make a direct UPI donation using PhonePe, Google Pay, or Paytm.</p>
      <a
        href={upiLink}
        className="mt-8 inline-block rounded-lg bg-[#2874f0] px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Donate Now via UPI
      </a>
    </div>
  )
}
