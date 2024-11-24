'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 relative">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gray-700 via-gray-450 to-gray-200 z-10"></div>
      <div className="absolute inset-x-0 bottom-1 h-1 bg-[#e82228] z-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-extrabold tracking-wide">
              <span className="text-[#e82228]">APEC </span>
              <span className="text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 px-2 py-1 rounded-md hover:shadow-[0_0_10px_rgba(255,223,0,0.7),0_0_20px_rgba(255,223,0,0.5)] hover:scale-110 transition duration-300">
                VIP
              </span>

            </Link>
          </div>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-lg font-medium transition ${pathname === href
                  ? 'text-[#e82228]'
                  : 'text-gray-800 hover:text-[#e82228]'
                  }`}
              >
                {label}
              </Link>
            ))}
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

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="bg-white h-full p-6">
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="text-gray-800 focus:outline-none mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block text-lg font-medium ${pathname === href
                  ? 'text-[#e82228]'
                  : 'text-gray-700 hover:text-[#e82228]'
                  }`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
