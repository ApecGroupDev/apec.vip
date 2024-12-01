'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectsTable from './ProjectsTable';
import AddProject from './AddProject';
import QuotesTable from './QuotesTable';
import AddQuote from './AddQuote';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  special_code: string | null;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const router = useRouter(); 

  // Authentication check: Ensure user is logged in
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    // If no token exists or token validation fails, redirect to login page
    if (!authToken) {
      router.push('/admin-login');
      return;
    }

    // Validate the token with the API (for instance, check if the token is expired)
    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Pass token in Authorization header
          },
        });

        if (!response.ok) {
          router.push('/admin-login'); // Redirect to login if token is invalid
        }
      } catch (error) {
        console.error('Token validation error:', error);
        router.push('/admin-login'); // Redirect if there's an error during validation
      }
    };

    validateToken(); // Call validation on initial load
  }, [router]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUsers();
    }
  }, []);

  // Utility function to generate an alphanumeric ID
  function generateAlphanumericId(length: number = 4): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Add user with auto-generated alphanumeric ID and special_code
  async function addUser(user: Omit<User, 'id'>) {
    try {
      const newUser = {
        ...user,
        id: generateAlphanumericId(), // Generate unique alphanumeric ID
        special_code: user.special_code?.trim() ? user.special_code : generateAlphanumericId(4), // Generate special code if blank
      };

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  // Update user
  async function updateUser(updatedUser: User) {
    try {
      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  // Delete user
  async function deleteUser(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin-login');
  };

  // Handle edit
  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleProjectAdded = () => {
    // Trigger refresh of ProjectsTable
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleQuoteAdded = () => {
    // Trigger refresh of ProjectsTable
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Render loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>

        {/* User List Section */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">User List</h2>
        <div className="overflow-x-auto mb-8 border rounded-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left font-medium">ID</th>
                <th className="py-3 px-6 text-left font-medium">Name</th>
                <th className="py-3 px-6 text-left font-medium">Email</th>
                <th className="py-3 px-6 text-left font-medium">Age</th>
                <th className="py-3 px-6 text-left font-medium">Special Code</th>
                <th className="py-3 px-6 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {editingUserId === user.id ? (
                    <>
                      <td className="py-3 px-6">{user.id}</td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          value={editedUser.name || ""}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, name: e.target.value })
                          }
                          className="border w-full p-2 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="email"
                          value={editedUser.email || ""}
                          onChange={(e) =>
                            setEditedUser({ ...editedUser, email: e.target.value })
                          }
                          className="border w-full p-2 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="number"
                          value={editedUser.age || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              age: Number(e.target.value),
                            })
                          }
                          className="border w-full p-2 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          value={editedUser.special_code || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              special_code: e.target.value,
                            })
                          }
                          className="border w-full p-2 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() =>
                            updateUser({ ...user, ...editedUser } as User)
                          }
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
                      <td className="py-3 px-6">{user.id}</td>
                      <td className="py-3 px-6">{user.name}</td>
                      <td className="py-3 px-6">{user.email}</td>
                      <td className="py-3 px-6">{user.age}</td>
                      <td className="py-3 px-6">
                        {user.special_code || "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-orange-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
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

        <hr className='w-100' />

        {/* Add User Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-5">
            Add New User
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              addUser({
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                age: parseInt(formData.get("age") as string, 10),
                special_code: null,
              });
              form.reset();
            }}
            className="flex flex-wrap gap-4"
          >
            <input
              name="name"
              placeholder="Name"
              required
              className="border p-3 rounded-lg flex-1"
            />
            <input
              name="email"
              placeholder="Email"
              required
              className="border p-3 rounded-lg flex-1"
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              required
              className="border p-3 rounded-lg flex-1"
            />
            <button
              type="submit"
              className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-yellow-400"
            >
              Add User
            </button>
          </form>
        </div>
        <hr className='mt-5 mb-5' />

        <div className="mt-5">
          <ProjectsTable key={refreshKey} />
        </div>

        <div className="mt-5">
          <AddProject onProjectAdded={handleProjectAdded} />
        </div>

        <div className="mt-5">
          <QuotesTable key={refreshKey} />
        </div>

        <div className="mt-5">
          <AddQuote onQuoteAdded={handleQuoteAdded} />
        </div>

      </div>
    </div>
  );
}
