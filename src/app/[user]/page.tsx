import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../Header';

interface UserPageProps {
  params: Promise<{ user: string }>;
}

async function getUserData(userName: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/users?user=${encodeURIComponent(userName)}`, {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-500 to-blue-600">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="bg-white bg-opacity-90 shadow-lg rounded-3xl p-12 max-w-lg w-full text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          {/* Welcome Section */}
          <h1 className="text-5xl font-extrabold text-blue-800 tracking-tight mb-6">
            Welcome {formattedName}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for visiting! Let’s take the next step.
          </p>
          <div className="flex justify-center">
            <Link href={`/${user}/details`}>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-transform duration-200 hover:bg-blue-700 hover:scale-105">
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
