import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  Search, 
  Filter, 
  Grid, 
  List,
  Download,
  Eye,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Heart,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  HardDrive,
  Folder,
  Tag,
  Star
} from 'lucide-react';

const MediaLibraryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const mockMedia = [
    {
      id: '1',
      title: 'Team Building Fun',
      type: 'image',
      url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200',
      event: 'Annual Company Day 2024',
      uploadedBy: {
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      uploadedAt: '2024-12-15T10:30:00Z',
      fileSize: '2.4 MB',
      dimensions: '1920x1080',
      likes: 24,
      comments: 8,
      status: 'approved',
      tags: ['team', 'fun', 'outdoor']
    },
    {
      id: '2',
      title: 'Holiday Party Highlights',
      type: 'video',
      url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200',
      event: 'Holiday Celebration',
      uploadedBy: {
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      uploadedAt: '2024-12-14T15:20:00Z',
      fileSize: '15.7 MB',
      duration: '2:34',
      likes: 32,
      comments: 12,
      status: 'pending',
      tags: ['holiday', 'party', 'celebration']
    },
    {
      id: '3',
      title: 'Hackathon Winners',
      type: 'image',
      url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=200',
      event: 'Engineering Hackathon',
      uploadedBy: {
        name: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      uploadedAt: '2024-12-13T09:45:00Z',
      fileSize: '3.1 MB',
      dimensions: '1920x1080',
      likes: 18,
      comments: 5,
      status: 'approved',
      tags: ['hackathon', 'winners', 'coding']
    },
    {
      id: '4',
      title: 'Marketing Campaign Launch',
      type: 'image',
      url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=200',
      event: 'Marketing Campaign Launch',
      uploadedBy: {
        name: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      uploadedAt: '2024-12-12T14:20:00Z',
      fileSize: '1.8 MB',
      dimensions: '1920x1080',
      likes: 15,
      comments: 7,
      status: 'rejected',
      tags: ['marketing', 'campaign', 'launch']
    },
    {
      id: '5',
      title: 'Wellness Week Yoga',
      type: 'video',
      url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
      event: 'Wellness Week',
      uploadedBy: {
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      uploadedAt: '2024-12-11T11:15:00Z',
      fileSize: '8.9 MB',
      duration: '1:45',
      likes: 28,
      comments: 6,
      status: 'approved',
      tags: ['wellness', 'yoga', 'health']
    }
  ];

  const events = ['all', 'Annual Company Day 2024', 'Holiday Celebration', 'Engineering Hackathon', 'Marketing Campaign Launch', 'Wellness Week'];
  const types = ['all', 'image', 'video'];
  const statuses = ['all', 'approved', 'pending', 'rejected'];

  const filteredMedia = mockMedia.filter(media => {
    const matchesSearch = media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || media.type === selectedType;
    const matchesEvent = selectedEvent === 'all' || media.event === selectedEvent;
    const matchesStatus = selectedStatus === 'all' || media.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesEvent && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case 'most-liked':
        return b.likes - a.likes;
      case 'size':
        return parseFloat(b.fileSize) - parseFloat(a.fileSize);
      default: // newest
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'rejected':
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleView = (mediaId: string) => {
    console.log('Viewing media:', mediaId);
  };

  const handleDownload = (mediaId: string) => {
    console.log('Downloading media:', mediaId);
  };

  const handleDelete = (mediaId: string) => {
    console.log('Deleting media:', mediaId);
  };

  const totalSize = mockMedia.reduce((acc, media) => acc + parseFloat(media.fileSize), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-2 mb-6">
            <Folder className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Media Library Center</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            Media Library 🎬
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage, organize, and monitor all media content across the platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Media</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{mockMedia.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Folder className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {mockMedia.filter(m => m.type === 'image').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Image className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Videos</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {mockMedia.filter(m => m.type === 'video').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Video className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{totalSize.toFixed(1)} MB</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <HardDrive className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search media by title or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {events.map(event => (
                  <option key={event} value={event}>
                    {event === 'all' ? 'All Events' : event}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="size">File Size</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          {viewMode === 'grid' ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedia.map((media) => (
                  <div key={media.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={media.thumbnail}
                        alt={media.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Type indicator */}
                      <div className="absolute top-2 left-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          media.type === 'video' ? 'bg-red-500' : 'bg-blue-500'
                        }`}>
                          {media.type === 'video' ? (
                            <Video className="h-4 w-4 text-white" />
                          ) : (
                            <Image className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="absolute top-2 right-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(media.status)}`}>
                          {getStatusIcon(media.status)}
                          <span className="ml-1">{media.status}</span>
                        </span>
                      </div>
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                          <button
                            onClick={() => handleView(media.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(media.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(media.id)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{media.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 truncate">{media.event}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{media.fileSize}</span>
                        <span>{new Date(media.uploadedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center text-red-500">
                            <Heart className="h-3 w-3 mr-1" />
                            {media.likes}
                          </span>
                          <span className="flex items-center text-blue-500">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {media.comments}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <img
                            src={media.uploadedBy.avatar}
                            alt={media.uploadedBy.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {media.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {media.tags.length > 2 && (
                          <span className="text-xs text-gray-500">+{media.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMedia.map((media) => (
                    <tr key={media.id} className="hover:bg-white/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={media.thumbnail}
                              alt={media.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                              media.type === 'video' ? 'bg-red-500' : 'bg-blue-500'
                            }`}>
                              {media.type === 'video' ? (
                                <Video className="h-2 w-2 text-white" />
                              ) : (
                                <Image className="h-2 w-2 text-white" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{media.title}</div>
                            <div className="text-xs text-gray-500">
                              {media.type === 'video' ? media.duration : media.dimensions}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{media.event}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <img
                            src={media.uploadedBy.avatar}
                            alt={media.uploadedBy.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-900">{media.uploadedBy.name}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{media.fileSize}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(media.uploadedAt).toLocaleDateString()}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-red-500">
                            <Heart className="h-3 w-3 mr-1" />
                            {media.likes}
                          </span>
                          <span className="flex items-center text-blue-500">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {media.comments}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(media.status)}`}>
                          {getStatusIcon(media.status)}
                          <span className="ml-1">{media.status}</span>
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleView(media.id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(media.id)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(media.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No media found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryPage;