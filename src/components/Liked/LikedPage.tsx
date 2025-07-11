import React from 'react';
import { Heart, MessageCircle, Calendar, User } from 'lucide-react';

const LikedPage: React.FC = () => {
  const mockLikedMedia = [
    {
      id: '1',
      title: 'Amazing Team Building Moment',
      event: 'Team Building Adventure',
      url: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 45,
      comments: 12,
      uploadedBy: 'Sarah Wilson',
      uploadedAt: '2024-12-10',
      likedAt: '2024-12-11'
    },
    {
      id: '2',
      title: 'Holiday Party Celebration',
      event: 'Holiday Celebration',
      url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 67,
      comments: 18,
      uploadedBy: 'Mike Johnson',
      uploadedAt: '2024-12-05',
      likedAt: '2024-12-06'
    },
    {
      id: '3',
      title: 'Hackathon Winners',
      event: 'Engineering Hackathon',
      url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 34,
      comments: 8,
      uploadedBy: 'Emma Davis',
      uploadedAt: '2024-11-28',
      likedAt: '2024-11-29'
    },
    {
      id: '4',
      title: 'Marketing Campaign Success',
      event: 'Marketing Campaign Launch',
      url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 28,
      comments: 6,
      uploadedBy: 'Alex Chen',
      uploadedAt: '2024-11-15',
      likedAt: '2024-11-16'
    },
    {
      id: '5',
      title: 'Wellness Yoga Session',
      event: 'Wellness Week',
      url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 52,
      comments: 14,
      uploadedBy: 'Lisa Park',
      uploadedAt: '2024-11-05',
      likedAt: '2024-11-06'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-pink-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Liked Posts ❤️
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the moments that made you smile and captured your heart
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockLikedMedia.length}</p>
              <p className="text-sm text-gray-600">Total Liked</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Events</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Contributors</p>
            </div>
          </div>
        </div>

        {/* Liked Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLikedMedia.map((media) => (
            <div
              key={media.id}
              className="group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg mb-1">{media.title}</h3>
                  <p className="text-sm opacity-90">{media.event}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">by {media.uploadedBy}</span>
                  <span className="text-xs text-gray-500">
                    Liked {new Date(media.likedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1 text-red-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{media.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-gray-600">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{media.comments}</span>
                    </span>
                  </div>
                  
                  <button className="px-3 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockLikedMedia.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No liked posts yet</h3>
            <p className="text-gray-500">Start exploring events and like the moments you love!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPage;