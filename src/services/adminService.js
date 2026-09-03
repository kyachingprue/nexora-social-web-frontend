import api from './api'

const adminService = {
  // ================================
  // Dashboard
  // ================================

  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  // ================================
  // Users
  // ================================

  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', {
      params
    })

    return response.data
  },

  getUserById: async userId => {
    const response = await api.get(`/admin/users/${userId}`)
    return response.data
  },

  updateUser: async (userId, userData) => {
    const response = await api.patch(`/admin/users/${userId}`, userData)

    return response.data
  },

  suspendUser: async userId => {
    const response = await api.patch(`/admin/users/${userId}/suspend`)

    return response.data
  },

  activateUser: async userId => {
    const response = await api.patch(`/admin/users/${userId}/activate`)

    return response.data
  },

  deleteUser: async userId => {
    const response = await api.delete(`/admin/users/${userId}`)

    return response.data
  },

  // ================================
  // Posts
  // ================================

  getPosts: async (params = {}) => {
    const response = await api.get('/admin/posts', {
      params
    })

    return response.data
  },

  getPostById: async postId => {
    const response = await api.get(`/admin/posts/${postId}`)
    return response.data
  },

  deletePost: async postId => {
    const response = await api.delete(`/admin/posts/${postId}`)

    return response.data
  },

  hidePost: async postId => {
    const response = await api.patch(`/admin/posts/${postId}/hide`)

    return response.data
  },

  restorePost: async postId => {
    const response = await api.patch(`/admin/posts/${postId}/restore`)

    return response.data
  },

  // ================================
  // Reports
  // ================================

  getReports: async (params = {}) => {
    const response = await api.get('/admin/reports', {
      params
    })

    return response.data
  },

  getReportById: async reportId => {
    const response = await api.get(`/admin/reports/${reportId}`)

    return response.data
  },

  updateReportStatus: async (reportId, status) => {
    const response = await api.patch(`/admin/reports/${reportId}`, {
      status
    })

    return response.data
  },

  dismissReport: async reportId => {
    const response = await api.patch(`/admin/reports/${reportId}/dismiss`)

    return response.data
  },

  resolveReport: async reportId => {
    const response = await api.patch(`/admin/reports/${reportId}/resolve`)

    return response.data
  },

  // ================================
  // Analytics
  // ================================

  getAnalytics: async (params = {}) => {
    const response = await api.get('/admin/analytics', {
      params
    })

    return response.data
  },

  getUserAnalytics: async (params = {}) => {
    const response = await api.get('/admin/analytics/users', {
      params
    })

    return response.data
  },

  getPostAnalytics: async (params = {}) => {
    const response = await api.get('/admin/analytics/posts', {
      params
    })

    return response.data
  },

  getEngagementAnalytics: async (params = {}) => {
    const response = await api.get('/admin/analytics/engagement', {
      params
    })

    return response.data
  },

  // ================================
  // Admin Settings
  // ================================

  getSettings: async () => {
    const response = await api.get('/admin/settings')
    return response.data
  },

  updateSettings: async settings => {
    const response = await api.patch('/admin/settings', settings)

    return response.data
  }
}

export default adminService
