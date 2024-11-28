'use client';

import { useEffect, useState } from 'react';

interface Quote {
  id: string;
  name: string;
  description: string;
  status: string;
  user_id: string;
  start_date: string;  // Assuming the start_date is also part of the quote data
}

interface User {
  id: string;
  name: string;
}

export default function QuotesTable() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch quotes and users data on component mount
  useEffect(() => {
    const fetchQuotesAndUsers = async () => {
      try {
        const [quotesResponse, usersResponse] = await Promise.all([
          fetch('/api/admin/quotes'),
          fetch('/api/admin/users'),
        ]);

        const [quotesData, usersData] = await Promise.all([
          quotesResponse.json(),
          usersResponse.json(),
        ]);

        setQuotes(quotesData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotesAndUsers();
  }, []);

  // Render loading state while fetching data
  if (loading) {
    return <p className="text-center">Loading quotes...</p>;
  }

  // Helper function to get the user name by user_id
  const getUserNameById = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Quotes</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left font-medium">User Name</th>
              <th className="py-3 px-6 text-left font-medium">Name</th>
              <th className="py-3 px-6 text-left font-medium">Description</th>
              <th className="py-3 px-6 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-6">{getUserNameById(quote.user_id)}</td>
                <td className="py-3 px-6">{quote.name}</td>
                <td className="py-3 px-6">{quote.description}</td>
                <td className="py-3 px-6">{quote.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
