export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-black to-gray-900 text-white text-center py-40 px-8 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-90"></div>
        <h1 className="relative text-5xl md:text-7xl font-extrabold mb-6 leading-tight z-10">
          Welcome to Our VIP Services
        </h1>
        <p className="relative text-lg md:text-2xl mb-10 z-10 max-w-3xl mx-auto">
          Your trusted partner for premium fuel, advanced solutions, and unmatched support. We’re here to exceed your expectations.
        </p>
        <div className="flex justify-center space-x-4 relative z-10">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-10 rounded-full transition-transform duration-300 transform hover:scale-110 shadow-lg">
            Explore Our Services
          </button>
          <button className="bg-white hover:bg-gray-200 text-black font-semibold py-4 px-10 rounded-full transition-transform duration-300 transform hover:scale-110 shadow-lg">
            Contact Us
          </button>
        </div>
      </header>

      {/* About Section */}
      <section className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-black">About Our VIP Services</h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
          We deliver exceptional service tailored to your needs. Whether it's fuel supply, expert advice, or maintenance support, we ensure a seamless and superior experience for our valued clients.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
          Learn More
        </button>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-black mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Customized Fuel Plans",
              description:
                "Reliable and flexible fuel solutions designed to match your unique requirements.",
            },
            {
              title: "Premium Lubricants",
              description:
                "Top-quality lubricants that enhance performance and protect your equipment.",
            },
            {
              title: "24/7 Maintenance Support",
              description:
                "Round-the-clock assistance to keep your operations running smoothly at all times.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-8 hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-semibold text-black mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Innovations Section */}
      <section>
        <h2 className="text-4xl font-bold text-center text-black mb-12">Innovative Solutions</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Eco-Friendly Options",
              description:
                "Access to environmentally friendly fuels and programs to reduce your carbon footprint.",
            },
            {
              title: "Real-Time Tracking",
              description:
                "Advanced technology for monitoring and optimizing fuel usage in real-time.",
            },
            {
              title: "Expert Consultation",
              description:
                "Our advisors provide expert insights and strategies to streamline your operations.",
            },
          ].map((solution, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-8 hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-semibold text-black mb-4">{solution.title}</h3>
              <p className="text-gray-600 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-center space-y-12">
        <h2 className="text-4xl font-bold text-black">What Our Clients Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote:
                "Their fuel services are exceptional. They go above and beyond to meet our needs.",
              name: "Michael Adams",
              company: "Energy Solutions Inc.",
            },
            {
              quote:
                "The maintenance support is incredible. We've seen a huge improvement in uptime.",
              name: "Emma Carter",
              company: "Logistics Pro",
            },
            {
              quote:
                "Their eco-friendly fuel options are exactly what we needed for a sustainable future.",
              name: "Oliver Wang",
              company: "GreenFleet Technologies",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg p-8 hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <h4 className="text-xl font-semibold text-black">{testimonial.name}</h4>
              <span className="text-gray-500">{testimonial.company}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 text-white text-center py-20 px-8 rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-5xl font-bold mb-6">Partner With Us</h2>
        <p className="text-lg mb-10 max-w-4xl mx-auto">
          Experience the difference of personalized service and top-quality solutions. Let us help you achieve more.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 px-10 rounded-full transition-transform duration-300 transform hover:scale-110 shadow-lg">
          Get Started Today
        </button>
      </section>
    </div>
  );
}
