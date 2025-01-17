import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: fullName
      }).catch(error => {
        console.error('Error updating profile:', error);
        // Continue even if profile update fails
      });
      
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error.code, error.message);
      throw error; // Rethrow to handle in the component
    }
  };

  const signIn = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('auth/missing-credentials');
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user) {
        throw new Error('auth/invalid-credential');
      }
      return userCredential;
    } catch (error) {
      console.error('Login error:', error.code || error.message);
      // Normalize error codes
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        throw { code: 'auth/invalid-credential' };
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 