"use client";
// src/app/page.tsx
import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./Header";
import Footer from "./Footer";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]); // State for storing users
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Fetch from the API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Updating state with the fetched users
      } catch (error) {
        console.error('Failed to fetch users:', error); // Error handling
        setError('Failed to load users.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchUsers(); // Call the fetch function
  }, []);

  return (
    <div className={styles.page}>
      <Header /> {/* Include the header */}
      <main className={styles.main}>
        <div className={styles.contentContainer}>
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeText}>Welcome Bob</h1>
            <h3 className={styles.subtitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
            <h5 className={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
            <div className={styles.buttonContainer}>
              <button className={styles.primaryButton}>Button 1</button>
              <button className={styles.secondaryButton}>Button 2</button>
            </div>
          </div>
          {/* User List Section */}
          <div>
            <h1>User List</h1>
            {loading ? (
              <p>Loading users...</p> // Show loading message
            ) : error ? (
              <p>{error}</p> // Show error message if any
            ) : (
              <ul>
                {users.map(user => (
                  <li className={styles.databaseUsers} key={user.id}>
                    {user.name} - {user.email} - {user.age} {/* Display user properties */}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.logoContainer}>
            <Image
              src="/images/One-stop-Shop-Logo.jpg"
              alt="One Stop Shop logo"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
