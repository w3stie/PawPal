import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHDo-O_BnQ1cymdXlwn8XNB1mCtF10RG4",
    authDomain: "pawpal-7cdfd.firebaseapp.com",
    projectId: "pawpal-7cdfd",
    storageBucket: "pawpal-7cdfd.firebasestorage.app",
    messagingSenderId: "909068072784",
    appId: "1:909068072784:web:49fae90c0860e3f5919e55",
    measurementId: "G-CDC1MHESDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 