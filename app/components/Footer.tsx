export default function Footer() {
  return (
    <footer className="bg-brand-wash">
      <div className="site-container py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} AISCI · AI Safety Collective at Irvine
      </div>
    </footer>
  )
}
