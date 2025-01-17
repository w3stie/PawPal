import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase';

// app registration for WebBrowser usage
WebBrowser.maybeCompleteAuthSession();

// web client ID from Google Cloud Console
const webClientId = "558932784148-14uefg2gcl8ejj41149mpv3cc54a0in8.apps.googleusercontent.com";

export function useGoogleAuth() {
  console.log('Initializing Google Auth');
  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: webClientId,
    responseType: "id_token",
    scopes: ['profile', 'email'],
  });

  async function signInWithGoogle() {
    try {
      console.log('Starting Google Sign In...');
      if (!request) {
        console.log('Auth request not ready yet');
        throw new Error('Authentication request not ready');
      }

      const result = await promptAsync();
      console.log('Google Auth Result:', result);
      
      if (result?.type === 'success') {
        const { id_token } = result.params;
        console.log('Got ID Token');
        
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        console.log('Successfully signed in with Google:', userCredential.user.email);
        
        return userCredential.user;
      } else {
        console.log('Sign in was not successful:', result?.type);
        throw new Error(`Sign in failed: ${result?.type}`);
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  return {
    signInWithGoogle,
    request,
  };
} 