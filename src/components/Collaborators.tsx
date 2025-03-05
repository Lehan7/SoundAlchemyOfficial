import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Globe, Music, Mic2 } from 'lucide-react';

const Collaborators = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('featured');
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const collaborators = [
    {
      name: "Sarah Chen",
      role: "Vocalist",
      country: "Japan",
      achievements: "Grammy-nominated artist, 3 platinum albums",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-singing-in-a-studio-with-headphones-on-41668-large.mp4"
    },
    {
      name: "Michael Rodriguez",
      role: "Guitarist",
      country: "Spain",
      achievements: "Lead guitarist for Madrid Symphony, International touring artist",
      video: "https://assets.mixkit.co/videos/preview/mixkit-man-playing-an-electric-guitar-in-a-recording-studio-14152-large.mp4"
    },
    {
      name: "Aisha Patel",
      role: "Pianist",
      country: "India",
      achievements: "Classical virtuoso, Bollywood composer",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-playing-the-piano-in-a-studio-41665-large.mp4"
    },
    {
      name: "David Okereke",
      role: "Drummer",
      country: "Nigeria",
      achievements: "Afrobeat pioneer, Session musician for global artists",
      video: "https://assets.mixkit.co/videos/preview/mixkit-man-playing-drums-in-a-recording-studio-14148-large.mp4"
    },
    {
      name: "Elena Volkov",
      role: "Violinist",
      country: "Russia",
      achievements: "Moscow Philharmonic soloist, Classical crossover artist",
      video: "https://assets.mixkit.co/videos/preview/mixkit-man-playing-cello-in-a-recording-studio-14147-large.mp4"
    },
    {
      name: "Jamal Washington",
      role: "Producer",
      country: "United States",
      achievements: "Multi-platinum producer, Worked with top 40 artists",
      video: "https://assets.mixkit.co/videos/preview/mixkit-man-playing-drums-in-a-recording-studio-14148-large.mp4"
    }
  ];

  const recentJoins = [
    {
      name: "Mei Lin",
      role: "Erhu Player",
      country: "China",
      joined: "2 days ago",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Carlos Santana",
      role: "Flamenco Guitarist",
      country: "Mexico",
      joined: "3 days ago",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Amara Diop",
      role: "Kora Player",
      country: "Senegal",
      joined: "5 days ago",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Hiroshi Tanaka",
      role: "Shakuhachi Master",
      country: "Japan",
      joined: "1 week ago",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const countryStats = [
    { region: "Asia", count: 47, color: "from-blue-500 to-cyan-400" },
    { region: "Europe", count: 38, color: "from-purple-500 to-indigo-400" },
    { region: "Africa", count: 32, color: "from-yellow-500 to-orange-400" },
    { region: "North America", count: 25, color: "from-red-500 to-pink-400" },
    { region: "South America", count: 18, color: "from-green-500 to-emerald-400" },
    { region: "Oceania", count: 12, color: "from-indigo-500 to-blue-400" }
  ];

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, collaborators.length);
  }, [collaborators.length]);

  // Pause all videos when active video changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === activeVideo && video) {
        video.play().catch(err => console.error("Error playing video:", err));
      } else if (video) {
        video.pause();
      }
    });
  }, [activeVideo]);

  const togglePlay = (index: number) => {
    if (activeVideo === index) {
      setActiveVideo(null);
    } else {
      setActiveVideo(index);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !muted;
      }
    });
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              let count = 0;
              const updateCounter = () => {
                const increment = target / 50;
                if (count < target) {
                  count += increment;
                  counter.textContent = Math.ceil(count).toString();
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target.toString();
                }
              };
              requestAnimationFrame(updateCounter);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Lazy load videos
  const handleVideoRef = useCallback((element: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = element;
  }, []);

  return (
    <section id="collaborators" className="py-20 bg-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Globe className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Global <span className="text-gradient">Collaborators</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Musicians from around the world are already joining our movement. Experience the diversity of talent uniting on SoundAlchemy.
          </p>
        </div>
        
        {/* Global Stats */}
        <div ref={containerRef} className="glass rounded-xl p-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 transform hover:scale-[1.02] transition-all duration-500">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-gradient mb-2">
              <span className="counter" data-target="172">0</span>
            </div>
            <p className="text-gray-300 text-lg">Countries Represented</p>
            <div className="mt-4 flex justify-center">
              <Globe className="h-10 w-10 text-indigo-400 animate-pulse-slow" />
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-gradient mb-2">
              <span className="counter" data-target="3500">0</span>+
            </div>
            <p className="text-gray-300 text-lg">Professional Musicians</p>
            <div className="mt-4 flex justify-center">
              <Music className="h-10 w-10 text-purple-400 animate-pulse-slow" style={{animationDelay: '1s'}} />
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-gradient mb-2">
              <span className="counter" data-target="85">0</span>
            </div>
            <p className="text-gray-300 text-lg">Active Collaborations</p>
            <div className="mt-4 flex justify-center">
              <Mic2 className="h-10 w-10 text-blue-400 animate-pulse-slow" style={{animationDelay: '2s'}} />
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="glass rounded-full p-1 flex space-x-1">
            <button 
              onClick={() => setActiveTab('featured')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'featured' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
              aria-pressed={activeTab === 'featured'}
            >
              Featured Artists
            </button>
            <button 
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'recent' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
              aria-pressed={activeTab === 'recent'}
            >
              Recent Joins
            </button>
            <button 
              onClick={() => setActiveTab('regions')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'regions' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
              aria-pressed={activeTab === 'regions'}
            >
              Global Reach
            </button>
          </div>
        </div>
        
        {/* Featured Artists Tab */}
        {activeTab === 'featured' && (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={toggleMute} 
                className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition-colors"
                aria-label={muted ? "Unmute videos" : "Mute videos"}
              >
                {muted ? (
                  <>
                    <VolumeX className="h-5 w-5" />
                    <span>Unmute Videos</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5" />
                    <span>Mute Videos</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collaborator, index) => (
                <div 
                  key={index} 
                  className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-500"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <video 
                      ref={(el) => handleVideoRef(el, index)}
                      className="collaborator-video w-full h-full object-cover"
                      loop
                      muted={muted}
                      playsInline
                      preload="none"
                      poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    >
                      <source src={collaborator.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent"></div>
                    <button 
                      className="absolute inset-0 flex items-center justify-center"
                      onClick={() => togglePlay(index)}
                      aria-label={activeVideo === index ? "Pause video" : "Play video"}
                    >
                      <div className="bg-indigo-600/80 rounded-full p-4 backdrop-blur-sm hover:bg-indigo-500/80 transition-colors">
                        {activeVideo === index ? (
                          <Pause className="h-8 w-8 text-white" />
                        ) : (
                          <Play className="h-8 w-8 text-white" />
                        )}
                      </div>
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">{collaborator.name}</h3>
                    <p className="text-indigo-400 mb-2">{collaborator.role}</p>
                    <div className="flex items-center text-gray-400 mb-2">
                      <span aria-hidden="true">🌍</span>
                      <span className="ml-2">{collaborator.country}</span>
                    </div>
                    <p className="text-gray-300 text-sm italic">{collaborator.achievements}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Recent Joins Tab */}
        {activeTab === 'recent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentJoins.map((musician, index) => (
              <div 
                key={index} 
                className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={musician.image} 
                    alt={musician.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width="500"
                    height="500"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {musician.joined}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">{musician.name}</h3>
                  <p className="text-indigo-400 mb-2">{musician.role}</p>
                  <div className="flex items-center text-gray-400">
                    <span aria-hidden="true">🌍</span>
                    <span className="ml-2">{musician.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Regions Tab */}
        {activeTab === 'regions' && (
          <div className="glass rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Global Distribution</h3>
                <div className="space-y-6">
                  {countryStats.map((region, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{region.region}</span>
                        <span className="text-indigo-300">{region.count} countries</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${region.color} rounded-full`}
                          style={{ width: `${(region.count / 172) * 100}%` }}
                          aria-label={`${region.region}: ${region.count} countries (${Math.round((region.count / 172) * 100)}%)`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Musician Diversity</h3>
                <div className="glass bg-indigo-900/20 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Instrument Categories</span>
                    <span className="text-indigo-300">15+</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Strings", "Percussion", "Brass", "Woodwind", "Keyboard", "Electronic", "Vocal", "Traditional"].map((cat, i) => (
                      <span key={i} className="bg-indigo-900/40 text-indigo-300 px-3 py-1 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="glass bg-indigo-900/20 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Music Genres</span>
                    <span className="text-indigo-300">30+</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Classical", "Jazz", "Rock", "Pop", "Electronic", "Folk", "Traditional", "Fusion", "Experimental"].map((genre, i) => (
                      <span key={i} className="bg-indigo-900/40 text-indigo-300 px-3 py-1 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-16 glass rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-500 neon-border">
          <h3 className="text-2xl font-bold mb-4 text-gradient">Join Our Global Collaboration</h3>
          <p className="text-lg mb-6 text-gray-300">
            Musicians from over 170 countries have already joined our initiative. 
            Be part of this historic project and showcase your talent to the world.
          </p>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30"
            onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Apply as a Collaborator
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collaborators;