import React from 'react';
import { Heart, Globe, BarChart3, Lightbulb } from 'lucide-react';

const GlobalImpact = () => {
  const impactStats = [
    { 
      title: "Charitable Donations", 
      value: "$2.5M+", 
      description: "Raised for global causes through our music initiatives",
      icon: <Heart className="h-8 w-8 text-pink-400" />
    },
    { 
      title: "Cultural Exchange", 
      value: "50+", 
      description: "Cultural music traditions preserved and shared globally",
      icon: <Globe className="h-8 w-8 text-blue-400" />
    },
    { 
      title: "Music Education", 
      value: "10,000+", 
      description: "Young musicians supported through scholarships and programs",
      icon: <Lightbulb className="h-8 w-8 text-yellow-400" />
    },
    { 
      title: "Global Reach", 
      value: "100M+", 
      description: "People reached through our collaborative music projects",
      icon: <BarChart3 className="h-8 w-8 text-green-400" />
    }
  ];
  
  const initiatives = [
    {
      title: "Music for Clean Water",
      description: "Supporting clean water initiatives in developing countries through benefit concerts and digital releases.",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: "25 communities supported"
    },
    {
      title: "Harmony for Education",
      description: "Building music schools and providing instruments to underprivileged communities worldwide.",
      image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: "15 schools established"
    },
    {
      title: "Cultural Preservation Project",
      description: "Documenting and preserving endangered musical traditions through recordings and educational materials.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: "30 traditions preserved"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-[#0c0c1d] to-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Heart className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Global <span className="text-gradient">Impact</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Using the universal language of music to create positive change around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 text-center hover:bg-indigo-900/20 transition-all duration-500 hover:scale-105 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 mb-4 animate-pulse-slow" style={{animationDelay: `${index * 0.5}s`}}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <h4 className="text-lg font-semibold text-indigo-300 mb-2">{stat.title}</h4>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Our Impact Initiatives</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-500 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-indigo-900/50 rounded-full text-indigo-300 text-sm mb-4">
                    {initiative.stats}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {initiative.title}
                  </h4>
                  <p className="text-gray-300">
                    {initiative.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass rounded-xl p-8 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">The "We Are The World" Legacy</h3>
              <p className="text-gray-300 mb-6">
                Our upcoming "We Are The World" cover project continues the legacy of using music as a force for positive change. 
                A portion of all proceeds will support global initiatives focused on:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">1</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-indigo-300">Climate Action</h4>
                    <p className="text-gray-300">Supporting reforestation and clean energy projects worldwide</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">2</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-indigo-300">Music Education</h4>
                    <p className="text-gray-300">Providing instruments and music education to underserved communities</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">3</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-indigo-300">Cultural Preservation</h4>
                    <p className="text-gray-300">Documenting and preserving endangered musical traditions</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Concert for a cause" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="glass inline-block px-4 py-2 rounded-full bg-indigo-600/30 text-white">
                  <span className="text-gradient font-semibold">Join us in making a difference</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpact;