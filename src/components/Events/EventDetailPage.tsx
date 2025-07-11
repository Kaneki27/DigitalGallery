import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ArrowLeft, Send } from 'lucide-react';
import { getAuth } from 'firebase/auth';

const BACKEND_URL = 'http://localhost:3000';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/events/${eventId}`)
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load event.');
        setLoading(false);
      });
  }, [eventId]);

  const handleDeletePhoto = async (photoId: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Not authenticated');
      const token = await currentUser.getIdToken();
      console.log('Sending DELETE request to', `/api/events/photos/${photoId}`);
      await axios.delete(`${BACKEND_URL}/api/events/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvent((prev: any) => ({
        ...prev,
        photos: prev.photos.filter((p: any) => p._id !== photoId),
      }));
    } catch (err: any) {
      console.error('Delete photo error:', err);
      alert('Failed to delete photo.' + (err?.response?.data?.error ? `\n${err.response.data.error}` : ''));
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading event...</div>;
  }
  if (error || !event) {
    return <div className="text-center py-12 text-red-500">{error || 'Event not found.'}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/employee/events')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{event.title}</h1>
              <p className="text-sm text-gray-600">{event.participants?.length || 0} participants</p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Cover */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        {event.coverImage && (
        <img 
            src={event.coverImage} 
            alt={event.title}
          className="w-full h-full object-cover"
        />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
          <p className="text-sm opacity-90">{event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
        </div>
      </div>

      {/* Media Feed */}
      <div className="max-w-6xl mx-auto bg-white p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {event.photos && event.photos.length > 0 ? event.photos.map((media: any) => (
            <div key={media._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col relative">
            {/* Post Header */}
              <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-3">
                {/* Optionally show uploader avatar if available */}
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-bold">{media.uploadedBy?.name?.[0] || '?'}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{media.uploadedBy?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500">
                    {media.createdAt ? new Date(media.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Media */}
            <div className="relative">
              <img 
                src={`${BACKEND_URL}${media.url}`} 
                alt="Event media"
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => setSelectedMedia(media._id)}
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 z-10"
                onClick={() => handleDeletePhoto(media._id)}
                title="Delete photo"
              >
                &times;
              </button>
            </div>

            {/* Actions */}
              <div className="flex items-center justify-between p-4 pt-2">
              <div className="flex items-center space-x-4">
                <button className="hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-gray-700" />
                  <span className="ml-1 text-sm">{media.likes?.length || 0}</span>
                </button>
                <button className="hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-gray-700" />
                  <span className="ml-1 text-sm">{media.comments?.length || 0}</span>
                </button>
                <button className="hover:scale-110 transition-transform">
                  <Share2 className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              <button className="hover:scale-110 transition-transform">
                <Bookmark className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            {/* Likes */}
            <div className="px-4 pb-2">
              <p className="font-semibold text-sm">{media.likes?.length || 0} likes</p>
            </div>

            {/* Caption */}
            <div className="px-4 pb-2">
              <p className="text-sm">
                <span className="font-semibold">{media.uploadedBy?.name || 'Unknown'}</span>{' '}
                {media.caption}
              </p>
            </div>

            {/* Comments */}
            {/* ...comments UI can be added here... */}

            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 py-8">No media uploaded for this event yet.</div>
                )}
              </div>
            </div>
    </div>
  );
};

export default EventDetailPage;