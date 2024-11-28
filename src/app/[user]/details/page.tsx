'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Projects from './Projects';
import Quotes from './Quotes';

interface UserData {
  name: string;
  id: number;
  email: string;
  age: number;
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
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User data not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-8 py-16">
      {!isVerified ? (
        <div className="bg-white shadow-lg rounded-3xl p-12 max-w-lg w-full text-center border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-6">VIP Access Verification</h2>
          <p className="text-gray-600 text-lg mb-6">
            Enter the special code to unlock your personalized details.
          </p>
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="Enter your special code"
            className="w-full bg-gray-100 border-2 border-gray-300 rounded-xl px-6 py-4 text-gray-800 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-xl hover:bg-blue-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          >
            Verify Code
          </button>
          {verificationError && <p className="text-red-600 font-semibold mt-4">{verificationError}</p>}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-3xl p-12 max-w-lg w-full text-center border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
            Welcome, {userData.name}
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Your access has been successfully verified. Below are your details:
          </p>
          <div className="bg-gray-100 rounded-xl p-8 text-left space-y-6 border border-gray-300">
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Username:</strong> {userData.name}
            </p>
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Email:</strong> {userData.email}
            </p>
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Age:</strong> {userData.age}
            </p>
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Special Code:</strong> {userData.special_code}
            </p>
          </div>
        </div>
      )}
      {isVerified && (
        <div>
          <Projects userId={userData.id} />
          <Quotes userId={userData.id} />
        </div>
      )}
    </div>
  );
}
