import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { useGoogleAuth } from '../config/googleAuth';
import { useFacebookAuth } from '../config/facebookAuth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithFacebook } = useFacebookAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user?.email);
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
        throw { code: 'auth/missing-credentials' };
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
        .catch(error => {
          // Handle specific Firebase errors
          if (error.code === 'auth/invalid-login-credentials' || 
              error.code === 'auth/wrong-password' || 
              error.code === 'auth/user-not-found') {
            throw { code: 'auth/invalid-credential' };
          }
          throw error;
        });

      if (!userCredential?.user) {
        throw { code: 'auth/invalid-credential' };
      }

      return userCredential;
    } catch (error) {
      console.error('Login error:', error.code);
      // Make sure we always throw an error with a code property
      if (!error.code) {
        throw { code: 'auth/unknown' };
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

  const googleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      return user;
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  };

  const facebookSignIn = async () => {
    try {
      const user = await signInWithFacebook();
      return user;
    } catch (error) {
      console.error('Facebook Sign In Error:', error);
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
      googleSignIn,
      facebookSignIn,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 