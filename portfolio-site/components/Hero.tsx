'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12">
      <div className="container-custom text-center">
        {/* Profile Photo - Animated */}
        <div className="mb-8 flex justify-center animate-fade-in">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-black transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:rotate-3">
            <Image
              src="/joe.jpg"
              alt="Joe Nthiga"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">
          Joe Nthiga
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Self-Taught Full-Stack Developer
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          I am a self-taught Full-Stack Developer and AI enthusiast with a strong passion for building real-world web and mobile applications.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg"
          >
            Get In Touch
          </button>
        </div>
        
        <a
          href="/resume.pdf"
          download
          className="text-gray-600 hover:text-black underline transition-all duration-300 animate-slide-up inline-block"
          style={{ animationDelay: '0.4s' }}
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
