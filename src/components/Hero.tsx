import React, { useEffect, useRef } from 'react';
import { Music, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-planet-earth-rotating-in-space-21552-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a16]/70 via-[#0a0a16]/50 to-[#0a0a16]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full bg-indigo-600/20 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-600/20 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-2/3 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl animate-pulse-slow"></div>
              <Music className="h-12 w-12 text-indigo-400 relative z-10" />
            </div>
            <div className="relative ml-2">
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
              <Globe className="h-12 w-12 text-indigo-400 relative z-10" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="block text-white">Sound<span className="text-gradient">Alchemy</span></span>
            <span className="block text-indigo-300 text-2xl sm:text-3xl md:text-5xl mt-2">Where Musicians Unite Globally</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            A universal platform where musicians from all over the world, regardless of nationality, 
            religion, or culture, can connect, collaborate, and create music together.
          </p>
          
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            {user ? (
              <Link 
                to="/profile" 
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-600/30"
              >
                Go to Profile
              </Link>
            ) : (
              <button 
                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-600/30"
              >
                Join the Movement
              </button>
            )}
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-indigo-400 text-base font-medium rounded-md text-indigo-300 hover:bg-indigo-900/30 md:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
          
          <div className="mt-16 text-indigo-300 flex justify-center items-center">
            <a 
              href="#features" 
              className="flex flex-col items-center hover:text-indigo-400 transition-colors"
              aria-label="Scroll to features section"
            >
              <span>Discover the Future of Music</span>
              <ChevronDown className="h-6 w-6 mt-2 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;