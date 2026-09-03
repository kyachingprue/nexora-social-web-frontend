// ============================================================
// Auth Selectors
// ============================================================

// Get entire auth state
export const selectAuth = state => state.auth

// ============================================================
// User
// ============================================================

// Get authenticated user
export const selectUser = state => state.auth.user

// Get user ID
export const selectUserId = state => state.auth.user?.id || null

// Get user role
export const selectUserRole = state => state.auth.user?.role || null

// Get username
export const selectUsername = state => state.auth.user?.username || null

// Get user name
export const selectUserName = state => state.auth.user?.name || null

// Get user email
export const selectUserEmail = state => state.auth.user?.email || null

// Get user avatar
export const selectUserAvatar = state =>
  state.auth.user?.avatar || null

// ============================================================
// Authentication
// ============================================================

// Check whether user is authenticated
export const selectIsAuthenticated = state =>
  state.auth.isAuthenticated

// Check whether auth initialization is completed
export const selectIsInitialized = state =>
  state.auth.isInitialized

// Check whether current user is admin
export const selectIsAdmin = state =>
  state.auth.user?.role === 'admin'

// Check whether current user is a normal user
export const selectIsUser = state =>
  state.auth.user?.role === 'user'

// Check email verification status
export const selectIsEmailVerified = state =>
  state.auth.emailVerified

// ============================================================
// Loading States
// ============================================================

// General auth loading
export const selectAuthLoading = state =>
  state.auth.isLoading

// Register loading
export const selectIsRegistering = state =>
  state.auth.isRegistering

// Login loading
export const selectIsLoggingIn = state =>
  state.auth.isLoggingIn

// Google login loading
export const selectIsGoogleLoggingIn = state =>
  state.auth.isGoogleLoggingIn

// Logout loading
export const selectIsLoggingOut = state =>
  state.auth.isLoggingOut

// Refresh token loading
export const selectIsRefreshing = state =>
  state.auth.isRefreshing

// Email verification loading
export const selectIsVerifyingEmail = state =>
  state.auth.isVerifyingEmail

// Resend verification loading
export const selectIsResendingVerification = state =>
  state.auth.isResendingVerification

// Forgot password loading
export const selectIsForgotPasswordLoading = state =>
  state.auth.isForgotPasswordLoading

// Reset password loading
export const selectIsResetPasswordLoading = state =>
  state.auth.isResetPasswordLoading

// Change password loading
export const selectIsChangingPassword = state =>
  state.auth.isChangingPassword

// ============================================================
// Messages
// ============================================================

// Global error
export const selectAuthError = state =>
  state.auth.error

// Success message
export const selectAuthSuccess = state =>
  state.auth.successMessage

// ============================================================
// Operation-specific Errors
// ============================================================

// Register error
export const selectRegisterError = state =>
  state.auth.registerError

// Login error
export const selectLoginError = state =>
  state.auth.loginError

// Google login error
export const selectGoogleLoginError = state =>
  state.auth.googleLoginError

// Logout error
export const selectLogoutError = state =>
  state.auth.logoutError

// Email verification error
export const selectVerifyEmailError = state =>
  state.auth.verifyEmailError

// Resend verification error
export const selectResendVerificationError = state =>
  state.auth.resendVerificationError

// Forgot password error
export const selectForgotPasswordError = state =>
  state.auth.forgotPasswordError

// Reset password error
export const selectResetPasswordError = state =>
  state.auth.resetPasswordError

// Change password error
export const selectChangePasswordError = state =>
  state.auth.changePasswordError

// ============================================================
// Combined Selectors
// ============================================================

// Check whether any authentication operation is loading
export const selectIsAnyAuthLoading = state =>
  state.auth.isLoading ||
  state.auth.isRegistering ||
  state.auth.isLoggingIn ||
  state.auth.isGoogleLoggingIn ||
  state.auth.isLoggingOut ||
  state.auth.isRefreshing ||
  state.auth.isVerifyingEmail ||
  state.auth.isResendingVerification ||
  state.auth.isForgotPasswordLoading ||
  state.auth.isResetPasswordLoading ||
  state.auth.isChangingPassword

// Check whether there is an authentication error
export const selectHasAuthError = state =>
  Boolean(state.auth.error)

// Check whether user has a valid authenticated session
export const selectHasValidSession = state =>
  state.auth.isAuthenticated &&
  Boolean(state.auth.user)

// Check whether user needs email verification
export const selectNeedsEmailVerification = state =>
  state.auth.isAuthenticated &&
  !state.auth.emailVerified

// ============================================================
// Default Export
// ============================================================

const authSelectors = {
  selectAuth,

  selectUser,
  selectUserId,
  selectUserRole,
  selectUsername,
  selectUserName,
  selectUserEmail,
  selectUserAvatar,

  selectIsAuthenticated,
  selectIsInitialized,
  selectIsAdmin,
  selectIsUser,
  selectIsEmailVerified,

  selectAuthLoading,
  selectIsRegistering,
  selectIsLoggingIn,
  selectIsGoogleLoggingIn,
  selectIsLoggingOut,
  selectIsRefreshing,
  selectIsVerifyingEmail,
  selectIsResendingVerification,
  selectIsForgotPasswordLoading,
  selectIsResetPasswordLoading,
  selectIsChangingPassword,

  selectAuthError,
  selectAuthSuccess,

  selectRegisterError,
  selectLoginError,
  selectGoogleLoginError,
  selectLogoutError,
  selectVerifyEmailError,
  selectResendVerificationError,
  selectForgotPasswordError,
  selectResetPasswordError,
  selectChangePasswordError,

  selectIsAnyAuthLoading,
  selectHasAuthError,
  selectHasValidSession,
  selectNeedsEmailVerification
}

export default authSelectors

