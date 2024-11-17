import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#e82228] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm text-gray-200">
              MyBrand is committed to delivering top-notch services with a focus on customer satisfaction and
              innovation. Follow us to stay updated.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@mybrand.com</li>
              <li>Address: 123 Innovation Lane, Tech City</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-600 flex items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56c-.88.39-1.83.65-2.83.77a4.93 4.93 0 0 0 2.15-2.72 9.72 9.72 0 0 1-3.13 1.2A4.92 4.92 0 0 0 16.84 3c-2.72 0-4.92 2.21-4.92 4.92 0 .39.04.77.12 1.13C7.69 8.84 4.07 6.99 1.64 3.9a4.92 4.92 0 0 0-.66 2.48c0 1.71.87 3.21 2.2 4.09a4.9 4.9 0 0 1-2.23-.61v.06c0 2.39 1.7 4.39 3.95 4.83a4.92 4.92 0 0 1-2.22.08 4.92 4.92 0 0 0 4.6 3.42A9.86 9.86 0 0 1 1.16 19a13.92 13.92 0 0 0 7.55 2.22c9.05 0 14-7.5 14-14v-.64c.96-.7 1.8-1.58 2.47-2.57z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-600 flex items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 2.24c-.82.36-1.7.6-2.63.71A4.48 4.48 0 0 0 21.38 1c-.85.5-1.79.86-2.79 1.05A4.48 4.48 0 0 0 11.1 5.92c0 .35.04.69.1 1.02a12.76 12.76 0 0 1-9.25-4.7 4.49 4.49 0 0 0-.61 2.24c0 1.55.79 2.93 1.99 3.74-.74-.02-1.43-.23-2.04-.56v.06c0 2.17 1.54 3.97 3.59 4.37-.38.1-.78.15-1.19.15-.29 0-.57-.03-.85-.08.58 1.8 2.23 3.12 4.2 3.15a9.02 9.02 0 0 1-5.58 1.93c-.36 0-.72-.02-1.07-.06a12.74 12.74 0 0 0 6.89 2.03c8.27 0 12.8-6.85 12.8-12.8 0-.2 0-.41-.01-.62.88-.63 1.64-1.42 2.25-2.33z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
