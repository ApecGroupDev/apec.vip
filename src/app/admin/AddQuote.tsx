import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
}

interface AddQuoteProps {
  onQuoteAdded: () => void;
}

export default function AddQuote({ onQuoteAdded }: AddQuoteProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userId: '',
    name: '',
    status: 'Pending', // Default status
    start_date: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.description || !formData.userId || !formData.name) {
      setError('All fields are required');
      return;
    }

    setError(null); // Reset error state if validation passes
    setLoading(true); // Start loading state

    try {
      // Prepare formData if needed (e.g., change userId to user_id)
      const adjustedFormData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        user_id: formData.userId, // If backend expects user_id instead of userId
        name: formData.name, // Add quote name here
        start_date: formData.start_date,
      };

      const response = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adjustedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || 'Failed to add quote'}`);
      } else {
        onQuoteAdded(); // Refresh the quotes table
        setFormData({ title: '', description: '', userId: '', name: '', status: 'Pending', start_date: '' }); // Reset the form
      }
    } catch (error) {
      console.error('Error adding quote:', error);
      setError('Failed to add quote.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Add New Quote</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Quote Title"
          required
          className="w-full p-3 border rounded-lg"
        />

        {/* Description Input */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Quote Description"
          required
          className="w-full p-3 border rounded-lg"
        />

        {/* User Selection */}
        <select
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="" disabled>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.id})
            </option>
          ))}
        </select>

        {/* Quote Name Input */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Quote Name"
          required
          className="w-full p-3 border rounded-lg"
        />

        {/* Status Selection */}
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-lg"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          required
          className="w-full p-3 border rounded-lg"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Adding Quote...' : 'Add Quote'}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
