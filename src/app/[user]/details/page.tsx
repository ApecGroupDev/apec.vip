// src/app/[user]/details/page.tsx

'use client'; // Marking the file as client-side

import { notFound } from 'next/navigation';
import styles from '../../page.module.css';
import Header from '../../Header';
import Footer from '../../Footer';
import CodeVerification from './CodeVerification'; // Import client component

interface UserDetailsProps {
  params: { user: string };
}

// Fetch user data from the API
async function getUserData(userName: string) {
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
}

export default async function UserDetails({ params }: UserDetailsProps) {
  const { user } = params;

  const userData = await getUserData(user);

  if (!userData) {
    notFound();
  }

  const formattedName = user
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CodeVerification specialCode={userData.special_code} userData={userData} /> {/* Pass data */}
      </main>
      <Footer />
    </div>
  );
}
