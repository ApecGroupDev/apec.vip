'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ProjectsProps {
  userId: number;
}

export default function Projects({ userId }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      // Ensure userId is valid
      if (!userId) {
        throw new Error('User ID is missing');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/projects?userId=${userId}`, {
        cache: 'no-store', // Disable caching to always fetch fresh data
      });

      if (!response.ok) {
        // Log the status for better debugging
        console.error('Failed to fetch projects', response.statusText);
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]); // Set empty array if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (projects.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <div>
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
