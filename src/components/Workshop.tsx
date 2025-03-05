import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Mic, Lightbulb } from 'lucide-react';

const Workshop = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingWorkshops = [
    {
      title: "Global Collaboration Masterclass",
      date: "June 15, 2025",
      time: "2:00 PM - 4:00 PM GMT",
      host: "Lehan Kawshila",
      hostRole: "Founder, SoundAlchemy",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Learn the art of effective remote collaboration with musicians across different time zones, cultures, and musical backgrounds.",
      participants: 120,
      type: "Interactive Webinar"
    },
    {
      title: "Cross-Cultural Music Production",
      date: "June 22, 2025",
      time: "6:00 PM - 8:30 PM GMT",
      host: "Antonio",
      hostRole: "Audio Engineering Lead",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Discover techniques for blending diverse musical traditions into cohesive productions while preserving cultural authenticity.",
      participants: 85,
      type: "Hands-on Workshop"
    },
    {
      title: "Building Your Global Music Network",
      date: "July 5, 2025",
      time: "3:00 PM - 5:00 PM GMT",
      host: "Sofia",
      hostRole: "Musician Coordination",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Learn strategies for connecting with like-minded musicians worldwide and building lasting creative relationships.",
      participants: 150,
      type: "Panel Discussion"
    }
  ];
  
  const pastWorkshops = [
    {
      title: "Remote Recording Techniques",
      date: "May 10, 2025",
      host: "Alexandra",
      hostRole: "Co-founder & Strategist",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      participants: 210,
      recording: true
    },
    {
      title: "Navigating Music Rights in Global Collaborations",
      date: "April 28, 2025",
      host: "Legal Team",
      hostRole: "SoundAlchemy",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      participants: 175,
      recording: true
    },
    {
      title: "AI and Human Creativity: Finding Balance",
      date: "April 15, 2025",
      host: "Lehan Kawshila",
      hostRole: "Founder, SoundAlchemy",
      image: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      participants: 230,
      recording: true
    }
  ];

  return (
    <section id="workshops" className="py-20 bg-gradient-to-b from-[#0c0c1d] to-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Lightbulb className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Virtual <span className="text-gradient">Workshops</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Expand your musical horizons with our interactive workshops led by industry experts and SoundAlchemy visionaries.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="glass rounded-full p-1 flex space-x-1">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'upcoming' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
            >
              Upcoming Workshops
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'past' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
            >
              Past Recordings
            </button>
          </div>
        </div>
        
        {/* Upcoming Workshops Tab */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingWorkshops.map((workshop, index) => (
              <div 
                key={index} 
                className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-500 transform-gpu will-change-transform"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs text-indigo-300 backdrop-blur-sm">
                    {workshop.type}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors mb-3">{workshop.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 text-indigo-400 mr-2" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 text-indigo-400 mr-2" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 text-indigo-400 mr-2" />
                      <span>{workshop.participants} registered</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{workshop.description}</p>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                      <Mic className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{workshop.host}</p>
                      <p className="text-indigo-300 text-sm">{workshop.hostRole}</p>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform-gpu">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Past Workshops Tab */}
        {activeTab === 'past' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastWorkshops.map((workshop, index) => (
              <div 
                key={index} 
                className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-500 transform-gpu will-change-transform"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/50 to-transparent"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-indigo-600/80 rounded-full p-4 backdrop-blur-sm hover:bg-indigo-500/80 transition-colors transform-gpu group-hover:scale-110">
                      <Video className="h-8 w-8 text-white" />
                    </button>
                  </div>
                  
                  {workshop.recording && (
                    <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs text-indigo-300 backdrop-blur-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Recording Available
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors mb-3">{workshop.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 text-indigo-400 mr-2" />
                      <span>Held on {workshop.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 text-indigo-400 mr-2" />
                      <span>{workshop.participants} attended</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                      <Mic className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{workshop.host}</p>
                      <p className="text-indigo-300 text-sm">{workshop.hostRole}</p>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-indigo-900/50 text-white font-medium rounded-md hover:bg-indigo-800/50 transition-all duration-300 transform-gpu flex items-center justify-center">
                    <Video className="h-4 w-4 mr-2" />
                    Watch Recording
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 glass rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gradient">Host Your Own Workshop</h3>
          <p className="text-lg mb-6 text-gray-300 max-w-3xl mx-auto">
            Are you an expert in a specific musical style, production technique, or cultural tradition? 
            Share your knowledge with our global community of musicians.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-all duration-300 shadow-lg transform-gpu hover:scale-105">
            Apply to Become a Workshop Host
          </button>
        </div>
      </div>
    </section>
  );
};

export default Workshop;