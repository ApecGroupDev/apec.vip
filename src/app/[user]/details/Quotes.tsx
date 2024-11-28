'use client';

import { useEffect, useState } from 'react';

interface Quote {
  id: number;
  name: string;
  description: string;
}

interface QuotesProps {
  userId: number;
}

export default function Quotes({ userId }: QuotesProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      // Ensure userId is valid
      if (!userId) {
        throw new Error('User ID is missing');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/quotes?userId=${userId}`, {
        cache: 'no-store', // Disable caching to always fetch fresh data
      });

      if (!response.ok) {
        // Log the status for better debugging
        console.error('Failed to fetch quotes', response.statusText);
        throw new Error(`Failed to fetch quotes: ${response.status}`);
      }

      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setQuotes([]); // Set empty array if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [userId]);

  if (loading) {
    return <div>Loading quotes...</div>;
  }

  if (quotes.length === 0) {
    return <div>No quotes found</div>;
  }

  return (
    <div>
      <h3>Quotes</h3>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <h4>{quote.name}</h4>
            <p>{quote.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
