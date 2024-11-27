'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  user_id: string;
  start_date: string;  // Assuming the start_date is also part of the project data
}

interface User {
  id: string;
  name: string;
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects and users data on component mount
  useEffect(() => {
    const fetchProjectsAndUsers = async () => {
      try {
        const [projectsResponse, usersResponse] = await Promise.all([
          fetch('/api/admin/projects'),
          fetch('/api/admin/users'),
        ]);

        const [projectsData, usersData] = await Promise.all([
          projectsResponse.json(),
          usersResponse.json(),
        ]);

        setProjects(projectsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndUsers();
  }, []);

  // Render loading state while fetching data
  if (loading) {
    return <p className="text-center">Loading projects...</p>;
  }

  // Helper function to get the user name by user_id
  const getUserNameById = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Projects</h2>
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
            {projects.map((project) => (
              <tr key={project.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-6">{getUserNameById(project.user_id)}</td>
                <td className="py-3 px-6">{project.name}</td>
                <td className="py-3 px-6">{project.description}</td>
                <td className="py-3 px-6">{project.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
