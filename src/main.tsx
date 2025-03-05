import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import axios from 'axios';

// Set base URL for API requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Check if user is already logged in
const storedUser = localStorage.getItem('user');
if (storedUser) {
  const user = JSON.parse(storedUser);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e1e3f',
              color: '#fff',
              border: '1px solid #4f46e5',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#1e1e3f',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1e1e3f',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);