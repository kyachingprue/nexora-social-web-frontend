import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import authService from '../services/authService'
import auth from "../firebase/firebase.config.js";
import api from "../services/api";
import AuthContext from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // Get current backend authenticated user
  // --------------------------------------------------

 const getCurrentUser = useCallback(async () => {
   try {
     const response = await authService.getCurrentUser()

     console.log('👤 CURRENT USER RESPONSE:', response)

     const currentUser = response?.data?.data

     console.log('✅ CURRENT USER:', currentUser)

     if (!currentUser) {
       setUser(null)
       return null
     }

     setUser(currentUser)

     return currentUser
   } catch (error) {
     console.error(
       'Get current user error:',
       error.response?.data || error.message
     )

     setUser(null)

     return null
   }
 }, [])

  // --------------------------------------------------
  // Register
  // --------------------------------------------------

  const register = async userData => {
    try {
      console.log('REGISTER DATA:', userData)

      const response = await api.post('/api/auth/register', userData)

      console.log('REGISTER RESPONSE:', response.data)

      return response.data
    } catch (error) {
      console.error('REGISTER STATUS:', error.response?.status)

      console.error(
        'REGISTER RESPONSE:',
        JSON.stringify(error.response?.data, null, 2)
      )

      console.error(
        'VALIDATION ERRORS:',
        JSON.stringify(error.response?.data?.errors, null, 2)
      )

      console.error('REGISTER MESSAGE:', error.message)

      throw error
    }
  }

  // --------------------------------------------------
  // Login
  // --------------------------------------------------

  const login = async credentials => {
    try {
      const response = await authService.login(credentials)

      const loggedInUser = response.data?.user ?? response.data

      setUser(loggedInUser)

      return response
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)

      throw error
    }
  }

  // --------------------------------------------------
  // Google Login
  // --------------------------------------------------

  const googleLogin = async () => {
    try {
      // 1. Firebase Google login
      const result = await signInWithPopup(auth, googleProvider)

      const firebaseUser = result.user

      // 2. Get Firebase ID token
      const firebaseToken = await firebaseUser.getIdToken()

      // 3. Send Firebase token to backend
      const response = await api.post('/api/auth/google', {
        idToken: firebaseToken
      })

      console.log('Google API response:', response.data)

      const loggedInUser = response.data?.data?.user

      if (!loggedInUser) {
        throw new Error('Google user data not found')
      }

      console.log('Google logged in user:', loggedInUser)
      console.log('Google avatar:', loggedInUser.avatar)

      setUser(loggedInUser)

      return loggedInUser
    } catch (error) {
      console.error(
        'Google login error:',
        error.response?.data || error.message
      )

      throw error
    }
  }

  // --------------------------------------------------
  // Verify Email
  // --------------------------------------------------

  const verifyEmail = async (verificationData) => {
    const response = await api.post('/api/auth/verify-email', verificationData)

    return response.data;
  };

  // --------------------------------------------------
  // Resend Verification
  // --------------------------------------------------

  const resendVerificationEmail = async (email) => {
    const response = await api.post('/api/auth/resend-verification', { email })

    return response.data;
  };

  // --------------------------------------------------
  // Forgot Password
  // --------------------------------------------------

  const forgotPassword = async (email) => {
    const response = await api.post('/api/auth/forgot-password', { email })

    return response.data;
  };

  // --------------------------------------------------
  // Reset Password
  // --------------------------------------------------

  const resetPassword = async (resetData) => {
    const response = await api.post('/api/auth/reset-password', resetData)

    return response.data;
  };

  // --------------------------------------------------
  // Refresh Token
  // --------------------------------------------------

  const refreshToken = async () => {
    const response = await api.post('/api/auth/refresh-token')

    return response.data;
  };

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message)
    } finally {
      try {
        await firebaseSignOut(auth)
      } catch (error) {
        console.error('Firebase logout error:', error.message)
      }

      setUser(null)
      navigate('/login', { replace: true })
    }
  }

  // --------------------------------------------------
  // Initialize backend authentication
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
  // Context
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
