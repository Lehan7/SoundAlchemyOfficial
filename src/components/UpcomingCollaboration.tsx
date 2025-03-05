import React, { useRef, useEffect } from 'react';
import { Music, Calendar, Clock, MapPin, Users, Award } from 'lucide-react';

const UpcomingCollaboration = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  
  // Set the countdown date (3 months from now)
  const countdownDate = new Date();
  countdownDate.setMonth(countdownDate.getMonth() + 3);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
    
    // Countdown timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      if (countdownRef.current) {
        countdownRef.current.innerHTML = `
          <div class="flex justify-center space-x-4">
            <div class="text-center">
              <div class="text-3xl md:text-5xl font-bold text-white">${days}</div>
              <div class="text-xs md:text-sm text-gray-400">DAYS</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-5xl font-bold text-white">${hours}</div>
              <div class="text-xs md:text-sm text-gray-400">HOURS</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-5xl font-bold text-white">${minutes}</div>
              <div class="text-xs md:text-sm text-gray-400">MINUTES</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-5xl font-bold text-white">${seconds}</div>
              <div class="text-xs md:text-sm text-gray-400">SECONDS</div>
            </div>
          </div>
        `;
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const milestones = [
    {
      date: "June 15, 2025",
      title: "Global Auditions Begin",
      description: "Musicians from around the world submit their audition videos"
    },
    {
      date: "July 20, 2025",
      title: "Final Artist Selection",
      description: "200 musicians from 100 countries will be selected for the project"
    },
    {
      date: "August 10, 2025",
      title: "Recording Sessions Start",
      description: "Virtual and in-person recording sessions begin worldwide"
    },
    {
      date: "September 25, 2025",
      title: "Global Premiere",
      description: "Worldwide simultaneous release of 'We Are The World' cover"
    }
  ];

  return (
    <section id="upcoming" className="py-20 bg-gradient-to-b from-[#0a0a16] to-[#0c0c1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Calendar className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Upcoming <span className="text-gradient">Global Collaboration</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Join our historic "We Are The World" cover project featuring musicians from every corner of the globe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl neon-border">
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-the-earth-globe-in-stop-motion-3082-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/50 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 glass p-4 rounded-lg shadow-lg animate-float" style={{animationDelay: '1s'}}>
              <Music className="h-12 w-12 text-indigo-400" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">We Are The World</h3>
              <p className="text-indigo-300 text-lg mb-4">Global Musicians Cover Project</p>
              <div className="glass inline-block px-4 py-2 rounded-full bg-indigo-600/30 text-white">
                <span className="text-gradient font-semibold">Coming Soon</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Project Launch Countdown</h3>
              <div ref={countdownRef} className="mb-6">
                {/* Countdown will be inserted here by JavaScript */}
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-indigo-400 mr-3" />
                  <span className="text-gray-300">100+ Countries Participating</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-indigo-400 mr-3" />
                  <span className="text-gray-300">200+ Musicians Collaborating</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-indigo-400 mr-3" />
                  <span className="text-gray-300">3-Month Production Timeline</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-indigo-400 mr-3" />
                  <span className="text-gray-300">Charity Fundraiser for Global Causes</span>
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 flex items-center justify-center">
              <span className="mr-2">Register for Auditions</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Project Timeline</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-900"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className={`glass p-6 rounded-xl hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <span className="text-indigo-400 text-sm block mb-2">{milestone.date}</span>
                      <h4 className="text-xl font-semibold text-white mb-2">{milestone.title}</h4>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-[#0c0c1d] z-10"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingCollaboration;