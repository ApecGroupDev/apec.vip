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

        {/* Main content with gradient merging effect */}
        <div
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 1)),
              url('/images/V5.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
          className="flex flex-col min-h-screen">

          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer with a gradient effect */}
          <footer
            style={{
              background: `
                linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))
              `,
            }}
            className="text-center py-8">
            <Footer />
          </footer>
        </div>

      </body>
    </html>
  );
}
