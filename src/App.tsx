import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Music, Globe, Users, MessageSquare, Mic2, Award, Heart } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Project from './components/Project';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminSignIn from './components/AdminSignIn';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import SkipToContent from './components/SkipToContent';

// Lazy load non-critical components
const Collaborators = lazy(() => import('./components/Collaborators'));
const UpcomingCollaboration = lazy(() => import('./components/UpcomingCollaboration'));
const MusicianCredits = lazy(() => import('./components/MusicianCredits'));
const GlobalImpact = lazy(() => import('./components/GlobalImpact'));
const MusicTechnology = lazy(() => import('./components/MusicTechnology'));
const SuccessStories = lazy(() => import('./components/SuccessStories'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Workshop = lazy(() => import('./components/Workshop'));
const Community = lazy(() => import('./components/Community'));
const JoinMovement = lazy(() => import('./components/JoinMovement'));
const Team = lazy(() => import('./components/Team'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen" aria-live="polite" aria-busy="true">
    <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

function App() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <LoadingFallback />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a16] text-white">
      <SkipToContent />
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80')] bg-cover bg-fixed opacity-10 z-0" aria-hidden="true"></div>
      <div className="relative z-10">
        <Navbar onLoginClick={() => setShowLoginModal(true)} />
        
        <main id="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <Project />
                <Suspense fallback={<LoadingFallback />}>
                  <Collaborators />
                  <UpcomingCollaboration />
                  <MusicianCredits />
                  <GlobalImpact />
                  <MusicTechnology />
                  <SuccessStories />
                  <Testimonials />
                  <Workshop />
                  <Community />
                  <JoinMovement />
                  <Team />
                </Suspense>
              </>
            } />
            
            {/* Admin Sign In Route */}
            <Route path="/admin-signin" element={<AdminSignIn />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <PrivateRoute>
                <Suspense fallback={<LoadingFallback />}>
                  <UserProfile />
                </Suspense>
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <PrivateRoute requiredRole="admin">
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </PrivateRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Login Modal */}
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      </div>
    </div>
  );
}

export default App;