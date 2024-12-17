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
    <div className="flex items-center justify-center px-8 py-16 text-white min-h-screen">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full space-y-8 mb-72">
        <h1 className="text-3xl font-extrabold text-center text-black">
          <span className="text-red-600">Admin </span>
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Access Code</label>
            <input
              type="text"
              placeholder="Enter access code"
              value={masterCode}
              onChange={(e) => setMasterCode(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900" // Ensure text is visible
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-red-700 focus:outline-none transition duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {error && (
          <div className="text-red-600 font-semibold mt-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
