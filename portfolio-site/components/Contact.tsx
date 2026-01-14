'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new message object
    const newMessage = {
      id: Date.now().toString(),
      name: formData.name,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const existingMessages = localStorage.getItem('portfolioMessages');
      const messages = existingMessages ? JSON.parse(existingMessages) : [];
      messages.unshift(newMessage); // Add to beginning of array
      localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    }
    
    // Show success message
    alert('Message sent successfully! I will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Get In Touch</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            I'm always open to discussing new projects, opportunities, or collaborations.
            Feel free to reach out if you'd like to connect!
          </p>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-[#F5F5F5] rounded-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Send Message
              </button>
            </div>
          </form>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F5F5F5] rounded-lg p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 font-medium">Email</p>
              </div>
              <a href="mailto:joenthiga678@gmail.com" className="text-lg font-semibold hover:underline break-all">
                joenthiga678@gmail.com
              </a>
            </div>
            
            <div className="bg-[#F5F5F5] rounded-lg p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-600 font-medium">GitHub</p>
              </div>
              <a 
                href="https://github.com/Cashkid12" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:underline"
              >
                github.com/Cashkid12
              </a>
            </div>
            
            <div className="bg-[#F5F5F5] rounded-lg p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 font-medium">Location</p>
              </div>
              <p className="text-lg font-semibold">
                Nairobi, Kenya
              </p>
            </div>
            
            <div className="bg-[#F5F5F5] rounded-lg p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-600 font-medium">Phone</p>
              </div>
              <a href="tel:+254701747503" className="text-lg font-semibold hover:underline">
                +254 701 747 503
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
