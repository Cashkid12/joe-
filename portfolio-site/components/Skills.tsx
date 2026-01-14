export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS']
    },
    {
      title: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Python', 'FastAPI']
    },
    {
      title: 'Mobile Development',
      skills: ['React Native', 'Expo']
    },
    {
      title: 'Databases',
      skills: ['MySQL', 'MongoDB']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'REST APIs', 'Docker']
    },
    {
      title: 'Other Skills',
      skills: ['Problem Solving', 'API Integration', 'Responsive Design']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-[#F5F5F5] rounded-xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
