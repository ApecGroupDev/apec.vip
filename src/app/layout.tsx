import '../styles/globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'APEC VIP',
  description: 'Welcome to My Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-100 text-gray-800">
      <head />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <body className="min-h-screen">
        {/* Add the Header here */}
        <Header />

        {/* Main content of the page */}
        <div className="max-w-7xl mx-auto p-4">
          {children}  {/* This will render page content */}
        </div>

        {/* Add the Footer here */}
        <Footer />
      </body>
    </html>
  );
}
