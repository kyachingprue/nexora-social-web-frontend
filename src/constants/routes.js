// ==========================================
// Authentication Routes
// ==========================================

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
}

// ==========================================
// User Routes
// ==========================================

export const USER_ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  SAVED: '/saved',
  SETTINGS: '/settings'
}

// ==========================================
// Dynamic User Routes
// ==========================================

export const USER_DYNAMIC_ROUTES = {
  PROFILE: userId => `/profile/${userId}`
}

// ==========================================
// Post Routes
// ==========================================

export const POST_ROUTES = {
  POST: postId => `/post/${postId}`,
  EDIT: postId => `/post/${postId}/edit`
}

// ==========================================
// Admin Routes
// ==========================================

export const ADMIN_ROUTES = {
  ROOT: '/admin',
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  POSTS: '/admin/posts',
  REPORTS: '/admin/reports',
  ANALYTICS: '/admin/analytics',
  SETTINGS: '/admin/settings'
}

// ==========================================
// Admin Dynamic Routes
// ==========================================

export const ADMIN_DYNAMIC_ROUTES = {
  USER_DETAILS: userId => `/admin/users/${userId}`,
  POST_DETAILS: postId => `/admin/posts/${postId}`,
  REPORT_DETAILS: reportId => `/admin/reports/${reportId}`
}

// ==========================================
// Error / Utility Routes
// ==========================================

export const COMMON_ROUTES = {
  NOT_FOUND: '*',
  UNAUTHORIZED: '/unauthorized',
  FORBIDDEN: '/forbidden'
}

// ==========================================
// All Routes
// ==========================================

export const ROUTES = {
  AUTH: AUTH_ROUTES,
  USER: USER_ROUTES,
  USER_DYNAMIC: USER_DYNAMIC_ROUTES,
  POST: POST_ROUTES,
  ADMIN: ADMIN_ROUTES,
  ADMIN_DYNAMIC: ADMIN_DYNAMIC_ROUTES,
  COMMON: COMMON_ROUTES
}

export default ROUTES
