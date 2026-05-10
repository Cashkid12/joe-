"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Contact form state
  type FormErrors = Record<string, string>;
  type SubmitState = 'idle' | 'sending' | 'sent' | 'error';
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitState>('idle');

  // State for projects
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadProjects = () => {
      const savedProjects = localStorage.getItem('portfolio-projects');
      if (savedProjects) {
        try {
          setProjects(JSON.parse(savedProjects));
        } catch {
          setProjects([]);
        }
      } else {
        // Seed data
        const seed = [
          {
            id: 1,
            title: "Portfolio Website",
            description: "A clean, minimalist personal portfolio built with Next.js and Tailwind CSS featuring dark mode support.",
            tech: ["Next.js", "Tailwind CSS", "TypeScript"],
            category: "Web",
            demoLink: "#",
            sourceLink: "https://github.com/Cashkid12/portfolio",
            image: ""
          },
          {
            id: 2,
            title: "Task Manager App",
            description: "A cross-platform task management app with push notifications and cloud sync.",
            tech: ["React Native", "Expo", "Firebase"],
            category: "Mobile",
            demoLink: "#",
            sourceLink: "https://github.com/Cashkid12/taskmanager",
            image: ""
          }
        ];
        setProjects(seed);
        localStorage.setItem('portfolio-projects', JSON.stringify(seed));
      }
    };

    loadProjects();

    // Listen for changes from admin panel
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio-projects') {
        loadProjects();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const experiences = [
    {
      id: 1,
      title: "Full-Stack Developer",
      company: "Self-Employed",
      duration: "Present",
      description: "Developed web, mobile, and AI-powered projects using Next.js, React, Node.js, Express, React Native, Expo, and Python. Built full-stack applications including student management systems, mobile apps, and AI prediction tools."
    },
    {
      id: 2,
      title: "Database & API Developer",
      company: "Freelance",
      duration: "2021 - Present",
      description: "Experienced in database design (PostgreSQL, MongoDB), REST APIs, and deployment to platforms like Vercel and Render. Passionate about learning new technologies and building real-world applications."
    }
  ];

  const education = [
    {
      id: 1,
      institution: "Self-Taught Full-Stack Developer & AI Enthusiast",
      course: "Full Stack Web Development & AI",
      period: "2021 - Present",
      description: "Learned JavaScript, React, Next.js, Node.js, Express, React Native, Expo, Python, FastAPI. Studied through YouTube tutorials, FreeCodeCamp, and Udemy courses. Gained practical experience in full-stack development, AI integration, REST APIs, and deployment."
    }
  ];

  const skills = [
    {
      title: "Frontend Development",
      tags: ["JavaScript", "React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      title: "Backend Development",
      tags: ["Node.js", "Express.js", "Python", "FastAPI"],
    },
    {
      title: "Mobile Development",
      tags: ["React Native", "Expo"],
    },
    {
      title: "Databases",
      tags: ["MySQL", "MongoDB"],
    },
    {
      title: "Tools & Technologies",
      tags: ["Git", "GitHub", "REST APIs", "Docker"],
    },
    {
      title: "Other Skills",
      tags: ["Problem Solving", "API Integration", "Responsive Design"],
    },
  ];

  /* ---- Contact form handlers ---- */
  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Name is required (min 2 characters)';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message is required (min 10 characters)';
    }
    return errors;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus('sending');

    // Simulate sending (replace with Formspree/API later)
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  /* ---- Submit button config ---- */
  const submitBtn = {
    idle:   { text: 'Send Message',                     cls: 'bg-black text-white hover:bg-[#1f2937]' },
    sending:{ text: 'Sending...',                       cls: 'bg-gray-400 text-white cursor-not-allowed opacity-75' },
    sent:   { text: 'Message Sent!',                    cls: 'bg-green-500 text-white' },
    error:  { text: 'Something went wrong',             cls: 'bg-red-500 text-white' },
  }[submitStatus];

  return (
    <div className="min-h-screen bg-[#f4f4f5] font-sans text-gray-900">
      {/* Hero Section */}
      <section id="hero" className="bg-[#f4f4f5] py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Profile photo */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-200 bg-gray-300 overflow-hidden mx-auto mb-6">
            <img
              src="/images/projects/profile.jpg"
              alt="Joe Nthiga"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#171717] mb-3">
            Joe Nthiga
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6">
            Self-Taught Full-Stack Developer
          </p>

          {/* Bio */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            I am a self-taught Full-Stack Developer and AI enthusiast with
            a strong passion for building real-world web and mobile applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="bg-black text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-[#1f2937] transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="bg-white border border-gray-300 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-base text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Get In Touch
            </a>
          </div>

          {/* Resume download */}
          <a
            href="#"
            className="inline-flex items-center justify-center gap-1.5 mt-6 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Resume
          </a>

        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">About</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">About Me</h2>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
            I am a self-taught Full-Stack Developer and AI enthusiast with
            a strong passion for building real-world web and mobile applications.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            I have learned modern web and software development through
            hands-on practice, online courses, and project-based learning. I enjoy
            turning ideas into functional, clean, and user-friendly applications
            using modern technologies. I focus on writing clean code, learning
            continuously, and building practical solutions that solve real problems.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="bg-[#f4f4f5] py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Learning</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">Education / Learning</h2>
          </div>

          {/* Education card */}
          <div className="max-w-2xl mx-auto p-5 sm:p-8 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors text-left">

            {/* Institution name */}
            <h3 className="text-lg sm:text-xl font-semibold text-[#171717] mb-1">
              Self-Taught Full-Stack Developer
            </h3>

            {/* Period / subtitle */}
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Online Learning & Practical Projects
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              I studied software development through online platforms
              including YouTube tutorials, FreeCodeCamp, and Udemy courses.
              My learning approach focuses on hands-on experience by building
              complete applications from scratch.
            </p>

            {/* Divider */}
            <hr className="border-t border-gray-200 my-4" />

            {/* Subheading */}
            <p className="text-sm font-medium text-gray-700 mb-3">
              Key areas of study include:
            </p>

            {/* Study areas list */}
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base text-gray-600">Web development (Frontend &amp; Backend)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base text-gray-600">Mobile application development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base text-gray-600">Database design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base text-gray-600">API development and integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base text-gray-600">Basic AI and data-driven applications</span>
              </li>
            </ul>

          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section id="skills" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Skills</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">Core Competencies</h2>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {skills.map((category) => (
              <div
                key={category.title}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-gray-300 transition-colors text-left"
              >
                {/* Category Title */}
                <h3 className="text-base sm:text-lg font-semibold text-[#171717] mb-3 sm:mb-4">
                  {category.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs sm:text-sm text-gray-700 font-medium bg-gray-100 border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="bg-[#f4f4f5] py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">Featured Projects</h2>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex rounded-full border border-gray-300 bg-white p-1 overflow-x-auto whitespace-nowrap">
              {['All', 'Web', 'Mobile', 'Backend', 'AI/ML'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 sm:px-5 sm:py-2 text-sm font-medium rounded-full transition-colors ${
                    activeFilter === filter
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards */}
          {filteredProjects.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-12">
              No projects in this category yet.
            </p>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto text-left">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors md:flex"
                >
                  {/* Project Image */}
                  <div className="md:w-48 flex-shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 md:h-full md:min-h-[200px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 md:h-full md:min-h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-gray-300">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1">

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-[#171717] mb-2">{project.title}</h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.tech) ? project.tech.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs text-gray-700 font-mono bg-gray-100 border border-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    )) : (project.tech as string).split(',').map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs text-gray-700 font-mono bg-gray-100 border border-gray-200 rounded-full"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.demoLink}
                      className="inline-flex items-center gap-1 px-4 py-1.5 sm:px-5 sm:py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-[#1f2937] transition-colors"
                    >
                      Live Demo
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                    <a
                      href={project.sourceLink}
                      className="inline-flex items-center gap-1 px-4 py-1.5 sm:px-5 sm:py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      Source Code
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Career</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">Experience</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="border-l-2 border-gray-200 pl-4 pb-6 relative"
              >
                <div className="absolute -left-1 top-0 w-3 h-3 rounded-full bg-black"></div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{exp.title}</h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-1 gap-1">
                  <span className="text-gray-700">{exp.company}</span>
                  <span className="text-gray-500 text-sm">{exp.duration}</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-10 sm:mb-14 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Contact</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">Get In Touch</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mt-3">
              I&apos;m always open to discussing new projects, opportunities, or collaborations. Feel free to reach out if you&apos;d like to connect!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-4xl mx-auto text-left">
            {/* Contact Info */}
            <div className="flex flex-col space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#171717] mb-2">Contact Information</h3>

              {/* Contact Items */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Email</span>
                    <span className="text-sm sm:text-base text-gray-700">joenthiga678@gmail.com</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Location</span>
                    <span className="text-sm sm:text-base text-gray-700">Nairobi, Kenya</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Phone</span>
                    <span className="text-sm sm:text-base text-gray-700">+254 701 747 503</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-3">Connect with me</p>
                <div className="flex gap-3">
                  {/* GitHub */}
                  <a
                    href="https://github.com/Cashkid12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600 hover:text-black">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:joenthiga678@gmail.com"
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/joenthiga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600 hover:text-black">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-5" onSubmit={handleContactSubmit} noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={e => handleFormChange('name', e.target.value)}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all ${formErrors.name ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && <p className="text-xs text-red-600 mt-0.5">{formErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={e => handleFormChange('email', e.target.value)}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all ${formErrors.email ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <p className="text-xs text-red-600 mt-0.5">{formErrors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={e => handleFormChange('subject', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={e => handleFormChange('message', e.target.value)}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none ${formErrors.message ? 'border-red-400' : 'border-gray-300'}`}
                    placeholder="Enter your message"
                  ></textarea>
                  {formErrors.message && <p className="text-xs text-red-600 mt-0.5">{formErrors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className={`w-full py-3 rounded-lg font-medium text-sm sm:text-base transition-colors mt-2 ${submitBtn.cls}`}
                >
                  {submitBtn.text}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}