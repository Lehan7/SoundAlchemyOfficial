import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  
  const stories = [
    {
      name: "The Global Symphony Project",
      description: "A groundbreaking collaboration between 150 musicians from 60 countries, creating a symphony that blended Western classical with traditional music from around the world.",
      achievement: "Over 50 million streams worldwide",
      quote: "SoundAlchemy made it possible to connect with musicians I would never have met otherwise. Together, we created something truly magical that transcended borders.",
      author: "Maria Gonzalez, Conductor",
      country: "Argentina",
      image: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Rhythms of Humanity",
      description: "A percussion-focused project that brought together drummers from every continent to create a rhythmic journey through human cultural evolution.",
      achievement: "Featured in National Geographic documentary",
      quote: "The technology allowed us to play together in perfect sync despite being thousands of miles apart. It was like being in the same room with drummers from across the globe.",
      author: "Kwame Osei, Percussion Lead",
      country: "Ghana",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Voices of Peace",
      description: "A vocal collaboration featuring singers from conflict zones around the world, using music as a medium for peace and understanding.",
      achievement: "Performed at the United Nations General Assembly",
      quote: "When we sang together, our differences disappeared. SoundAlchemy gave us a platform to show the world that music can bridge any divide.",
      author: "Leila Mahmoud, Vocalist",
      country: "Lebanon",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];
  
  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length);
  };
  
  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section id="success-stories" className="py-20 bg-gradient-to-b from-[#0a0a16] to-[#0c0c1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Star className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Success <span className="text-gradient">Stories</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Remarkable collaborations that have transformed the global music landscape.
          </p>
        </div>
        
        <div className="relative glass rounded-xl overflow-hidden">
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <button 
              onClick={prevStory}
              className="bg-indigo-900/50 hover:bg-indigo-600/50 text-white rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <button 
              onClick={nextStory}
              className="bg-indigo-900/50 hover:bg-indigo-600/50 text-white rounded-full p-3 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="inline-block px-4 py-2 bg-indigo-900/50 rounded-full text-indigo-300 text-sm mb-6">
                Featured Success Story
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{stories[activeStory].name}</h3>
              <p className="text-gray-300 mb-6">{stories[activeStory].description}</p>
              
              <div className="glass bg-indigo-900/20 p-6 rounded-xl mb-6">
                <div className="flex items-start mb-4">
                  <Quote className="h-8 w-8 text-indigo-400 mr-3 flex-shrink-0" />
                  <p className="text-gray-300 italic">{stories[activeStory].quote}</p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={stories[activeStory].image} 
                    alt={stories[activeStory].author} 
                    className="h-12 w-12 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">{stories[activeStory].author}</h4>
                    <p className="text-indigo-300 text-sm">{stories[activeStory].country}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-indigo-900/30 rounded-full p-2 mr-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Key Achievement</h4>
                  <p className="text-indigo-300">{stories[activeStory].achievement}</p>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="h-full">
                <img 
                  src={`https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80`} 
                  alt="Musicians collaborating" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a16] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center p-4 bg-indigo-900/20">
            {stories.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setActiveStory(index)}
                className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                  index === activeStory ? 'bg-indigo-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-6 hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">Global Recognition</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              SoundAlchemy projects have been featured in major media outlets including BBC, CNN, and Rolling Stone.
            </p>
            <div className="text-indigo-300 text-sm">15+ international awards</div>
          </div>
          
          <div className="glass rounded-xl p-6 hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">Chart Success</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Multiple SoundAlchemy collaborations have reached top positions on global streaming charts.
            </p>
            <div className="text-indigo-300 text-sm">3 platinum-certified releases</div>
          </div>
          
          <div className="glass rounded-xl p-6 hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">Cultural Impact</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Our projects have helped revitalize interest in traditional music forms and cultural exchange.
            </p>
            <div className="text-indigo-300 text-sm">Featured in 20+ documentaries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;