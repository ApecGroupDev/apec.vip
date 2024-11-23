import React from "react";

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center py-40 px-8 rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Our Expert Services
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-4xl mx-auto">
          At APEC, we’re not just offering services — we’re driving the future of the petroleum industry. From modern installations to innovative marketing solutions, our goal is to empower businesses to excel.
        </p>
        <button className="bg-[#e82228] text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105">
          Get in Touch
        </button>
      </header>

      {/* Services Section with Hover Animations */}
      <section>
        <h2 className="text-5xl font-extrabold text-center text-[#e82228] mb-16">Our Expertise in Action</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">

          {/* Service 1: Imaging & Canopies */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-image"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Imaging & Canopies</h3>
            <p className="text-lg text-gray-700 mb-6">
              Enhance your brand presence with stunning imaging and canopies designed to leave a powerful, lasting impression.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Service 2: Environmental Compliance */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-leaf"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Environmental Compliance</h3>
            <p className="text-lg text-gray-700 mb-6">
              Stay compliant and sustainable with our expert environmental solutions tailored to your business needs.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Discover More
            </button>
          </div>

          {/* Service 3: C-Store Renovations */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-building"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">C-Store Renovations</h3>
            <p className="text-lg text-gray-700 mb-6">
              Maximize your store’s potential with innovative renovations that boost customer engagement and drive sales.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* Service 4: EV Charging Solutions */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-plug"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">EV Charging Solutions</h3>
            <p className="text-lg text-gray-700 mb-6">
              Be part of the electric revolution with cutting-edge EV charging infrastructure that caters to the growing demand.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Explore Solutions
            </button>
          </div>

          {/* Service 5: Remote Site Monitoring */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-eye"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Remote Site Monitoring</h3>
            <p className="text-lg text-gray-700 mb-6">
              Stay in control, no matter where you are. Our remote site monitoring services keep you connected and efficient.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Service 6: Digital Marketing */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Digital Marketing</h3>
            <p className="text-lg text-gray-700 mb-6">
              Amplify your reach and engage your audience with our powerful digital marketing strategies tailored for success.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Start Today
            </button>
          </div>

          {/* Service 7: Flexible Financing */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-credit-card"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Flexible Financing</h3>
            <p className="text-lg text-gray-700 mb-6">
              Get the financial backing you need with our flexible financing options designed to support your business growth.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-800 transition-all duration-300">
              Apply Now
            </button>
          </div>

          {/* Service 8: Custom Equipment Fabrication */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Equipment Fabrication</h3>
            <p className="text-lg text-gray-700 mb-6">
              Get specialized equipment tailored to your business needs, built to last, secured quality and optimize performance.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Service 9: Fuel Management Systems */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div className="text-[#e82228] text-6xl mb-4">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">Fuel Management Systems</h3>
            <p className="text-lg text-gray-700 mb-6">
              Maximize efficiency and track fuel usage with our cutting-edge fuel management systems.
            </p>
            <button className="bg-[#e82228] text-white py-2 px-6 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all duration-300">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center py-20 px-8 rounded-lg shadow-xl">
        <h2 className="text-5xl font-bold mb-6">Ready to Drive the Future?</h2>
        <p className="text-lg mb-10 max-w-4xl mx-auto">
          Partner with us to revolutionize your business with cutting-edge services designed for success. Let APEC help you drive innovation and growth today!
        </p>
        <button className="bg-[#e82228] py-4 px-12 rounded-lg font-medium text-lg shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105">
          Contact Us Now
        </button>
      </section>
    </div>
  );
}
