import React, { useState, useEffect } from 'react';

import './style.css';

const CPUArchitectureAnimation = () => {
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState('addition');
  const [showLabels, setShowLabels] = useState(true);
  
  const operations = {
    addition: { name: 'Addition', op: '+', a: 5, b: 3, result: 8 },
    subtraction: { name: 'Subtraction', op: '-', a: 7, b: 4, result: 3 },
    multiplication: { name: 'Multiplication', op: '*', a: 6, b: 2, result: 12 },
    logical_and: { name: 'Logical AND', op: '&', a: 10, b: 6, result: 2 }, // 1010 & 0110 = 0010 (binary)
  };
  
  const currentOp = operations[selectedOperation];
  
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prevStep) => {
          const nextStep = prevStep + 1;
          if (nextStep >= 6) {
            setIsPlaying(false);
            return 5;
          }
          return nextStep;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);
  
  const resetAnimation = () => {
    setStep(0);
    setIsPlaying(false);
  };
  
  const getStepName = () => {
    switch(step) {
      case 0: return 'Fetch';
      case 1: return 'Decode';
      case 2: return 'Load Data';
      case 3: return 'Execute';
      case 4: return 'Store Result';
      case 5: return 'Completed';
      default: return '';
    }
  };
  
  const getBinaryRepresentation = (num) => {
    return num.toString(2).padStart(8, '0');
  };
  
  // Active component highlighting based on current step
  const getComponentHighlight = (component) => {
    const highlights = {
      'ram': step === 0,
      'cache': step === 0 || step === 4,
      'instruction-fetch': step === 0,
      'instruction-decoder': step === 1,
      'register-file': step === 2 || step === 4,
      'alu': step === 3,
      'control-unit': true, // Always active, but with different intensity
      'bus': true // Always somewhat active
    };
    
    return highlights[component] ? 'active' : '';
  };
  
  return (
    <div className="w-full max-w-4xl p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h2 className="text-xl font-bold mb-4">Interactive CPU Architecture</h2>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <span className="mr-2">Operation:</span>
          <select 
            className="p-2 border rounded bg-white"
            value={selectedOperation}
            onChange={(e) => {
              setSelectedOperation(e.target.value);
              resetAnimation();
            }}
          >
            {Object.entries(operations).map(([key, op]) => (
              <option key={key} value={key}>{op.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2">Speed:</span>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-24"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button 
            onClick={resetAnimation} 
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Reset
          </button>
        </div>
        
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showLabels} 
              onChange={() => setShowLabels(!showLabels)}
              className="mr-2"
            />
            <span>Show labels</span>
          </label>
        </div>
      </div>
      
      {/* Pipeline stages */}
      <div className="w-full h-12 bg-gray-100 rounded-lg relative mb-4 overflow-hidden">
        <div className="flex h-full">
          {['Fetch', 'Decode', 'Load', 'Execute', 'Store', 'Done'].map((stageName, index) => (
            <div 
              key={stageName}
              className={`flex-1 border-r last:border-r-0 border-gray-300 flex items-center justify-center
                         ${step === index ? 'bg-blue-500 text-white' : 
                           step > index ? 'bg-green-200' : 'bg-gray-100'}`}
            >
              {stageName}
            </div>
          ))}
        </div>
      </div>
      
      {/* CPU Architecture Visualization - Using CSS Grid for better positioning */}
      <div className="relative w-full bg-slate-50 rounded-lg p-4 border border-gray-300" style={{ minHeight: '500px' }}>
        {/* Current Operation and Clock */}
        <div className="flex justify-between mb-2">
          <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg">
            {currentOp.name}: {currentOp.a} {currentOp.op} {currentOp.b} {step >= 4 ? `= ${currentOp.result}` : ''}
          </div>
          <div className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
            Clock Cycle: {step + 1}
          </div>
        </div>

        {/* Main CPU Container */}
        <div className="border-2 border-gray-400 rounded-lg bg-slate-100 p-4 mb-4">
          <div className="text-center font-bold mb-2">CPU</div>
          
          {/* CPU Core using Grid Layout */}
          <div className="border-2 border-blue-300 rounded-lg bg-blue-50 p-2 mb-4">
            <div className="text-center font-bold text-sm mb-4">Core</div>
            
            {/* Grid Layout for Core Components */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Register File */}
              <div className={`border-2 border-orange-400 rounded-lg bg-orange-50 p-2 col-span-1
                            ${getComponentHighlight('register-file') === 'active' ? 'bg-orange-200 shadow-lg' : ''}`}>
                <div className="text-center font-bold text-sm mb-2">Register File</div>
                <div className="space-y-2">
                  <div className={`p-1 rounded text-xs ${step >= 2 ? 'bg-orange-300' : 'bg-orange-100'}`}>
                    RAX: {step >= 2 ? currentOp.a : '??'}
                  </div>
                  <div className={`p-1 rounded text-xs ${step >= 2 ? 'bg-orange-300' : 'bg-orange-100'}`}>
                    RBX: {step >= 2 ? currentOp.b : '??'}
                  </div>
                  <div className={`p-1 rounded text-xs ${step >= 4 ? 'bg-orange-300' : 'bg-orange-100'}`}>
                    RCX: {step >= 4 ? currentOp.result : '??'}
                  </div>
                  <div className="p-1 rounded text-xs bg-orange-100">RDX: 0</div>
                  <div className="p-1 rounded text-xs bg-orange-100">RSI: 0</div>
                  <div className="p-1 rounded text-xs bg-orange-100">RDI: 0</div>
                  <div className="p-1 rounded text-xs bg-orange-100">RBP: 0</div>
                  <div className="p-1 rounded text-xs bg-orange-100">RSP: 0</div>
                </div>
              </div>
              
              {/* Control Unit and ALU Column */}
              <div className="col-span-1 flex flex-col gap-4">
                <div className={`border-2 border-purple-400 rounded-lg bg-purple-50 p-2 flex-1 flex items-center justify-center
                              ${getComponentHighlight('control-unit') === 'active' ? 'bg-purple-200 shadow-lg' : ''}`}>
                  <div className="text-center">
                    <div className="font-bold text-sm">Control Unit</div>
                    <div className="text-xs mt-1">
                      {step === 0 && "Fetching instruction..."}
                      {step === 1 && "Decoding instruction..."}
                      {step > 1 && "Coordinating execution..."}
                    </div>
                  </div>
                </div>
                <div className={`border-2 border-red-400 rounded-lg bg-red-50 p-2 flex-1 flex items-center justify-center
                              ${getComponentHighlight('alu') === 'active' ? 'bg-red-200 shadow-lg' : ''}`}>
                  <div className="text-center">
                    <div className="font-bold text-sm">Arithmetic Logic Unit</div>
                    <div className="text-xs mt-1">
                      {step === 3 ? `${currentOp.a} ${currentOp.op} ${currentOp.b} = ${currentOp.result}` : "Waiting for operation..."}
                    </div>
                    {step === 3 && (
                      <div className="text-xs mt-1">
                        {getBinaryRepresentation(currentOp.a)} {currentOp.op} {getBinaryRepresentation(currentOp.b)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Instruction Units and Cache Column */}
              <div className="col-span-1 flex flex-col gap-4">
                {/* Instruction Units */}
                <div className="flex flex-col gap-2 mb-2">
                  <div className={`border-2 border-green-400 rounded-lg bg-green-50 p-2 flex items-center justify-center
                                ${getComponentHighlight('instruction-fetch') === 'active' ? 'bg-green-200 shadow-lg' : ''}`}>
                    <div className="text-center">
                      <div className="font-bold text-sm">Instruction Fetch</div>
                      <div className="text-xs mt-1">
                        {step === 0 ? "Active" : "Idle"}
                      </div>
                    </div>
                  </div>
                  <div className={`border-2 border-yellow-400 rounded-lg bg-yellow-50 p-2 flex items-center justify-center
                                ${getComponentHighlight('instruction-decoder') === 'active' ? 'bg-yellow-200 shadow-lg' : ''}`}>
                    <div className="text-center">
                      <div className="font-bold text-sm">Instruction Decoder</div>
                      <div className="text-xs mt-1">
                        {step === 1 ? `Decoding ${currentOp.name}` : "Idle"}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cache Hierarchy */}
                <div className="flex flex-col gap-2">
                  <div className={`p-2 border-2 border-blue-500 rounded-lg bg-blue-100 text-xs text-center
                                ${getComponentHighlight('cache') === 'active' ? 'bg-blue-300 shadow-lg' : ''}`}>
                    L1 Cache
                    {step === 0 && <div className="text-xs mt-1">Instruction fetch</div>}
                    {step === 4 && <div className="text-xs mt-1">Result store</div>}
                  </div>
                  <div className="p-2 border-2 border-blue-400 rounded-lg bg-blue-50 text-xs text-center">
                    L2 Cache
                  </div>
                  <div className="p-2 border-2 border-blue-300 rounded-lg bg-blue-50 text-xs text-center">
                    L3 Cache
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Flow Indicators */}
            <div className="grid grid-cols-3 gap-4">
              {step === 2 && (
                <div className="text-blue-600 animate-pulse col-span-3 text-center">
                  → Loading Operands →
                </div>
              )}
              
              {step === 3 && (
                <div className="text-blue-600 animate-pulse col-span-3 text-center">
                  Processing Operation
                </div>
              )}
              
              {step === 4 && (
                <div className="text-blue-600 animate-pulse col-span-3 text-center">
                  ← Storing Result ←
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* RAM - Now properly positioned below the CPU */}
        <div className={`border-2 border-gray-400 rounded-lg bg-gray-100 p-4 flex items-center justify-center
                      ${getComponentHighlight('ram') === 'active' ? 'bg-gray-300 shadow-lg' : ''}`}>
          <div className="text-center">
            <div className="font-bold text-sm">Main Memory (RAM)</div>
            <div className="text-xs mt-1">
              {step === 0 ? "Providing instruction data" : "Ready"}
            </div>
          </div>
        </div>
        
        {/* Data Flow Indicators for RAM to CPU */}
        {step === 0 && (
          <div className="text-blue-600 animate-pulse text-center my-2">
            ↑ Fetching Instruction ↑
          </div>
        )}

        {/* Connection Lines with SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" style={{ zIndex: 10 }}>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill={step === 0 ? "#2563EB" : "#9CA3AF"} />
            </marker>
          </defs>
          
          {/* Data bus connecting all components */}
          <path d="M 200,250 L 400,250 L 600,250" 
                className={`${step >= 2 ? 'stroke-blue-600' : 'stroke-gray-400'}`} 
                fill="transparent" 
                strokeWidth="2" 
                strokeDasharray={step >= 2 ? "5,0" : "5,5"} />
          
          {/* Memory to Cache bus */}
          <line x1="400" y1="450" x2="400" y2="350" 
                className={`${step === 0 ? 'stroke-blue-600' : 'stroke-gray-400'}`} 
                strokeWidth="2" 
                markerEnd="url(#arrow)" />
        </svg>
      </div>
      
      {/* Step description */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold mb-2">Current Step: {getStepName()}</h3>
        <p>
          {step === 0 && 'The Control Unit is fetching the instruction from memory through the cache hierarchy.'}
          {step === 1 && 'The Control Unit is decoding the instruction to determine what operation to perform and what registers to use.'}
          {step === 2 && 'The CPU is loading the operands from the Register File into the ALU.'}
          {step === 3 && `The ALU is executing the ${currentOp.name} operation between ${currentOp.a} and ${currentOp.b}.`}
          {step === 4 && 'The result is being stored back to the Register File and possibly written to cache.'}
          {step === 5 && 'The instruction execution is complete. The CPU is ready to fetch the next instruction.'}
        </p>
      </div>
    </div>
  );
};

export default CPUArchitectureAnimation;