import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyDxHNp59jysk6nM3J1rSCf48whd7qQIs3g',
  authDomain: 'rejoice-f5882.firebaseapp.com',
  projectId: 'rejoice-f5882',
  // ...other config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, department: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          // Fetch user profile and role from backend with timeout
          const res = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000, // 5 second timeout
          });
          setAuthState({
            user: res.data,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // If the API call fails, we'll still consider the user authenticated
          // but with basic Firebase user info
      setAuthState({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              role: 'employee' as const,
              avatar: firebaseUser.photoURL || undefined,
              department: '',
              totalUploads: 0,
              totalLikes: 0,
              createdAt: new Date().toISOString(),
            },
        isAuthenticated: true,
        loading: false,
      });
        }
    } else {
        setAuthState({ user: null, isAuthenticated: false, loading: false });
    }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle state update
  };

  const register = async (email: string, password: string, name: string, department: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    // Optionally, create user in backend DB
    try {
      const token = await cred.user.getIdToken();
      await axios.put('/api/users/me', { name, department }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000, // 5 second timeout
      });
    } catch (error) {
      console.error('Failed to create user in backend:', error);
    }
  };

  const logout = () => {
    signOut(auth);
    setAuthState({ user: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};