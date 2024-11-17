import Link from 'next/link';

export default function Header() {
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
            <div className="relative group">
              <button className="text-gray-800 hover:text-[#e82228] text-lg transition focus:outline-none">
                Services
              </button>
              <div className="absolute left-0 hidden group-hover:block mt-3 w-56 bg-white shadow-lg rounded-md border border-gray-100">
                <Link
                  href="/services/web-design"
                  className="block px-5 py-3 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Web Design
                </Link>
                <Link
                  href="/services/seo"
                  className="block px-5 py-3 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  SEO
                </Link>
                <Link
                  href="/services/marketing"
                  className="block px-5 py-3 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Marketing
                </Link>
              </div>
            </div>
            <Link href="/contact" className="text-gray-800 hover:text-[#e82228] text-lg transition">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent px-4 py-2 text-sm text-gray-600 focus:outline-none"
              />
              <button className="px-4 py-2 text-sm text-white bg-[#e82228] rounded-r-lg hover:bg-red-600 transition">
                Search
              </button>
            </div>
            <Link
              href="/signup"
              className="bg-[#e82228] text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
      <div className="lg:hidden">
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
