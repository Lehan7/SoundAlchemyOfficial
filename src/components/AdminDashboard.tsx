import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Settings, Database, BarChart2, Shield, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

// Admin Dashboard Components
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchUsers();
  }, [page]);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/users?page=${page}&search=${searchTerm}`);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };
  
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
      
      <div className="glass rounded-xl p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="flex-1 px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
          >
            Search
          </button>
        </form>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-indigo-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-900/30">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-indigo-900/20">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                          {user.profileImage ? (
                            <img src={user.profileImage} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <span className="text-indigo-300 font-semibold">{user.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.country || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-900 text-purple-200' : 'bg-indigo-900 text-indigo-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-indigo-900/30 border border-indigo-800 rounded text-white text-sm px-2 py-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-md bg-indigo-900/30 text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="flex items-center px-4 text-gray-300">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-md bg-indigo-900/30 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    allowRegistration: true,
    requireEmailVerification: false,
    maxUploadSize: 2,
    maintenanceMode: false,
    autoApproveComments: true
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.put('/api/admin/settings', settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
      
      <div className="glass rounded-xl p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">User Registration</h3>
                <p className="text-sm text-gray-400">Allow new users to register on the platform</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Email Verification</h3>
                <p className="text-sm text-gray-400">Require email verification for new accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Auto-Approve Comments</h3>
                <p className="text-sm text-gray-400">Automatically approve new comments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="autoApproveComments"
                  checked={settings.autoApproveComments}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Maintenance Mode</h3>
                <p className="text-sm text-gray-400">Put the site in maintenance mode (only admins can access)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Max Upload Size (MB)</label>
              <input
                type="number"
                name="maxUploadSize"
                value={settings.maxUploadSize}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white rounded-full border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Settings className="h-5 w-5 mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DatabaseStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComments: 0,
    totalSubscriptions: 0,
    dbSize: 0,
    avgResponseTime: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/database/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching database stats:', error);
        toast.error('Failed to load database statistics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Database Statistics</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass rounded-xl p-6 text-center">
              <Database className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-white mb-1">Database Size</h3>
              <p className="text-2xl font-bold text-indigo-300">{stats.dbSize.toFixed(2)} MB</p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <Users className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-white mb-1">Total Users</h3>
              <p className="text-2xl font-bold text-indigo-300">{stats.totalUsers}</p>
            </div>
            
            <div className="glass rounded-xl p-6 text-center">
              <BarChart2 className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-white mb-1">Avg Response Time</h3>
              <p className="text-2xl font-bold text-indigo-300">{stats.avgResponseTime} ms</p>
            </div>
          </div>
          
          <div className="glass rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Database Optimization</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Data Cleanup</h4>
                <p className="text-gray-300 mb-4">Remove unused data to optimize database performance</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                  Run Cleanup
                </button>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Index Optimization</h4>
                <p className="text-gray-300 mb-4">Optimize database indexes for better query performance</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                  Optimize Indexes
                </button>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Database Backup</h4>
                <p className="text-gray-300 mb-4">Create a backup of the current database</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                  Create Backup
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('/api/admin/security/logs');
        setLogs(data);
      } catch (error) {
        console.error('Error fetching security logs:', error);
        toast.error('Failed to load security logs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogs();
  }, []);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Security Logs</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-900/30">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-indigo-900/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{log.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.user || 'Anonymous'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.ipAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.status === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/admin', icon: <Users className="h-5 w-5" />, label: 'User Management' },
    { path: '/admin/settings', icon: <Settings className="h-5 w-5" />, label: 'System Settings' },
    { path: '/admin/database', icon: <Database className="h-5 w-5" />, label: 'Database Stats' },
    { path: '/admin/security', icon: <Shield className="h-5 w-5" />, label: 'Security Logs' },
  ];
  
  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };
  
  return (
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
                <Route path="/settings" element={<SystemSettings />} />
                <Route path="/database" element={<DatabaseStats />} />
                <Route path="/security" element={<SecurityLogs />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;