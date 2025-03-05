import React from 'react';

const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;