// Import the global CSS file to apply Tailwind styles globally
import '../styles/globals.css';

export const metadata = {
  title: 'My Website',
  description: 'Welcome to My Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-100 text-gray-800">
      <head />
      <body className="min-h-screen">
        {/* Add your header, footer, or any global layout elements here */}
        <div className="max-w-7xl mx-auto p-4">
          {children}  {/* Renders the content of the specific page */}
        </div>
      </body>
    </html>
  );
}
