import { notFound } from 'next/navigation';
import Link from 'next/link';

interface UserPageProps {
  params: Promise<{ user: string }>;
}

async function getUserData(userName: string) {
  try {
    const response = await fetch(`/api/users?user=${encodeURIComponent(userName)}`, {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100">
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="bg-white shadow-lg rounded-3xl p-12 max-w-lg w-full text-center transform transition duration-300 hover:shadow-2xl">
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
      </main>
    </div>
  );
}
