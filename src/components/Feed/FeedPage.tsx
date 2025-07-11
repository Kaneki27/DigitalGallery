import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Send,
  Smile,
  Camera,
  Filter,
  Search,
  TrendingUp,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

const FeedPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventComments, setEventComments] = useState<{ [key: string]: string }>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  const mockEventFeed = [
    {
      id: 'event1',
      name: 'Annual Company Day 2024',
      date: '2024-12-15',
      location: 'Company Headquarters',
      totalPhotos: 45,
      totalLikes: 387,
      totalComments: 52,
      participants: 234,
      photos: [
        {
          id: 'photo1',
          url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Sarah Wilson',
            username: 'sarahw',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Marketing'
          },
          likes: 142,
          caption: 'What an incredible day! The energy was absolutely amazing 🎉✨'
        },
        {
          id: 'photo2',
          url: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'John Doe',
            username: 'johndoe',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Engineering'
          },
          likes: 98,
          caption: 'Team building at its finest! 💪'
        },
        {
          id: 'photo3',
          url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Mike Johnson',
            username: 'mikej',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Sales'
          },
          likes: 76,
          caption: 'Amazing moments captured! 📸'
        }
      ],
      comments: [
        {
          id: 'c1',
          user: { 
            name: 'Emma Davis', 
            username: 'emmad', 
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50',
            department: 'Design'
          },
          text: 'What an amazing event! The photos really capture the spirit of our team 🔥',
          time: '2h',
          likes: 12
        },
        {
          id: 'c2',
          user: { 
            name: 'Alex Chen', 
            username: 'alexc', 
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
            department: 'Sales'
          },
          text: 'Best company event ever! Thanks to everyone who organized this 👏',
          time: '1h',
          likes: 8
        },
        {
          id: 'c3',
          user: { 
            name: 'Lisa Park', 
            username: 'lisap', 
            avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50',
            department: 'HR'
          },
          text: 'So proud of our team! These memories will last forever ✨',
          time: '30m',
          likes: 15
        }
      ],
      postedAt: '2024-12-15T14:30:00Z',
      tags: ['#CompanyDay', '#TeamSpirit', '#Memories']
    },
    {
      id: 'event2',
      name: 'Holiday Celebration',
      date: '2024-12-05',
      location: 'Main Conference Hall',
      totalPhotos: 67,
      totalLikes: 523,
      totalComments: 78,
      participants: 189,
      photos: [
        {
          id: 'photo4',
          url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Mike Johnson',
            username: 'mikej',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Sales'
          },
          likes: 156,
          caption: 'The decorations were absolutely magical ✨🎄'
        },
        {
          id: 'photo5',
          url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Emma Davis',
            username: 'emmad',
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Design'
          },
          likes: 134,
          caption: 'Holiday spirit in full swing! 🎉'
        },
        {
          id: 'photo6',
          url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Lisa Park',
            username: 'lisap',
            avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'HR'
          },
          likes: 112,
          caption: 'Celebrating together as one big family! 👨‍👩‍👧‍👦'
        }
      ],
      comments: [
        {
          id: 'c4',
          user: { 
            name: 'Sarah Wilson', 
            username: 'sarahw', 
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50',
            department: 'Marketing'
          },
          text: 'The decorations were absolutely stunning! Best holiday party yet 😍',
          time: '5h',
          likes: 18
        },
        {
          id: 'c5',
          user: { 
            name: 'John Doe', 
            username: 'johndoe', 
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50',
            department: 'Engineering'
          },
          text: 'Great photos everyone! The holiday spirit really shows through 🎄',
          time: '4h',
          likes: 14
        }
      ],
      postedAt: '2024-12-05T19:20:00Z',
      tags: ['#HolidayParty', '#Festive', '#Celebration']
    },
    {
      id: 'event3',
      name: 'Engineering Hackathon',
      date: '2024-11-28',
      location: 'Tech Hub',
      totalPhotos: 28,
      totalLikes: 245,
      totalComments: 34,
      participants: 67,
      photos: [
        {
          id: 'photo7',
          url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Emma Davis',
            username: 'emmad',
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Design'
          },
          likes: 98,
          caption: '48 hours of pure innovation! 🚀💻'
        },
        {
          id: 'photo8',
          url: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=600',
          uploadedBy: {
            name: 'Alex Chen',
            username: 'alexc',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
            department: 'Engineering'
          },
          likes: 87,
          caption: 'The winning team! Incredible work 🏆'
        }
      ],
      comments: [
        {
          id: 'c6',
          user: { 
            name: 'Mike Johnson', 
            username: 'mikej', 
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50',
            department: 'Sales'
          },
          text: 'Amazing innovation from our tech team! The winning project was incredible 🏆',
          time: '1d',
          likes: 9
        }
      ],
      postedAt: '2024-11-28T22:15:00Z',
      tags: ['#Hackathon', '#Innovation', '#TechLife']
    }
  ];

  const filters = [
    { key: 'all', label: 'All Events', icon: TrendingUp },
    { key: 'following', label: 'Following', icon: Users },
    { key: 'recent', label: 'Recent', icon: Calendar },
    { key: 'popular', label: 'Popular', icon: Heart }
  ];

  const handleLike = (photoId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  const handleSave = (eventId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleEventComment = (eventId: string) => {
    const comment = eventComments[eventId];
    if (comment?.trim()) {
      console.log('Adding comment:', comment, 'to event:', eventId);
      setEventComments(prev => ({ ...prev, [eventId]: '' }));
    }
  };

  const handleCommentChange = (eventId: string, value: string) => {
    setEventComments(prev => ({ ...prev, [eventId]: value }));
  };

  const nextImage = (eventId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [eventId]: ((prev[eventId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (eventId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [eventId]: ((prev[eventId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    return posted.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Community Feed
            </h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, users, or photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
            
            <div className="flex space-x-1">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    selectedFilter === filter.key
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <filter.icon className="h-3 w-3" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="max-w-lg mx-auto bg-white min-h-screen">
        {mockEventFeed.map((event) => {
          const currentIndex = currentImageIndex[event.id] || 0;
          const currentPhoto = event.photos[currentIndex];
          
          return (
            <div key={event.id} className="border-b border-gray-200 pb-6 mb-6">
              {/* Event Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{event.name}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Camera className="h-4 w-4 mr-1" />
                      {event.totalPhotos} photos
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.participants} participants
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{getTimeAgo(event.postedAt)}</span>
                </div>
              </div>

              {/* Photo Carousel */}
              <div className="relative">
                <img 
                  src={currentPhoto.url} 
                  alt={currentPhoto.caption}
                  className="w-full aspect-square object-cover"
                />
                
                {/* Navigation Arrows */}
                {event.photos.length > 1 && (
                  <>
                    <button 
                      onClick={() => prevImage(event.id, event.photos.length)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => nextImage(event.id, event.photos.length)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                
                {/* Photo Indicators */}
                {event.photos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {event.photos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Current Photo Info */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
                  {currentIndex + 1} / {event.photos.length}
                </div>
              </div>

              {/* Photo Actions */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(currentPhoto.id)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Heart 
                      className={`h-6 w-6 ${
                        likedPosts.has(currentPhoto.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-700 hover:text-red-500'
                      }`} 
                    />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 text-gray-700 hover:text-blue-500" />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <Share2 className="h-6 w-6 text-gray-700 hover:text-green-500" />
                  </button>
                </div>
                <button 
                  onClick={() => handleSave(event.id)}
                  className="hover:scale-110 transition-transform"
                >
                  <Bookmark 
                    className={`h-6 w-6 ${
                      savedPosts.has(event.id) 
                        ? 'fill-gray-900 text-gray-900' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`} 
                  />
                </button>
              </div>

              {/* Current Photo Details */}
              <div className="px-4 pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <img 
                    src={currentPhoto.uploadedBy.avatar} 
                    alt={currentPhoto.uploadedBy.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm text-gray-900">
                    {currentPhoto.uploadedBy.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentPhoto.uploadedBy.department}
                  </span>
                </div>
                
                <p className="text-sm text-gray-900 mb-2">{currentPhoto.caption}</p>
                
                <p className="font-semibold text-sm text-gray-900">
                  {currentPhoto.likes + (likedPosts.has(currentPhoto.id) ? 1 : 0)} likes
                </p>
              </div>

              {/* Event Comments Section */}
              <div className="px-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Event Discussion ({event.totalComments})
                  </h3>
                  <div className="text-xs text-gray-500">
                    {event.totalLikes} total likes across all photos
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3 mb-4">
                  {event.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <img 
                        src={comment.user.avatar} 
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl px-4 py-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">
                              {comment.user.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.user.department}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900">{comment.text}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 ml-4">
                          <span className="text-xs text-gray-500">{comment.time}</span>
                          <button className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </button>
                          <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-3">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50" 
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Comment on ${event.name}...`}
                      value={eventComments[event.id] || ''}
                      onChange={(e) => handleCommentChange(event.id, e.target.value)}
                      className="flex-1 text-sm border-none outline-none bg-transparent placeholder-gray-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleEventComment(event.id)}
                    />
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <Smile className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  {eventComments[event.id]?.trim() && (
                    <button 
                      onClick={() => handleEventComment(event.id)}
                      className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Load More */}
        <div className="p-8 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
            Load More Events
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center z-50">
        <Camera className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FeedPage;