"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoLink: string;
  sourceLink: string;
  image?: string;
}

export default function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    title: '',
    category: 'Web',
    description: '',
    techStack: '',
    demoLink: '#',
    sourceLink: '#',
    image: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageName, setImageName] = useState('');
  const [imageError, setImageError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /* ---- Auth check ---- */
  useEffect(() => {
    const isAuth = localStorage.getItem('admin-auth');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    const saved = localStorage.getItem('portfolio-projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch {
        setProjects([]);
      }
    }
  }, [router]);

  /* ---- Save to localStorage ---- */
  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('portfolio-projects', JSON.stringify(updated));
  };

  /* ---- Reset form ---- */
  const resetForm = () => {
    setForm({ title: '', category: 'Web', description: '', techStack: '', demoLink: '#', sourceLink: '#', image: '' });
    setEditingId(null);
    setImageName('');
    setImageError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  /* ---- Image upload ---- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image must be under 2MB');
      return;
    }
    setImageError('');
    setImageName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, image: '' }));
    setImageName('');
    if (fileRef.current) fileRef.current.value = '';
  };

  /* ---- Submit ---- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImageError('');

    if (!form.title.trim() || !form.description.trim() || form.description.trim().length < 10) return;

    const projectData: Project = {
      id: editingId ?? Date.now(),
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      tech: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      demoLink: form.demoLink.trim() || '#',
      sourceLink: form.sourceLink.trim() || '#',
      image: form.image || undefined,
    };

    let updated: Project[];
    if (editingId) {
      updated = projects.map(p => (p.id === editingId ? projectData : p));
    } else {
      updated = [...projects, projectData];
    }

    // Remove image key if empty (clean storage)
    if (!projectData.image) delete (projectData as any).image;

    saveProjects(updated);
    resetForm();
  };

  /* ---- Edit ---- */
  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      techStack: project.tech.join(', '),
      demoLink: project.demoLink,
      sourceLink: project.sourceLink,
      image: project.image || '',
    });
    setImageName(project.image ? 'Current image' : '');
    setImageError('');
  };

  /* ---- Delete ---- */
  const deleteProject = (id: number) => {
    if (!window.confirm('Delete this project?')) return;
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    if (editingId === id) resetForm();
  };

  /* ---- Logout ---- */
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    router.push('/');
  };

  const isEditing = editingId !== null;

  return (
    <div className="min-h-screen bg-[#f4f4f5] font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* ============================================ */}
        {/*  1. HEADER BAR                               */}
        {/* ============================================ */}
        <header className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[#171717]">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </header>

        {/* ============================================ */}
        {/*  2. TWO-COLUMN GRID                          */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ========================================== */}
          {/*  LEFT — Add / Edit Project Form            */}
          {/* ========================================== */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#171717] mb-6">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  id="title" name="title" type="text" value={form.title} required
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category" name="category" value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="Web">Web</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description" name="description" value={form.description} required minLength={10} rows={3}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Tech Stack */}
              <div>
                <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                <input
                  id="techStack" name="techStack" type="text" value={form.techStack}
                  onChange={e => setForm(prev => ({ ...prev, techStack: e.target.value }))}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
              </div>

              {/* Demo Link */}
              <div>
                <label htmlFor="demoLink" className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                <input
                  id="demoLink" name="demoLink" type="url" value={form.demoLink}
                  onChange={e => setForm(prev => ({ ...prev, demoLink: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Source Link */}
              <div>
                <label htmlFor="sourceLink" className="block text-sm font-medium text-gray-700 mb-1">Source Code URL</label>
                <input
                  id="sourceLink" name="sourceLink" type="url" value={form.sourceLink}
                  onChange={e => setForm(prev => ({ ...prev, sourceLink: e.target.value }))}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* ======================================== */}
              {/*  FIELD 7 — PROJECT IMAGE                 */}
              {/* ======================================== */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>

                {form.image ? (
                  /* State B — Image Selected */
                  <div>
                    <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">{imageName}</span>
                      <button type="button" onClick={removeImage} className="text-xs text-red-500 hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  /* State A — No Image */
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 mx-auto mb-2 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                    </svg>
                    <p className="text-sm text-gray-500">Click to upload project image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WebP (max 2MB)</p>
                  </div>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imageError && <p className="text-xs text-red-500 mt-1">{imageError}</p>}
                <p className="text-xs text-gray-500 mt-1">Image will be displayed in your portfolio project card</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1f2937] transition-colors"
                >
                  {isEditing ? 'Update Project' : 'Add Project'}
                </button>

                {isEditing && (
                  <button
                    type="button" onClick={resetForm}
                    className="bg-white border border-gray-300 px-5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!isEditing && (
                <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700 transition-colors mt-3">
                  Clear Form
                </button>
              )}
            </form>
          </div>

          {/* ========================================== */}
          {/*  RIGHT — Project List                      */}
          {/* ========================================== */}
          <div className="bg-white shadow-md rounded-xl p-6 max-h-[700px] flex flex-col">
            {/* List Title */}
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold text-[#171717]">Current Projects</h2>
              <span className="inline-flex bg-gray-100 text-gray-600 text-xs font-mono px-2 py-0.5 rounded-full ml-2">
                {projects.length}
              </span>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto pr-1 flex-1 space-y-3">
              {projects.length === 0 ? (
                /* Empty State */
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-300 mx-auto mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">No projects yet</p>
                  <p className="text-xs text-gray-400">Add your first project!</p>
                </div>
              ) : (
                projects.map(project => {
                  const tags = project.tech || [];
                  const visibleTags = tags.slice(0, 4);
                  const extra = tags.length - 4;

                  return (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      {/* Top Row — Title + Actions */}
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-[#171717] text-sm sm:text-base">{project.title}</span>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => startEdit(project)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <p className="text-xs text-gray-500 font-medium mt-1">{project.category}</p>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mt-1 truncate">{project.description}</p>

                      {/* Image Thumbnail */}
                      {project.image && (
                        <img src={project.image} alt={project.title} className="w-full h-24 object-cover rounded mt-2" />
                      )}

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {visibleTags.map((tag, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                        {extra > 0 && (
                          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">
                            +{extra} more
                          </span>
                        )}
                      </div>

                      {/* Links Row */}
                      <div className="flex gap-3 mt-2">
                        {project.demoLink && project.demoLink !== '#' && (
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                        {project.sourceLink && project.sourceLink !== '#' && (
                          <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
