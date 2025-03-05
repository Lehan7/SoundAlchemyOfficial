import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { User, Shield, Search, Filter, MoreVertical, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const { users, loading, getUsers, updateUserRole, updateVerificationStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');

  useEffect(() => {
    getUsers(page, searchTerm, filter);
  }, [page, filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    getUsers(1, searchTerm, filter);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleVerificationStatus = async (userId: string, status: string) => {
    try {
      await updateVerificationStatus(userId, status, verificationNotes);
      setShowUserModal(false);
      setVerificationNotes('');
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  const handleUserAction = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Users</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending Verification</option>
          <option value="admin">Admins</option>
          <option value="moderator">Moderators</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-900/30">
              {users.map((user: any) => (
                <tr key={user._id} className="hover:bg-indigo-900/20">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-900/50 flex items-center justify-center mr-3">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-indigo-300" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-indigo-900/30 border border-indigo-800 rounded text-white text-sm px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.verificationStatus === 'verified' 
                        ? 'bg-green-900/50 text-green-300'
                        : user.verificationStatus === 'pending'
                        ? 'bg-yellow-900/50 text-yellow-300'
                        : 'bg-red-900/50 text-red-300'
                    }`}>
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleUserAction(user)}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Action Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl glass rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
            <button 
              onClick={() => setShowUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <XCircle className="h-6 w-6" />
            </button>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">User Management</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-900/50 flex items-center justify-center mr-4">
                    {selectedUser.profileImage ? (
                      <img src={selectedUser.profileImage} alt={selectedUser.name} className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-indigo-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{selectedUser.name}</h4>
                    <p className="text-indigo-300">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="glass bg-indigo-900/20 p-6 rounded-xl space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Verification Status</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerificationStatus(selectedUser._id, 'verified')}
                        className="flex items-center px-3 py-1 bg-green-900/50 text-green-300 rounded-md hover:bg-green-900/70 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify
                      </button>
                      <button
                        onClick={() => handleVerificationStatus(selectedUser._id, 'rejected')}
                        className="flex items-center px-3 py-1 bg-red-900/50 text-red-300 rounded-md hover:bg-red-900/70 transition-colors"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Verification Notes</label>
                    <textarea
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                      placeholder="Add notes about verification decision..."
                    />
                  </div>
                </div>

                <div className="glass bg-indigo-900/20 p-6 rounded-xl">
                  <h5 className="text-lg font-semibold text-white mb-4">User Details</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                      <p className="text-white">{selectedUser.country}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Instrument</label>
                      <p className="text-white">{selectedUser.instrument}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Joined</label>
                      <p className="text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Last Active</label>
                      <p className="text-white">{new Date(selectedUser.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;