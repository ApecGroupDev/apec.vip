'use client'; // Keep the client directive

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import CodeVerification from './CodeVerification';

// Define a type for the user data
interface UserData {
  name: string;
  email: string;
  age: number;
  special_code: string;
}

interface UserDetailsProps {
  params: Promise<{ user: string }>;
}

export default function UserDetails({ params }: UserDetailsProps) {
  const [userData, setUserData] = useState<UserData | null>(null); // More specific type
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);

  // Fetch user data from the API
  const getUserData = async (userName: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?user=${encodeURIComponent(userName)}`, {
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

  // Ensure userData is set before rendering CodeVerification
  if (!userData) {
    return <div>User data not found</div>;
  }

  return (
    <div>
      <main>
        <CodeVerification specialCode={userData.special_code} userData={userData} />
      </main>
    </div>
  );
}
