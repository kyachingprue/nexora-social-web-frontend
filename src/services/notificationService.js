import api from './api'

const notificationService = {
  // ================================
  // Get Notifications
  // ================================

  getNotifications: async (params = {}) => {
    const response = await api.get('/notifications', {
      params
    })

    return response.data
  },

  // ================================
  // Get Single Notification
  // ================================

  getNotificationById: async notificationId => {
    const response = await api.get(
      `/notifications/${notificationId}`
    )

    return response.data
  },

  // ================================
  // Get Unread Notification Count
  // ================================

  getUnreadCount: async () => {
    const response = await api.get(
      '/notifications/unread-count'
    )

    return response.data
  },

  // ================================
  // Mark Notification As Read
  // ================================

  markAsRead: async notificationId => {
    const response = await api.patch(
      `/notifications/${notificationId}/read`
    )

    return response.data
  },

  // ================================
  // Mark Notification As Unread
  // ================================

  markAsUnread: async notificationId => {
    const response = await api.patch(
      `/notifications/${notificationId}/unread`
    )

    return response.data
  },

  // ================================
  // Mark All Notifications As Read
  // ================================

  markAllAsRead: async () => {
    const response = await api.patch(
      '/notifications/read-all'
    )

    return response.data
  },

  // ================================
  // Delete Notification
  // ================================

  deleteNotification: async notificationId => {
    const response = await api.delete(
      `/notifications/${notificationId}`
    )

    return response.data
  },

  // ================================
  // Delete All Notifications
  // ================================

  deleteAllNotifications: async () => {
    const response = await api.delete(
      '/notifications'
    )

    return response.data
  },

  // ================================
  // Notification Preferences
  // ================================

  getPreferences: async () => {
    const response = await api.get(
      '/notifications/preferences'
    )

    return response.data
  },

  // ================================
  // Update Notification Preferences
  // ================================

  updatePreferences: async preferences => {
    const response = await api.patch(
      '/notifications/preferences',
      preferences
    )

    return response.data
  }
}

export default notificationService

