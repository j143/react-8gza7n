import React, { useState } from 'react';
import { Cpu, Network, Database } from 'lucide-react';
import CPUArchitectureAnimation from './CPUArchitecture';
import LinuxKernelVsUbuntu from './LinuxKernelVsUbuntu';
import UPF5GSimulator from './App';

const HomePage = () => {
  const [activeDemo, setActiveDemo] = useState(null);

  const demos = [
    {
      id: 'cpu-architecture',
      title: 'CPU Architecture Simulator',
      description: 'Interactive visualization of CPU architecture showing execution pipeline and component interaction',
      icon: <Cpu size={24} />,
      color: 'bg-blue-500',
      component: <CPUArchitectureAnimation />
    },
    {
      id: 'linux-vs-ubuntu',
      title: 'Linux Kernel vs Ubuntu OS',
      description: 'Compare Linux Kernel and Ubuntu OS with interactive execution flow visualization',
      icon: <Database size={24} />,
      color: 'bg-purple-500',
      component: <LinuxKernelVsUbuntu />
    },
    {
      id: 'upf-5g',
      title: '5G UPF Network Flow Simulator',
      description: 'Simulate 5G User Plane Function with SR-IOV and DPDK network flow visualization',
      icon: <Network size={24} />,
      color: 'bg-green-500',
      component: <UPF5GSimulator />
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map(demo => (
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
                <button 
                  className={`px-4 py-2 rounded-lg text-white ${demo.color} hover:opacity-90`}
                  onClick={() => setActiveDemo(demo.id)}
                >
                  Launch Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-gray-500">
          <p>© 2025 Interactive Educational Demos - Hosted on GitHub Pages</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;