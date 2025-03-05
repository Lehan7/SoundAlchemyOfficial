import React from 'react';
import { Cpu, Wifi, Headphones, Zap, Layers, Code } from 'lucide-react';

const MusicTechnology = () => {
  const technologies = [
    {
      icon: <Wifi className="h-8 w-8 text-indigo-400" />,
      title: "Real-time Collaboration",
      description: "Ultra-low latency technology allowing musicians to perform together across continents in real-time."
    },
    {
      icon: <Headphones className="h-8 w-8 text-indigo-400" />,
      title: "Spatial Audio",
      description: "Immersive 3D audio technology that places each musician in a virtual space for realistic ensemble experiences."
    },
    {
      icon: <Cpu className="h-8 w-8 text-indigo-400" />,
      title: "AI-Enhanced Mixing",
      description: "Advanced algorithms that help balance and optimize recordings from different acoustic environments."
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-400" />,
      title: "Adaptive Networking",
      description: "Smart routing technology that finds the fastest connection path between collaborating musicians."
    },
    {
      icon: <Layers className="h-8 w-8 text-indigo-400" />,
      title: "Cloud Studio",
      description: "Secure cloud infrastructure for storing, sharing, and collaborating on multi-track projects."
    },
    {
      icon: <Code className="h-8 w-8 text-indigo-400" />,
      title: "Open Source Tools",
      description: "Community-developed plugins and tools that extend the platform's capabilities."
    }
  ];

  return (
    <section id="technology" className="py-20 bg-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Cpu className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Music <span className="text-gradient">Technology</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Cutting-edge technology powering global music collaboration without boundaries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-8 hover:bg-indigo-900/20 transition-all duration-500 hover:scale-105 group"
            >
              <div className="bg-indigo-900/30 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-lg group-hover:animate-glow transition-all duration-300">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">{tech.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{tech.description}</p>
            </div>
          ))}
        </div>
        
        <div className="glass rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">The Future of Music Collaboration</h3>
              <p className="text-gray-300 mb-6">
                SoundAlchemy is pioneering the next generation of music collaboration technology. Our platform combines 
                cutting-edge audio processing, network optimization, and cloud infrastructure to enable seamless 
                collaboration between musicians anywhere in the world.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                  <span className="text-gray-300">Latency as low as 20ms between continents</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                  <span className="text-gray-300">Studio-quality 96kHz/24-bit audio transmission</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                  <span className="text-gray-300">End-to-end encryption for all sessions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                  <span className="text-gray-300">Adaptive to varying internet connection speeds</span>
                </div>
              </div>
              <div className="mt-8">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30">
                  Explore Our Technology
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-full">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Music technology" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a16] via-transparent to-transparent"></div>
              </div>
              
              {/* Floating tech elements */}
              <div className="absolute top-1/4 left-1/4 glass p-3 rounded-lg animate-float" style={{animationDelay: '1s'}}>
                <Wifi className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="absolute bottom-1/3 right-1/4 glass p-3 rounded-lg animate-float" style={{animationDelay: '2s'}}>
                <Headphones className="h-6 w-6 text-purple-400" />
              </div>
              <div className="absolute top-1/2 right-1/3 glass p-3 rounded-lg animate-float" style={{animationDelay: '3s'}}>
                <Cpu className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            While AI continues to advance in music creation, SoundAlchemy focuses on enhancing human creativity 
            and collaboration through technology, not replacing it.
          </p>
          <div className="inline-block glass rounded-full px-6 py-3 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/30 transition-colors">
            <span className="text-gradient font-semibold">Human creativity enhanced by technology, not replaced</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicTechnology;