import * as Facebook from 'expo-facebook';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase';

// Facebook App ID from Facebook Developer Console
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

export function useFacebookAuth() {
  async function signInWithFacebook() {
    try {
      console.log('Initializing Facebook Auth...');
      
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });

      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      console.log('Facebook Auth Result:', result.type);

      if (result.type === 'success') {
        console.log('Facebook login successful, getting credential...');
        
        // Get the access token
        const { token } = result;
        
        // Create a Firebase credential with the token
        const credential = FacebookAuthProvider.credential(token);
        
        // Sign in with Firebase
        const userCredential = await signInWithCredential(auth, credential);
        console.log('Successfully signed in with Facebook:', userCredential.user.email);
        
        return userCredential.user;
      } else {
        console.log('Facebook login cancelled or failed');
        return null;
      }
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
      throw error;
    }
  }

  return {
    signInWithFacebook,
  };
} 