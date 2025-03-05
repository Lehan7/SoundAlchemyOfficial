import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Settings, Database, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminProvider } from '../../context/AdminContext';
import UserManagement from './UserManagement';
import SecurityLogs from './SecurityLogs';
import SystemSettings from './SystemSettings';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/admin', icon: <Users className="h-5 w-5" />, label: 'User Management' },
    { path: '/admin/security', icon: <Shield className="h-5 w-5" />, label: 'Security Logs' },
    { path: '/admin/settings', icon: <Settings className="h-5 w-5" />, label: 'System Settings' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#0a0a16] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md bg-indigo-900/30 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Sidebar */}
            <div className={`md:w-64 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
              <div className="glass rounded-xl p-6 sticky top-24">
                <div className="hidden md:block mb-6">
                  <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-400">Manage your platform</p>
                </div>
                
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-300 hover:bg-indigo-900/50 hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-indigo-900/50">
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 rounded-md text-gray-300 hover:bg-indigo-900/50 hover:text-white transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="glass rounded-xl p-6">
                <Routes>
                  <Route path="/" element={<UserManagement />} />
                  <Route path="/security" element={<SecurityLogs />} />
                  <Route path="/settings" element={<SystemSettings />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminDashboard;