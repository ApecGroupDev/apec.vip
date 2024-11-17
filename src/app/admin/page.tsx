'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/admin-login');
    }
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

  // Add user
  async function addUser(user: Omit<User, 'id'>) {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      setUsers([...users, newUser]);
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

  // Render loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mb-6"
        >
          Logout
        </button>

        <h2 className="text-lg font-semibold mb-6 text-gray-600">User List</h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">Special Code</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  {editingUserId === user.id ? (
                    <>
                      <td className="py-3 px-6 text-left">{user.id}</td>
                      <td className="py-3 px-6 text-left">
                        <input
                          type="text"
                          value={editedUser.name || ''}
                          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <input
                          type="email"
                          value={editedUser.email || ''}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <input
                          type="number"
                          value={editedUser.age || ''}
                          onChange={(e) => setEditedUser({ ...editedUser, age: Number(e.target.value) })}
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <input
                          type="text"
                          value={editedUser.special_code || ''}
                          onChange={(e) => setEditedUser({ ...editedUser, special_code: e.target.value })}
                          className="border p-2 w-full"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <button
                          onClick={() => updateUser({ ...user, ...editedUser } as User)}
                          className="text-green-500 hover:underline mr-2"
                        >
                          Save
                        </button>
                        <button onClick={handleCancelEdit} className="text-red-500 hover:underline">
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-6 text-left">{user.id}</td>
                      <td className="py-3 px-6 text-left">{user.name}</td>
                      <td className="py-3 px-6 text-left">{user.email}</td>
                      <td className="py-3 px-6 text-left">{user.age}</td>
                      <td className="py-3 px-6 text-left">{user.special_code || 'N/A'}</td>
                      <td className="py-3 px-6 text-left">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-500 hover:underline"
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

        {/* Add User Form */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              addUser({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                age: parseInt(formData.get('age') as string, 10),
                special_code: formData.get('special_code') as string,
              });
              form.reset();
            }}
            className="flex flex-wrap gap-4"
          >
            <input
              name="name"
              placeholder="Name"
              required
              className="border p-2 flex-1"
            />
            <input
              name="email"
              placeholder="Email"
              required
              className="border p-2 flex-1"
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              required
              className="border p-2 flex-1"
            />
            <input
              name="special_code"
              placeholder="Special Code"
              className="border p-2 flex-1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
