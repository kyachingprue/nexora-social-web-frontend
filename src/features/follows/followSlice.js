// src/features/follows/followSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userService from '../../services/userService'

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

const getId = item => {
  if (!item) return null

  return (
    item.id ||
    item._id ||
    item.userId ||
    item.user?.id ||
    item.user?._id ||
    null
  )
}

const extractList = response => {
  const data = getResponseData(response)

  if (Array.isArray(data)) return data

  return (
    data?.users ||
    data?.followers ||
    data?.following ||
    data?.data ||
    data?.results ||
    []
  )
}

const extractItem = response => {
  const data = getResponseData(response)

  return (
    data?.user ||
    data?.follow ||
    data?.data ||
    data
  )
}

const getPagination = response => {
  const data = getResponseData(response)

  return {
    page: data?.page ?? data?.currentPage ?? 1,
    limit: data?.limit ?? 20,
    total: data?.total ?? data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 1,
    hasNextPage:
      data?.hasNextPage ??
      (data?.totalPages
        ? (data?.page ?? data?.currentPage ?? 1) < data.totalPages
        : false),
    hasPreviousPage:
      data?.hasPreviousPage ??
      ((data?.page ?? data?.currentPage ?? 1) > 1)
  }
}

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // ----------------------------------------------------------
  // Follow status
  // ----------------------------------------------------------

  followStatus: {},

  // Example:
  // followStatus: {
  //   "user-id-1": {
  //     isFollowing: true,
  //     isFollowedBy: false,
  //     isPending: false
  //   }
  // }

  // ----------------------------------------------------------
  // Followers
  // ----------------------------------------------------------

  followersByUser: {},

  // Example:
  // followersByUser: {
  //   "user-id-1": [...]
  // }

  followersPagination: {},

  // ----------------------------------------------------------
  // Following
  // ----------------------------------------------------------

  followingByUser: {},

  followingPagination: {},

  // ----------------------------------------------------------
  // Suggestions
  // ----------------------------------------------------------

  suggestions: [],

  // ----------------------------------------------------------
  // Selected user
  // ----------------------------------------------------------

  selectedUserId: null,

  // ----------------------------------------------------------
  // Loading states
  // ----------------------------------------------------------

  isLoading: false,

  isFollowing: false,
  isUnfollowing: false,

  isCheckingStatus: false,

  isFollowersLoading: false,
  isFollowingListLoading: false,

  isSuggestionsLoading: false,

  // Per-user loading states
  followingLoadingByUserId: {},
  unfollowingLoadingByUserId: {},
  statusLoadingByUserId: {},

  // ----------------------------------------------------------
  // Errors
  // ----------------------------------------------------------

  error: null,

  followError: null,
  unfollowError: null,
  statusError: null,

  followersError: null,
  followingListError: null,

  suggestionsError: null,

  // ----------------------------------------------------------
  // Success
  // ----------------------------------------------------------

  successMessage: null
}

// ============================================================
// Async Thunks
// ============================================================

/**
 * Follow a user
 */
export const followUser = createAsyncThunk(
  'follows/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue('User ID is required.')
      }

      const response = await userService.followUser(userId)

      return {
        userId,
        data: extractItem(response),
        message:
          getResponseData(response)?.message ||
          'User followed successfully.'
      }
    } catch (error) {
      return rejectWithValue({
        userId,
        message: getErrorMessage(error)
      })
    }
  }
)

/**
 * Unfollow a user
 */
export const unfollowUser = createAsyncThunk(
  'follows/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue('User ID is required.')
      }

      const response = await userService.unfollowUser(userId)

      return {
        userId,
        data: extractItem(response),
        message:
          getResponseData(response)?.message ||
          'User unfollowed successfully.'
      }
    } catch (error) {
      return rejectWithValue({
        userId,
        message: getErrorMessage(error)
      })
    }
  }
)

/**
 * Get follow status for a user
 */
export const getFollowStatus = createAsyncThunk(
  'follows/getFollowStatus',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue('User ID is required.')
      }

      const response = await userService.getFollowStatus(userId)

      return {
        userId,
        data: extractItem(response)
      }
    } catch (error) {
      return rejectWithValue({
        userId,
        message: getErrorMessage(error)
      })
    }
  }
)

/**
 * Get followers of a user
 */
export const getFollowers = createAsyncThunk(
  'follows/getFollowers',
  async ({ userId, params = {} }, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue('User ID is required.')
      }

      const response = await userService.getFollowers(userId, params)

      return {
        userId,
        data: extractList(response),
        pagination: getPagination(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

/**
 * Get users that a user follows
 */
export const getFollowing = createAsyncThunk(
  'follows/getFollowing',
  async ({ userId, params = {} }, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue('User ID is required.')
      }

      const response = await userService.getFollowing(userId, params)

      return {
        userId,
        data: extractList(response),
        pagination: getPagination(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

/**
 * Get suggested users to follow
 */
export const getFollowSuggestions = createAsyncThunk(
  'follows/getFollowSuggestions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await userService.getSuggestedUsers(params)

      return extractList(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Slice
// ============================================================

const followSlice = createSlice({
  name: 'follows',

  initialState,

  reducers: {
    // --------------------------------------------------------
    // Clear errors
    // --------------------------------------------------------

    clearFollowError: state => {
      state.followError = null
      state.error = null
    },

    clearUnfollowError: state => {
      state.unfollowError = null
      state.error = null
    },

    clearStatusError: state => {
      state.statusError = null
      state.error = null
    },

    clearFollowersError: state => {
      state.followersError = null
      state.error = null
    },

    clearFollowingListError: state => {
      state.followingListError = null
      state.error = null
    },

    clearSuggestionsError: state => {
      state.suggestionsError = null
      state.error = null
    },

    clearErrors: state => {
      state.error = null
      state.followError = null
      state.unfollowError = null
      state.statusError = null
      state.followersError = null
      state.followingListError = null
      state.suggestionsError = null
    },

    // --------------------------------------------------------
    // Clear success
    // --------------------------------------------------------

    clearSuccessMessage: state => {
      state.successMessage = null
    },

    // --------------------------------------------------------
    // Selected user
    // --------------------------------------------------------

    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload
    },

    clearSelectedUser: state => {
      state.selectedUserId = null
    },

    // --------------------------------------------------------
    // Local follow status
    // --------------------------------------------------------

    setFollowStatus: (state, action) => {
      const { userId, status } = action.payload

      if (!userId) return

      state.followStatus[userId] = {
        ...(state.followStatus[userId] || {}),
        ...status
      }
    },

    // --------------------------------------------------------
    // Set following manually
    // --------------------------------------------------------

    setFollowingStatus: (state, action) => {
      const { userId, isFollowing } = action.payload

      if (!userId) return

      state.followStatus[userId] = {
        ...(state.followStatus[userId] || {}),
        isFollowing
      }
    },

    // --------------------------------------------------------
    // Clear specific user data
    // --------------------------------------------------------

    clearUserFollowData: (state, action) => {
      const userId = action.payload

      if (!userId) return

      delete state.followStatus[userId]
      delete state.followersByUser[userId]
      delete state.followingByUser[userId]
      delete state.followersPagination[userId]
      delete state.followingPagination[userId]
    },

    // --------------------------------------------------------
    // Clear followers
    // --------------------------------------------------------

    clearFollowers: (state, action) => {
      const userId = action.payload

      if (userId) {
        state.followersByUser[userId] = []
        state.followersPagination[userId] = {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      } else {
        state.followersByUser = {}
        state.followersPagination = {}
      }
    },

    // --------------------------------------------------------
    // Clear following
    // --------------------------------------------------------

    clearFollowing: (state, action) => {
      const userId = action.payload

      if (userId) {
        state.followingByUser[userId] = []
        state.followingPagination[userId] = {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      } else {
        state.followingByUser = {}
        state.followingPagination = {}
      }
    },

    // --------------------------------------------------------
    // Remove follower locally
    // --------------------------------------------------------

    removeFollowerLocally: (state, action) => {
      const { userId, followerId } = action.payload

      if (!userId || !followerId) return

      const followers = state.followersByUser[userId]

      if (!Array.isArray(followers)) return

      state.followersByUser[userId] = followers.filter(
        follower => getId(follower) !== followerId
      )

      const pagination = state.followersPagination[userId]

      if (pagination?.total > 0) {
        pagination.total -= 1
      }
    },

    // --------------------------------------------------------
    // Remove following locally
    // --------------------------------------------------------

    removeFollowingLocally: (state, action) => {
      const { userId, followingId } = action.payload

      if (!userId || !followingId) return

      const following = state.followingByUser[userId]

      if (!Array.isArray(following)) return

      state.followingByUser[userId] = following.filter(
        user => getId(user) !== followingId
      )

      const pagination = state.followingPagination[userId]

      if (pagination?.total > 0) {
        pagination.total -= 1
      }
    },

    // --------------------------------------------------------
    // Add follower locally
    // --------------------------------------------------------

    addFollowerLocally: (state, action) => {
      const { userId, follower } = action.payload

      if (!userId || !follower) return

      if (!state.followersByUser[userId]) {
        state.followersByUser[userId] = []
      }

      const followerId = getId(follower)

      const exists = state.followersByUser[userId].some(
        item => getId(item) === followerId
      )

      if (!exists) {
        state.followersByUser[userId].unshift(follower)
      }
    },

    // --------------------------------------------------------
    // Add following locally
    // --------------------------------------------------------

    addFollowingLocally: (state, action) => {
      const { userId, following } = action.payload

      if (!userId || !following) return

      if (!state.followingByUser[userId]) {
        state.followingByUser[userId] = []
      }

      const followingId = getId(following)

      const exists = state.followingByUser[userId].some(
        item => getId(item) === followingId
      )

      if (!exists) {
        state.followingByUser[userId].unshift(following)
      }
    },

    // --------------------------------------------------------
    // Clear all follow data
    // --------------------------------------------------------

    resetFollowState: () => initialState
  },

  // ==========================================================
  // Extra Reducers
  // ==========================================================

  extraReducers: builder => {
    // ========================================================
    // FOLLOW USER
    // ========================================================

    builder
      .addCase(followUser.pending, (state, action) => {
        const userId = action.meta.arg

        state.isLoading = true
        state.isFollowing = true

        state.error = null
        state.followError = null
        state.successMessage = null

        state.followingLoadingByUserId[userId] = true

        // Optimistic update
        state.followStatus[userId] = {
          ...(state.followStatus[userId] || {}),
          isFollowing: true
        }
      })

      .addCase(followUser.fulfilled, (state, action) => {
        const { userId, data, message } = action.payload

        state.isLoading = false
        state.isFollowing = false

        state.followingLoadingByUserId[userId] = false

        state.followStatus[userId] = {
          ...(state.followStatus[userId] || {}),
          ...(data && typeof data === 'object' ? data : {}),
          isFollowing: true
        }

        state.successMessage = message || 'User followed successfully.'
      })

      .addCase(followUser.rejected, (state, action) => {
        const payload = action.payload

        const userId =
          typeof payload === 'object' ? payload?.userId : action.meta.arg

        state.isLoading = false
        state.isFollowing = false

        if (userId) {
          state.followingLoadingByUserId[userId] = false

          // Rollback optimistic update
          state.followStatus[userId] = {
            ...(state.followStatus[userId] || {}),
            isFollowing: false
          }
        }

        const message =
          typeof payload === 'object'
            ? payload?.message
            : payload

        state.error = message || 'Failed to follow user.'
        state.followError = message || 'Failed to follow user.'
      })

    // ========================================================
    // UNFOLLOW USER
    // ========================================================

    builder
      .addCase(unfollowUser.pending, (state, action) => {
        const userId = action.meta.arg

        state.isLoading = true
        state.isUnfollowing = true

        state.error = null
        state.unfollowError = null
        state.successMessage = null

        state.unfollowingLoadingByUserId[userId] = true

        // Optimistic update
        state.followStatus[userId] = {
          ...(state.followStatus[userId] || {}),
          isFollowing: false
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const { userId, data, message } = action.payload

        state.isLoading = false
        state.isUnfollowing = false

        state.unfollowingLoadingByUserId[userId] = false

        state.followStatus[userId] = {
          ...(state.followStatus[userId] || {}),
          ...(data && typeof data === 'object' ? data : {}),
          isFollowing: false
        }

        state.successMessage = message || 'User unfollowed successfully.'
      })

      .addCase(unfollowUser.rejected, (state, action) => {
        const payload = action.payload

        const userId =
          typeof payload === 'object' ? payload?.userId : action.meta.arg

        state.isLoading = false
        state.isUnfollowing = false

        if (userId) {
          state.unfollowingLoadingByUserId[userId] = false

          // Rollback optimistic update
          state.followStatus[userId] = {
            ...(state.followStatus[userId] || {}),
            isFollowing: true
          }
        }

        const message =
          typeof payload === 'object'
            ? payload?.message
            : payload

        state.error = message || 'Failed to unfollow user.'
        state.unfollowError =
          message || 'Failed to unfollow user.'
      })

    // ========================================================
    // GET FOLLOW STATUS
    // ========================================================

    builder
      .addCase(getFollowStatus.pending, (state, action) => {
        const userId = action.meta.arg

        state.isCheckingStatus = true
        state.statusError = null
        state.statusLoadingByUserId[userId] = true
      })

      .addCase(getFollowStatus.fulfilled, (state, action) => {
        const { userId, data } = action.payload

        state.isCheckingStatus = false
        state.statusLoadingByUserId[userId] = false

        if (data && typeof data === 'object') {
          state.followStatus[userId] = {
            ...(state.followStatus[userId] || {}),
            ...data
          }
        }
      })

      .addCase(getFollowStatus.rejected, (state, action) => {
        const payload = action.payload
        const userId =
          typeof payload === 'object'
            ? payload?.userId
            : action.meta.arg

        state.isCheckingStatus = false

        if (userId) {
          state.statusLoadingByUserId[userId] = false
        }

        const message =
          typeof payload === 'object'
            ? payload?.message
            : payload

        state.error = message || 'Failed to get follow status.'
        state.statusError =
          message || 'Failed to get follow status.'
      })

    // ========================================================
    // GET FOLLOWERS
    // ========================================================

    builder
      .addCase(getFollowers.pending, state => {
        state.isFollowersLoading = true
        state.followersError = null
      })

      .addCase(getFollowers.fulfilled, (state, action) => {
        const {
          userId,
          data,
          pagination
        } = action.payload

        state.isFollowersLoading = false

        state.followersByUser[userId] = data || []

        state.followersPagination[userId] =
          pagination || {
            page: 1,
            limit: 20,
            total: data?.length || 0,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false
          }
      })

      .addCase(getFollowers.rejected, (state, action) => {
        state.isFollowersLoading = false
        state.error =
          action.payload || 'Failed to load followers.'
        state.followersError =
          action.payload || 'Failed to load followers.'
      })

    // ========================================================
    // GET FOLLOWING
    // ========================================================

    builder
      .addCase(getFollowing.pending, state => {
        state.isFollowingListLoading = true
        state.followingListError = null
      })

      .addCase(getFollowing.fulfilled, (state, action) => {
        const {
          userId,
          data,
          pagination
        } = action.payload

        state.isFollowingListLoading = false

        state.followingByUser[userId] = data || []

        state.followingPagination[userId] =
          pagination || {
            page: 1,
            limit: 20,
            total: data?.length || 0,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false
          }
      })

      .addCase(getFollowing.rejected, (state, action) => {
        state.isFollowingListLoading = false
        state.error =
          action.payload || 'Failed to load following list.'
        state.followingListError =
          action.payload || 'Failed to load following list.'
      })

    // ========================================================
    // FOLLOW SUGGESTIONS
    // ========================================================

    builder
      .addCase(getFollowSuggestions.pending, state => {
        state.isSuggestionsLoading = true
        state.suggestionsError = null
      })

      .addCase(getFollowSuggestions.fulfilled, (state, action) => {
        state.isSuggestionsLoading = false
        state.suggestions = action.payload || []
      })

      .addCase(getFollowSuggestions.rejected, (state, action) => {
        state.isSuggestionsLoading = false

        state.error =
          action.payload || 'Failed to load suggestions.'

        state.suggestionsError =
          action.payload || 'Failed to load suggestions.'
      })
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearFollowError,
  clearUnfollowError,
  clearStatusError,
  clearFollowersError,
  clearFollowingListError,
  clearSuggestionsError,
  clearErrors,
  clearSuccessMessage,

  setSelectedUserId,
  clearSelectedUser,

  setFollowStatus,
  setFollowingStatus,

  clearUserFollowData,

  clearFollowers,
  clearFollowing,

  removeFollowerLocally,
  removeFollowingLocally,

  addFollowerLocally,
  addFollowingLocally,

  resetFollowState
} = followSlice.actions

// ============================================================
// Selectors
// ============================================================

// Follow status
export const selectFollowStatus = (state, userId) =>
  state.follows?.followStatus?.[userId] || {
    isFollowing: false,
    isFollowedBy: false,
    isPending: false
  }

export const selectIsFollowing = (state, userId) =>
  Boolean(
    state.follows?.followStatus?.[userId]?.isFollowing
  )

export const selectIsFollowedBy = (state, userId) =>
  Boolean(
    state.follows?.followStatus?.[userId]?.isFollowedBy
  )

export const selectIsFollowPending = (state, userId) =>
  Boolean(
    state.follows?.followStatus?.[userId]?.isPending
  )

// Followers
export const selectFollowers = (state, userId) =>
  state.follows?.followersByUser?.[userId] || []

export const selectFollowersPagination = (
  state,
  userId
) =>
  state.follows?.followersPagination?.[userId] || {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }

// Following
export const selectFollowing = (state, userId) =>
  state.follows?.followingByUser?.[userId] || []

export const selectFollowingPagination = (
  state,
  userId
) =>
  state.follows?.followingPagination?.[userId] || {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }

// Suggestions
export const selectFollowSuggestions = state =>
  state.follows?.suggestions || []

// Selected user
export const selectSelectedUserId = state =>
  state.follows?.selectedUserId || null

// Loading
export const selectIsFollowingUser = (state, userId) =>
  Boolean(
    state.follows?.followingLoadingByUserId?.[userId]
  )

export const selectIsUnfollowingUser = (state, userId) =>
  Boolean(
    state.follows?.unfollowingLoadingByUserId?.[userId]
  )

export const selectIsCheckingFollowStatus = (
  state,
  userId
) =>
  Boolean(
    state.follows?.statusLoadingByUserId?.[userId]
  )

export const selectIsFollowersLoading = state =>
  Boolean(state.follows?.isFollowersLoading)

export const selectIsFollowingListLoading = state =>
  Boolean(state.follows?.isFollowingListLoading)

export const selectIsSuggestionsLoading = state =>
  Boolean(state.follows?.isSuggestionsLoading)

// Errors
export const selectFollowError = state =>
  state.follows?.followError || null

export const selectUnfollowError = state =>
  state.follows?.unfollowError || null

export const selectStatusError = state =>
  state.follows?.statusError || null

export const selectFollowersError = state =>
  state.follows?.followersError || null

export const selectFollowingListError = state =>
  state.follows?.followingListError || null

export const selectSuggestionsError = state =>
  state.follows?.suggestionsError || null

// General
export const selectFollowErrorMessage = state =>
  state.follows?.error || null

export const selectFollowSuccessMessage = state =>
  state.follows?.successMessage || null

// Default export
export default followSlice.reducer

