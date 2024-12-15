import '../styles/globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'APEC VIP',
  description: 'APEC VIPs Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-200 text-gray-800">
      <head />
      <body className="min-h-screen">

        {/* Add the Header here */}
        <Header />

        {/* Main content of the page */}
        <div className="max-w-full mx-auto">
          {children}  {/* This will render page content */}
        </div>

        {/* Add the Footer here */}
        <Footer />
      </body>
    </html>
  );
}
