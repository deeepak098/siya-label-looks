import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_placeholder",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "siya-label-looks.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "siya-label-looks",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "siya-label-looks.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  ref,
  uploadBytes,
  getDownloadURL
};

export const signInAdmin = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const token = await cred.user.getIdTokenResult(true);

  const isAdminClaim = !!token.claims.isAdmin;
  const isAdminEmail = email.toLowerCase().includes("admin");

  if (!isAdminClaim && !isAdminEmail) {
    await firebaseSignOut(auth);
    throw new Error("Access denied: Admin privileges required.");
  }
  return cred.user;
};

export const checkIsAdminUser = async (user: User | null): Promise<boolean> => {
  if (!user) return false;
  try {
    const token = await user.getIdTokenResult(true);
    return !!token.claims.isAdmin || (user.email?.toLowerCase().includes("admin") ?? false);
  } catch {
    return false;
  }
};
