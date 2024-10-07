import React, { useState, useEffect } from 'react';
import {
  Network,
  Cpu,
  Box,
  Layers,
  Server,
  Radio,
  CloudCog,
} from 'lucide-react';

const Particle = ({ start, end, color, speed }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev >= 1 ? 0 : prev + speed));
    }, 50);
    return () => clearInterval(interval);
  }, [speed]);

  const x = start.x + (end.x - start.x) * position;
  const y = start.y + (end.y - start.y) * position;

  return <circle cx={x} cy={y} r="3" fill={color} />;
};

const Connection = ({ start, end, color, active, speed, packetCount }) => (
  <>
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={color}
      strokeWidth="2"
      strokeOpacity={active ? 1 : 0.3}
    />
    {active &&
      [...Array(packetCount)].map((_, i) => (
        <Particle
          key={i}
          start={start}
          end={end}
          color={color}
          speed={speed * (1 + i * 0.1)}
        />
      ))}
  </>
);

const NetworkComponent = ({ x, y, icon: Icon, label, onClick, active }) => (
  <g
    transform={`translate(${x}, ${y})`}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <circle cx="25" cy="25" r="25" fill={active ? '#4CAF50' : '#9E9E9E'} />
    <Icon x="12.5" y="12.5" size={25} color="white" />
    <text x="25" y="60" textAnchor="middle" fill="#333" fontSize="12">
      {label}
    </text>
  </g>
);

const UPF5GSimulator = () => {
  const [dpdkEnabled, setDpdkEnabled] = useState(true);
  const [sriovEnabled, setSriovEnabled] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [vfCount, setVfCount] = useState(2);
  const [packetCount, setPacketCount] = useState(3);
  const [trafficLoad, setTrafficLoad] = useState(50);

  const toggleDPDK = () => setDpdkEnabled(!dpdkEnabled);
  const toggleSRIOV = () => setSriovEnabled(!sriovEnabled);

  const calculateSpeed = () => {
    let baseSpeed = 0.02;
    if (dpdkEnabled) baseSpeed *= 2;
    if (sriovEnabled) baseSpeed *= 1.5;
    baseSpeed *= (100 - trafficLoad) / 100; // Higher load = slower speed
    return baseSpeed;
  };

  const components = [
    { id: 'gNodeB', x: 50, y: 100, icon: Radio, label: 'gNodeB' },
    { id: 'nic', x: 150, y: 100, icon: Network, label: 'NIC' },
    { id: 'sriov', x: 250, y: 50, icon: Layers, label: 'SR-IOV' },
    { id: 'kernel_dpdk', x: 350, y: 100, icon: Box, label: 'Kernel/DPDK' },
    { id: 'upf', x: 450, y: 100, icon: CloudCog, label: 'UPF' },
    { id: 'dn', x: 550, y: 100, icon: Server, label: 'Data Network' },
  ];

  const getConnections = () => {
    const speed = calculateSpeed();
    return [
      {
        start: { x: 75, y: 100 },
        end: { x: 150, y: 100 },
        color: '#2196F3',
        active: true,
        speed,
        packetCount,
      },
      {
        start: { x: 175, y: 100 },
        end: { x: 250, y: 75 },
        color: '#4CAF50',
        active: sriovEnabled,
        speed,
        packetCount,
      },
      {
        start: { x: 275, y: 75 },
        end: { x: 350, y: 100 },
        color: '#9C27B0',
        active: sriovEnabled && dpdkEnabled,
        speed,
        packetCount,
      },
      {
        start: { x: 175, y: 100 },
        end: { x: 350, y: 100 },
        color: '#FF9800',
        active: !sriovEnabled,
        speed: speed * 0.5,
        packetCount,
      },
      {
        start: { x: 375, y: 100 },
        end: { x: 450, y: 100 },
        color: '#E91E63',
        active: true,
        speed: dpdkEnabled ? speed * 1.5 : speed,
        packetCount,
      },
      {
        start: { x: 475, y: 100 },
        end: { x: 550, y: 100 },
        color: '#795548',
        active: true,
        speed,
        packetCount,
      },
    ];
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        5G UPF with SR-IOV and DPDK Network Flow Simulator
      </h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={dpdkEnabled}
            onChange={toggleDPDK}
            className="mr-2"
          />
          DPDK Enabled
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={sriovEnabled}
            onChange={toggleSRIOV}
            className="mr-2"
          />
          SR-IOV Enabled
        </label>
        <label className="flex items-center">
          VF Count:
          <input
            type="number"
            value={vfCount}
            onChange={(e) => setVfCount(Number(e.target.value))}
            min="1"
            max="8"
            className="ml-2 w-16 p-1 border rounded"
          />
        </label>
        <label className="flex items-center">
          Packet Count:
          <input
            type="number"
            value={packetCount}
            onChange={(e) => setPacketCount(Number(e.target.value))}
            min="1"
            max="10"
            className="ml-2 w-16 p-1 border rounded"
          />
        </label>
        <label className="flex items-center">
          Traffic Load (%):
          <input
            type="range"
            value={trafficLoad}
            onChange={(e) => setTrafficLoad(Number(e.target.value))}
            min="0"
            max="100"
            className="ml-2 w-32"
          />
          {trafficLoad}%
        </label>
      </div>
      <svg width="600" height="250" className="bg-white rounded-lg shadow-md">
        {getConnections().map((conn, index) => (
          <Connection key={index} {...conn} />
        ))}
        {components.map((comp) => (
          <NetworkComponent
            key={comp.id}
            {...comp}
            onClick={() => setActiveComponent(comp.id)}
            active={activeComponent === comp.id}
          />
        ))}
        {sriovEnabled &&
          [...Array(vfCount)].map((_, i) => (
            <rect
              key={i}
              x={255}
              y={80 + i * 15}
              width="10"
              height="10"
              fill="#4CAF50"
            />
          ))}
        <rect
          x="325"
          y="75"
          width="50"
          height="50"
          fill="#f0f0f0"
          stroke="#333"
        />
        <text x="350" y="95" textAnchor="middle" fill="#333" fontSize="10">
          Kernel
        </text>
        <text x="350" y="115" textAnchor="middle" fill="#333" fontSize="10">
          Space
        </text>
        <rect
          x="325"
          y="125"
          width="50"
          height="50"
          fill="#e0e0e0"
          stroke="#333"
        />
        <text x="350" y="145" textAnchor="middle" fill="#333" fontSize="10">
          User
        </text>
        <text x="350" y="165" textAnchor="middle" fill="#333" fontSize="10">
          Space
        </text>
      </svg>
      <div className="mt-4 text-sm">
        <p>
          Click on components to see active data flows. Adjust controls to
          simulate different network configurations.
        </p>
        <p>
          {activeComponent === 'gNodeB' &&
            'gNodeB: 5G base station sending user plane data.'}
          {activeComponent === 'nic' &&
            'NIC: Physical network interface handling incoming traffic.'}
          {activeComponent === 'sriov' &&
            `SR-IOV: Creating ${vfCount} virtual functions for direct hardware access.`}
          {activeComponent === 'kernel_dpdk' &&
            `Kernel/DPDK: ${
              dpdkEnabled
                ? 'DPDK bypassing kernel for fast packet processing.'
                : 'Standard kernel network stack processing.'
            }`}
          {activeComponent === 'upf' &&
            'UPF: User Plane Function processing and routing packets in the 5G core.'}
          {activeComponent === 'dn' &&
            'Data Network: Final destination for user traffic.'}
          {!activeComponent && 'Hover over components for more information.'}
        </p>
        <p>
          Current Configuration:
          {sriovEnabled
            ? ` SR-IOV enabled with ${vfCount} VFs.`
            : ' SR-IOV disabled.'}
          {dpdkEnabled ? ' DPDK enabled.' : ' DPDK disabled.'}
          {` Simulating ${packetCount} packets. Traffic load: ${trafficLoad}%.`}
        </p>
      </div>
    </div>
  );
};

export default UPF5GSimulator;
