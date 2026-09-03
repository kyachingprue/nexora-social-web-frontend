import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService'

// ============================================================
// Initial State
// ============================================================

const initialState = {
  user: null,
  isAuthenticated: false,

  // Loading states
  isLoading: false,
  isInitialized: false,

  // Operation states
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isGoogleLoggingIn: false,
  isRefreshing: false,

  // Email verification
  isVerifyingEmail: false,
  isResendingVerification: false,

  // Password operations
  isForgotPasswordLoading: false,
  isResetPasswordLoading: false,
  isChangingPassword: false,

  // Messages
  successMessage: null,

  // Error
  error: null,

  // Operation-specific errors
  registerError: null,
  loginError: null,
  googleLoginError: null,
  logoutError: null,
  verifyEmailError: null,
  resendVerificationError: null,
  forgotPasswordError: null,
  resetPasswordError: null,
  changePasswordError: null,

  // Email verification status
  emailVerified: false
}

// ============================================================
// Helper
// ============================================================

const getErrorMessage = error => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Something went wrong. Please try again.'
  )
}

// ============================================================
// Register
// ============================================================

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Login
// ============================================================

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Google Login
// ============================================================

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (googleData, { rejectWithValue }) => {
    try {
      const response = await authService.googleLogin(googleData)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Logout
// ============================================================

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout()

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Current User
// ============================================================

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser()

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Refresh Token
// ============================================================

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken()

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Verify Email
// ============================================================

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(token)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Resend Verification Email
// ============================================================

export const resendVerificationEmail = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.resendVerificationEmail(email)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Forgot Password
// ============================================================

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Reset Password
// ============================================================

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(token, password)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Change Password
// ============================================================

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(passwordData)

      return response
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Auth Slice
// ============================================================

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    // ----------------------------------------------------------
    // Clear Global Error
    // ----------------------------------------------------------

    clearError: state => {
      state.error = null
    },

    // ----------------------------------------------------------
    // Clear Success Message
    // ----------------------------------------------------------

    clearSuccessMessage: state => {
      state.successMessage = null
    },

    // ----------------------------------------------------------
    // Clear All Messages
    // ----------------------------------------------------------

    clearMessages: state => {
      state.error = null
      state.successMessage = null
    },

    // ----------------------------------------------------------
    // Clear Operation Errors
    // ----------------------------------------------------------

    clearAuthErrors: state => {
      state.error = null
      state.registerError = null
      state.loginError = null
      state.googleLoginError = null
      state.logoutError = null
      state.verifyEmailError = null
      state.resendVerificationError = null
      state.forgotPasswordError = null
      state.resetPasswordError = null
      state.changePasswordError = null
    },

    // ----------------------------------------------------------
    // Update User
    // ----------------------------------------------------------

    updateAuthUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    },

    // ----------------------------------------------------------
    // Set User
    // ----------------------------------------------------------

    setAuthUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = Boolean(action.payload)

      if (action.payload?.emailVerified !== undefined) {
        state.emailVerified = action.payload.emailVerified
      }
    },

    // ----------------------------------------------------------
    // Reset Auth State
    // ----------------------------------------------------------

    resetAuthState: () => {
      return initialState
    }
  },

  // ==========================================================
  // Async Actions
  // ==========================================================

  extraReducers: builder => {
    // ========================================================
    // REGISTER
    // ========================================================

    builder

      .addCase(register.pending, state => {
        state.isRegistering = true
        state.isLoading = true
        state.registerError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isRegistering = false
        state.isLoading = false

        const data = action.payload

        // Support different backend response structures
        const user = data?.user || data?.data?.user || null

        if (user) {
          state.user = user
          state.isAuthenticated = true
          state.emailVerified = Boolean(user.emailVerified)
        }

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Registration successful.'
      })

      .addCase(register.rejected, (state, action) => {
        state.isRegistering = false
        state.isLoading = false

        state.registerError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // LOGIN
    // ========================================================

      .addCase(login.pending, state => {
        state.isLoggingIn = true
        state.isLoading = true
        state.loginError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false
        state.isLoading = false

        const data = action.payload

        const user = data?.user || data?.data?.user || null

        if (user) {
          state.user = user
          state.isAuthenticated = true
          state.emailVerified = Boolean(user.emailVerified)
        }

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Login successful.'
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false
        state.isLoading = false

        state.loginError = action.payload
        state.error = action.payload
        state.isAuthenticated = false
      })

    // ========================================================
    // GOOGLE LOGIN
    // ========================================================

      .addCase(googleLogin.pending, state => {
        state.isGoogleLoggingIn = true
        state.isLoading = true
        state.googleLoginError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isGoogleLoggingIn = false
        state.isLoading = false

        const data = action.payload

        const user = data?.user || data?.data?.user || null

        if (user) {
          state.user = user
          state.isAuthenticated = true
          state.emailVerified = Boolean(user.emailVerified)
        }

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Google login successful.'
      })

      .addCase(googleLogin.rejected, (state, action) => {
        state.isGoogleLoggingIn = false
        state.isLoading = false

        state.googleLoginError = action.payload
        state.error = action.payload
        state.isAuthenticated = false
      })

    // ========================================================
    // LOGOUT
    // ========================================================

      .addCase(logout.pending, state => {
        state.isLoggingOut = true
        state.logoutError = null
      })

      .addCase(logout.fulfilled, state => {
        state.isLoggingOut = false

        state.user = null
        state.isAuthenticated = false
        state.emailVerified = false

        state.successMessage = 'Logged out successfully.'
      })

      .addCase(logout.rejected, (state, action) => {
        state.isLoggingOut = false
        state.logoutError = action.payload

        // Clear local auth state even if backend logout fails
        state.user = null
        state.isAuthenticated = false
        state.emailVerified = false

        state.error = action.payload
      })

    // ========================================================
    // GET CURRENT USER
    // ========================================================

      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true
        state.isInitialized = false
        state.error = null
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isInitialized = true

        const data = action.payload

        const user = data?.user || data?.data?.user || data?.data || null

        if (user) {
          state.user = user
          state.isAuthenticated = true
          state.emailVerified = Boolean(user.emailVerified)
        } else {
          state.user = null
          state.isAuthenticated = false
          state.emailVerified = false
        }
      })

      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.isInitialized = true

        state.user = null
        state.isAuthenticated = false
        state.emailVerified = false

        state.error = action.payload
      })

    // ========================================================
    // REFRESH TOKEN
    // ========================================================

      .addCase(refreshToken.pending, state => {
        state.isRefreshing = true
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isRefreshing = false

        const data = action.payload

        const user = data?.user || data?.data?.user || null

        if (user) {
          state.user = user
          state.isAuthenticated = true
          state.emailVerified = Boolean(user.emailVerified)
        }
      })

      .addCase(refreshToken.rejected, state => {
        state.isRefreshing = false

        state.user = null
        state.isAuthenticated = false
        state.emailVerified = false
      })

    // ========================================================
    // VERIFY EMAIL
    // ========================================================

      .addCase(verifyEmail.pending, state => {
        state.isVerifyingEmail = true
        state.verifyEmailError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isVerifyingEmail = false

        state.emailVerified = true

        if (state.user) {
          state.user.emailVerified = true
        }

        const data = action.payload

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Email verified successfully.'
      })

      .addCase(verifyEmail.rejected, (state, action) => {
        state.isVerifyingEmail = false

        state.verifyEmailError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // RESEND VERIFICATION EMAIL
    // ========================================================

      .addCase(resendVerificationEmail.pending, state => {
        state.isResendingVerification = true
        state.resendVerificationError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.isResendingVerification = false

        const data = action.payload

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Verification email sent successfully.'
      })

      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isResendingVerification = false

        state.resendVerificationError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // FORGOT PASSWORD
    // ========================================================

      .addCase(forgotPassword.pending, state => {
        state.isForgotPasswordLoading = true
        state.forgotPasswordError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isForgotPasswordLoading = false

        const data = action.payload

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Password reset email sent successfully.'
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.isForgotPasswordLoading = false

        state.forgotPasswordError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // RESET PASSWORD
    // ========================================================

      .addCase(resetPassword.pending, state => {
        state.isResetPasswordLoading = true
        state.resetPasswordError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isResetPasswordLoading = false

        const data = action.payload

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Password reset successfully.'
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.isResetPasswordLoading = false

        state.resetPasswordError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // CHANGE PASSWORD
    // ========================================================

      .addCase(changePassword.pending, state => {
        state.isChangingPassword = true
        state.changePasswordError = null
        state.error = null
        state.successMessage = null
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.isChangingPassword = false

        const data = action.payload

        state.successMessage =
          data?.message ||
          data?.data?.message ||
          'Password changed successfully.'
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.isChangingPassword = false

        state.changePasswordError = action.payload
        state.error = action.payload
      })
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearError,
  clearSuccessMessage,
  clearMessages,
  clearAuthErrors,
  updateAuthUser,
  setAuthUser,
  resetAuthState
} = authSlice.actions

// ============================================================
// Selectors
// ============================================================

export const selectAuth = state => state.auth

export const selectUser = state => state.auth.user

export const selectIsAuthenticated = state =>
  state.auth.isAuthenticated

export const selectAuthLoading = state =>
  state.auth.isLoading

export const selectAuthError = state =>
  state.auth.error

export const selectAuthSuccess = state =>
  state.auth.successMessage

export const selectIsInitialized = state =>
  state.auth.isInitialized

export const selectIsAdmin = state =>
  state.auth.user?.role === 'admin'

export const selectIsEmailVerified = state =>
  state.auth.emailVerified

// ============================================================
// Export Reducer
// ============================================================

export default authSlice.reducer

