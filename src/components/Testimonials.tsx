import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const testimonials = [
    {
      name: "Aria Chen",
      role: "Classical Pianist",
      country: "China",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "SoundAlchemy has transformed my career. I've collaborated with musicians I never would have met otherwise, creating fusion pieces that blend Eastern and Western classical traditions."
    },
    {
      name: "Miguel Hernandez",
      role: "Flamenco Guitarist",
      country: "Spain",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "The platform's audio quality is exceptional. Even with collaborators thousands of miles away, it feels like we're in the same room. My latest project connected musicians from five continents!"
    },
    {
      name: "Amara Okafor",
      role: "Vocalist & Songwriter",
      country: "Nigeria",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "As an independent artist, SoundAlchemy has been revolutionary. The fair credit system ensures my contributions are recognized, and I've found a global audience for my Afrobeat fusion."
    },
    {
      name: "Hiroshi Tanaka",
      role: "Electronic Music Producer",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "The technology behind SoundAlchemy is unlike anything I've experienced. The spatial audio features have allowed me to create immersive soundscapes with traditional Japanese instruments and modern electronic elements."
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials.length]);
  
  const nextTestimonial = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <MessageSquare className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Musician <span className="text-gradient">Testimonials</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Hear from the artists who are already transforming their musical journeys with SoundAlchemy.
          </p>
        </div>
        
        <div className="relative glass rounded-xl overflow-hidden transform-gpu will-change-transform hover:scale-[1.01] transition-all duration-500">
          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-indigo-900/50 hover:bg-indigo-600/50 text-white rounded-full p-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 md:left-8"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-indigo-900/50 hover:bg-indigo-600/50 text-white rounded-full p-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 md:right-8"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Testimonial content */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-lg">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">{testimonials[activeIndex].name}</h3>
                  <p className="text-indigo-300">{testimonials[activeIndex].role}</p>
                  <p className="text-gray-400">
                    <span className="inline-block mr-2">🌍</span>
                    {testimonials[activeIndex].country}
                  </p>
                  <div className="flex mt-2 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="glass bg-indigo-900/20 p-6 md:p-8 rounded-xl relative">
                  <div className="absolute -top-4 -left-4 text-indigo-300 opacity-30 transform scale-150">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V30M32.5 20H27.5C26.837 20 26.2011 19.7366 25.7322 19.2678C25.2634 18.7989 25 18.163 25 17.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5C33.163 10 33.7989 10.2634 34.2678 10.7322C34.7366 11.2011 35 11.837 35 12.5V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-200 italic relative z-10 md:leading-relaxed">
                    "{testimonials[activeIndex].quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center p-4 bg-indigo-900/20">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                onClick={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 focus:outline-none ${
                  index === activeIndex ? 'bg-indigo-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of musicians who have already transformed their creative process through global collaboration.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 transform-gpu hover:scale-105">
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;