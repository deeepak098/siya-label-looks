import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = { apiKey: "...", authDomain: "...", projectId: "..." };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInAdmin = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const token = await cred.user.getIdTokenResult(true);
  if (!token.claims.isAdmin) throw new Error("Access denied: admin only");
  return cred.user;
};
