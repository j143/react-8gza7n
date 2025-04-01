import React, { useState, useEffect } from 'react';

const CPUArchitectureAnimation = () => {
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState('addition');
  const [viewMode, setViewMode] = useState('full');
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
    switch (step) {
      case 0:
        return 'Fetch';
      case 1:
        return 'Decode';
      case 2:
        return 'Load Data';
      case 3:
        return 'Execute';
      case 4:
        return 'Store Result';
      case 5:
        return 'Completed';
      default:
        return '';
    }
  };

  const getBinaryRepresentation = (num) => {
    return num.toString(2).padStart(8, '0');
  };

  // Active component highlighting based on current step
  const getComponentHighlight = (component) => {
    const highlights = {
      ram: step === 0,
      cache: step === 0 || step === 4,
      'instruction-fetch': step === 0,
      'instruction-decoder': step === 1,
      'register-file': step === 2 || step === 4,
      alu: step === 3,
      'control-unit': true, // Always active, but with different intensity
      bus: true, // Always somewhat active
    };

    return highlights[component] ? 'active' : '';
  };

  const renderCPUArchitecture = () => (
    <div
      className="w-full bg-slate-50 rounded-lg p-4 border border-gray-300 relative"
      style={{ height: '500px' }}
    >
      {/* Main CPU outline */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-gray-400 rounded-lg bg-slate-100 p-4">
        <div className="text-center font-bold mb-2">CPU</div>

        {/* CPU Core */}
        <div className="absolute top-14 left-8 right-8 bottom-8 border-2 border-blue-300 rounded-lg bg-blue-50 p-2">
          <div className="text-center font-bold text-sm mb-2">Core</div>

          {/* Control Unit */}
          <div
            className={`absolute top-10 left-6 w-48 h-32 border-2 border-purple-400 rounded-lg bg-purple-50 flex items-center justify-center 
                          ${
                            getComponentHighlight('control-unit') === 'active'
                              ? 'bg-purple-200 shadow-lg'
                              : ''
                          }`}
          >
            <div className="text-center">
              <div className="font-bold text-sm">Control Unit</div>
              <div className="text-xs mt-1">
                {step === 0 && 'Fetching instruction...'}
                {step === 1 && 'Decoding instruction...'}
                {step > 1 && 'Coordinating execution...'}
              </div>
            </div>
          </div>

          {/* Instruction Fetch */}
          <div
            className={`absolute top-10 right-6 w-40 h-16 border-2 border-green-400 rounded-lg bg-green-50 flex items-center justify-center
                          ${
                            getComponentHighlight('instruction-fetch') ===
                            'active'
                              ? 'bg-green-200 shadow-lg'
                              : ''
                          }`}
          >
            <div className="text-center">
              <div className="font-bold text-sm">Instruction Fetch</div>
              <div className="text-xs mt-1">
                {step === 0 ? 'Active' : 'Idle'}
              </div>
            </div>
          </div>

          {/* Instruction Decoder */}
          <div
            className={`absolute top-32 right-6 w-40 h-16 border-2 border-yellow-400 rounded-lg bg-yellow-50 flex items-center justify-center
                          ${
                            getComponentHighlight('instruction-decoder') ===
                            'active'
                              ? 'bg-yellow-200 shadow-lg'
                              : ''
                          }`}
          >
            <div className="text-center">
              <div className="font-bold text-sm">Instruction Decoder</div>
              <div className="text-xs mt-1">
                {step === 1 ? `Decoding ${currentOp.name}` : 'Idle'}
              </div>
            </div>
          </div>

          {/* ALU */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-24 border-2 border-red-400 rounded-lg bg-red-50 flex items-center justify-center
                          ${
                            getComponentHighlight('alu') === 'active'
                              ? 'bg-red-200 shadow-lg'
                              : ''
                          }`}
          >
            <div className="text-center">
              <div className="font-bold text-sm">Arithmetic Logic Unit</div>
              <div className="text-xs mt-1">
                {step === 3
                  ? `${currentOp.a} ${currentOp.op} ${currentOp.b} = ${currentOp.result}`
                  : 'Waiting for operation...'}
              </div>
              {step === 3 && (
                <div className="text-xs mt-1">
                  {getBinaryRepresentation(currentOp.a)} {currentOp.op}{' '}
                  {getBinaryRepresentation(currentOp.b)}
                </div>
              )}
            </div>
          </div>

          {/* Register File */}
          <div
            className={`absolute top-50 left-6 w-40 h-64 border-2 border-orange-400 rounded-lg bg-orange-50 p-2
                          ${
                            getComponentHighlight('register-file') === 'active'
                              ? 'bg-orange-200 shadow-lg'
                              : ''
                          }`}
          >
            <div className="text-center font-bold text-sm mb-2">
              Register File
            </div>
            <div className="space-y-2">
              <div
                className={`p-1 rounded text-xs ${
                  step === 2 ? 'bg-orange-300' : 'bg-orange-100'
                }`}
              >
                RAX: {step >= 2 ? currentOp.a : '??'}
              </div>
              <div
                className={`p-1 rounded text-xs ${
                  step === 2 ? 'bg-orange-300' : 'bg-orange-100'
                }`}
              >
                RBX: {step >= 2 ? currentOp.b : '??'}
              </div>
              <div
                className={`p-1 rounded text-xs ${
                  step === 4 ? 'bg-orange-300' : 'bg-orange-100'
                }`}
              >
                RCX: {step >= 4 ? currentOp.result : '??'}
              </div>
              <div className="p-1 rounded text-xs bg-orange-100">RDX: 0</div>
              <div className="p-1 rounded text-xs bg-orange-100">RSI: 0</div>
              <div className="p-1 rounded text-xs bg-orange-100">RDI: 0</div>
              <div className="p-1 rounded text-xs bg-orange-100">RBP: 0</div>
              <div className="p-1 rounded text-xs bg-orange-100">RSP: 0</div>
            </div>
          </div>
        </div>

        {/* Cache Hierarchy */}
        <div className="absolute right-6 bottom-24 w-32 space-y-2">
          <div
            className={`p-2 border-2 border-blue-500 rounded-lg bg-blue-100 text-xs text-center
                          ${
                            getComponentHighlight('cache') === 'active'
                              ? 'bg-blue-300 shadow-lg'
                              : ''
                          }`}
          >
            L1 Cache
            {step === 0 && (
              <div className="text-xs mt-1">Instruction fetch</div>
            )}
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

      {/* RAM */}
      <div
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-16 border-2 border-gray-400 rounded-lg bg-gray-100 flex items-center justify-center
                      ${
                        getComponentHighlight('ram') === 'active'
                          ? 'bg-gray-300 shadow-lg'
                          : ''
                      }`}
      >
        <div className="text-center">
          <div className="font-bold text-sm">Main Memory (RAM)</div>
          <div className="text-xs mt-1">
            {step === 0 ? 'Providing instruction data' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Bus Lines */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {/* Memory to CPU Bus */}
        <line
          x1="50%"
          y1="480"
          x2="50%"
          y2="410"
          className={`${step === 0 ? 'stroke-blue-600' : 'stroke-gray-400'}`}
          strokeWidth="3"
          strokeDasharray={step === 0 ? '5,0' : '5,5'}
        />

        {/* Internal Bus */}
        <path
          d="M 200,250 Q 300,250 300,300 T 400,300"
          className={`${step >= 2 ? 'stroke-blue-600' : 'stroke-gray-400'}`}
          fill="transparent"
          strokeWidth="2"
          strokeDasharray={step >= 2 ? '5,0' : '5,5'}
        />
      </svg>

      {/* Data Flow Indicators */}
      {step === 0 && (
        <div className="absolute left-1/2 bottom-24 transform -translate-x-1/2 text-blue-600 animate-pulse">
          ↑ Fetching Instruction ↑
        </div>
      )}

      {step === 2 && (
        <div className="absolute left-1/4 top-48 transform -translate-x-1/2 text-blue-600 animate-pulse">
          → Loading Operands →
        </div>
      )}

      {step === 4 && (
        <div className="absolute right-1/4 top-48 transform translate-x-1/2 text-blue-600 animate-pulse">
          ← Storing Result ←
        </div>
      )}

      {/* Clock */}
      <div className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
        Clock Cycle: {step + 1}
      </div>

      {/* Current Operation */}
      <div className="absolute top-2 left-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-lg">
        {currentOp.name}: {currentOp.a} {currentOp.op} {currentOp.b}{' '}
        {step >= 4 ? `= ${currentOp.result}` : ''}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h2 className="text-xl font-bold mb-4">Interactive CPU Architecture</h2>

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
              <option key={key} value={key}>
                {op.name}
              </option>
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
        <div className="absolute top-0 left-0 h-full w-full flex">
          {['Fetch', 'Decode', 'Load', 'Execute', 'Store', 'Done'].map(
            (stageName, index) => (
              <div
                key={stageName}
                className={`flex-1 border-r last:border-r-0 border-gray-300 flex items-center justify-center
                         ${
                           step === index
                             ? 'bg-blue-500 text-white'
                             : step > index
                             ? 'bg-green-200'
                             : 'bg-gray-100'
                         }`}
              >
                {stageName}
              </div>
            )
          )}
        </div>
      </div>

      {/* CPU Architecture Visualization */}
      {renderCPUArchitecture()}

      {/* Step description */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold mb-2">Current Step: {getStepName()}</h3>
        <p>
          {step === 0 &&
            'The Control Unit is fetching the instruction from memory through the cache hierarchy.'}
          {step === 1 &&
            'The Control Unit is decoding the instruction to determine what operation to perform and what registers to use.'}
          {step === 2 &&
            'The CPU is loading the operands from the Register File into the ALU.'}
          {step === 3 &&
            `The ALU is executing the ${currentOp.name} operation between ${currentOp.a} and ${currentOp.b}.`}
          {step === 4 &&
            'The result is being stored back to the Register File and possibly written to cache.'}
          {step === 5 &&
            'The instruction execution is complete. The CPU is ready to fetch the next instruction.'}
        </p>
      </div>
    </div>
  );
};

export default CPUArchitectureAnimation;
