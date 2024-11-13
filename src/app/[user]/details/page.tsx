'use client'; // Keep the client directive

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import styles from '../../page.module.css';
import Header from '../../Header';
import Footer from '../../Footer';
import CodeVerification from './CodeVerification';

interface UserDetailsProps {
  params: Promise<{ user: string }>; // Update to Promise type
}

export default function UserDetails({ params }: UserDetailsProps) {
  const [userData, setUserData] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<string | null>(null); // State to store the user name

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
    return <div>Loading...</div>; // Optional: loading state
  }

  const formattedName = user
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || '';

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CodeVerification specialCode={userData?.special_code} userData={userData} />
      </main>
      <Footer />
    </div>
  );
}
