import React, { useState, useEffect } from 'react';
import { Cpu, Network, Database, Search, Filter } from 'lucide-react';
import CPUArchitectureAnimation from './CPUArchitecture';
import LinuxKernelVsUbuntu from './LinuxKernelVsUbuntu';
import UPF5GSimulator from './App';

const HomePage = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredDemos, setFilteredDemos] = useState([]);

  const demos = [
    {
      id: 'cpu-architecture',
      title: 'CPU Architecture Simulator',
      description: 'Interactive visualization of CPU architecture showing execution pipeline and component interaction',
      icon: <Cpu size={24} />,
      color: 'bg-blue-500',
      component: <CPUArchitectureAnimation />,
      category: 'hardware'
    },
    {
      id: 'linux-vs-ubuntu',
      title: 'Linux Kernel vs Ubuntu OS',
      description: 'Compare Linux Kernel and Ubuntu OS with interactive execution flow visualization',
      icon: <Database size={24} />,
      color: 'bg-purple-500',
      component: <LinuxKernelVsUbuntu />,
      category: 'software'
    },
    {
      id: 'upf-5g',
      title: '5G UPF Network Flow Simulator',
      description: 'Simulate 5G User Plane Function with SR-IOV and DPDK network flow visualization',
      icon: <Network size={24} />,
      color: 'bg-green-500',
      component: <UPF5GSimulator />,
      category: 'network'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Demos' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'software', name: 'Software' },
    { id: 'network', name: 'Network' }
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

  const handleBackClick = () => {
    setActiveDemo(null);
  };

  if (activeDemo) {
    const demo = demos.find(d => d.id === activeDemo);
    
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center">
            <button 
              onClick={handleBackClick}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            <h1 className="text-2xl font-bold">{demo.title}</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {demo.component}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Interactive Educational Demos</h1>
          <p className="text-xl text-gray-600">Explore complex computing concepts through interactive visualizations</p>
        </header>

        {/* Search and Filter UI */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-96">
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
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-600" />
              <span className="text-gray-700">Filter:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeFilter === category.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display filter results count */}
        <div className="mb-4 text-gray-600">
          {filteredDemos.length === 0 ? (
            <p>No demos found matching your criteria</p>
          ) : (
            <p>Showing {filteredDemos.length} {filteredDemos.length === 1 ? 'demo' : 'demos'}</p>
          )}
        </div>

        {/* Demo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemos.map(demo => (
            <div 
              key={demo.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setActiveDemo(demo.id)}
            >
              <div className={`${demo.color} h-2`}></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className={`${demo.color} p-2 rounded-lg mr-3 text-white`}>
                    {demo.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{demo.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{demo.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    {demo.category.charAt(0).toUpperCase() + demo.category.slice(1)}
                  </span>
                  <button 
                    className={`px-4 py-2 rounded-lg text-white ${demo.color} hover:opacity-90`}
                    onClick={() => setActiveDemo(demo.id)}
                  >
                    Launch Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDemos.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700">No matching demos found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
            >
              Reset filters
            </button>
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500">
          <p>© 2025 Interactive Educational Demos - Hosted on GitHub Pages</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;