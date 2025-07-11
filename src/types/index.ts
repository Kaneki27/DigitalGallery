export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  avatar?: string;
  department?: string;
  totalUploads: number;
  totalLikes: number;
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  category: string;
  department: string;
  coverImage?: string;
  mediaCount: number;
  createdBy: string;
  createdAt: string;
}

export interface Media {
  id: string;
  eventId: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  approved: boolean;
}

export interface Comment {
  id: string;
  mediaId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Like {
  id: string;
  mediaId: string;
  userId: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}