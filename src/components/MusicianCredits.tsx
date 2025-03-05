import React from 'react';
import { Award, Music, Star, Users } from 'lucide-react';

const MusicianCredits = () => {
  const creditCategories = [
    {
      title: "Fair Compensation",
      description: "Our platform ensures musicians receive fair compensation for their contributions to collaborative projects.",
      icon: <Award className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Proper Attribution",
      description: "Every musician's contribution is properly credited and recognized in all project releases.",
      icon: <Star className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Transparent Royalties",
      description: "Clear and transparent royalty distribution for all collaborative works.",
      icon: <Music className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Community Voting",
      description: "Musicians have a say in project decisions through our democratic voting system.",
      icon: <Users className="h-8 w-8 text-indigo-400" />
    }
  ];

  return (
    <section id="credits" className="py-20 bg-[#0c0c1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Award className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Musician <span className="text-gradient">Credits</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            We believe in fair recognition and compensation for all musicians who contribute to collaborative projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {creditCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-8 hover:bg-indigo-900/20 transition-all duration-500 hover:scale-105 group"
            >
              <div className="bg-indigo-900/30 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-lg group-hover:animate-glow transition-all duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">{category.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{category.description}</p>
            </div>
          ))}
        </div>
        
        <div className="glass rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Credit System</h3>
              <p className="text-gray-300 mb-6">
                SoundAlchemy has developed a comprehensive credit system that ensures all musicians receive proper 
                recognition and fair compensation for their contributions to collaborative projects.
              </p>
              
              <div className="space-y-6">
                <div className="glass bg-indigo-900/20 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-indigo-300 mb-3">Blockchain-Verified Credits</h4>
                  <p className="text-gray-300">
                    All musician contributions are recorded on a transparent blockchain ledger, ensuring permanent 
                    and immutable credit records that can't be altered or disputed.
                  </p>
                </div>
                
                <div className="glass bg-indigo-900/20 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-indigo-300 mb-3">Smart Royalty Distribution</h4>
                  <p className="text-gray-300">
                    Our platform automatically calculates and distributes royalties based on the agreed-upon 
                    contribution percentages, with payments made directly to musicians' accounts.
                  </p>
                </div>
                
                <div className="glass bg-indigo-900/20 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-indigo-300 mb-3">Metadata Integration</h4>
                  <p className="text-gray-300">
                    All digital releases include comprehensive metadata that properly credits every musician, 
                    ensuring proper attribution across streaming platforms and digital stores.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-full">
                <img 
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Musicians performing" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0c0c1d] via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass rounded-xl p-6 bg-indigo-900/40 backdrop-blur-md">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                        alt="Musician" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">James Wilson</h4>
                      <p className="text-indigo-300 text-sm">Lead Guitarist, Global Symphony Project</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "For the first time in my career, I feel that my contributions are being properly recognized and 
                    fairly compensated. SoundAlchemy's credit system is revolutionary."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Our mission is to create a music industry where every musician receives the credit and compensation they deserve, 
            regardless of their location or background.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30">
            Learn More About Our Credit System
          </button>
        </div>
      </div>
    </section>
  );
};

export default MusicianCredits;