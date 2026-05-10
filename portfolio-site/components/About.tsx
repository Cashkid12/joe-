export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container-custom">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 transform transition-all duration-500 hover:shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I am a self-taught Full-Stack Developer and AI enthusiast with a strong passion for building real-world web and mobile applications.
            </p>
            
            <p>
              I have learned modern web and software development through hands-on practice, online courses, and project-based learning. I enjoy turning ideas into functional, clean, and user-friendly applications using modern technologies.
            </p>
            
            <p>
              I focus on writing clean code, learning continuously, and building practical solutions that solve real problems.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Education / Learning</h3>
            <div className="border-l-4 border-black pl-6">
              <h4 className="text-xl font-semibold">Self-Taught Full-Stack Developer</h4>
              <p className="text-gray-600 mb-3">Online Learning & Practical Projects</p>
              
              <p className="text-gray-700 mb-3">
                I studied software development through online platforms including YouTube tutorials, FreeCodeCamp, and Udemy courses. My learning approach focuses on hands-on experience by building complete applications from scratch.
              </p>
              
              <div className="mt-4">
                <p className="font-semibold mb-2">Key areas of study include:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Web development (Frontend & Backend)</li>
                  <li>Mobile application development</li>
                  <li>Database design</li>
                  <li>API development and integration</li>
                  <li>Basic AI and data-driven applications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
