'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black text-white z-50 shadow-lg">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Portfolio
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-gray-300 transition">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-gray-300 transition">
                About
              </button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-gray-300 transition">
                Skills
              </button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-gray-300 transition">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-gray-300 transition">
                Contact
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col space-y-1.5 w-6 h-6 justify-center"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col p-8 space-y-6 mt-16">
          <button
            onClick={() => scrollToSection('home')}
            className="text-lg hover:text-gray-300 transition text-left"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-lg hover:text-gray-300 transition text-left"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-lg hover:text-gray-300 transition text-left"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-lg hover:text-gray-300 transition text-left"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-lg hover:text-gray-300 transition text-left"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
