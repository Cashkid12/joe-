import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <footer className="bg-black text-white py-8">
        <div className="container-custom text-center">
          <p>&copy; {new Date().getFullYear()} Joe Nthiga. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
