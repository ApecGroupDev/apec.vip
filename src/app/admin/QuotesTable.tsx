'use client';

import { useEffect, useState } from 'react';

interface Quote {
  id: string;
  name: string;
  description: string;
  status: string;
  user_id: string;
  start_date: string;
}

interface User {
  id: string;
  name: string;
}

export default function QuotesTable() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [editedQuote, setEditedQuote] = useState<Quote>({
    id: '',
    name: '',
    description: '',
    status: '',
    user_id: '',
    start_date: '',
  });

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

  // Helper function to get the user name by user_id
  const getUserNameById = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Filter projects based on search term
  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserNameById(quote.user_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the edit button click
  const handleEditClick = (quote: Quote) => {
    setEditingQuoteId(quote.id);
    setEditedQuote(quote);
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditingQuoteId(null);
    setEditedQuote({
      id: '',
      name: '',
      description: '',
      status: '',
      user_id: '',
      start_date: '',
    });
  };

  // Update quote
  const updateQuote = async (updatedQuote: Quote) => {
    try {
      await fetch('/api/admin/quotes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuote),
      });
      setQuotes(
        quotes.map((quote) =>
          quote.id === updatedQuote.id ? updatedQuote : quote
        )
      );
      setEditingQuoteId(null);
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  // Delete quote
  const deleteQuote = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this quote?');
    if (!confirmed) return;

    try {
      await fetch(`/api/admin/quotes?id=${id}`, { method: 'DELETE' });
      setQuotes(quotes.filter((quote) => quote.id !== id));
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  // Render loading state while fetching data
  if (loading) {
    return <p className="text-center">Loading quotes...</p>;
  }

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left font-medium">User Name</th>
              <th className="py-3 px-6 text-left font-medium">Name</th>
              <th className="py-3 px-6 text-left font-medium">Description</th>
              <th className="py-3 px-6 text-left font-medium">Status</th>
              <th className="py-3 px-6 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredQuotes.map((quote) => (
              <tr key={quote.id} className="border-t hover:bg-gray-50 transition">
                {editingQuoteId === quote.id ? (
                  <>
                    <td className="py-3 px-6">{getUserNameById(quote.user_id)}</td>
                    <td className="py-3 px-6">
                      <input
                        type="text"
                        value={editedQuote.name || ''}
                        onChange={(e) => setEditedQuote({ ...editedQuote, name: e.target.value })}
                        className="border w-full p-2 rounded"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        type="text"
                        value={editedQuote.description || ''}
                        onChange={(e) =>
                          setEditedQuote({ ...editedQuote, description: e.target.value })
                        }
                        className="border w-full p-2 rounded"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        type="text"
                        value={editedQuote.status || ''}
                        onChange={(e) =>
                          setEditedQuote({ ...editedQuote, status: e.target.value })
                        }
                        className="border w-full p-2 rounded"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => updateQuote({ ...quote, ...editedQuote })}
                        className="text-green-600 font-medium hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="ml-4 text-red-600 font-medium hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-6">{getUserNameById(quote.user_id)}</td>
                    <td className="py-3 px-6">{quote.name}</td>
                    <td className="py-3 px-6">{quote.description}</td>
                    <td className="py-3 px-6">{quote.status}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleEditClick(quote)}
                        className="text-orange-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="ml-4 text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
