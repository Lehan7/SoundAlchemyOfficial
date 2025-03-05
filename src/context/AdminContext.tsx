import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface AdminContextType {
  users: any[];
  pendingVerifications: any[];
  securityLogs: any[];
  systemSettings: any;
  loading: boolean;
  error: string | null;
  getUsers: (page?: number, search?: string, filter?: string) => Promise<void>;
  getPendingVerifications: () => Promise<void>;
  getSecurityLogs: () => Promise<void>;
  getSystemSettings: () => Promise<void>;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  updateVerificationStatus: (userId: string, status: string, notes?: string) => Promise<void>;
  updateSystemSettings: (settings: any) => Promise<void>;
  cleanupDatabase: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType>({
  users: [],
  pendingVerifications: [],
  securityLogs: [],
  systemSettings: null,
  loading: false,
  error: null,
  getUsers: async () => {},
  getPendingVerifications: async () => {},
  getSecurityLogs: async () => {},
  getSystemSettings: async () => {},
  updateUserRole: async () => {},
  updateVerificationStatus: async () => {},
  updateSystemSettings: async () => {},
  cleanupDatabase: async () => {}
});

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [systemSettings, setSystemSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    if (user?.role === 'admin') {
      getUsers();
      getPendingVerifications();
      getSecurityLogs();
      getSystemSettings();
    }
  }, [user]);

  const getUsers = async (page = 1, search = '', filter = '') => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/users?page=${page}&search=${search}&filter=${filter}`);
      setUsers(data.users);
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching users');
      setLoading(false);
      throw error;
    }
  };

  const getPendingVerifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/verifications/pending');
      setPendingVerifications(data.pendingUsers);
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching pending verifications');
      setLoading(false);
      throw error;
    }
  };

  const getSecurityLogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/security/logs');
      setSecurityLogs(data.logs);
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching security logs');
      setLoading(false);
      throw error;
    }
  };

  const getSystemSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/settings');
      setSystemSettings(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error fetching system settings');
      setLoading(false);
      throw error;
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      setLoading(true);
      await axios.put(`/api/admin/users/${userId}/role`, { role });
      await getUsers(); // Refresh user list
      toast.success('User role updated successfully');
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating user role');
      toast.error('Failed to update user role');
      setLoading(false);
      throw error;
    }
  };

  const updateVerificationStatus = async (userId: string, status: string, notes?: string) => {
    try {
      setLoading(true);
      await axios.put(`/api/admin/users/${userId}/verification`, { status, notes });
      await getPendingVerifications(); // Refresh pending verifications
      toast.success('Verification status updated successfully');
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating verification status');
      toast.error('Failed to update verification status');
      setLoading(false);
      throw error;
    }
  };

  const updateSystemSettings = async (settings: any) => {
    try {
      setLoading(true);
      await axios.put('/api/admin/settings', settings);
      await getSystemSettings(); // Refresh settings
      toast.success('System settings updated successfully');
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error updating system settings');
      toast.error('Failed to update system settings');
      setLoading(false);
      throw error;
    }
  };

  const cleanupDatabase = async () => {
    try {
      setLoading(true);
      await axios.post('/api/admin/database/cleanup');
      toast.success('Database cleanup completed successfully');
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error cleaning up database');
      toast.error('Failed to clean up database');
      setLoading(false);
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{
      users,
      pendingVerifications,
      securityLogs,
      systemSettings,
      loading,
      error,
      getUsers,
      getPendingVerifications,
      getSecurityLogs,
      getSystemSettings,
      updateUserRole,
      updateVerificationStatus,
      updateSystemSettings,
      cleanupDatabase
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => React.useContext(AdminContext);