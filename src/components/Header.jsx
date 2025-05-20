'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, LogIn, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#f2f2f2] px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <Image
            src="/k-shop-logo.png"
            alt="K-SHOP Logo"
            width={200}
            height={80}
            priority
          />
        </Link>

        {/* desktop menu */}
        <nav className="hidden md:flex gap-6 font-semibold text-xl text-[#002AB3]">
          <Link
            href="/"
            className="hover:text-[#72B7F2] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/products/page/1"
            className="hover:text-[#72B7F2] transition-colors duration-200"
          >
            Products
          </Link>
        </nav>

        {/* mobile menu toggle */}
        <button
          className="md:hidden text-[#002AB3]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* icons */}
        <div className="hidden md:flex gap-4 items-center text-[#002AB3]">
          <Link
            href="/cart"
            className="hover:text-[#72B7F2] transition-colors duration-200"
          >
            <ShoppingCart size={26} />
          </Link>
          <Link
            href="/login"
            className="hover:text-[#72B7F2] transition-colors duration-200"
          >
            <LogIn size={26} />
          </Link>
        </div>
      </div>

      {/* mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-start gap-3 px-4 text-[#002AB3] text-lg font-semibold">
          <Link
            href="/"
            className="hover:text-[#72B7F2] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products/page/1"
            className="hover:text-[#72B7F2] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <div className="flex gap-4 mt-2">
            <Link
              href="/cart"
              className="hover:text-[#72B7F2] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={24} />
            </Link>
            <Link
              href="/login"
              className="hover:text-[#72B7F2] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={24} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
