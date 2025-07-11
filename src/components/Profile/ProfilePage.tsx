import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, Edit3, Settings, Grid, Bookmark, Heart, Users, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'liked'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    username: 'johndoe', // This would come from user data
    bio: 'Capturing moments that matter ✨',
    department: user?.department || '',
  });

  const mockUserPosts = [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 24,
      comments: 8,
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 18,
      comments: 5,
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 32,
      comments: 12,
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 15,
      comments: 7,
    },
    {
      id: '5',
      url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 21,
      comments: 9,
    },
    {
      id: '6',
      url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 28,
      comments: 6,
    },
  ];

  const handleSaveProfile = () => {
    // Handle profile update
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const renderMediaGrid = (media: typeof mockUserPosts) => (
    <div className="grid grid-cols-3 gap-1">
      {media.map((post) => (
        <div key={post.id} className="relative aspect-square group cursor-pointer">
          <img 
            src={post.url} 
            alt="User post"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5 fill-current" />
                <span className="font-semibold">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"/>
                </svg>
                <span className="font-semibold">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-light">{editForm.username}</h1>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="font-semibold text-lg">{mockUserPosts.length}</div>
                  <div className="text-gray-600 text-sm">posts</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg">{user?.totalLikes || 0}</div>
                  <div className="text-gray-600 text-sm">likes received</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg">12</div>
                  <div className="text-gray-600 text-sm">events joined</div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="font-semibold">{editForm.name}</div>
                <div className="text-gray-600 text-sm mb-1">{editForm.department} Department</div>
                <div className="text-sm">{editForm.bio}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex justify-center">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`flex items-center space-x-1 px-6 py-3 text-sm font-medium border-t-2 ${
                activeTab === 'posts' 
                  ? 'border-gray-900 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>POSTS</span>
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex items-center space-x-1 px-6 py-3 text-sm font-medium border-t-2 ${
                activeTab === 'saved' 
                  ? 'border-gray-900 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>SAVED</span>
            </button>
            <button 
              onClick={() => setActiveTab('liked')}
              className={`flex items-center space-x-1 px-6 py-3 text-sm font-medium border-t-2 ${
                activeTab === 'liked' 
                  ? 'border-gray-900 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>LIKED</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div>
              {mockUserPosts.length > 0 ? (
                renderMediaGrid(mockUserPosts)
              ) : (
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
                  <p className="text-gray-500">Start sharing your event memories!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-12">
              <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved posts</h3>
              <p className="text-gray-500">Save posts to see them here</p>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No liked posts</h3>
              <p className="text-gray-500">Posts you like will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;