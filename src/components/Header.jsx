'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full bg-[#f2f2f2] px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/k-shop-logo.png"
            alt="K-SHOP Logo"
            width={200}
            height={80}
            priority
          />
        </Link>

        <nav className="hidden md:flex gap-6 font-semibold text-xl text-[#002AB3]">
          <Link href="/" className="hover:text-[#72B7F2] transition-colors duration-200">
            Home
          </Link>
          <Link href="/products/page/1" className="hover:text-[#72B7F2] transition-colors duration-200">
            Products
          </Link>
        </nav>

        <button
          className="md:hidden text-[#002AB3]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-4 items-center text-[#002AB3] relative">
          <Link href="/cart" className="relative hover:text-[#72B7F2] transition-colors duration-200">
            <ShoppingCart size={26} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/profile" className="hover:text-[#72B7F2] transition-colors duration-200">
                <User size={26} />
              </Link>
              <button
                onClick={logout}
                className="hover:text-[#72B7F2] transition-colors duration-200"
              >
                <LogOut size={26} />
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-[#72B7F2] transition-colors duration-200">
              <LogIn size={26} />
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-start gap-3 px-4 text-[#002AB3] text-lg font-semibold">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#72B7F2] transition-colors duration-200">
            Home
          </Link>
          <Link href="/products/page/1" onClick={() => setIsOpen(false)} className="hover:text-[#72B7F2] transition-colors duration-200">
            Products
          </Link>
          <div className="flex gap-4 mt-2 relative">
            <Link href="/cart" onClick={() => setIsOpen(false)} className="relative hover:text-[#72B7F2] transition-colors duration-200">
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="hover:text-[#72B7F2] transition-colors duration-200">
                  <User size={24} />
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="hover:text-[#72B7F2] transition-colors duration-200"
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-[#72B7F2] transition-colors duration-200">
                <LogIn size={24} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
