import React, { useEffect, useRef } from 'react';
import { Mic2, Music, Globe } from 'lucide-react';

const Project = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section id="project" className="py-20 bg-gradient-to-b from-[#0c0c1d] to-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl neon-border">
                <video 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-cover"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-musicians-playing-in-a-band-in-a-recording-studio-14179-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-4 rounded-lg shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <Mic2 className="h-12 w-12 text-indigo-400" />
              </div>
              <div className="absolute -top-6 -left-6 glass p-4 rounded-lg shadow-lg animate-float" style={{animationDelay: '3s'}}>
                <Music className="h-10 w-10 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our First Project: A Global Cover of <span className="text-gradient">"We Are The World"</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-6">
              As our first major initiative, we are bringing together musicians from different countries 
              to create a cover of "We Are The World." This project will symbolize the unity of musicians 
              worldwide and highlight the power of music in bringing people together.
            </p>
            
            <div className="glass p-6 rounded-lg shadow-md mb-8 hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">Music for a Better World</h3>
              <p className="text-gray-300">
                Beyond music, we believe in using our talents to make the world a better place. 
                Our planet gives us so much, but we often fail to appreciate it. It is time for us 
                to give back and heal the world through music.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg shadow-md hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">The Future of AI and Music</h3>
              <p className="text-gray-300">
                As AI gradually takes over human creativity, now is the time for us to prove that human 
                creativity is irreplaceable. Musicians are the most innovative and emotionally expressive 
                artists in the world, and SoundAlchemy will be their dedicated space to showcase their skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;