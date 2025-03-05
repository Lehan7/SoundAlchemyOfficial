import React, { useState } from 'react';
import { Award, Linkedin, Twitter, Globe, X, Quote, Sparkles, Target, Heart, Lightbulb } from 'lucide-react';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const teamMembers = [
    {
      name: "Lehan Kawshila",
      role: "Founder",
      title: "The Visionary Architect of SoundAlchemy",
      country: "Sri Lanka",
      image: "assert/team/lehan.jpg",
      bio: "As a musician, undergraduate software engineer, and AI expert, Lehan is the driving force behind SoundAlchemy. With a deep love for music and technology, he envisioned a global home for musicians, where creativity has no borders. Passionate about uniting artists worldwide, he believes that human creativity is irreplaceable—and that through music, we can heal not just hearts, but the world itself.",
      quote: "Music isn't just sound—it's a force that brings people together. SoundAlchemy is that space where musicians can unite, collaborate, and create something bigger than themselves."
    },
    {
      name: "Alexandra",
      role: "Co-founder & Strategist",
      title: "The Heart of Our Global Mission",
      country: "Germany",
      image: "assert/team/alexandra.PNG",
      bio: "Alexandra is the strategic mastermind behind SoundAlchemy, ensuring that our vision reaches every corner of the world. With years of experience in Music and global networking, she plays a crucial role in expanding SoundAlchemy's impact. Her leadership and unwavering belief in the power of music make her an essential pillar of this movement.",
      quote: "Music knows no boundaries. With SoundAlchemy, we are creating a place where every musician can truly belong."
    },
    {
      name: "Antonio",
      role: "Lead Audio Engineer & Music Director",
      title: "The Mastermind Behind Our Sound",
      country: "Canada",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      bio: "Antonio is the soul of our sound, ensuring every collaboration, arrangement, and recording meets the highest standard. As a highly skilled audio engineer and music producer, he brings the technical expertise that transforms ideas into professional-grade music. His passion for perfection and innovation makes him an irreplaceable part of the SoundAlchemy family.",
      quote: "Music isn't just heard—it's felt. SoundAlchemy is where artists can create magic together."
    },
    {
      name: "Sofia",
      role: "Communications & Artist Relations Lead",
      title: "The Bridge That Connects Us All",
      country: "Italy",
      image: "assert/team/sofia.jpg",
      bio: "Sofia is the voice behind SoundAlchemy, ensuring that every artist, from rising stars to global icons, feels at home in our community. As a singer with expertise in public relations and artist management, she deeply understands both the art and the industry. With her passion for music and her ability to bring people together, she fosters a culture of creativity, respect, and collaboration.",
      quote: "Music connects us all, and SoundAlchemy is where musicians find not just a platform, but a family."
    }
  ];

  const openModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const missionItems = [
    {
      icon: <Globe className="h-6 w-6 text-indigo-400" />,
      title: "Unite Musicians Worldwide",
      description: "Build a trusted, borderless platform where artists can connect, create, and collaborate freely."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-indigo-400" />,
      title: "Empower Creativity",
      description: "Provide a space where talent, knowledge, and culture can be shared without limits."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-indigo-400" />,
      title: "Elevate Human Expression",
      description: "Showcase the power of real musicianship in an era of AI-generated content."
    },
    {
      icon: <Heart className="h-6 w-6 text-indigo-400" />,
      title: "Heal & Inspire Through Music",
      description: "Use the universal language of music to bring harmony, positivity, and change to the world."
    }
  ];

  return (
    <>
      <section id="team" className="py-20 bg-gradient-to-b from-[#0a0a16] to-[#0c0c1d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
              <Award className="h-8 w-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The <span className="text-gradient">Visionaries</span> Behind SoundAlchemy</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Meet the dreamers, creators, and innovators who are bringing this global vision to life.
            </p>
          </div>
          
          <div className="relative mb-16">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
            
            <div className="glass rounded-xl p-8 md:p-12 relative z-10 mb-16">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Meet Our Visionaries ✨</h3>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  At SoundAlchemy, we are more than just a platform—we are a movement. Behind this global 
                  initiative stands a team of passionate visionaries, united by one belief: Music is the universal 
                  language that can connect, inspire, and heal the world.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="glass rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 group cursor-pointer"
                    onClick={() => openModal(member)}
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="glass inline-block px-3 py-1 rounded-full bg-indigo-600/50 text-white text-sm backdrop-blur-sm">
                          Click to learn more
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">{member.name}</h3>
                      <p className="text-indigo-400 mb-2">{member.role}</p>
                      <div className="flex items-center text-gray-400">
                        <span>🌍</span>
                        <span className="ml-2">{member.country}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slogan and Mission Section */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                  <div className="inline-block p-2 bg-indigo-900/50 rounded-full mb-6">
                    <Quote className="h-6 w-6 text-indigo-300" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Our SoundAlchemy Slogan</h3>
                  <p className="text-2xl md:text-3xl text-gradient font-bold mb-8">
                    "One World. One Sound. Infinite Possibilities."
                  </p>
                  
                  <div className="mb-8">
                    <div className="flex items-start mb-4">
                      <div className="bg-indigo-900/50 rounded-full p-2 mr-4 mt-1">
                        <Target className="h-5 w-5 text-indigo-300" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Vision</h4>
                        <p className="text-gray-300">
                          To create the world's first truly global music platform, where musicians
                          from every culture, background, and genre unite to collaborate, inspire,
                          and revolutionize the future of music.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-indigo-300 font-semibold mb-4">SoundAlchemy is not just a platform. It's a movement. It's the future.</p>
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="inline-block p-2 bg-indigo-900/50 rounded-full mb-6">
                    <Target className="h-6 w-6 text-indigo-300" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Mission</h3>
                  
                  <div className="space-y-6">
                    {missionItems.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-indigo-900/50 rounded-full p-2 mr-4 mt-1">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-white rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-500 neon-border">
            <h3 className="text-2xl font-bold mb-4">Join the Movement! 🎶🌍</h3>
            <p className="text-lg mb-6">
              These visionaries have come together to build a revolutionary platform where musicians
              worldwide can collaborate, create, and inspire. With their leadership, SoundAlchemy is not just
              a platform—it's the future of global music collaboration.
            </p>
            <p className="text-lg mb-6">
              Are you ready to be part of history? Join us and let's create something extraordinary, together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-all duration-300 shadow-lg">
                Join as a Musician
              </button>
              <button className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-indigo-700/50 transition-all duration-300">
                Support the Project
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal */}
      {modalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl glass rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-indigo-900/50 rounded-full p-2 text-white hover:bg-indigo-700 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass inline-block px-3 py-1 rounded-full bg-indigo-600/50 text-white text-sm backdrop-blur-sm mb-2">
                    {selectedMember.country}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-indigo-300">{selectedMember.role}</p>
                </div>
              </div>
              
              <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                <h3 className="text-xl font-semibold text-indigo-300 mb-4">{selectedMember.title}</h3>
                <p className="text-gray-300 mb-6">{selectedMember.bio}</p>
                
                <div className="glass p-4 rounded-xl bg-indigo-900/30 mb-6">
                  <div className="flex items-start">
                    <Quote className="h-8 w-8 text-indigo-400 mr-3 flex-shrink-0" />
                    <p className="text-white italic">{selectedMember.quote}</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a href="#" className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <Globe className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;