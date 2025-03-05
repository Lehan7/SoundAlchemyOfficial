import React, { useState, useEffect, useRef } from 'react';
import { Users, MessageCircle, Globe, Music, Headphones, Share2, Heart, Smile, Calendar, Clock } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  useEffect(() => {
    // Close emoji picker when clicking outside
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchDiscussions = async () => {
    try {
      const { data } = await axios.get('/api/discussions');
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
      toast.error('Failed to load discussions');
    }
  };

  const handleSubmitDiscussion = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to post discussions');
      return;
    }

    if (!newDiscussion.trim()) {
      toast.error('Please enter a discussion topic');
      return;
    }

    try {
      const { data } = await axios.post('/api/discussions', {
        content: newDiscussion,
        userId: user._id
      });
      setDiscussions([data, ...discussions]);
      setNewDiscussion('');
      toast.success('Discussion posted successfully');
    } catch (error) {
      console.error('Error posting discussion:', error);
      toast.error('Failed to post discussion');
    }
  };

  const handleReply = async (discussionId) => {
    if (!user) {
      toast.error('Please log in to reply');
      return;
    }

    if (!replyContent.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    try {
      const { data } = await axios.post(`/api/discussions/${discussionId}/replies`, {
        content: replyContent,
        userId: user._id
      });

      setDiscussions(discussions.map(disc => 
        disc._id === discussionId ? data : disc
      ));
      setReplyingTo(null);
      setReplyContent('');
      toast.success('Reply posted successfully');
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error('Failed to post reply');
    }
  };

  const handleLike = async (discussionId) => {
    if (!user) {
      toast.error('Please log in to like discussions');
      return;
    }

    try {
      const { data } = await axios.put(`/api/discussions/${discussionId}/like`);
      setDiscussions(discussions.map(disc => 
        disc._id === discussionId ? { ...disc, likes: data.likes } : disc
      ));
    } catch (error) {
      console.error('Error liking discussion:', error);
      toast.error('Failed to like discussion');
    }
  };

  const onEmojiSelect = (emoji) => {
    setNewDiscussion(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <section id="community" className="py-20 bg-[#0a0a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-indigo-900/30 rounded-full mb-4 animate-glow">
            <Users className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Vibrant <span className="text-gradient">Community</span></h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Connect, learn, and grow with a global network of passionate musicians sharing knowledge and opportunities.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="glass rounded-full p-1 flex space-x-1">
            <button 
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'discussions' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
            >
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Discussions
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('collaborations')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'collaborations' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
            >
              <span className="flex items-center">
                <Music className="h-4 w-4 mr-2" />
                Collaboration Requests
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'events' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-900/30'
              }`}
            >
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Upcoming Events
              </span>
            </button>
          </div>
        </div>
        
        {/* Discussion Form */}
        <div className="glass rounded-xl p-6 mb-8">
          <form onSubmit={handleSubmitDiscussion} className="space-y-4">
            <div className="relative">
              <textarea
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
                placeholder={user ? "Start a discussion..." : "Please log in to start a discussion"}
                className="w-full px-4 py-3 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
                disabled={!user}
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute bottom-3 right-3 text-gray-400 hover:text-indigo-400 transition-colors"
                disabled={!user}
              >
                <Smile className="h-6 w-6" />
              </button>
            </div>

            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute z-10">
                <Picker 
                  data={data} 
                  onEmojiSelect={onEmojiSelect}
                  theme="dark"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
                disabled={!user}
              >
                Post Discussion
              </button>
            </div>
          </form>
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <div key={discussion._id} className="glass rounded-xl p-6 hover:bg-indigo-900/20 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-900/50 flex items-center justify-center">
                    {discussion.user.profileImage ? (
                      <img
                        src={discussion.user.profileImage}
                        alt={discussion.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <Users className="h-6 w-6 text-indigo-400" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{discussion.user.name}</h4>
                      <p className="text-gray-400 text-sm">{new Date(discussion.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mt-2">{discussion.content}</p>

                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      onClick={() => handleLike(discussion._id)}
                      className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <Heart className={`h-5 w-5 mr-1 ${discussion.likes > 0 ? 'fill-current text-indigo-400' : ''}`} />
                      <span>{discussion.likes}</span>
                    </button>

                    <button
                      onClick={() => setReplyingTo(discussion._id)}
                      className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 mr-1" />
                      <span>{discussion.replies?.length || 0} Replies</span>
                    </button>

                    <button className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors">
                      <Share2 className="h-5 w-5 mr-1" />
                      Share
                    </button>
                  </div>

                  {/* Replies */}
                  {discussion.replies?.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {discussion.replies.map((reply) => (
                        <div key={reply._id} className="glass bg-indigo-900/20 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center">
                              {reply.user.profileImage ? (
                                <img
                                  src={reply.user.profileImage}
                                  alt={reply.user.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <Users className="h-4 w-4 text-indigo-400" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h5 className="text-white font-medium">{reply.user.name}</h5>
                                <span className="text-gray-400 text-sm ml-2">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-300 mt-1">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === discussion._id && (
                    <div className="mt-4">
                      <div className="flex space-x-3">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 px-3 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                          rows={2}
                        />
                        <button
                          onClick={() => handleReply(discussion._id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass rounded-xl p-8 text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
          <h3 className="text-2xl font-bold mb-4 text-gradient">Join Our Community Today</h3>
          <p className="text-lg mb-6 text-gray-300 max-w-3xl mx-auto">
            Connect with thousands of musicians worldwide, share your knowledge, find collaborators, 
            and be part of a supportive global network of creative artists.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 transform-gpu hover:scale-105">
            Become a Member
          </button>
        </div>
      </div>
    </section>
  );
};

export default Community;