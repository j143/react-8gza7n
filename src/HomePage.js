import React, { useState, useEffect } from 'react';
import { Cpu, Network, Database, Search, Filter, Github, Mail, Twitter, Book, Code, Layers } from 'lucide-react';
import CPUArchitectureAnimation from './CPUArchitecture';
import LinuxKernelVsUbuntu from './LinuxKernelVsUbuntu';
import UPF5GSimulator from './App';

const HomePage = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredDemos, setFilteredDemos] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const demos = [
    {
      id: 'cpu-architecture',
      title: 'CPU Architecture Simulator',
      description: 'Interactive visualization of CPU architecture showing execution pipeline and component interaction',
      icon: <Cpu size={24} />,
      color: 'bg-blue-600',
      component: <CPUArchitectureAnimation />,
      category: 'hardware'
    },
    {
      id: 'linux-vs-ubuntu',
      title: 'Linux Kernel vs Ubuntu OS',
      description: 'Compare Linux Kernel and Ubuntu OS with interactive execution flow visualization',
      icon: <Database size={24} />,
      color: 'bg-purple-600',
      component: <LinuxKernelVsUbuntu />,
      category: 'software'
    },
    {
      id: 'upf-5g',
      title: '5G UPF Network Flow Simulator',
      description: 'Simulate 5G User Plane Function with SR-IOV and DPDK network flow visualization',
      icon: <Network size={24} />,
      color: 'bg-emerald-600',
      component: <UPF5GSimulator />,
      category: 'network'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Demos', icon: <Layers size={16} /> },
    { id: 'hardware', name: 'Hardware', icon: <Cpu size={16} /> },
    { id: 'software', name: 'Software', icon: <Code size={16} /> },
    { id: 'network', name: 'Network', icon: <Network size={16} /> }
  ];

  // Filter and search demos whenever dependencies change
  useEffect(() => {
    let result = [...demos];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(demo => demo.category === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(demo => 
        demo.title.toLowerCase().includes(lowerCaseSearch) || 
        demo.description.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    setFilteredDemos(result);
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    // Initialize filtered demos on first load
    setFilteredDemos([...demos]);
  }, []);

  const handleBackClick = () => {
    setActiveDemo(null);
  };

  // Navbar Component
  const Navbar = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                <Book size={20} />
              </div>
              <span className="text-lg font-bold text-gray-900">Interactive Demos</span>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">Home</a>
            <a href="#about" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-blue-600">About</a>
            <a href="#resources" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-blue-600">Resources</a>
            <a href="#contact" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-blue-600">Contact</a>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100">Home</a>
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100">About</a>
            <a href="#resources" className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100">Resources</a>
            <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );

  if (activeDemo) {
    const demo = demos.find(d => d.id === activeDemo);
    
    return (
      <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center">
            <button 
              onClick={handleBackClick}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{demo.title}</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {demo.component}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Interactive Educational Demos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore complex computing concepts through interactive visualizations
          </p>
          <div className="flex justify-center gap-4">
            <a href="#demos" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              View Demos
            </a>
            <a href="#resources" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Resources
            </a>
          </div>
        </div>

        {/* Demos Section */}
        <div id="demos" className="pt-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse Our Demos</h2>
            <div className="hidden sm:block bg-blue-50 text-blue-700 text-sm px-4 py-1.5 rounded-full">
              {filteredDemos.length} {filteredDemos.length === 1 ? 'Demo' : 'Demos'} Available
            </div>
          </div>

          {/* Search and Filter UI */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search animations by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category filter */}
              <div className="w-full sm:w-auto">
                <div className="inline-flex flex-wrap rounded-lg border border-gray-200 bg-white p-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeFilter === category.id 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-1.5">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Display filter results count for mobile */}
          <div className="sm:hidden mb-4 bg-blue-50 text-blue-700 text-center text-sm px-3 py-1.5 rounded-full">
            {filteredDemos.length} {filteredDemos.length === 1 ? 'Demo' : 'Demos'} Available
          </div>

          {/* Demo cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDemos.map(demo => (
              <div 
                key={demo.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1"
                onClick={() => setActiveDemo(demo.id)}
              >
                <div className={`${demo.color} h-2`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${demo.color} bg-opacity-10 p-2.5 rounded-lg mr-3 text-${demo.color.substring(3)}`}>
                      {demo.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{demo.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed">{demo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                      {demo.category.charAt(0).toUpperCase() + demo.category.slice(1)}
                    </span>
                    <button 
                      className={`px-4 py-2 rounded-lg text-white ${demo.color} hover:opacity-90 text-sm font-medium`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDemo(demo.id);
                      }}
                    >
                      Explore Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDemos.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-gray-400 mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800">No matching demos found</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for</p>
              <button 
                className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* About Section */}
        <div id="about" className="py-16 border-t border-gray-200">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About These Demos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our interactive educational demos help students, professionals, and tech enthusiasts visualize complex computing concepts in an engaging way.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Book size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Educational Focus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Designed with students and educators in mind, our demos break down complex technical concepts into visual, interactive experiences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Technical Accuracy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">All demos are based on real-world systems and architectures, ensuring that visualizations accurately represent the underlying technical concepts.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Interactive Learning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Interaction is key to understanding. Our demos allow users to manipulate parameters and see the effects in real time.</p>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div id="resources" className="py-16 border-t border-gray-200">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Expand your knowledge with these carefully selected learning resources</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-2 text-gray-900">CPU Architecture Fundamentals</h3>
              <p className="text-gray-600 mb-3">Learn about modern CPU designs, pipelines, and execution units.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-medium">Read article</span>
                <span className="text-gray-500">10 min read</span>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Linux Kernel Deep Dive</h3>
              <p className="text-gray-600 mb-3">Understand how the Linux kernel works and its relationship with distributions.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-medium">View tutorial</span>
                <span className="text-gray-500">15 min read</span>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-2 text-gray-900">5G Networks Explained</h3>
              <p className="text-gray-600 mb-3">Explore the architecture and protocols behind 5G networking.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-medium">Watch video</span>
                <span className="text-gray-500">8 min video</span>
              </div>
            </a>
            
            <a href="#" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Visualization in Education</h3>
              <p className="text-gray-600 mb-3">Research on the effectiveness of visual learning for technical subjects.</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-medium">Access research</span>
                <span className="text-gray-500">12 min read</span>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16 border-t border-gray-200">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions or suggestions? Want to contribute your own educational demo?</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <a href="mailto:contact@interactive-demos.edu" className="flex items-center px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Mail size={20} className="text-gray-600 mr-2" />
              <span className="text-gray-800 font-medium">Email Us</span>
            </a>
            
            <a href="https://github.com/interactive-demos" className="flex items-center px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Github size={20} className="text-gray-600 mr-2" />
              <span className="text-gray-800 font-medium">GitHub</span>
            </a>
            
            <a href="https://twitter.com/interactive_edu" className="flex items-center px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Twitter size={20} className="text-gray-600 mr-2" />
              <span className="text-gray-800 font-medium">Twitter</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                <Book size={16} />
              </div>
              <span className="text-lg font-bold text-gray-900">Interactive Demos</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Accessibility</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Interactive Educational Demos. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Made with 💙 for educational advancement</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;