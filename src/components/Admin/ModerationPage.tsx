import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { getAuth } from 'firebase/auth';
import { adminApp } from '../../context/AdminAuthContext';

const adminAuth = getAuth(adminApp);

const ModerationPage: React.FC = () => {
  const { user, adminLogout } = useAdminAuth();
  const [pendingPhotos, setPendingPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const BACKEND_URL = 'http://localhost:3000';

  const fetchPending = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentUser = adminAuth.currentUser;
      if (!currentUser) {
        setError('Not authenticated as admin. Please log in again.');
        adminLogout();
        return;
      }
      const token = await currentUser.getIdToken();
      console.log('Admin token:', token);
      const res = await axios.get('/api/events/photos/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingPhotos(res.data);
    } catch (err: any) {
      console.error('Failed to load pending photos:', err);
      if (err.response) {
        setError('Backend: ' + (err.response.data?.error || err.response.statusText));
      } else {
        setError('Client: ' + err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line
  }, []);

  const handleAction = async (photoId: string, action: 'approve' | 'reject') => {
    setActionLoading(photoId + action);
    try {
      const currentUser = adminAuth.currentUser;
      if (!currentUser) {
        setError('Not authenticated as admin. Please log in again.');
        adminLogout();
        return;
      }
      const token = await currentUser.getIdToken();
      await axios.patch(`/api/events/photos/${photoId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (err: any) {
      console.error('Failed to ' + action + ' photo:', err);
      if (err.response) {
        setError('Backend: ' + (err.response.data?.error || err.response.statusText));
      } else {
        setError('Client: ' + err.message);
      }
    }
    setActionLoading(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pending Media Moderation</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500 whitespace-pre-wrap">{error}</div>
      ) : pendingPhotos.length === 0 ? (
        <div className="text-green-600">No pending photos. All caught up!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingPhotos.map((photo) => (
            <div key={photo._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img
                src={photo.url.startsWith('/uploads/') ? BACKEND_URL + photo.url : photo.url}
                alt={photo.caption || 'Pending media'}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <div className="mb-2 text-gray-700 text-sm">
                <strong>Event:</strong> {photo.event?.title || 'Unknown'}
              </div>
              <div className="mb-2 text-gray-700 text-sm">
                <strong>Uploaded by:</strong> {photo.uploadedBy?.name || 'Unknown'} ({photo.uploadedBy?.email})
              </div>
              <div className="flex gap-4 mt-2">
              <button
                  onClick={() => handleAction(photo._id, 'approve')}
                  disabled={actionLoading === photo._id + 'approve'}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {actionLoading === photo._id + 'approve' ? 'Approving...' : 'Approve'}
              </button>
                <button
                  onClick={() => handleAction(photo._id, 'reject')}
                  disabled={actionLoading === photo._id + 'reject'}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {actionLoading === photo._id + 'reject' ? 'Rejecting...' : 'Reject'}
                </button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default ModerationPage;