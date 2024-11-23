'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-[#e82228] text-3xl font-extrabold tracking-wide">
              MyBrand
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-12">
            <Link href="/" className="text-gray-800 hover:text-[#e82228] text-lg transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-[#e82228] text-lg transition">
              About
            </Link>
            <Link href="/services" className="text-gray-800 hover:text-[#e82228] text-lg transition">
              Services
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-[#e82228] text-lg transition">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <nav className="px-4 pt-4 pb-6 space-y-2 bg-gray-50">
          <Link href="/" className="block text-gray-700 hover:text-[#e82228]">
            Home
          </Link>
          <Link href="/about" className="block text-gray-700 hover:text-[#e82228]">
            About
          </Link>
          <Link href="/services" className="block text-gray-700 hover:text-[#e82228]">
            Services
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:text-[#e82228]">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
