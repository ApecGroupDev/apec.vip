'use client';

import { useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import Projects from './Projects';
import Quotes from './Quotes';
import ScrollToTopButton from '@/components/scrollToTop';
import Loading from '@/components/loading';

interface UserData {
  name: string;
  id: number;
  email: string;
  special_code: string;
}

interface PageProps {
  params: Promise<{ user: string }>;
}

export default function Page({ params }: PageProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verificationError, setVerificationError] = useState('');
  const [user, setUser] = useState<string | null>(null);

  // Refs for sections
  const projectsRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Scroll handler
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

  // Fetch user data from the API
  const getUserData = async (userName: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?user=${encodeURIComponent(userName)}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('User not found');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Handle code verification
  const handleVerify = async () => {
    try {
      // Verify with the special_code first
      let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-special-code?user=${userData?.name}&special_code=${enteredCode}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsVerified(true);
        setVerificationError('');
        return;
      }

      // If special_code fails, verify with the master_code
      response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-master-key?master_code=${enteredCode}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsVerified(true);
        setVerificationError('');
      } else {
        setVerificationError('Invalid code');
      }
    } catch (error: unknown) {
      console.error(error);
      setVerificationError('Error verifying code');
    }
  };

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUser(resolvedParams.user);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const data = await getUserData(user);
        if (!data) {
          notFound(); // Redirect to not found if no data
        } else {
          setUserData(data);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  if (!userData) {
    return <div>User data not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white px-8 py-16">
      {!isVerified ? (
        <div
          style={{ backgroundImage: `url('/images/Artboard1-8.png')` }}
          className="bg-cover bg-center bg-no-repeat shadow-lg rounded-3xl p-12 max-w-lg w-full text-center border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="/images/Artboard1-8-1.png" // Replace with the actual path to your logo
            alt="VIP Logo"
            className="w-100 h-auto mx-auto mb-6" // Adjust the size and styling as needed
          />
          <div className="w-full sm:w-4/5 mx-auto rounded-lg bg-gradient-to-r from-amber-600 to-amber-300 p-[2px]">
            <input
              type="text"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              placeholder="Enter Access Code"
              className="w-full bg-black border-transparent text-base sm:text-md text-center rounded-lg px-4 py-4 text-gray-800 focus:outline-none"
            />
          </div>
          <button
            onClick={handleVerify}
            className="w-full sm:w-4/5 bg-red-600 text-white text-base sm:text-md py-4 mt-4 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          >
            Submit
          </button>
          {verificationError && <p className="text-red-600 font-semibold mt-4">{verificationError}</p>}
        </div>
      ) : (
        <div className="container mx-auto mb-5 px-4 pb-8">
          <ScrollToTopButton />
          <h1 className="text-5xl font-extrabold mb-6 text-black">
            Welcome, <span className="text-red-600">{userData.name}</span>
          </h1>
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-yellow-500 via-red-700 to-yellow-500 text-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
              <p className="text-2xl font-bold mb-2">
                Exclusive Access Unlocked
              </p>
              <p className="text-lg">
                As a VIP member, you are granted access to a world of premium perks and opportunities. We are thrilled to have you on board!
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-300 shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-bold text-black mb-4">
                Explore Your VIP World
              </h2>
              <p className="text-gray-800 mb-4">
                Discover a curated selection of experiences and offers tailored just for you.
              </p>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="w-full sm:w-full lg:w-1/4 bg-black text-white font-semibold py-3 px-6 rounded-xl shadow-xl hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105">
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection(quotesRef)}
                  className="w-full sm:w-full lg:w-1/4 bg-black text-white font-semibold py-3 px-6 rounded-xl shadow-xl hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105">
                  Quotes
                </button>
                <button
                  onClick={() => scrollToSection(detailsRef)}
                  className="w-full sm:w-full lg:w-1/4 bg-black text-white font-semibold py-3 px-6 rounded-xl shadow-xl hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
      {isVerified && (
        <div>
          {/* Projects Section */}
          <div ref={projectsRef}>
            <Projects userId={userData.id} />
          </div>

          {/* Quotes Section */}
          <div ref={quotesRef}>
            <Quotes userId={userData.id} />
          </div>

          {/* Details Section */}
          <div ref={detailsRef} className="container mx-auto my-5 px-4 py-8">
            <h3 className="text-2xl font-bold text-black mb-6">Here are your details,  <span className='text-red-600'>{userData.name}</span></h3>
            <div className="space-y-6">
              <div className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105">
                <p className="text-gray-800 text-md my-5 text-wrap">
                  <strong className="text-red-500">Username:</strong> {userData.name}
                </p>
                <p className="text-gray-800 text-md my-5 text-wrap">
                  <strong className="text-red-500">Email:</strong> {userData.email}
                </p>
                <p className="text-gray-800 text-md my-5 text-wrap">
                  <strong className="text-red-500">Special Code:</strong> {userData.special_code}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
