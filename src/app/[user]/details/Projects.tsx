'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl?: string; // Optional field for project images
  status?: string; // Optional field for project status
}

interface ProjectsProps {
  userId: number;
}

const placeholderImage =
  'https://media.gettyimages.com/id/183891014/photo/car-refueling-at-gas-station-during-the-night.webp?s=2048x2048&w=gi&k=20&c=E7xYHv3-zvSwU43N_IywE9XFWWo4SktflCXtq6X1qRQ=';

export default function Projects({ userId }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      if (!userId) throw new Error('User ID is missing');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/projects?userId=${userId}`,
        { cache: 'no-store' }
      );

      if (!response.ok) throw new Error(`Failed to fetch projects: ${response.status}`);

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center py-8 text-gray-600">No projects found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold text-red-600 mb-6">Projects</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={project.imageUrl || placeholderImage}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-red-600 truncate">{project.name}</h4>
              <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
              {project.status && (
                <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                  {project.status}
                </span>
              )}
              <a
                href={`/projects/${project.id}`}
                className="block mt-4 text-sm font-semibold text-orange-500 hover:underline"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}