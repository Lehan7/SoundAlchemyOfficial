import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  country: string;
  instrument: string;
  role: string;
  token: string;
  refreshToken?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User | undefined>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUserInfo: (userData: User) => void;
  isTokenExpired: () => boolean;
  refreshToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => undefined,
  register: async () => {},
  logout: () => {},
  clearError: () => {},
  updateUserInfo: () => {},
  isTokenExpired: () => true,
  refreshToken: async () => false
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Initialize user from localStorage and check token validity
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          // Check if token is expired
          const decoded: any = jwtDecode(parsedUser.token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            // Token is expired, try to refresh
            const refreshed = await refreshToken();
            if (!refreshed) {
              // If refresh failed, logout
              logout();
              toast.error('Your session has expired. Please log in again.');
            }
          } else {
            // Token is valid
            setUser(parsedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
          }
        } catch (error) {
          // Invalid token format, logout
          console.error('Invalid token:', error);
          logout();
        }
      }
      
      setInitializing(false);
    };
    
    initAuth();
  }, []);

  // Check if token is expired
  const isTokenExpired = (): boolean => {
    if (!user?.token) return true;
    
    try {
      const decoded: any = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  // Refresh token
  const refreshToken = async (): Promise<boolean> => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return false;
      
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.refreshToken) return false;
      
      const { data } = await axios.post('/api/users/refresh-token', {
        refreshToken: parsedUser.refreshToken
      });
      
      if (data.token) {
        const updatedUser = { 
          ...parsedUser, 
          token: data.token,
          refreshToken: data.refreshToken || parsedUser.refreshToken
        };
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };

  // Login user
  const login = async (email: string, password: string): Promise<User | undefined> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Set auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setLoading(false);
      return data;
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during login');
      setLoading(false);
      throw error; // Re-throw to allow component to handle it
    }
  };

  // Register user
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post('/api/users', userData);
      
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Set auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during registration');
      setLoading(false);
      throw error; // Re-throw to allow component to handle it
    }
  };

  // Update user info
  const updateUserInfo = (userData: User) => {
    if (!userData) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update auth header with new token if provided
    if (userData.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      if (user) {
        // Call logout API to invalidate token on server
        await axios.post('/api/users/logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Set up axios interceptor for token expiration
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        // If error is 401 (Unauthorized) and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry && user) {
          originalRequest._retry = true;
          
          // Check if token expired message
          const isTokenExpired = error.response?.data?.tokenExpired || 
                                error.response?.data?.message === 'Token expired';
          
          if (isTokenExpired) {
            // Try to refresh the token
            const refreshed = await refreshToken();
            
            if (refreshed) {
              // Retry the original request with new token
              return axios(originalRequest);
            } else {
              // If refresh failed, logout
              logout();
              toast.error('Your session has expired. Please log in again.');
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [user]);

  if (initializing) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0a16]">
      <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      clearError,
      updateUserInfo,
      isTokenExpired,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);