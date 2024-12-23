import { notFound } from 'next/navigation';
import Link from 'next/link';

interface UserPageProps {
  params: Promise<{ user: string }>;
}

async function getUserData(userName: string) {
  // Get the base URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Default to empty string if not defined

  if (!baseUrl) {
    console.error("Base URL is not defined");
    return null;
  }

  const url = new URL(`/api/users?user=${encodeURIComponent(userName)}`, baseUrl); // Construct the full URL

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Failed to fetch user data: ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred while fetching user data:", error);
    return null;
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { user } = await params;
  const userData = await getUserData(user);

  if (!userData) {
    notFound();
  }

  const formattedName = user
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div style={{ backgroundImage: `url('/images/V5.jpg')` }} className="flex flex-col min-h-screen bg-cover bg-center">
      <div className="flex-grow flex items-center justify-center mb-72">
        <div className="bg-white shadow-lg rounded-3xl p-12 max-w-xl mx-4 sm:mx-2 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          {/* Welcome Section */}
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-6">
            Welcome, <span className="text-red-600">{formattedName}</span>
          </h1>
          <p className="text-base text-gray-600 mb-8">
            We're honored to have you here. Let's take the next step together.
          </p>
          <div className="flex justify-center">
            <Link href={`/${user}/details`}>
              <button className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-transform duration-200 hover:bg-red-700 hover:scale-105">
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
