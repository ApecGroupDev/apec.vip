import React from "react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center py-40 px-8 rounded-xl shadow-xl overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Discover APEC: Shaping the Future of Petroleum
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto">
          Empowering industries with cutting-edge solutions since 1989. Innovation, excellence, and sustainability at the core of everything we do.
        </p>
        <button className="bg-[#e82228] text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105">
          Explore Our Services
        </button>
      </header>

      {/* History Section */}
      <section className="space-y-12">
        <h2 className="text-4xl font-bold text-center text-black">Our Legacy</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              Founded in 1989 as **Atlanta Petroleum Equipment Company**, we have grown from a small service operation into a leading provider of comprehensive petroleum solutions, including equipment installation, repair, and full operational support.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              With offices in **Atlanta, Georgia** and **Houston, Texas**, we’re proud to serve clients across the United States, delivering innovative solutions tailored to meet the evolving needs of the petroleum industry.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://via.placeholder.com/500x300" // Replace with real image
              alt="APEC team"
              className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="text-center space-y-20">
        <h2 className="text-4xl font-bold text-black">Our Commitment to Excellence</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Mission",
              icon: (
                <div className="w-16 h-16 mx-auto bg-[#e82228] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  M
                </div>
              ),
              description:
                "To deliver high-quality, innovative solutions that help our clients excel in an ever-competitive market.",
            },
            {
              title: "Vision",
              icon: (
                <div className="w-16 h-16 mx-auto bg-[#e82228] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  V
                </div>
              ),
              description:
                "To lead the petroleum industry by setting new standards of innovation, safety, and sustainability.",
            },
            {
              title: "Values",
              icon: (
                <div className="w-16 h-16 mx-auto bg-[#e82228] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  VL
                </div>
              ),
              description:
                "Integrity, customer-first approach, continuous innovation, and relentless pursuit of excellence.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-black mb-12">Our Expertise</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-700 mb-6">
              At APEC, we’re not just offering services — we’re driving the future of the petroleum industry. From modern installations to innovative marketing solutions, our goal is to empower businesses to excel.
            </p>
            <ul className="text-lg text-gray-700 list-disc pl-8 space-y-4">
              <li><strong>Imaging & Canopies</strong></li>
              <li><strong>Environmental Compliance</strong></li>
              <li><strong>C-Store Renovations</strong></li>
              <li><strong>EV Charging Solutions</strong></li>
              <li><strong>Remote Site Monitoring</strong></li>
              <li><strong>Digital Marketing</strong></li>
              <li><strong>Flexible Financing</strong></li>
            </ul>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/500x300" // Replace with real image
              alt="APEC Services"
              className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center py-20 px-8 rounded-xl shadow-xl">
        <h2 className="text-5xl font-bold mb-6">Let’s Build the Future Together</h2>
        <p className="text-lg mb-10 max-w-4xl mx-auto">
          Partner with APEC to leverage our expertise and cutting-edge technology. Together, we’ll achieve extraordinary success.
        </p>
        <button className="bg-[#e82228] py-4 px-12 rounded-lg font-medium text-lg shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105">
          Contact Us
        </button>
      </section>
    </div>
  );
}
