import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Settings, Save, AlertTriangle, Shield, Database, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const { systemSettings, loading, updateSystemSettings, cleanupDatabase } = useAdmin();
  const [settings, setSettings] = useState({
    allowRegistration: true,
    requireEmailVerification: true,
    autoApproveComments: true,
    maintenanceMode: false,
    maxUploadSize: 2,
    securityLevel: 'standard'
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (systemSettings) {
      setSettings(systemSettings);
    }
  }, [systemSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSystemSettings(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const handleCleanupDatabase = async () => {
    try ```typescript
  const handleCleanupDatabase = async () => {
    try {
      await cleanupDatabase();
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error cleaning up database:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">General Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-white">User Registration</h4>
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
                <h4 className="text-lg font-medium text-white">Email Verification</h4>
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
                <h4 className="text-lg font-medium text-white">Auto-Approve Comments</h4>
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
                <h4 className="text-lg font-medium text-white">Maintenance Mode</h4>
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
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Security Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-white mb-2">Security Level</label>
              <select
                name="securityLevel"
                value={settings.securityLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="basic">Basic - Default security measures</option>
                <option value="standard">Standard - Enhanced security (Recommended)</option>
                <option value="strict">Strict - Maximum security</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-white mb-2">Max Upload Size (MB)</label>
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
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>

      <div className="glass rounded-xl p-6 bg-red-900/20">
        <h3 className="text-xl font-semibold text-white mb-6">Danger Zone</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-white">Database Cleanup</h4>
            <p className="text-sm text-gray-400">Remove expired tokens and old logs. This action cannot be undone.</p>
          </div>
          <button
            onClick={() => setShowConfirmation(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 flex items-center"
          >
            <Database className="h-4 w-4 mr-2" />
            Cleanup Database
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4 text-red-400">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-semibold">Confirm Database Cleanup</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              This action will remove expired tokens, old security logs, and optimize the database. 
              This cannot be undone. Are you sure you want to proceed?
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCleanupDatabase}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
              >
                Confirm Cleanup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
  }
}