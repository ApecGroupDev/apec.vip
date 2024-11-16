export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* Hero Section */}
      <header className="relative bg-blue-800 text-white text-center py-24 px-8 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-80"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold mb-4 leading-tight z-10">
          Your Trusted Petroleum One-Stop Shop
        </h1>
        <p className="relative text-lg md:text-xl mb-6 z-10 max-w-xl mx-auto opacity-90">
          Quality products, expert solutions, and industry-leading services at your fingertips.
        </p>
        <button className="relative bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 z-10 shadow-lg">
          Explore Services
        </button>
      </header>

      {/* About Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">About Us</h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          We are committed to providing top-notch petroleum solutions, from fuel supply to equipment maintenance, with a focus on sustainability and customer satisfaction.
        </p>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Fuel Supply", description: "Reliable fuel supply for commercial and industrial needs, including bulk delivery and storage solutions." },
            { title: "Lubricants", description: "A wide range of high-quality lubricants to ensure the longevity and performance of your equipment." },
            { title: "Equipment Maintenance", description: "Comprehensive maintenance services to keep your petroleum and storage equipment in peak condition." },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Innovative Solutions</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Energy Efficiency", description: "Solutions designed to reduce operational costs and increase energy efficiency across industries." },
            { title: "Environmental Safety", description: "Adopting industry best practices to minimize environmental impact and promote sustainability." },
            { title: "Advanced Technology", description: "Leveraging technology for better monitoring, tracking, and optimization of fuel and lubricant usage." },
          ].map((solution, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center py-16 px-8 rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-3xl font-bold mb-6">Partner with Us for Reliable Petroleum Solutions</h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
          Contact Us Today
        </button>
      </section>
    </div>
  );
}
