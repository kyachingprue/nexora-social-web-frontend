// src/services/authService.js

import api from './api'

const authService = {
  register: async userData => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  login: async credentials => {
    const response = await api.post('/api/auth/login', credentials)
    return response.data
  },

  googleLogin: async credential => {
    const response = await api.post('/api/auth/google', credential)
    return response.data
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout')
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/apiauth/me')
    return response.data
  },

  refreshToken: async () => {
    const response = await api.post('/api/auth/refresh')
    return response.data
  },

  // ==========================================
  // EMAIL VERIFICATION
  // ==========================================

  verifyEmail: async ({ email, code }) => {
    const response = await api.post('/api/auth/verify-email', {
      email,
      code
    })

    return response.data
  },

  resendVerificationEmail: async email => {
    const response = await api.post('/api/auth/resend-verification', {
      email
    })

    return response.data
  },

  forgotPassword: async email => {
    const response = await api.post('/api/auth/forgot-password', {
      email
    })

    return response.data
  },

  resetPassword: async (token, password) => {
    const response = await api.post(`/api/auth/reset-password/${token}`, {
      password
    })

    return response.data
  },

  changePassword: async passwordData => {
    const response = await api.patch('/api/auth/change-password', passwordData)

    return response.data
  }
}

export default authService

