// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://your-backend-url.com');

export const API_ENDPOINTS = {
  // Auth endpoints
  USERS_ME: `${API_BASE_URL}/api/users/me`,
  
  // Events endpoints
  EVENTS: `${API_BASE_URL}/api/events`,
  EVENT_DETAIL: (id: string) => `${API_BASE_URL}/api/events/${id}`,
  EVENT_PHOTOS: (eventId: string) => `${API_BASE_URL}/api/events/${eventId}/photos`,
  
  // Photos endpoints
  PHOTOS_ALL: `${API_BASE_URL}/api/events/photos/all`,
  PHOTOS_PENDING: `${API_BASE_URL}/api/events/photos/pending`,
  PHOTO_ACTION: (photoId: string, action: string) => `${API_BASE_URL}/api/events/photos/${photoId}/${action}`,
  PHOTO_DELETE: (photoId: string) => `${API_BASE_URL}/api/events/photos/${photoId}`,
};

export default API_ENDPOINTS; 