"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkUserProfile: (currentUser?: User | null) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  // Memoized authentication functions
  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  const checkUserProfile = useCallback(async (currentUser?: User | null) => {
    if (!currentUser) {
      console.log("checkUserProfile: No user logged in (argument), returning false");
      return false;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking user profile:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      setLoading(false);

      if (authUser) {
        try {
          const hasProfile = await checkUserProfile(authUser);
          if (hasProfile) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
          toast.success('Signed in successfully!');
        } catch (error) {
          console.error('Error during post-auth profile check:', error);
          toast.error('Something went wrong after sign-in. Please try again.');
        }
      }
    });

    return () => unsubscribe();
  }, [checkUserProfile, router]);

  // Memoized context value
  const authValue = useMemo(() => ({
    user,
    loading,
    userProfile,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    checkUserProfile
  }), [user, loading, userProfile, signIn, signUp, signInWithGoogle, signOut, checkUserProfile]);

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);