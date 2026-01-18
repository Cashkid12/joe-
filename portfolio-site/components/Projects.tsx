'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.image && (
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
              
              {/* Technologies */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links */}
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white text-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-black text-black text-center px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
