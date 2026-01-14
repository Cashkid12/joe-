'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
}

export default function ProjectsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Sample projects (in production, this would come from a database)
  const [projects, setProjects] = useState<Project[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Web Application',
    description: '',
    technologies: '',
    github: '',
    demo: '',
    image: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const techArray = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    
    const newProject: Project = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      technologies: techArray,
      github: formData.github,
      demo: formData.demo,
      image: formData.image || '/projects/default.jpg'
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? newProject : p));
    } else {
      setProjects([...projects, newProject]);
    }

    // Reset form
    setFormData({
      title: '',
      type: 'Web Application',
      description: '',
      technologies: '',
      github: '',
      demo: '',
      image: ''
    });
    setImagePreview('');
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      type: project.type,
      description: project.description,
      technologies: project.technologies.join(', '),
      github: project.github,
      demo: project.demo,
      image: project.image
    });
    setImagePreview(project.image);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: '',
      type: 'Web Application',
      description: '',
      technologies: '',
      github: '',
      demo: '',
      image: ''
    });
    setImagePreview('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-600 hover:text-black transition">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-black text-white py-4 shadow-lg">
        <div className="container-custom flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-gray-300 transition">
              Dashboard
            </Link>
            <Link href="/" className="hover:text-gray-300 transition">
              View Portfolio
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Add Project Button */}
        {!showForm && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              + Add New Project
            </button>
          </div>
        )}

        {/* Project Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="E.g., E-Commerce Platform"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                    required
                    aria-label="Project Type"
                  >
                    <option>Web Application</option>
                    <option>Mobile Application</option>
                    <option>AI Application</option>
                    <option>Full-Stack Project</option>
                    <option>Frontend Project</option>
                    <option>Backend API</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="E.g., React, Node.js, MongoDB, Tailwind CSS"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    placeholder="https://your-project.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project-image" className="block text-gray-700 font-medium mb-2">
                  Project Image
                </label>
                <input
                  id="project-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border-2 border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
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
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full mb-3">
                  {project.type}
                </span>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && !showForm && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No projects yet. Add your first project!</p>
          </div>
        )}
      </div>
    </div>
  );
}
