"use client";

import React from "react";
import { useRef } from "react";
import ScrollToTopButton from "@/components/scrollToTop";

export default function Contact() {

  // Ref for contact form
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offset = 150; // Adjust this value for spacing from the top
      const elementPosition = ref.current.offsetTop;
      const scrollToPosition = elementPosition - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">
      {/* Hero Section */}
      {/* test push content */}
      {/* 2nd test push content */}
      <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center py-40 px-8 rounded-3xl shadow-lg overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Get in Touch
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-4xl mx-auto">
          We'd love to hear from you. Let us know how we can assist you today!
        </p>
        <button
          className="bg-[#e82228] text-white py-3 px-8 rounded-full font-medium shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
          onClick={() => scrollToSection(formRef)}
        >
          Contact Us Now
        </button>
      </header>

      {/* Contact Form Section */}
      <section ref={formRef}>
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Send Us a Message
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e82228]"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e82228]"
                />
              </div>
              <div>
                <label htmlFor="inquiry" className="text-lg font-semibold text-gray-700">Inquiry Type</label>
                <select
                  id="inquiry"
                  name="inquiry"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e82228]"
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="services">Our Services</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-lg font-semibold text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e82228]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#e82228] text-white py-3 px-8 rounded-full font-medium shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
              >
                Submit Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white">Our Office</h3>
              <div className="space-y-4">
                {/* Address Section */}
                <div className="flex items-center space-x-3 mt-5">
                  <div className="text-xl font-semibold text-[#e82228]">Address:</div>
                  <p className="text-lg text-gray-200">
                    4732-E North Royal Atlanta Drive, Tucker, GA 30084
                  </p>
                </div>

                {/* Phone Section */}
                <div className="flex items-center space-x-3">
                  <div className="text-xl font-semibold text-[#e82228]">Phone:</div>
                  <p className="text-lg text-gray-200">855-444-APEC</p>
                </div>

                {/* Email Section */}
                <div className="flex items-center space-x-3">
                  <div className="text-xl font-semibold text-[#e82228]">Email:</div>
                  <a
                    href="mailto:Service@TheAPECgroup.com"
                    className="text-lg text-[#e82228] hover:text-red-600"
                  >
                    Service@TheAPECgroup.com
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full h-72">
              <div className="w-full h-72 mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d13252.607633656984!2d-84.19662997285617!3d33.85997575303709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s4732-E%20North%20Royal%20Atlanta%20Drive%2C%20Tucker%2C%20GA%2030084!5e0!3m2!1sen!2sph!4v1732353519952!5m2!1sen!2sph"
                  width="100%"
                  height="120%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center py-20 px-8 rounded-3xl shadow-xl">
        <h2 className="text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-lg mb-10 max-w-4xl mx-auto">
          Have a question? We’re here to help! Reach out, and we’ll get back to you as soon as possible.
        </p>
      </section>
      <ScrollToTopButton />
    </div>
  );
}
