import React, { useState, useEffect, useRef } from 'react';
import { Users, Music, Globe, Mic2, Award, MessageSquare, Mail, Check, AlertCircle, Heart } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const JoinMovement = () => {
  const { user, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    instrument: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    instrument: ''
  });
  const [emailExists, setEmailExists] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-indigo-400" />,
      title: "Global Network",
      description: "Connect with thousands of musicians from every corner of the world"
    },
    {
      icon: <Music className="h-6 w-6 text-indigo-400" />,
      title: "Collaboration Opportunities",
      description: "Work on projects with world-class musicians across different genres"
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-400" />,
      title: "Cultural Exchange",
      description: "Learn and share musical traditions from diverse cultures"
    },
    {
      icon: <Mic2 className="h-6 w-6 text-indigo-400" />,
      title: "Professional Growth",
      description: "Enhance your skills and expand your musical horizons"
    },
    {
      icon: <Award className="h-6 w-6 text-indigo-400" />,
      title: "Recognition",
      description: "Gain visibility in the global music community"
    }
  ];

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/comments/general');
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    setFormErrors(prev => ({ ...prev, [name]: '' }));

    // Check password match
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword') {
        setPasswordMatch(value === formData.password);
      } else {
        setPasswordMatch(value === formData.confirmPassword);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = { ...formErrors };
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    // Country validation
    if (!formData.country) {
      errors.country = 'Please select your country';
      valid = false;
    }
    
    // Instrument validation
    if (!formData.instrument.trim()) {
      errors.instrument = 'Please enter your primary instrument';
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };

  const checkEmailExists = async (email) => {
    try {
      const { data } = await axios.post('/api/users/check-email', { email });
      setEmailExists(data.exists);
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleEmailBlur = async () => {
    if (formData.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      await checkEmailExists(formData.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Check if email already exists
    const exists = await checkEmailExists(formData.email);
    if (exists) {
      toast.error('Email already registered');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        instrument: formData.instrument,
        bio: formData.message,
        termsAccepted: true
      });
      
      toast.success('Registration successful! Welcome to SoundAlchemy');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        instrument: '',
        message: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (!user) {
      toast.error('Please log in to post a comment');
      return;
    }

    setCommentLoading(true);
    try {
      const { data } = await axios.post('/api/comments', {
        content: newComment,
        section: 'general'
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      setComments(prev => [data, ...prev]);
      setNewComment('');
      toast.success('Comment posted successfully');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment. Please try again.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) {
      toast.error('Please log in to like comments');
      return;
    }

    try {
      const { data } = await axios.put(`/api/comments/${commentId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      // Update comments state with new like count
      setComments(prev => 
        prev.map(comment => 
          comment._id === commentId ? { ...comment, likes: data.likes } : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
      toast.error('Failed to like comment');
    }
  };

  const validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!subscribeEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!validateEmail(subscribeEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribeLoading(true);
    try {
      await axios.post('/api/subscriptions', {
        email: subscribeEmail,
        interests: ['news', 'events', 'workshops']
      });
      
      setSubscribeSuccess(true);
      setSubscribeEmail('');
      toast.success('Subscribed successfully!');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscribeSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
      if (error.response?.data?.message === 'Email already subscribed') {
        toast.error('This email is already subscribed');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setSubscribeLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="join" className="py-20 bg-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Users className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Join the <span className="text-gradient">Movement</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Be part of a global community of musicians creating the future of collaborative music.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="glass rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Join SoundAlchemy?</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-indigo-900/30 rounded-full p-3 mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass rounded-xl p-8 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
              <h3 className="text-xl font-semibold text-white mb-4">Membership is 100% Free</h3>
              <p className="text-gray-300 mb-6">
                SoundAlchemy is committed to making global music collaboration accessible to all talented musicians, 
                regardless of financial background. Our platform is and will always remain free to join.
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white font-medium">No subscription fees, ever</span>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
              <h3 className="text-2xl font-bold text-white mb-6">Apply to Join</h3>
              <p className="text-gray-300 mb-8">
                We're looking for passionate musicians who believe in the power of global collaboration. 
                Fill out the application below to join our community.
              </p>
              
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-indigo-900/30 border ${formErrors.name ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your name"
                    required
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    className={`w-full px-4 py-2 bg-indigo-900/30 border ${emailExists || formErrors.email ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="your.email@example.com"
                    required
                    aria-invalid={!!formErrors.email || emailExists}
                    aria-describedby={formErrors.email || emailExists ? "email-error" : undefined}
                  />
                  {(formErrors.email || emailExists) && (
                    <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {emailExists ? "This email is already registered" : formErrors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password <span className="text-red-500">*</span></label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-indigo-900/30 border ${formErrors.password ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Create a password (min. 6 characters)"
                    minLength={6}
                    required
                    aria-invalid={!!formErrors.password}
                    aria-describedby={formErrors.password ? "password-error" : undefined}
                  />
                  {formErrors.password && (
                    <p id="password-error" className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.password}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-indigo-900/30 border ${!passwordMatch && formData.confirmPassword || formErrors.confirmPassword ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Confirm your password"
                    required
                    aria-invalid={!!formErrors.confirmPassword || (!passwordMatch && !!formData.confirmPassword)}
                    aria-describedby={formErrors.confirmPassword || (!passwordMatch && formData.confirmPassword) ? "confirm-password-error" : undefined}
                  />
                  {(formErrors.confirmPassword || (!passwordMatch && formData.confirmPassword)) && (
                    <p id="confirm-password-error" className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.confirmPassword || "Passwords do not match"}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">Country <span className="text-red-500">*</span></label>
                  <select 
                    id="country" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-indigo-900/30 border ${formErrors.country ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    required
                    aria-invalid={!!formErrors.country}
                    aria-describedby={formErrors.country ? "country-error" : undefined}
                  >
                    <option value="">Select your country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.country && (
                    <p id="country-error" className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.country}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="instrument" className="block text-sm font-medium text-gray-300 mb-1">Primary Instrument <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="instrument" 
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-indigo-900/30 border ${formErrors.instrument ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="e.g., Guitar, Piano, Vocals"
                    required
                    aria-invalid={!!formErrors.instrument}
                    aria-describedby={formErrors.instrument ? "instrument-error" : undefined}
                  />
                  {formErrors.instrument && (
                    <p id="instrument-error" className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.instrument}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Why do you want to join?</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us about yourself and why you're interested in SoundAlchemy..."
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={true} // Always checked as it's required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    readOnly
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                    I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms and Conditions</a>
                  </label>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 flex items-center justify-center"
                    disabled={loading || emailExists}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Newsletter Subscription Section */}
        <div className="glass rounded-xl p-8 mb-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter to receive updates about new collaborations, 
                workshops, and opportunities in the SoundAlchemy community.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Upcoming global collaboration projects</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Virtual workshop announcements</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Success stories from our community</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Exclusive opportunities for subscribers</span>
                </li>
              </ul>
            </div>
            
            <div>
              <form onSubmit={handleSubscribe} className="glass p-6 rounded-xl bg-indigo-900/20">
                <h4 className="text-xl font-semibold text-white mb-4">Subscribe to Our Newsletter</h4>
                
                {subscribeSuccess ? (
                  <div className="bg-green-900/30 border border-green-500 rounded-md p-4 mb-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-green-300">Successfully subscribed to our newsletter!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="subscribeEmail" className="block text-sm font-medium text-gray-300 mb-1">Email Address <span className="text-red-500">*</span></label>
                      <div className="flex">
                        <input 
                          type="email" 
                          id="subscribeEmail" 
                          value={subscribeEmail}
                          onChange={(e) => setSubscribeEmail(e.target.value)}
                          className="flex-1 px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="your.email@example.com"
                          required
                          aria-label="Email for newsletter subscription"
                        />
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 transition-all duration-300 flex items-center"
                          disabled={subscribeLoading}
                          aria-label="Subscribe to newsletter"
                        >
                          {subscribeLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <Mail className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      We respect your privacy. You can unsubscribe at any time.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="glass rounded-xl p-8 mb-16">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-6 w-6 text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Community Comments</h3>
          </div>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={user ? "Share your thoughts with the community..." : "Please log in to comment"}
                  rows={3}
                  disabled={!user || commentLoading}
                  aria-label="Comment text"
                ></textarea>
               </div>
              <div className="flex items-end">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-all duration-300 flex items-center"
                  disabled={commentLoading || !user}
                >
                  {commentLoading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="glass p-6 rounded-xl hover:bg-indigo-900/20 transition-all duration-300">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center">
                      {comment.user.profileImage ? (
                        <img 
                          src={comment.user.profileImage} 
                          alt={comment.user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-indigo-300 font-semibold">
                          {comment.user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{comment.user.name}</h4>
                        <p className="text-gray-400 text-sm">{formatDate(comment.createdAt)}</p>
                      </div>
                      <button 
                        onClick={() => handleLikeComment(comment._id)}
                        className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-gray-300 mt-2">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinMovement;