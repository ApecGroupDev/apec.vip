// src/app/[user]/details/CodeVerification.tsx

'use client';

import { useState, useEffect } from 'react';
import styles from '../../page.module.css';

interface CodeVerificationProps {
  specialCode: string;
  userData: { name: string; email: string; age: number; special_code: string }; // Define user data type here
}

const CodeVerification: React.FC<CodeVerificationProps> = ({ specialCode, userData }) => {
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  // Handle code input change
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredCode(e.target.value);
  };

  // Handle verification
  const handleVerify = () => {
    if (enteredCode === specialCode) {
      setIsVerified(true);
    } else {
      alert('Incorrect code');
    }
  };

  // Async effect for data fetching if needed in client-side
  useEffect(() => {
    // Any async logic, like fetching additional data, can go here if needed.
    // For now, we just simulate loading state.
    setLoading(false); // Set loading to false once data is ready
  }, []); // Empty dependency array ensures this effect runs once when component mounts

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading message
  }

  return (
    <div className={styles.codeVerificationContainer}>
      {!isVerified ? (
        <div>
          <h2>Enter Code to View Details</h2>
          <input 
            type="text" 
            value={enteredCode} 
            onChange={handleCodeChange} 
            placeholder="Enter special code"
            className={styles.codeInput}
          />
          <button onClick={handleVerify} className={styles.primaryButton}>Verify Code</button>
        </div>
      ) : (
        <div>
          <h1>User Details for {userData.name}</h1>
          <p><strong>Username:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Code:</strong> {userData.special_code}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default CodeVerification;
