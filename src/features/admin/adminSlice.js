import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from '../../services/adminService'

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Dashboard
  dashboardStats: null,

  // Users
  users: [],
  selectedUser: null,
  usersPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },

  // Posts
  posts: [],
  selectedPost: null,
  postsPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },

  // Reports
  reports: [],
  selectedReport: null,
  reportsPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },

  // Analytics
  analytics: null,
  userAnalytics: null,
  postAnalytics: null,
  engagementAnalytics: null,

  // Settings
  settings: null,

  // Loading states
  isLoading: false,
  isDashboardLoading: false,
  isUsersLoading: false,
  isUserActionLoading: false,
  isPostsLoading: false,
  isPostActionLoading: false,
  isReportsLoading: false,
  isReportActionLoading: false,
  isAnalyticsLoading: false,
  isUserAnalyticsLoading: false,
  isPostAnalyticsLoading: false,
  isEngagementAnalyticsLoading: false,
  isSettingsLoading: false,
  isSettingsUpdating: false,

  // Error
  error: null,
  dashboardError: null,
  usersError: null,
  userActionError: null,
  postsError: null,
  postActionError: null,
  reportsError: null,
  reportActionError: null,
  analyticsError: null,
  settingsError: null,

  // Success message
  successMessage: null
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
// Dashboard
// ============================================================

export const getDashboardStats = createAsyncThunk(
  'admin/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      return await adminService.getDashboardStats()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Users
// ============================================================

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getUsers(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const getUserById = createAsyncThunk(
  'admin/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      return await adminService.getUserById(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const suspendUser = createAsyncThunk(
  'admin/suspendUser',
  async ({ userId, reason }, { rejectWithValue }) => {
    try {
      return await adminService.suspendUser(userId, reason)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const activateUser = createAsyncThunk(
  'admin/activateUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await adminService.activateUser(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await adminService.deleteUser(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Posts
// ============================================================

export const getPosts = createAsyncThunk(
  'admin/getPosts',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getPosts(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const getPostById = createAsyncThunk(
  'admin/getPostById',
  async (postId, { rejectWithValue }) => {
    try {
      return await adminService.getPostById(postId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const deletePost = createAsyncThunk(
  'admin/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      return await adminService.deletePost(postId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const hidePost = createAsyncThunk(
  'admin/hidePost',
  async ({ postId, reason }, { rejectWithValue }) => {
    try {
      return await adminService.hidePost(postId, reason)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const restorePost = createAsyncThunk(
  'admin/restorePost',
  async postId => {
      return await adminService.restorePost(postId)
  }
)

// ============================================================
// Reports
// ============================================================

export const getReports = createAsyncThunk(
  'admin/getReports',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getReports(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const getReportById = createAsyncThunk(
  'admin/getReportById',
  async (reportId, { rejectWithValue }) => {
    try {
      return await adminService.getReportById(reportId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const dismissReport = createAsyncThunk(
  'admin/dismissReport',
  async ({ reportId, note }, { rejectWithValue }) => {
    try {
      return await adminService.dismissReport(reportId, note)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const resolveReport = createAsyncThunk(
  'admin/resolveReport',
  async ({ reportId, action }, { rejectWithValue }) => {
    try {
      return await adminService.resolveReport(reportId, action)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Analytics
// ============================================================

export const getAnalytics = createAsyncThunk(
  'admin/getAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getAnalytics(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const getUserAnalytics = createAsyncThunk(
  'admin/getUserAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getUserAnalytics(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const getPostAnalytics = createAsyncThunk(
  'admin/getPostAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getPostAnalytics(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const getEngagementAnalytics = createAsyncThunk(
  'admin/getEngagementAnalytics',
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getEngagementAnalytics(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Settings
// ============================================================

export const getSettings = createAsyncThunk(
  'admin/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      return await adminService.getSettings()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const updateSettings = createAsyncThunk(
  'admin/updateSettings',
  async (settings, { rejectWithValue }) => {
    try {
      return await adminService.updateSettings(settings)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Admin Slice
// ============================================================

const adminSlice = createSlice({
  name: 'admin',

  initialState,

  reducers: {
    // ----------------------------------------------------------
    // Clear errors
    // ----------------------------------------------------------

    clearAdminError: state => {
      state.error = null
    },

    clearDashboardError: state => {
      state.dashboardError = null
    },

    clearUsersError: state => {
      state.usersError = null
      state.userActionError = null
    },

    clearPostsError: state => {
      state.postsError = null
      state.postActionError = null
    },

    clearReportsError: state => {
      state.reportsError = null
      state.reportActionError = null
    },

    clearAnalyticsError: state => {
      state.analyticsError = null
    },

    clearSettingsError: state => {
      state.settingsError = null
    },

    // ----------------------------------------------------------
    // Clear success message
    // ----------------------------------------------------------

    clearSuccessMessage: state => {
      state.successMessage = null
    },

    // ----------------------------------------------------------
    // Clear all messages
    // ----------------------------------------------------------

    clearMessages: state => {
      state.error = null
      state.dashboardError = null
      state.usersError = null
      state.userActionError = null
      state.postsError = null
      state.postActionError = null
      state.reportsError = null
      state.reportActionError = null
      state.analyticsError = null
      state.settingsError = null
      state.successMessage = null
    },

    // ----------------------------------------------------------
    // Select user/post/report
    // ----------------------------------------------------------

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },

    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload
    },

    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload
    },

    // ----------------------------------------------------------
    // Clear selected data
    // ----------------------------------------------------------

    clearSelectedUser: state => {
      state.selectedUser = null
    },

    clearSelectedPost: state => {
      state.selectedPost = null
    },

    clearSelectedReport: state => {
      state.selectedReport = null
    },

    // ----------------------------------------------------------
    // Reset admin state
    // ----------------------------------------------------------

    resetAdminState: () => {
      return initialState
    }
  },

  // ==========================================================
  // Extra Reducers
  // ==========================================================

  extraReducers: builder => {
    // ========================================================
    // DASHBOARD
    // ========================================================

    builder

      .addCase(getDashboardStats.pending, state => {
        state.isDashboardLoading = true
        state.isLoading = true
        state.dashboardError = null
        state.error = null
      })

      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isDashboardLoading = false
        state.isLoading = false

        const data = action.payload

        state.dashboardStats =
          data?.data ||
          data?.stats ||
          data ||
          null
      })

      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isDashboardLoading = false
        state.isLoading = false

        state.dashboardError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // USERS
    // ========================================================

      .addCase(getUsers.pending, state => {
        state.isUsersLoading = true
        state.usersError = null
        state.error = null
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false

        const data = action.payload

        state.users =
          data?.users ||
          data?.data?.users ||
          data?.data ||
          []

        const pagination =
          data?.pagination ||
          data?.data?.pagination

        if (pagination) {
          state.usersPagination = {
            ...state.usersPagination,
            ...pagination
          }
        }
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.isUsersLoading = false
        state.usersError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Get User By ID
    // --------------------------------------------------------

      .addCase(getUserById.pending, state => {
        state.isUserActionLoading = true
        state.userActionError = null
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.isUserActionLoading = false

        const data = action.payload

        state.selectedUser =
          data?.user ||
          data?.data?.user ||
          data?.data ||
          data ||
          null
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.isUserActionLoading = false
        state.userActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Suspend User
    // --------------------------------------------------------

      .addCase(suspendUser.pending, state => {
        state.isUserActionLoading = true
        state.userActionError = null
      })

      .addCase(suspendUser.fulfilled, (state, action) => {
        state.isUserActionLoading = false

        const data = action.payload

        const updatedUser =
          data?.user ||
          data?.data?.user ||
          null

        if (updatedUser) {
          state.selectedUser = updatedUser

          state.users = state.users.map(user =>
            user.id === updatedUser.id
              ? { ...user, ...updatedUser }
              : user
          )
        }

        state.successMessage =
          data?.message ||
          'User suspended successfully.'
      })

      .addCase(suspendUser.rejected, (state, action) => {
        state.isUserActionLoading = false
        state.userActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Activate User
    // --------------------------------------------------------

      .addCase(activateUser.pending, state => {
        state.isUserActionLoading = true
        state.userActionError = null
      })

      .addCase(activateUser.fulfilled, (state, action) => {
        state.isUserActionLoading = false

        const data = action.payload

        const updatedUser =
          data?.user ||
          data?.data?.user ||
          null

        if (updatedUser) {
          state.selectedUser = updatedUser

          state.users = state.users.map(user =>
            user.id === updatedUser.id
              ? { ...user, ...updatedUser }
              : user
          )
        }

        state.successMessage =
          data?.message ||
          'User activated successfully.'
      })

      .addCase(activateUser.rejected, (state, action) => {
        state.isUserActionLoading = false
        state.userActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Delete User
    // --------------------------------------------------------

      .addCase(deleteUser.pending, state => {
        state.isUserActionLoading = true
        state.userActionError = null
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isUserActionLoading = false

        const userId = action.meta.arg

        state.users = state.users.filter(
          user => user.id !== userId
        )

        state.selectedUser = null

        const data = action.payload

        state.successMessage =
          data?.message ||
          'User deleted successfully.'
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.isUserActionLoading = false
        state.userActionError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // POSTS
    // ========================================================

      .addCase(getPosts.pending, state => {
        state.isPostsLoading = true
        state.postsError = null
        state.error = null
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.isPostsLoading = false

        const data = action.payload

        state.posts =
          data?.posts ||
          data?.data?.posts ||
          data?.data ||
          []

        const pagination =
          data?.pagination ||
          data?.data?.pagination

        if (pagination) {
          state.postsPagination = {
            ...state.postsPagination,
            ...pagination
          }
        }
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isPostsLoading = false
        state.postsError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Get Post By ID
    // --------------------------------------------------------

      .addCase(getPostById.pending, state => {
        state.isPostActionLoading = true
        state.postActionError = null
      })

      .addCase(getPostById.fulfilled, (state, action) => {
        state.isPostActionLoading = false

        const data = action.payload

        state.selectedPost =
          data?.post ||
          data?.data?.post ||
          data?.data ||
          data ||
          null
      })

      .addCase(getPostById.rejected, (state, action) => {
        state.isPostActionLoading = false
        state.postActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Delete Post
    // --------------------------------------------------------

      .addCase(deletePost.pending, state => {
        state.isPostActionLoading = true
        state.postActionError = null
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.isPostActionLoading = false

        const postId = action.meta.arg

        state.posts = state.posts.filter(
          post => post.id !== postId
        )

        state.selectedPost = null

        const data = action.payload

        state.successMessage =
          data?.message ||
          'Post deleted successfully.'
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.isPostActionLoading = false
        state.postActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Hide Post
    // --------------------------------------------------------

      .addCase(hidePost.pending, state => {
        state.isPostActionLoading = true
        state.postActionError = null
      })

      .addCase(hidePost.fulfilled, (state, action) => {
        state.isPostActionLoading = false

        const data = action.payload
        const postId = action.meta.arg.postId

        state.posts = state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                isHidden: true
              }
            : post
        )

        if (state.selectedPost?.id === postId) {
          state.selectedPost = {
            ...state.selectedPost,
            isHidden: true
          }
        }

        state.successMessage =
          data?.message ||
          'Post hidden successfully.'
      })

      .addCase(hidePost.rejected, (state, action) => {
        state.isPostActionLoading = false
        state.postActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Restore Post
    // --------------------------------------------------------

      .addCase(restorePost.pending, state => {
        state.isPostActionLoading = true
        state.postActionError = null
      })

      .addCase(restorePost.fulfilled, (state, action) => {
        state.isPostActionLoading = false

        const postId = action.meta.arg
        const data = action.payload

        state.posts = state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                isHidden: false
              }
            : post
        )

        if (state.selectedPost?.id === postId) {
          state.selectedPost = {
            ...state.selectedPost,
            isHidden: false
          }
        }

        state.successMessage =
          data?.message ||
          'Post restored successfully.'
      })

      .addCase(restorePost.rejected, (state, action) => {
        state.isPostActionLoading = false
        state.postActionError = getErrorMessage(action.error)
        state.error = state.postActionError
      })

    // ========================================================
    // REPORTS
    // ========================================================

      .addCase(getReports.pending, state => {
        state.isReportsLoading = true
        state.reportsError = null
        state.error = null
      })

      .addCase(getReports.fulfilled, (state, action) => {
        state.isReportsLoading = false

        const data = action.payload

        state.reports =
          data?.reports ||
          data?.data?.reports ||
          data?.data ||
          []

        const pagination =
          data?.pagination ||
          data?.data?.pagination

        if (pagination) {
          state.reportsPagination = {
            ...state.reportsPagination,
            ...pagination
          }
        }
      })

      .addCase(getReports.rejected, (state, action) => {
        state.isReportsLoading = false
        state.reportsError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Get Report By ID
    // --------------------------------------------------------

      .addCase(getReportById.pending, state => {
        state.isReportActionLoading = true
        state.reportActionError = null
      })

      .addCase(getReportById.fulfilled, (state, action) => {
        state.isReportActionLoading = false

        const data = action.payload

        state.selectedReport =
          data?.report ||
          data?.data?.report ||
          data?.data ||
          data ||
          null
      })

      .addCase(getReportById.rejected, (state, action) => {
        state.isReportActionLoading = false
        state.reportActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Dismiss Report
    // --------------------------------------------------------

      .addCase(dismissReport.pending, state => {
        state.isReportActionLoading = true
        state.reportActionError = null
      })

      .addCase(dismissReport.fulfilled, (state, action) => {
        state.isReportActionLoading = false

        const reportId = action.meta.arg.reportId
        const data = action.payload

        state.reports = state.reports.map(report =>
          report.id === reportId
            ? {
                ...report,
                status: 'dismissed'
              }
            : report
        )

        if (state.selectedReport?.id === reportId) {
          state.selectedReport = {
            ...state.selectedReport,
            status: 'dismissed'
          }
        }

        state.successMessage =
          data?.message ||
          'Report dismissed successfully.'
      })

      .addCase(dismissReport.rejected, (state, action) => {
        state.isReportActionLoading = false
        state.reportActionError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Resolve Report
    // --------------------------------------------------------

      .addCase(resolveReport.pending, state => {
        state.isReportActionLoading = true
        state.reportActionError = null
      })

      .addCase(resolveReport.fulfilled, (state, action) => {
        state.isReportActionLoading = false

        const reportId = action.meta.arg.reportId
        const data = action.payload

        state.reports = state.reports.map(report =>
          report.id === reportId
            ? {
                ...report,
                status: 'resolved'
              }
            : report
        )

        if (state.selectedReport?.id === reportId) {
          state.selectedReport = {
            ...state.selectedReport,
            status: 'resolved'
          }
        }

        state.successMessage =
          data?.message ||
          'Report resolved successfully.'
      })

      .addCase(resolveReport.rejected, (state, action) => {
        state.isReportActionLoading = false
        state.reportActionError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // ANALYTICS
    // ========================================================

      .addCase(getAnalytics.pending, state => {
        state.isAnalyticsLoading = true
        state.analyticsError = null
      })

      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.isAnalyticsLoading = false

        const data = action.payload

        state.analytics =
          data?.analytics ||
          data?.data?.analytics ||
          data?.data ||
          data ||
          null
      })

      .addCase(getAnalytics.rejected, (state, action) => {
        state.isAnalyticsLoading = false
        state.analyticsError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // User Analytics
    // --------------------------------------------------------

      .addCase(getUserAnalytics.pending, state => {
        state.isUserAnalyticsLoading = true
        state.analyticsError = null
      })

      .addCase(getUserAnalytics.fulfilled, (state, action) => {
        state.isUserAnalyticsLoading = false

        const data = action.payload

        state.userAnalytics =
          data?.analytics ||
          data?.data?.analytics ||
          data?.data ||
          data ||
          null
      })

      .addCase(getUserAnalytics.rejected, (state, action) => {
        state.isUserAnalyticsLoading = false
        state.analyticsError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Post Analytics
    // --------------------------------------------------------

      .addCase(getPostAnalytics.pending, state => {
        state.isPostAnalyticsLoading = true
        state.analyticsError = null
      })

      .addCase(getPostAnalytics.fulfilled, (state, action) => {
        state.isPostAnalyticsLoading = false

        const data = action.payload

        state.postAnalytics =
          data?.analytics ||
          data?.data?.analytics ||
          data?.data ||
          data ||
          null
      })

      .addCase(getPostAnalytics.rejected, (state, action) => {
        state.isPostAnalyticsLoading = false
        state.analyticsError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Engagement Analytics
    // --------------------------------------------------------

      .addCase(getEngagementAnalytics.pending, state => {
        state.isEngagementAnalyticsLoading = true
        state.analyticsError = null
      })

      .addCase(getEngagementAnalytics.fulfilled, (state, action) => {
        state.isEngagementAnalyticsLoading = false

        const data = action.payload

        state.engagementAnalytics =
          data?.analytics ||
          data?.data?.analytics ||
          data?.data ||
          data ||
          null
      })

      .addCase(getEngagementAnalytics.rejected, (state, action) => {
        state.isEngagementAnalyticsLoading = false
        state.analyticsError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // SETTINGS
    // ========================================================

      .addCase(getSettings.pending, state => {
        state.isSettingsLoading = true
        state.settingsError = null
      })

      .addCase(getSettings.fulfilled, (state, action) => {
        state.isSettingsLoading = false

        const data = action.payload

        state.settings =
          data?.settings ||
          data?.data?.settings ||
          data?.data ||
          data ||
          null
      })

      .addCase(getSettings.rejected, (state, action) => {
        state.isSettingsLoading = false
        state.settingsError = action.payload
        state.error = action.payload
      })

    // --------------------------------------------------------
    // Update Settings
    // --------------------------------------------------------

      .addCase(updateSettings.pending, state => {
        state.isSettingsUpdating = true
        state.settingsError = null
      })

      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isSettingsUpdating = false

        const data = action.payload

        state.settings =
          data?.settings ||
          data?.data?.settings ||
          data?.data ||
          state.settings

        state.successMessage =
          data?.message ||
          'Settings updated successfully.'
      })

      .addCase(updateSettings.rejected, (state, action) => {
        state.isSettingsUpdating = false
        state.settingsError = action.payload
        state.error = action.payload
      })
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearAdminError,
  clearDashboardError,
  clearUsersError,
  clearPostsError,
  clearReportsError,
  clearAnalyticsError,
  clearSettingsError,
  clearSuccessMessage,
  clearMessages,
  setSelectedUser,
  setSelectedPost,
  setSelectedReport,
  clearSelectedUser,
  clearSelectedPost,
  clearSelectedReport,
  resetAdminState
} = adminSlice.actions

// ============================================================
// Basic Selectors
// ============================================================

export const selectAdmin = state => state.admin

export const selectDashboardStats = state =>
  state.admin.dashboardStats

export const selectUsers = state =>
  state.admin.users

export const selectSelectedUser = state =>
  state.admin.selectedUser

export const selectPosts = state =>
  state.admin.posts

export const selectSelectedPost = state =>
  state.admin.selectedPost

export const selectReports = state =>
  state.admin.reports

export const selectSelectedReport = state =>
  state.admin.selectedReport

export const selectAnalytics = state =>
  state.admin.analytics

export const selectUserAnalytics = state =>
  state.admin.userAnalytics

export const selectPostAnalytics = state =>
  state.admin.postAnalytics

export const selectEngagementAnalytics = state =>
  state.admin.engagementAnalytics

export const selectAdminSettings = state =>
  state.admin.settings

// ============================================================
// Loading Selectors
// ============================================================

export const selectAdminLoading = state =>
  state.admin.isLoading

export const selectDashboardLoading = state =>
  state.admin.isDashboardLoading

export const selectUsersLoading = state =>
  state.admin.isUsersLoading

export const selectUserActionLoading = state =>
  state.admin.isUserActionLoading

export const selectPostsLoading = state =>
  state.admin.isPostsLoading

export const selectPostActionLoading = state =>
  state.admin.isPostActionLoading

export const selectReportsLoading = state =>
  state.admin.isReportsLoading

export const selectReportActionLoading = state =>
  state.admin.isReportActionLoading

export const selectAnalyticsLoading = state =>
  state.admin.isAnalyticsLoading

export const selectSettingsLoading = state =>
  state.admin.isSettingsLoading

export const selectSettingsUpdating = state =>
  state.admin.isSettingsUpdating

// ============================================================
// Error & Message Selectors
// ============================================================

export const selectAdminError = state =>
  state.admin.error

export const selectAdminSuccess = state =>
  state.admin.successMessage

export const selectDashboardError = state =>
  state.admin.dashboardError

export const selectUsersError = state =>
  state.admin.usersError

export const selectPostsError = state =>
  state.admin.postsError

export const selectReportsError = state =>
  state.admin.reportsError

export const selectAnalyticsError = state =>
  state.admin.analyticsError

export const selectSettingsError = state =>
  state.admin.settingsError

// ============================================================
// Pagination Selectors
// ============================================================

export const selectUsersPagination = state =>
  state.admin.usersPagination

export const selectPostsPagination = state =>
  state.admin.postsPagination

export const selectReportsPagination = state =>
  state.admin.reportsPagination

// ============================================================
// Export Reducer
// ============================================================

export default adminSlice.reducer

