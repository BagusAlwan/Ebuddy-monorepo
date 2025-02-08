"use client";
import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        setCookie("authToken", token, { maxAge: 60 * 60 * 24 });
        router.push("/main");
      } else {
        deleteCookie("authToken");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/main");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      router.push("/main");
    } catch (err) {
      setError("Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      deleteCookie("authToken");
      router.push("/login");
    } catch (error) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, loginWithEmail, loginWithGoogle, logoutUser };
};
