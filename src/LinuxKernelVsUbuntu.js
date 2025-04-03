import React, { useState } from 'react';

import './style.css';

const LinuxKernelVsUbuntu = () => {
  const [activeFlow, setActiveFlow] = useState(null);
  const [showDetails, setShowDetails] = useState({
    kernel: false,
    userspace: false,
    shell: false,
    systemd: false,
    gnome: false
  });

  const toggleDetails = (section) => {
    setShowDetails({
      ...showDetails,
      [section]: !showDetails[section]
    });
  };

  const flowPaths = {
    userApp: [
      { id: 'userApp', duration: 500 },
      { id: 'gnomeLibs', duration: 500 },
      { id: 'glibc', duration: 500 },
      { id: 'syscall', duration: 500 },
      { id: 'vfs', duration: 500 },
      { id: 'filesystem', duration: 500 },
      { id: 'hardware', duration: 500 }
    ],
    systemService: [
      { id: 'systemd', duration: 500 },
      { id: 'glibc', duration: 500 },
      { id: 'syscall', duration: 500 },
      { id: 'process', duration: 500 },
      { id: 'hardware', duration: 500 }
    ],
    shellCommand: [
      { id: 'bash', duration: 500 },
      { id: 'glibc', duration: 500 },
      { id: 'syscall', duration: 500 },
      { id: 'vfs', duration: 500 },
      { id: 'process', duration: 500 },
      { id: 'hardware', duration: 500 }
    ]
  };

  const activateFlow = (flowName) => {
    setActiveFlow(flowName);
    const animateFlow = async () => {
      for (const step of flowPaths[flowName]) {
        document.getElementById(step.id).classList.add('highlight-animate');
        await new Promise(resolve => setTimeout(resolve, step.duration));
      }
      setTimeout(() => {
        document.querySelectorAll('.highlight-animate').forEach(el => {
          el.classList.remove('highlight-animate');
        });
        setActiveFlow(null);
      }, 1000);
    };
    animateFlow();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Linux Kernel vs Ubuntu OS: Program Execution Flow</h1>
      
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => activateFlow('userApp')} 
          disabled={activeFlow !== null}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Show GUI Application Flow
        </button>
        <button 
          onClick={() => activateFlow('systemService')} 
          disabled={activeFlow !== null}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Show System Service Flow
        </button>
        <button 
          onClick={() => activateFlow('shellCommand')} 
          disabled={activeFlow !== null}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Show Shell Command Flow
        </button>
      </div>

      <div className="relative w-full border-2 border-gray-300 rounded-lg p-4">
        {/* Ubuntu OS Layers */}
        <div className="border-b-2 border-gray-400 pb-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Ubuntu OS (User Space)</h2>
            <button 
              onClick={() => toggleDetails('userspace')}
              className="text-blue-600 hover:text-blue-800"
            >
              {showDetails.userspace ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* Application Layer */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div id="userApp" className="p-3 bg-blue-100 border border-blue-300 rounded-lg w-48 transition-all duration-300">
              GUI Applications
            </div>
            <div id="gnomeLibs" className="p-3 bg-blue-100 border border-blue-300 rounded-lg w-48 transition-all duration-300">
              GNOME/Desktop Environment
            </div>
            <div id="bash" className="p-3 bg-green-100 border border-green-300 rounded-lg w-48 transition-all duration-300">
              Bash/Terminal
            </div>
            <div id="systemd" className="p-3 bg-purple-100 border border-purple-300 rounded-lg w-48 transition-all duration-300">
              systemd Services
            </div>
          </div>

          {/* C Library Layer */}
          <div className="flex mb-4">
            <div id="glibc" className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg w-full transition-all duration-300">
              GNU C Library (glibc)
            </div>
          </div>

          {showDetails.userspace && (
            <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm">
              <p><strong>Ubuntu's User Space</strong> contains:</p>
              <ul className="list-disc pl-5 mt-2">
                <li><strong>GUI Applications:</strong> Firefox, LibreOffice, etc.</li>
                <li><strong>GNOME/Desktop Environment:</strong> Provides the graphical user interface</li>
                <li><strong>systemd:</strong> Init system managing services, mounts, and system startup</li>
                <li><strong>Bash/Terminal:</strong> Command-line interface</li>
                <li><strong>GNU C Library:</strong> Provides system call interface to the kernel</li>
              </ul>
              <p className="mt-2">Ubuntu includes package management (APT), default applications, and pre-configured system services.</p>
            </div>
          )}
        </div>

        {/* Linux Kernel */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Linux Kernel (Torvalds/Linux)</h2>
            <button 
              onClick={() => toggleDetails('kernel')}
              className="text-blue-600 hover:text-blue-800"
            >
              {showDetails.kernel ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {/* System Call Interface */}
          <div className="flex mb-4">
            <div id="syscall" className="p-3 bg-red-100 border border-red-300 rounded-lg w-full transition-all duration-300">
              System Call Interface
            </div>
          </div>

          {/* Kernel Space Components */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div id="process" className="p-3 bg-orange-100 border border-orange-300 rounded-lg flex-1 transition-all duration-300">
              Process Management
            </div>
            <div id="memory" className="p-3 bg-orange-100 border border-orange-300 rounded-lg flex-1 transition-all duration-300">
              Memory Management
            </div>
            <div id="vfs" className="p-3 bg-orange-100 border border-orange-300 rounded-lg flex-1 transition-all duration-300">
              Virtual File System
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div id="network" className="p-3 bg-teal-100 border border-teal-300 rounded-lg flex-1 transition-all duration-300">
              Network Stack
            </div>
            <div id="filesystem" className="p-3 bg-teal-100 border border-teal-300 rounded-lg flex-1 transition-all duration-300">
              Filesystem Drivers
            </div>
            <div id="device" className="p-3 bg-teal-100 border border-teal-300 rounded-lg flex-1 transition-all duration-300">
              Device Drivers
            </div>
          </div>

          {/* Hardware Interface */}
          <div className="flex mb-4">
            <div id="hardware" className="p-3 bg-gray-100 border border-gray-300 rounded-lg w-full transition-all duration-300">
              Hardware (CPU, Memory, Disk, Network)
            </div>
          </div>

          {showDetails.kernel && (
            <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm">
              <p><strong>The Linux Kernel</strong> core components:</p>
              <ul className="list-disc pl-5 mt-2">
                <li><strong>System Call Interface:</strong> Provides API for user space programs to access kernel services</li>
                <li><strong>Process Management:</strong> Handles task scheduling, creation, and inter-process communication</li>
                <li><strong>Memory Management:</strong> Controls virtual memory, paging, and memory allocation</li>
                <li><strong>Virtual File System:</strong> Provides unified interface to different filesystems</li>
                <li><strong>Network Stack:</strong> Implements network protocols and interfaces</li>
                <li><strong>Device Drivers:</strong> Interfaces with hardware devices</li>
              </ul>
              <p className="mt-2">The kernel is standalone and distribution-agnostic - Ubuntu simply uses and configures it.</p>
            </div>
          )}
        </div>
      </div>

      {/* Key Differences */}
      <div className="mt-6 bg-white p-4 rounded-lg border border-gray-300 w-full">
        <h2 className="text-xl font-semibold mb-2">Key Differences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold">Linux Kernel</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>Core component that interfaces with hardware</li>
              <li>Manages system resources (CPU, memory, I/O)</li>
              <li>Handles system calls from applications</li>
              <li>Same kernel can be used by many distributions</li>
              <li>Developed by Linus Torvalds and contributors</li>
              <li>Purely focused on OS functionality</li>
            </ul>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <h3 className="font-semibold">Ubuntu OS</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>Complete operating system that includes the kernel</li>
              <li>Adds user applications, desktop environment, utilities</li>
              <li>Includes package management (APT)</li>
              <li>Maintained by Canonical</li>
              <li>Adds configuration, themes, and user experience elements</li>
              <li>Pre-configures kernel parameters for optimal performance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Execution Flow Explanation */}
      <div className="mt-6 w-full">
        <h2 className="text-xl font-semibold mb-2">Program Execution Flow Explained</h2>
        <div className="bg-gray-100 p-4 rounded-lg text-sm">
          <p className="mb-2"><strong>When a program runs in Ubuntu:</strong></p>
          <ol className="list-decimal pl-5">
            <li>User initiates program (GUI click, terminal command, or system service)</li>
            <li>Program uses libraries specific to its environment (GNOME libraries, system libraries)</li>
            <li>Libraries call functions in the GNU C Library (glibc)</li>
            <li>glibc translates function calls to appropriate system calls</li>
            <li>System calls transfer control from user space to kernel space</li>
            <li>Kernel processes the request using appropriate subsystems</li>
            <li>Kernel interacts with hardware as needed</li>
            <li>Results return through the same path back to the application</li>
          </ol>
          <p className="mt-2">Click the flow buttons above to visualize these different execution paths.</p>
        </div>
      </div>

      <style jsx>{`
        .highlight-animate {
          box-shadow: 0 0 0 2px #ff5722;
          background-color: rgba(255, 87, 34, 0.2);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default LinuxKernelVsUbuntu;