import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

import auth from "../firebase/firebase.config.js";
import api from "../services/api";
import AuthContext from "./AuthContext";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // Get current authenticated user
  // --------------------------------------------------

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data?.user ?? response.data);

      return response.data?.user ?? response.data;
    } catch (error) {
      console.log(error)
      setUser(null);
      return null;
    }
  }, []);

  // --------------------------------------------------
  // Register
  // --------------------------------------------------

  const register = async (userData) => {

    const response = await api.post("/auth/register", userData);

    return response.data;
  };

  // --------------------------------------------------
  // Login
  // --------------------------------------------------

  const login = async (credentials) => {

    const response = await api.post("/auth/login", credentials);

    const loggedInUser = response.data?.user ?? response.data;

    setUser(loggedInUser);

    return response.data;
  };

  // --------------------------------------------------
  // Google Login
  // --------------------------------------------------

  const googleLogin = async () => {
    // 1. Login with Google through Firebase
    const result = await signInWithPopup(auth, googleProvider)

    const firebaseUser = result.user

    // 2. Get Firebase ID token
    const firebaseToken = await firebaseUser.getIdToken()

    // 3. Send Firebase token to Express backend
    const response = await api.post('/auth/google', {
      idToken: firebaseToken
    })

    const loggedInUser = response.data?.user ?? response.data

    setUser(loggedInUser)

    return response.data
  }

  // --------------------------------------------------
  // Verify Email
  // --------------------------------------------------

  const verifyEmail = async (verificationData) => {

    const response = await api.post(
      "/auth/verify-email",
      verificationData
    );

    return response.data;
  };

  // --------------------------------------------------
  // Resend Verification Email
  // --------------------------------------------------

  const resendVerificationEmail = async (email) => {
    const response = await api.post("/auth/resend-verification", {
      email,
    });

    return response.data;
  };

  // --------------------------------------------------
  // Forgot Password
  // --------------------------------------------------

  const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", {
      email,
    });

    return response.data;
  };

  // --------------------------------------------------
  // Reset Password
  // --------------------------------------------------

  const resetPassword = async (resetData) => {

    const response = await api.post(
      "/auth/reset-password",
      resetData
    );

    return response.data;
  };

  // --------------------------------------------------
  // Refresh JWT
  // --------------------------------------------------

  const refreshToken = async () => {
    const response = await api.post("/auth/refresh-token");

    return response.data;
  };

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

  const logout = async () => {
    try {
      // Logout from backend
      await api.post("/auth/logout");
    } finally {
      // Also logout Firebase if Google authentication was used
      try {
        await firebaseSignOut(auth);
      } catch {
        // Firebase logout is optional
      }

      setUser(null);
      navigate("/login");
    }
  };

  // --------------------------------------------------
  // Restore authentication when app starts
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        await getCurrentUser();
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [getCurrentUser]);

  // --------------------------------------------------
  // Firebase auth state listener
  // --------------------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      try {
        if (!firebaseUser) {
          setUser(null)
          return
        }

        const response = await api.get('/auth/me')

        const backendUser = response.data?.user ?? response.data

        setUser(backendUser)

      } catch (error) {
        /*
          Backend rejected the JWT or the session is invalid.
        */
        console.log('Backend rejected the JWT or the session is invalid.', error)

        setUser(null)

        // Optional: Firebase session also clear করা
        try {
          await firebaseSignOut(auth)
        } catch {
          // Ignore Firebase sign-out error
        }
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // --------------------------------------------------
  // Context value
  // --------------------------------------------------

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    refreshToken,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
