import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MessageCircle, Share2, Download, Filter, Grid, List } from 'lucide-react';

// Define the backend URL at the top
const BACKEND_URL = 'http://localhost:3000';

const GalleryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('/api/events/photos/all')
      .then(res => {
        setMedia(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load gallery.');
        setLoading(false);
      });
  }, []);

  const filters = ['all', 'most-liked', 'recent', 'my-uploads'];

  const filteredMedia = media.filter(media => {
    switch (selectedFilter) {
      case 'most-liked':
        return (media.likes?.length || 0) > 0;
      case 'recent':
        return new Date(media.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // last 30 days
      case 'my-uploads':
        return media.uploadedBy?.name === 'John Doe'; // TODO: Replace with current user
      default:
        return true;
    }
  }).sort((a, b) => {
    if (selectedFilter === 'most-liked') {
      return (b.likes?.length || 0) - (a.likes?.length || 0);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            My Gallery 🖼️
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal collection of shared memories and moments
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Photos</option>
                <option value="most-liked">Most Liked</option>
                <option value="recent">Recent</option>
                <option value="my-uploads">My Uploads</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No media found</h3>
            <p className="text-gray-500">Try adjusting your filter or upload some photos!</p>
          </div>
        ) : (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMedia.map((mediaItem) => (
              <div
                  key={mediaItem._id}
                className="group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                      src={`${BACKEND_URL}${mediaItem.url}`}
                      alt={mediaItem.caption || 'Untitled'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-lg mb-1">{mediaItem.caption || 'Untitled'}</h3>
                      <p className="text-sm opacity-90">{mediaItem.event?.title || 'No event'}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">by {mediaItem.uploadedBy?.name}</span>
                    <span className="text-xs text-gray-500">
                        {new Date(mediaItem.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                          <span className="text-sm">{mediaItem.likes?.length || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{mediaItem.comments?.length || 0}</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-500 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
              {filteredMedia.map((mediaItem) => (
              <div
                  key={mediaItem._id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-6">
                  <img
                      src={`${BACKEND_URL}${mediaItem.url}`}
                      alt={mediaItem.caption || 'Untitled'}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{mediaItem.caption || 'Untitled'}</h3>
                      <p className="text-gray-600 mb-2">{mediaItem.event?.title || 'No event'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                          by {mediaItem.uploadedBy?.name} • {new Date(mediaItem.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-gray-600">
                          <Heart className="h-4 w-4 mr-1" />
                            {mediaItem.likes?.length || 0}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <MessageCircle className="h-4 w-4 mr-1" />
                            {mediaItem.comments?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GalleryPage;