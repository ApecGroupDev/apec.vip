'use client';

import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  status?: string;
}

interface ProjectsProps {
  userId: number;
}

const placeholderImage =
  'https://media.gettyimages.com/id/183891014/photo/car-refueling-at-gas-station-during-the-night.webp?s=2048x2048&w=gi&k=20&c=E7xYHv3-zvSwU43N_IywE9XFWWo4SktflCXtq6X1qRQ=';

export default function Projects({ userId }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

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
              <button
                onClick={() => openModal(project)}
                className="block mt-4 text-sm font-semibold text-orange-500 hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-3xl font-bold text-red-600 mb-4">
                        {selectedProject?.name}
                      </h2>
                      <p className="text-gray-700 text-lg mb-6">{selectedProject?.description}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <img
                        src={selectedProject?.imageUrl || placeholderImage}
                        alt={selectedProject?.name}
                        className="w-full h-96 p-2 object-cover rounded-l-lg"
                      />
                      <img
                        src={selectedProject?.imageUrl || placeholderImage}
                        alt={selectedProject?.name}
                        className="w-full h-96 p-2 object-cover rounded-l-lg"
                      />
                      <img
                        src={selectedProject?.imageUrl || placeholderImage}
                        alt={selectedProject?.name}
                        className="w-full h-96 p-2 object-cover rounded-l-lg"
                      />
                      <img
                        src={selectedProject?.imageUrl || placeholderImage}
                        alt={selectedProject?.name}
                        className="w-full h-96 p-2 object-cover rounded-l-lg"
                      />
                      <div className="p-6">
                        {selectedProject?.status && (
                          <p className="text-blue-600 font-semibold mb-4">
                            Status: {selectedProject?.status}
                          </p>
                        )}
                        <Link
                          href="/contact"
                          className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
