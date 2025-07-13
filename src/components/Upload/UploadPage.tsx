import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Camera, Video, X, Plus, Check } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { getAuth } from 'firebase/auth';
import API_ENDPOINTS from '../../config/api';

const UploadPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [events, setEvents] = useState<{_id: string, title: string}[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [waitingApproval, setWaitingApproval] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoadingEvents(true);
    setEventsError(null);
    console.log('Fetching events...');
    axios.get(API_ENDPOINTS.EVENTS)
      .then(res => {
        console.log('Events loaded:', res.data);
        setEvents(res.data);
        setLoadingEvents(false);
      })
      .catch(err => {
        console.error('Failed to load events:', err);
        setEventsError('Failed to load events.');
        setLoadingEvents(false);
      });
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!selectedEvent || files.length === 0) return;
    setUploading(true);
    try {
      // Get Firebase ID token using the correct auth instance
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Not authenticated');
      const token = await currentUser.getIdToken();
      const formData = new FormData();
      files.forEach((file) => formData.append('media', file));
      // Optionally, add captions as an array (empty for now)
      formData.append('captions', JSON.stringify(files.map(() => '')));
      await axios.post(API_ENDPOINTS.EVENT_PHOTOS(selectedEvent), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
    setFiles([]);
    setSelectedEvent('');
    setWaitingApproval(true);
    } catch (err) {
      const error = err as any;
      console.error('Upload failed:', error);
      if (error.response) {
        alert('Upload failed: ' + (error.response.data?.error || error.response.statusText));
      } else {
        alert('Upload failed: ' + error.message);
      }
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Upload Media 📸
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your amazing event memories with the team
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          {/* Event Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Select Event
            </label>
            {loadingEvents ? (
              <div className="text-center text-gray-500 py-4">Loading events...</div>
            ) : eventsError ? (
              <div className="text-center text-red-500 py-4">{eventsError}</div>
            ) : events.length === 0 ? (
              <div className="text-center text-gray-500 py-4">No events available. Please contact an admin to add events.</div>
            ) : (
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="">Choose an event...</option>
                {events.map(event => (
                  <option key={event._id} value={event._id}>{event.title}</option>
              ))}
            </select>
            )}
          </div>

          {/* File Upload Area */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Upload Photos & Videos
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drag & drop your files here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse your device
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, GIF, MP4, MOV (Max 10MB per file)
                  </p>
                </div>
                
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 inline-flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Choose Files
                </button>
              </div>
            </div>
          </div>

          {/* File Preview */}
          {files.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selected Files ({files.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Video className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-xs text-gray-600 mt-2 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {waitingApproval && (
            <div className="mb-8 text-center">
              <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-xl font-medium text-lg shadow">
                Photos sent, waiting for admin approval.
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="text-center">
            <button
              onClick={handleUpload}
              disabled={!selectedEvent || files.length === 0 || uploading}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Uploading...
                </>
              ) : !selectedEvent ? (
                <>
                  <Check className="h-5 w-5 mr-3" />
                  Select an Event First
                </>
              ) : files.length === 0 ? (
                <>
                  <Check className="h-5 w-5 mr-3" />
                  Select Files to Upload
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-3" />
                  Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                </>
              )}
            </button>
            {/* Debug info */}
            <div className="mt-2 text-xs text-gray-500">
              Debug: Event selected: {selectedEvent ? 'Yes' : 'No'}, Files: {files.length}, Uploading: {uploading ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;