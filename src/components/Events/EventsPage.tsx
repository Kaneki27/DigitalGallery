import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Camera, Heart, Search, Filter, Plus } from 'lucide-react';
import axios from 'axios';

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('/api/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load events.');
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...Array.from(new Set(events.map(e => e.category).filter(Boolean)))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEventClick = (eventId: string) => {
    navigate(`/employee/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Event Gallery 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all the amazing events and relive those joyful moments together
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
            </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
          </div>
        </div>

        {/* Event Cards */}
        {loading ? (
          <div className="text-center py-12">Loading events...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">No events found.</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
                key={event._id}
                onClick={() => handleEventClick(event._id)}
              className="group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-white/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                    src={event.coverImage || 'https://via.placeholder.com/400x200?text=No+Image'}
                    alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                  <div className={`absolute inset-0 bg-gradient-to-t from-blue-400 to-purple-500 opacity-60`}></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {event.category || 'Event'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                  <p className="text-sm opacity-90">
                      {event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                      {event.participants?.length || 0} participants
                  </span>
                  <span className="flex items-center">
                    <Camera className="h-4 w-4 mr-1" />
                      {event.photos?.length || 0} photos
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                      {/* Placeholder for likes, can be updated if likes are tracked at event level */}
                      0 likes
                  </span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                  View Gallery
                </button>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;