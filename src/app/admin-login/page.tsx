// src/app/admin-login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [masterCode, setMasterCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous error
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterCode }),
      });

      const data = await response.json();

      // Log the response for debugging
      console.log('API Response:', data);

      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);

        // Redirect to the admin dashboard
        router.push('/admin');
      } else {
        // Show error if the code is incorrect
        setError(data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter access code"
          value={masterCode}
          onChange={(e) => setMasterCode(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
