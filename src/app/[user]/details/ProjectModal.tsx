'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  status?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  closeModal: () => void;
  project: Project | null;
  placeholderImage: string;
}

const ProjectModal = ({ isOpen, closeModal, project, placeholderImage }: ProjectModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-6">
            {/* Apply transition directly to the content */}
            <div
              className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
              style={{
                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                transform: isOpen ? 'scale(1)' : 'scale(0.95)',
                opacity: isOpen ? 1 : 0,
              }}
            >
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
                  <h2 className="text-3xl font-bold text-red-600 mb-4">{project?.name}</h2>
                  <p className="text-gray-700 text-lg mb-6">{project?.description}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Display multiple images */}
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="relative w-full h-96 p-2">
                      <Image
                        src={project?.imageUrl || placeholderImage}
                        alt={project?.name || "Project image"}
                        fill
                        className="object-cover rounded-l-lg"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  ))}

                  <div className="p-6">
                    {project?.status && (
                      <p className="text-blue-600 font-semibold mb-4">
                        Status: {project.status}
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
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectModal;
