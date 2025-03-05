import React from 'react';
import { Users, MessageSquare, Globe, Shield, Music, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-indigo-400" />,
      title: "Global Collaboration",
      description: "Connect with musicians from every corner of the world and collaborate on projects regardless of distance."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-indigo-400" />,
      title: "Live Discussions",
      description: "Engage in real-time discussions, share knowledge, and learn from musicians across different cultures."
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-400" />,
      title: "Cultural Exchange",
      description: "Explore and exchange musical traditions and techniques from different parts of the world."
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-400" />,
      title: "Verified Musicians",
      description: "Every musician undergoes verification to ensure a trustworthy community free from scams and fake profiles."
    },
    {
      icon: <Music className="h-8 w-8 text-indigo-400" />,
      title: "Exclusive for Musicians",
      description: "A dedicated platform exclusively for musicians, unlike general social media platforms."
    },
    {
      icon: <Heart className="h-8 w-8 text-indigo-400" />,
      title: "Completely Free",
      description: "Access all features without any cost, making music collaboration accessible to everyone."
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#0c0c1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why <span className="text-gradient">SoundAlchemy</span>?</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            A trustworthy and professional platform exclusively for musicians to connect and collaborate globally.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-8 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:bg-indigo-900/20 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-indigo-900/30 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-lg group-hover:animate-glow transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            While social media platforms like YouTube and Facebook exist, they are not dedicated to musicians. 
            SoundAlchemy is the only global hub where musicians from every country can unite and work together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;