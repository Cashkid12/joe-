'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  name: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Sample messages (in production, this would come from a database)
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const loadMessages = () => {
      if (typeof window !== 'undefined') {
        const savedMessages = localStorage.getItem('portfolioMessages');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      }
    };
    
    loadMessages();
    
    // Refresh messages every 5 seconds to check for new ones
    const interval = setInterval(loadMessages, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in production, use proper auth)
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    // Mark as read
    const updatedMessages = messages.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    );
    setMessages(updatedMessages);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioMessages', JSON.stringify(updatedMessages));
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(m => m.id !== id);
      setMessages(updatedMessages);
      setSelectedMessage(null);
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolioMessages', JSON.stringify(updatedMessages));
      }
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

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
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
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
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold animate-pulse">
                {unreadCount} New
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/projects" className="hover:text-gray-300 transition">
              Manage Projects
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Messages</h3>
            <p className="text-3xl font-bold">{messages.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Unread Messages</h3>
            <p className="text-3xl font-bold text-red-600">{unreadCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Read Messages</h3>
            <p className="text-3xl font-bold text-green-600">{messages.length - unreadCount}</p>
          </div>
          <Link
            href="/admin/projects"
            className="bg-black text-white rounded-xl shadow-md p-6 hover:bg-gray-800 transition flex flex-col justify-center items-center"
          >
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-lg font-bold">Manage Projects</p>
          </Link>
        </div>

        {/* Messages Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="space-y-2">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet</p>
                ) : (
                  messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`w-full text-left p-4 rounded-lg transition ${
                        selectedMessage?.id === message.id
                          ? 'bg-black text-white'
                          : 'bg-[#F5F5F5] hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold">{message.name}</p>
                        {!message.read && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm opacity-80 truncate">{message.subject}</p>
                      <p className="text-xs opacity-60 mt-1">{message.date}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {selectedMessage ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                      <p className="text-gray-600">From: {selectedMessage.name}</p>
                      <p className="text-gray-500 text-sm">{selectedMessage.date}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="border-t pt-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
