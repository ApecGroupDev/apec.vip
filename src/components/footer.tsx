import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="text-black py-12 font-inter relative"
      style={{
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(245, 245, 245, 1) 80%, #ffffff 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Row 1: Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <img
              src="https://theapecgroup.com/wp-content/uploads/2022/12/APEC-Since1989.png"
              alt="APEC Logo"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105 max-w-[200px] h-auto"
            />
          </Link>
        </div>

        {/* Row 2: For More Information */}
        <div className="flex justify-center mb-6">
          <h3 className="text-xl lg:text-xl font-semibold text-gray-800 tracking-tight">For More Information</h3>
        </div>

        {/* Row 3: Contact Information */}
        <div className="flex justify-center mb-6">
          <p className="text-base lg:text-lg text-gray-600">
            855-444-APEC |{' '}
            <a
              href="mailto:sales@TheAPECgroup.com"
              className="text-[#e82228] hover:text-[#9c2e2b] transition-colors"
            >
              Sales@TheAPECgroup.com
            </a>
          </p>
        </div>

        {/* Row 4: Address */}
        <div className="flex justify-center mb-6">
          <p className="text-base lg:text-lg text-gray-600 text-center leading-relaxed">
            4732-E North Royal Atlanta Drive, Tucker, Georgia 30084 |{' '}
            505 Garden Oaks Boulevard, Houston, Texas 77018
          </p>
        </div>

        {/* Row 5: Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8 flex-wrap gap-4">
          <SocialIcon
            url="https://twitter.com"
            className="hover:bg-[#e82228] transition-transform transform hover:scale-105"
            target="_blank"
            style={{ height: 40, width: 40, borderRadius: 8 }}
            bgColor="#e82228"
          />
          <SocialIcon
            url="https://www.instagram.com"
            className="hover:bg-[#e82228] transition-transform transform hover:scale-105"
            target="_blank"
            style={{ height: 40, width: 40, borderRadius: 8 }}
            bgColor="#e82228"
          />
          <SocialIcon
            url="https://www.facebook.com"
            className="hover:bg-[#e82228] transition-transform transform hover:scale-105"
            target="_blank"
            style={{ height: 40, width: 40, borderRadius: 8 }}
            bgColor="#e82228"
          />
          <SocialIcon
            url="https://www.linkedin.com"
            className="hover:bg-[#e82228] transition-transform transform hover:scale-105"
            target="_blank"
            style={{ height: 40, width: 40, borderRadius: 8 }}
            bgColor="#e82228"
          />
        </div>

        {/* Row 6: Legal Information */}
        <div className="flex justify-center mb-6">
          <p className="text-sm lg:text-base text-gray-600">
            <Link href="/terms">
              <span className="hover:text-[#e82228] cursor-pointer transition-colors">Terms & Conditions</span>
            </Link>{' '}
            |{' '}
            <Link href="/privacy">
              <span className="hover:text-[#e82228] cursor-pointer transition-colors">Privacy Policy</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Copyright & Last Row Design */}
      <div className="w-full bg-gradient-to-r from-[#e82228] via-[#9c2e2b] to-[#720b0d] py-6 mt-12">
        <p className="text-lg lg:text-lg text-center text-gray-100 font-light">
          © 2023–2024 The APEC Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
