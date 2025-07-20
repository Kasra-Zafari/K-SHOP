export default function Footer() {
  return (
    <footer className="bg-[#002AB3] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-bold text-lg">K-SHOP</h2>
          <p className="text-sm text-[#B0C5FF]">© 2025 K-SHOP. All rights reserved.</p>
        </div>

        <nav className="flex gap-6 text-sm">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/products" className="hover:underline">
            Products
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </nav>

        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-[#72B7F2]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14.86A4.48 4.48 0 0022.4.36a9.2 9.2 0 01-2.9 1.11A4.52 4.52 0 0016.6 0a4.49 4.49 0 00-4.49 4.49c0 .35.04.69.11 1.02A12.8 12.8 0 013 1.64a4.48 4.48 0 001.39 6.01 4.43 4.43 0 01-2.04-.56v.06a4.49 4.49 0 003.6 4.4 4.49 4.49 0 01-2.03.08 4.5 4.5 0 004.2 3.12 9 9 0 01-5.5 1.9 9 9 0 01-1.07-.06 12.8 12.8 0 006.93 2.03c8.31 0 12.86-6.89 12.86-12.86 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[#72B7F2]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.4v-2.88h2.4v-2.2c0-2.37 1.41-3.69 3.57-3.69 1.04 0 2.13.18 2.13.18v2.35h-1.2c-1.18 0-1.54.73-1.54 1.48v1.88h2.62l-.42 2.88h-2.2v6.99A10 10 0 0022 12z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[#72B7F2]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37a4 4 0 11-7.99 0 4 4 0 017.99 0z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}