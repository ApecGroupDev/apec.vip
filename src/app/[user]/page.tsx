import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import Header from '../Header';
import Footer from '../Footer';

interface UserPageProps {
  params: Promise<{ user: string }>; // Change to Promise
}

// Fetch user data from the API
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
  const { user } = await params; // Await params here

  // Fetch user data before rendering the page
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
        <div className={styles.contentContainer}>
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeText}>Welcome {formattedName}</h1>
            <h3 className={styles.subtitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
            <h5 className={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
            <div className={styles.buttonContainer}>
              <Link href={`/${user}/details`}>
                <button className={styles.primaryButton}>Proceed</button>
              </Link>
              <button className={styles.secondaryButton}>Button 2</button>
            </div>
          </div>
          <div className={styles.logoContainer}>
            <Image
              src="/images/One-stop-Shop-Logo.jpg"
              alt="One Stop Shop logo"
              width={500}
              height={500}
              layout="intrinsic"
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
