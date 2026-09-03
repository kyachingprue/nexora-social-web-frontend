// src/features/notifications/notificationsSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import notificationService from '../../services/notificationService'

// ============================================================
// Helpers
// ============================================================

const getErrorMessage = error => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Something went wrong. Please try again.'
  )
}

const getResponseData = response => {
  return response?.data ?? response
}

const extractNotifications = response => {
  const data = getResponseData(response)

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.notifications)) {
    return data.notifications
  }

  if (Array.isArray(data?.data?.notifications)) {
    return data.data.notifications
  }

  if (Array.isArray(data?.data)) {
    return data.data
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  if (Array.isArray(data?.data?.items)) {
    return data.data.items
  }

  return []
}

const extractNotification = response => {
  const data = getResponseData(response)

  return (
    data?.notification ||
    data?.data?.notification ||
    data?.data ||
    data?.item ||
    data ||
    null
  )
}

const getNotificationId = notification => {
  return notification?.id || notification?._id
}

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Notifications
  notifications: [],

  // Selected notification
  selectedNotification: null,

  // Unread count
  unreadCount: 0,

  // Notification preferences
  preferences: {
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    messages: true,
    shares: true,
    email: true,
    push: true
  },

  // Pagination
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasMore: false
  },

  // Loading states
  isLoading: false,
  isNotificationLoading: false,
  isUnreadCountLoading: false,
  isMarkingRead: false,
  isMarkingUnread: false,
  isMarkingAllRead: false,
  isDeleting: false,
  isDeletingAll: false,
  isPreferencesLoading: false,
  isUpdatingPreferences: false,

  // Per-notification loading
  loadingByNotificationId: {},

  // Errors
  error: null,
  notificationError: null,
  unreadCountError: null,
  markReadError: null,
  markUnreadError: null,
  markAllReadError: null,
  deleteError: null,
  deleteAllError: null,
  preferencesError: null,
  updatePreferencesError: null,

  // Success
  successMessage: null
}

// ============================================================
// Async Thunks
// ============================================================

// ------------------------------------------------------------
// Get Notifications
// ------------------------------------------------------------

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.getNotifications(params)

      const data = getResponseData(response)

      return {
        notifications: extractNotifications(response),
        unreadCount:
          data?.unreadCount ??
          data?.data?.unreadCount ??
          null,
        pagination:
          data?.pagination ||
          data?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Single Notification
// ------------------------------------------------------------

export const getNotificationById = createAsyncThunk(
  'notifications/getNotificationById',
  async notificationId => {

      const response =
        await notificationService.getNotificationById(
          notificationId
        )
      return extractNotification(response)
  }
)

// ------------------------------------------------------------
// Get Unread Count
// ------------------------------------------------------------

export const getUnreadCount = createAsyncThunk(
  'notifications/getUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.getUnreadCount()

      const data = getResponseData(response)

      return (
        data?.unreadCount ??
        data?.count ??
        data?.data?.unreadCount ??
        data?.data?.count ??
        0
      )
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Mark Notification As Read
// ------------------------------------------------------------

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.markAsRead(
          notificationId
        )

      return {
        notificationId,
        notification: extractNotification(response)
      }
    } catch (error) {
      return rejectWithValue({
        notificationId,
        message: getErrorMessage(error)
      })
    }
  }
)

// ------------------------------------------------------------
// Mark Notification As Unread
// ------------------------------------------------------------

export const markAsUnread = createAsyncThunk(
  'notifications/markAsUnread',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.markAsUnread(
          notificationId
        )

      return {
        notificationId,
        notification: extractNotification(response)
      }
    } catch (error) {
      return rejectWithValue({
        notificationId,
        message: getErrorMessage(error)
      })
    }
  }
)

// ------------------------------------------------------------
// Mark All Notifications As Read
// ------------------------------------------------------------

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.markAllAsRead()

      return getResponseData(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Delete Notification
// ------------------------------------------------------------

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.deleteNotification(
          notificationId
        )

      return {
        notificationId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue({
        notificationId,
        message: getErrorMessage(error)
      })
    }
  }
)

// ------------------------------------------------------------
// Delete All Notifications
// ------------------------------------------------------------

export const deleteAllNotifications = createAsyncThunk(
  'notifications/deleteAllNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.deleteAllNotifications()

      return getResponseData(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Notification Preferences
// ------------------------------------------------------------

export const getPreferences = createAsyncThunk(
  'notifications/getPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.getPreferences()

      const data = getResponseData(response)

      return (
        data?.preferences ||
        data?.data?.preferences ||
        data?.data ||
        data
      )
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Update Notification Preferences
// ------------------------------------------------------------

export const updatePreferences = createAsyncThunk(
  'notifications/updatePreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response =
        await notificationService.updatePreferences(
          preferences
        )

      const data = getResponseData(response)

      return (
        data?.preferences ||
        data?.data?.preferences ||
        data?.data ||
        data
      )
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Slice
// ============================================================

const notificationsSlice = createSlice({
  name: 'notifications',

  initialState,

  reducers: {
    // --------------------------------------------------------
    // Error Actions
    // --------------------------------------------------------

    clearError: state => {
      state.error = null
    },

    clearNotificationError: state => {
      state.notificationError = null
    },

    clearUnreadCountError: state => {
      state.unreadCountError = null
    },

    clearMarkReadError: state => {
      state.markReadError = null
    },

    clearMarkUnreadError: state => {
      state.markUnreadError = null
    },

    clearMarkAllReadError: state => {
      state.markAllReadError = null
    },

    clearDeleteError: state => {
      state.deleteError = null
    },

    clearDeleteAllError: state => {
      state.deleteAllError = null
    },

    clearPreferencesError: state => {
      state.preferencesError = null
    },

    clearUpdatePreferencesError: state => {
      state.updatePreferencesError = null
    },

    clearAllErrors: state => {
      state.error = null
      state.notificationError = null
      state.unreadCountError = null
      state.markReadError = null
      state.markUnreadError = null
      state.markAllReadError = null
      state.deleteError = null
      state.deleteAllError = null
      state.preferencesError = null
      state.updatePreferencesError = null
    },

    // --------------------------------------------------------
    // Success
    // --------------------------------------------------------

    clearSuccessMessage: state => {
      state.successMessage = null
    },

    // --------------------------------------------------------
    // Selected Notification
    // --------------------------------------------------------

    setSelectedNotification: (state, action) => {
      state.selectedNotification = action.payload
    },

    clearSelectedNotification: state => {
      state.selectedNotification = null
    },

    // --------------------------------------------------------
    // Clear Notifications
    // --------------------------------------------------------

    clearNotifications: state => {
      state.notifications = []
    },

    // --------------------------------------------------------
    // Set Unread Count
    // --------------------------------------------------------

    setUnreadCount: (state, action) => {
      state.unreadCount = Math.max(
        0,
        Number(action.payload) || 0
      )
    },

    // --------------------------------------------------------
    // Increment Unread Count
    // --------------------------------------------------------

    incrementUnreadCount: (state, action) => {
      const amount = Number(action.payload) || 1

      state.unreadCount += amount
    },

    // --------------------------------------------------------
    // Decrement Unread Count
    // --------------------------------------------------------

    decrementUnreadCount: (state, action) => {
      const amount = Number(action.payload) || 1

      state.unreadCount = Math.max(
        0,
        state.unreadCount - amount
      )
    },

    // --------------------------------------------------------
    // Add Notification
    // Useful for Socket.IO real-time notifications
    // --------------------------------------------------------

    addNotification: (state, action) => {
      const notification = action.payload

      if (!notification) {
        return
      }

      const notificationId =
        getNotificationId(notification)

      const alreadyExists = state.notifications.some(
        item =>
          getNotificationId(item) === notificationId
      )

      if (!alreadyExists) {
        state.notifications.unshift(notification)

        // Keep notification list manageable
        if (state.notifications.length > 100) {
          state.notifications.pop()
        }

        if (
          notification.isRead === false ||
          notification.read === false
        ) {
          state.unreadCount += 1
        }
      }
    },

    // --------------------------------------------------------
    // Remove Notification Locally
    // --------------------------------------------------------

    removeNotificationLocally: (state, action) => {
      const notificationId = action.payload

      const notification = state.notifications.find(
        item =>
          getNotificationId(item) === notificationId
      )

      if (
        notification &&
        (notification.isRead === false ||
          notification.read === false)
      ) {
        state.unreadCount = Math.max(
          0,
          state.unreadCount - 1
        )
      }

      state.notifications = state.notifications.filter(
        item =>
          getNotificationId(item) !== notificationId
      )

      if (
        getNotificationId(state.selectedNotification) ===
        notificationId
      ) {
        state.selectedNotification = null
      }
    },

    // --------------------------------------------------------
    // Mark All Read Locally
    // Useful for instant UI update
    // --------------------------------------------------------

    markAllAsReadLocally: state => {
      state.notifications =
        state.notifications.map(notification => ({
          ...notification,
          isRead: true,
          read: true
        }))

      state.unreadCount = 0
    },

    // --------------------------------------------------------
    // Reset
    // --------------------------------------------------------

    resetNotificationsState: () => initialState
  },

  // ==========================================================
  // Extra Reducers
  // ==========================================================

  extraReducers: builder => {
    builder

      // ======================================================
      // GET NOTIFICATIONS
      // ======================================================

      .addCase(getNotifications.pending, state => {
        state.isLoading = true
        state.error = null
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false

        const {
          notifications,
          unreadCount,
          pagination
        } = action.payload

        state.notifications = notifications

        if (unreadCount !== null) {
          state.unreadCount = Math.max(
            0,
            Number(unreadCount) || 0
          )
        }

        if (pagination) {
          state.pagination = {
            ...state.pagination,
            ...pagination
          }
        }
      })

      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false

        state.error =
          action.payload ||
          'Failed to load notifications.'
      })

      // ======================================================
      // GET SINGLE NOTIFICATION
      // ======================================================

      .addCase(getNotificationById.pending, state => {
        state.isNotificationLoading = true
        state.notificationError = null
      })

      .addCase(
        getNotificationById.fulfilled,
        (state, action) => {
          state.isNotificationLoading = false

          state.selectedNotification =
            action.payload
        }
      )

      .addCase(
        getNotificationById.rejected,
        (state, action) => {
          state.isNotificationLoading = false

          state.notificationError =
            action.payload ||
            'Failed to load notification.'
        }
      )

      // ======================================================
      // GET UNREAD COUNT
      // ======================================================

      .addCase(getUnreadCount.pending, state => {
        state.isUnreadCountLoading = true
        state.unreadCountError = null
      })

      .addCase(
        getUnreadCount.fulfilled,
        (state, action) => {
          state.isUnreadCountLoading = false

          state.unreadCount = Math.max(
            0,
            Number(action.payload) || 0
          )
        }
      )

      .addCase(
        getUnreadCount.rejected,
        (state, action) => {
          state.isUnreadCountLoading = false

          state.unreadCountError =
            action.payload ||
            'Failed to load unread count.'
        }
      )

      // ======================================================
      // MARK AS READ
      // ======================================================

      .addCase(markAsRead.pending, (state, action) => {
        state.isMarkingRead = true
        state.markReadError = null

        state.loadingByNotificationId[
          action.meta.arg
        ] = true
      })

      .addCase(markAsRead.fulfilled, (state, action) => {
        state.isMarkingRead = false

        const {
          notificationId,
          notification
        } = action.payload

        state.loadingByNotificationId[
          notificationId
        ] = false

        const target = state.notifications.find(
          item =>
            getNotificationId(item) ===
            notificationId
        )

        const wasUnread =
          target &&
          (target.isRead === false ||
            target.read === false)

        if (notification) {
          state.notifications =
            state.notifications.map(item =>
              getNotificationId(item) ===
              notificationId
                ? {
                    ...item,
                    ...notification,
                    isRead: true,
                    read: true
                  }
                : item
            )
        } else {
          state.notifications =
            state.notifications.map(item =>
              getNotificationId(item) ===
              notificationId
                ? {
                    ...item,
                    isRead: true,
                    read: true
                  }
                : item
            )
        }

        if (wasUnread) {
          state.unreadCount = Math.max(
            0,
            state.unreadCount - 1
          )
        }
      })

      .addCase(markAsRead.rejected, (state, action) => {
        state.isMarkingRead = false

        const notificationId =
          action.meta.arg

        state.loadingByNotificationId[
          notificationId
        ] = false

        state.markReadError =
          action.payload?.message ||
          action.payload ||
          'Failed to mark notification as read.'
      })

      // ======================================================
      // MARK AS UNREAD
      // ======================================================

      .addCase(markAsUnread.pending, (state, action) => {
        state.isMarkingUnread = true
        state.markUnreadError = null

        state.loadingByNotificationId[
          action.meta.arg
        ] = true
      })

      .addCase(
        markAsUnread.fulfilled,
        (state, action) => {
          state.isMarkingUnread = false

          const {
            notificationId,
            notification
          } = action.payload

          state.loadingByNotificationId[
            notificationId
          ] = false

          const target = state.notifications.find(
            item =>
              getNotificationId(item) ===
              notificationId
          )

          const wasRead =
            target &&
            target.isRead !== false &&
            target.read !== false

          if (notification) {
            state.notifications =
              state.notifications.map(item =>
                getNotificationId(item) ===
                notificationId
                  ? {
                      ...item,
                      ...notification,
                      isRead: false,
                      read: false
                    }
                  : item
              )
          } else {
            state.notifications =
              state.notifications.map(item =>
                getNotificationId(item) ===
                notificationId
                  ? {
                      ...item,
                      isRead: false,
                      read: false
                    }
                  : item
              )
          }

          if (wasRead) {
            state.unreadCount += 1
          }
        }
      )

      .addCase(
        markAsUnread.rejected,
        (state, action) => {
          state.isMarkingUnread = false

          const notificationId =
            action.meta.arg

          state.loadingByNotificationId[
            notificationId
          ] = false

          state.markUnreadError =
            action.payload?.message ||
            action.payload ||
            'Failed to mark notification as unread.'
        }
      )

      // ======================================================
      // MARK ALL AS READ
      // ======================================================

      .addCase(markAllAsRead.pending, state => {
        state.isMarkingAllRead = true
        state.markAllReadError = null
      })

      .addCase(markAllAsRead.fulfilled, state => {
        state.isMarkingAllRead = false

        state.notifications =
          state.notifications.map(notification => ({
            ...notification,
            isRead: true,
            read: true
          }))

        state.unreadCount = 0

        state.successMessage =
          'All notifications marked as read.'
      })

      .addCase(
        markAllAsRead.rejected,
        (state, action) => {
          state.isMarkingAllRead = false

          state.markAllReadError =
            action.payload ||
            'Failed to mark all notifications as read.'
        }
      )

      // ======================================================
      // DELETE NOTIFICATION
      // ======================================================

      .addCase(
        deleteNotification.pending,
        (state, action) => {
          state.isDeleting = true
          state.deleteError = null

          state.loadingByNotificationId[
            action.meta.arg
          ] = true
        }
      )

      .addCase(
        deleteNotification.fulfilled,
        (state, action) => {
          state.isDeleting = false

          const { notificationId } =
            action.payload

          state.loadingByNotificationId[
            notificationId
          ] = false

          const notification =
            state.notifications.find(
              item =>
                getNotificationId(item) ===
                notificationId
            )

          if (
            notification &&
            (notification.isRead === false ||
              notification.read === false)
          ) {
            state.unreadCount = Math.max(
              0,
              state.unreadCount - 1
            )
          }

          state.notifications =
            state.notifications.filter(
              item =>
                getNotificationId(item) !==
                notificationId
            )

          if (
            getNotificationId(
              state.selectedNotification
            ) === notificationId
          ) {
            state.selectedNotification = null
          }

          state.successMessage =
            'Notification deleted successfully.'
        }
      )

      .addCase(
        deleteNotification.rejected,
        (state, action) => {
          state.isDeleting = false

          const notificationId =
            action.meta.arg

          state.loadingByNotificationId[
            notificationId
          ] = false

          state.deleteError =
            action.payload?.message ||
            action.payload ||
            'Failed to delete notification.'
        }
      )

      // ======================================================
      // DELETE ALL NOTIFICATIONS
      // ======================================================

      .addCase(
        deleteAllNotifications.pending,
        state => {
          state.isDeletingAll = true
          state.deleteAllError = null
        }
      )

      .addCase(
        deleteAllNotifications.fulfilled,
        state => {
          state.isDeletingAll = false

          state.notifications = []
          state.unreadCount = 0
          state.selectedNotification = null

          state.successMessage =
            'All notifications deleted successfully.'
        }
      )

      .addCase(
        deleteAllNotifications.rejected,
        (state, action) => {
          state.isDeletingAll = false

          state.deleteAllError =
            action.payload ||
            'Failed to delete all notifications.'
        }
      )

      // ======================================================
      // GET PREFERENCES
      // ======================================================

      .addCase(getPreferences.pending, state => {
        state.isPreferencesLoading = true
        state.preferencesError = null
      })

      .addCase(
        getPreferences.fulfilled,
        (state, action) => {
          state.isPreferencesLoading = false

          if (action.payload) {
            state.preferences = {
              ...state.preferences,
              ...action.payload
            }
          }
        }
      )

      .addCase(
        getPreferences.rejected,
        (state, action) => {
          state.isPreferencesLoading = false

          state.preferencesError =
            action.payload ||
            'Failed to load notification preferences.'
        }
      )

      // ======================================================
      // UPDATE PREFERENCES
      // ======================================================

      .addCase(
        updatePreferences.pending,
        state => {
          state.isUpdatingPreferences = true
          state.updatePreferencesError = null
        }
      )

      .addCase(
        updatePreferences.fulfilled,
        (state, action) => {
          state.isUpdatingPreferences = false

          if (action.payload) {
            state.preferences = {
              ...state.preferences,
              ...action.payload
            }
          }

          state.successMessage =
            'Notification preferences updated successfully.'
        }
      )

      .addCase(
        updatePreferences.rejected,
        (state, action) => {
          state.isUpdatingPreferences = false

          state.updatePreferencesError =
            action.payload ||
            'Failed to update notification preferences.'
        }
      )
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearError,
  clearNotificationError,
  clearUnreadCountError,
  clearMarkReadError,
  clearMarkUnreadError,
  clearMarkAllReadError,
  clearDeleteError,
  clearDeleteAllError,
  clearPreferencesError,
  clearUpdatePreferencesError,
  clearAllErrors,
  clearSuccessMessage,
  setSelectedNotification,
  clearSelectedNotification,
  clearNotifications,
  setUnreadCount,
  incrementUnreadCount,
  decrementUnreadCount,
  addNotification,
  removeNotificationLocally,
  markAllAsReadLocally,
  resetNotificationsState
} = notificationsSlice.actions

// ============================================================
// Selectors
// ============================================================

// ------------------------------------------------------------
// Notifications
// ------------------------------------------------------------

export const selectNotifications = state =>
  state.notifications?.notifications || []

export const selectSelectedNotification = state =>
  state.notifications?.selectedNotification || null

// ------------------------------------------------------------
// Unread Count
// ------------------------------------------------------------

export const selectUnreadCount = state =>
  state.notifications?.unreadCount || 0

export const selectHasUnreadNotifications = state =>
  (state.notifications?.unreadCount || 0) > 0

// ------------------------------------------------------------
// Preferences
// ------------------------------------------------------------

export const selectNotificationPreferences = state =>
  state.notifications?.preferences || {}

// ------------------------------------------------------------
// Pagination
// ------------------------------------------------------------

export const selectNotificationPagination = state =>
  state.notifications?.pagination || {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasMore: false
  }

// ------------------------------------------------------------
// Loading
// ------------------------------------------------------------

export const selectNotificationsLoading = state =>
  Boolean(state.notifications?.isLoading)

export const selectNotificationLoading = state =>
  Boolean(state.notifications?.isNotificationLoading)

export const selectUnreadCountLoading = state =>
  Boolean(state.notifications?.isUnreadCountLoading)

export const selectMarkAsReadLoading = state =>
  Boolean(state.notifications?.isMarkingRead)

export const selectMarkAsUnreadLoading = state =>
  Boolean(state.notifications?.isMarkingUnread)

export const selectMarkAllAsReadLoading = state =>
  Boolean(state.notifications?.isMarkingAllRead)

export const selectDeleteNotificationLoading = state =>
  Boolean(state.notifications?.isDeleting)

export const selectDeleteAllNotificationsLoading = state =>
  Boolean(state.notifications?.isDeletingAll)

export const selectPreferencesLoading = state =>
  Boolean(state.notifications?.isPreferencesLoading)

export const selectUpdatePreferencesLoading = state =>
  Boolean(state.notifications?.isUpdatingPreferences)

// ------------------------------------------------------------
// Per Notification Loading
// ------------------------------------------------------------

export const selectNotificationActionLoading = (
  state,
  notificationId
) =>
  Boolean(
    state.notifications
      ?.loadingByNotificationId?.[notificationId]
  )

// ------------------------------------------------------------
// Errors
// ------------------------------------------------------------

export const selectNotificationsError = state =>
  state.notifications?.error || null

export const selectNotificationError = state =>
  state.notifications?.notificationError || null

export const selectUnreadCountError = state =>
  state.notifications?.unreadCountError || null

export const selectMarkReadError = state =>
  state.notifications?.markReadError || null

export const selectMarkUnreadError = state =>
  state.notifications?.markUnreadError || null

export const selectMarkAllReadError = state =>
  state.notifications?.markAllReadError || null

export const selectDeleteNotificationError = state =>
  state.notifications?.deleteError || null

export const selectDeleteAllNotificationsError = state =>
  state.notifications?.deleteAllError || null

export const selectPreferencesError = state =>
  state.notifications?.preferencesError || null

export const selectUpdatePreferencesError = state =>
  state.notifications?.updatePreferencesError || null

// ------------------------------------------------------------
// Success
// ------------------------------------------------------------

export const selectNotificationSuccess = state =>
  state.notifications?.successMessage || null

// ============================================================
// Default Export
// ============================================================

export default notificationsSlice.reducer

