import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { adminFirebaseConfig } from '../config/firebase';
import axios from 'axios';

// Initialize separate Firebase app for admin
export const adminApp = initializeApp(adminFirebaseConfig, 'admin');
const adminAuth = getAuth(adminApp);

interface AdminAuthContextType extends AuthState {
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(adminAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          // For admin users, we'll create a simple admin user object
          // since they don't need to go through the employee backend
          setAuthState({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Admin',
              role: 'admin' as const,
              avatar: firebaseUser.photoURL || undefined,
              department: 'Administration',
              totalUploads: 0,
              totalLikes: 0,
              createdAt: new Date().toISOString(),
            },
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.error('Failed to process admin user:', error);
          setAuthState({ user: null, isAuthenticated: false, loading: false });
        }
      } else {
        setAuthState({ user: null, isAuthenticated: false, loading: false });
      }
    });
    return () => unsubscribe();
  }, []);

  const adminLogin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(adminAuth, email, password);
    // onAuthStateChanged will handle state update
  };

  const adminLogout = () => {
    signOut(adminAuth);
    setAuthState({ user: null, isAuthenticated: false, loading: false });
  };

  return (
    <AdminAuthContext.Provider value={{ ...authState, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 