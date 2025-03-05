import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('');
  const [instrument, setInstrument] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { login, register, error, clearError, loading } = useAuth();
  
  // Form validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Clear errors when switching between login and register
  useEffect(() => {
    clearError();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  }, [isLogin, clearError]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login validation
      if (!validateEmail(email) || !validatePassword(password)) {
        return;
      }
      
      try {
        await login(email, password);
        toast.success('Login successful!');
        onClose();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } else {
      // Registration validation
      if (!validateEmail(email) || !validatePassword(password) || !validateConfirmPassword(password, confirmPassword)) {
        return;
      }
      
      if (!country) {
        toast.error('Please select your country');
        return;
      }
      
      if (!instrument) {
        toast.error('Please enter your primary instrument');
        return;
      }
      
      if (!termsAccepted) {
        toast.error('You must accept the terms and conditions');
        return;
      }
      
      try {
        await register({
          name: email.split('@')[0], // Temporary name from email
          email,
          password,
          country,
          instrument,
          termsAccepted
        });
        toast.success('Registration successful! Welcome to SoundAlchemy');
        onClose();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md glass rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-indigo-900/50 rounded-full p-2 text-white hover:bg-indigo-700 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          
          {error && (
            <div className="bg-red-900/30 border border-red-500 rounded-md p-3 mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  className={`w-full pl-10 pr-4 py-2 bg-indigo-900/30 border ${emailError ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                  className={`w-full pl-10 pr-10 py-2 bg-indigo-900/30 border ${passwordError ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Your password"
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5 text-gray-400" /> : 
                    <Eye className="h-5 w-5 text-gray-400" />
                  }
                </button>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
            </div>
            
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => validateConfirmPassword(password, confirmPassword)}
                      className={`w-full pl-10 pr-4 py-2 bg-indigo-900/30 border ${confirmPasswordError ? 'border-red-500' : 'border-indigo-800'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  {confirmPasswordError && <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                  <select 
                    id="country" 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
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
                </div>
                
                <div>
                  <label htmlFor="instrument" className="block text-sm font-medium text-gray-300 mb-1">Primary Instrument</label>
                  <input 
                    type="text" 
                    id="instrument" 
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Guitar, Piano, Vocals"
                    required
                  />
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-300">
                      I accept the <a href="#" className="text-indigo-300 hover:text-indigo-200">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
              </>
            )}
            
            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-indigo-300 hover:text-indigo-400 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 flex items-center justify-center"
              disabled={loading}
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
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  clearError();
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setCountry('');
                  setInstrument('');
                  setTermsAccepted(false);
                }}
                className="ml-2 text-indigo-300 hover:text-indigo-400 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              By continuing, you agree to SoundAlchemy's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;