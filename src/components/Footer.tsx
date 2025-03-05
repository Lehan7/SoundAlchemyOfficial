import React from 'react';
import { Music, Mail, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#080814] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Music className="h-8 w-8 text-indigo-400" aria-hidden="true" />
              <span className="ml-2 text-2xl font-bold text-gradient">SoundAlchemy</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A universal platform where musicians from all over the world can connect, 
              collaborate, and create music together, regardless of nationality, religion, or culture.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                aria-label="Follow us on Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                aria-label="Follow us on Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://youtube.com" 
                className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                aria-label="Subscribe to our YouTube channel"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href="mailto:contact@soundalchemy.com" 
                className="text-indigo-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                aria-label="Email us"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#project" className="text-gray-400 hover:text-indigo-400 transition-colors">Our Project</a></li>
              <li><a href="#collaborators" className="text-gray-400 hover:text-indigo-400 transition-colors">Collaborators</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-indigo-400 transition-colors">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <p className="text-gray-400 mb-2">Join our WhatsApp group:</p>
            <a 
              href="https://whatsapp.com/group/soundalchemy" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 hover:scale-105 mb-4"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp Group
            </a>
            <p className="text-gray-400">
              Email: <a href="mailto:contact@soundalchemy.com" className="hover:text-indigo-400 transition-colors">contact@soundalchemy.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-indigo-900/50 mt-12 pt-8 text-center text-gray-500">
          <p>© {currentYear} SoundAlchemy. All rights reserved.</p>
          <p className="mt-2 text-gradient">Music is the universal language that unites us all.</p>
          
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-indigo-400 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;