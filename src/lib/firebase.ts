import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAYHbJF6N6k2FDKhz4X2Oo9HuSpQpssVas",
  authDomain: "sharp-portfolio-j71nt.firebaseapp.com",
  projectId: "sharp-portfolio-j71nt",
  storageBucket: "sharp-portfolio-j71nt.firebasestorage.app",
  messagingSenderId: "302435187126",
  appId: "1:302435187126:web:df1f612b5e36da8452a917",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/drive.readonly');

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;
    if (accessToken) {
      sessionStorage.setItem('GOOGLE_DRIVE_ACCESS_TOKEN', accessToken);
    }
    // Return custom object to match what component expects
    return { 
      user: result.user, 
      accessToken: accessToken 
    };
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
  sessionStorage.removeItem('GOOGLE_DRIVE_ACCESS_TOKEN');
};

export const getAccessToken = () => {
  return sessionStorage.getItem('GOOGLE_DRIVE_ACCESS_TOKEN');
};

export const initAuth = (success: (user: User | null, token: string | null) => void, failure: () => void) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const token = sessionStorage.getItem('GOOGLE_DRIVE_ACCESS_TOKEN');
      success(user, token);
    } else {
      failure();
    }
  });
};
