"use client";

import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Intersection Observer for active nav link ---- */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navLinkCls = (section: string) =>
    `text-sm font-medium transition-colors ${
      activeSection === section
        ? 'text-black font-semibold'
        : 'text-gray-600 hover:text-black'
    }`;

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans">
        {/* Sticky Navbar */}
        <nav
          className={`sticky top-0 z-50 h-16 border-b border-gray-200 transition-all duration-300 ${
            scrolled ? "bg-white/90 backdrop-blur" : "bg-white"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-mono text-sm font-bold shrink-0 hover:bg-gray-800 transition-colors"
              aria-label="Joe Nthiga Home"
            >
              JN
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className={navLinkCls('about')}>About</a>
              <a href="#skills" className={navLinkCls('skills')}>Skills</a>
              <a href="#projects" className={navLinkCls('projects')}>Projects</a>
              <a href="#contact" className={navLinkCls('contact')}>Contact</a>
              <a href="#contact" className="text-sm bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Get In Touch
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Mobile dropdown */}
          <div className={`md:hidden bg-white border-b border-gray-200 shadow-lg ${mobileOpen ? "" : "hidden"}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <a href="#about" onClick={closeMobile} className={`block text-base py-3 border-b border-gray-100 font-medium transition-colors ${activeSection === 'about' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}>About</a>
              <a href="#skills" onClick={closeMobile} className={`block text-base py-3 border-b border-gray-100 font-medium transition-colors ${activeSection === 'skills' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}>Skills</a>
              <a href="#projects" onClick={closeMobile} className={`block text-base py-3 border-b border-gray-100 font-medium transition-colors ${activeSection === 'projects' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}>Projects</a>
              <a href="#contact" onClick={closeMobile} className={`block text-base py-3 border-b border-gray-100 font-medium transition-colors ${activeSection === 'contact' ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`}>Contact</a>
              <a href="#contact" onClick={closeMobile} className="block text-base py-3 mt-1 mb-1 text-center bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                Get In Touch
              </a>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-[#f4f4f5] py-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              &copy; 2026 Joe Nthiga. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a href="https://github.com/Cashkid12" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full border border-gray-300 hover:border-gray-500 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                 aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Email */}
              <a href="mailto:joenthiga678@gmail.com"
                 className="w-9 h-9 rounded-full border border-gray-300 hover:border-gray-500 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                 aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 4-10 8L2 4"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/joenthiga/" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full border border-gray-300 hover:border-gray-500 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                 aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}