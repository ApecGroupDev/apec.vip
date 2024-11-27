// ProjectsTable.tsx
'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  user_id: string;
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/admin/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Render loading state while fetching data
  if (loading) {
    return <p className="text-center">Loading projects...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Projects</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left font-medium">ID</th>
              <th className="py-3 px-6 text-left font-medium">User ID</th>
              <th className="py-3 px-6 text-left font-medium">Name</th>
              <th className="py-3 px-6 text-left font-medium">Description</th>
              <th className="py-3 px-6 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {projects.map((project) => (
              <tr key={project.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-6">{project.id}</td>
                <td className="py-3 px-6">{project.user_id}</td>
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
