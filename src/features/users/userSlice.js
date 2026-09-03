import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../../services/userService'

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Current user's profile
  profile: null,

  // User details
  selectedUser: null,

  // Users lists
  users: [],
  searchResults: [],
  suggestedUsers: [],
  followers: [],
  following: [],
  blockedUsers: [],

  // Follow status
  followStatus: {},

  // Pagination
  usersPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },

  followersPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },

  followingPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },

  // Loading states
  isLoading: false,
  isProfileLoading: false,
  isUserLoading: false,
  isUpdatingProfile: false,
  isUpdatingAvatar: false,
  isUpdatingCover: false,
  isUsersLoading: false,
  isSearching: false,
  isSuggestionsLoading: false,
  isFollowersLoading: false,
  isFollowingLoading: false,
  isFollowLoading: false,
  isBlockedUsersLoading: false,
  isBlockLoading: false,
  isDeletingAccount: false,

  // Errors
  error: null,
  profileError: null,
  userError: null,
  updateProfileError: null,
  avatarError: null,
  coverError: null,
  usersError: null,
  searchError: null,
  suggestionsError: null,
  followersError: null,
  followingError: null,
  followError: null,
  blockedUsersError: null,
  blockError: null,
  deleteAccountError: null,

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
// Get Current Profile
// ============================================================

export const getProfile = createAsyncThunk(
  'users/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getProfile()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get User By ID
// ============================================================

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.getUserById(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Update Profile
// ============================================================

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      return await userService.updateProfile(userData)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Update Avatar
// ============================================================

export const updateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async (formData, { rejectWithValue }) => {
    try {
      return await userService.updateAvatar(formData)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Update Cover Image
// ============================================================

export const updateCoverImage = createAsyncThunk(
  'users/updateCoverImage',
  async (formData, { rejectWithValue }) => {
    try {
      return await userService.updateCoverImage(formData)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Users
// ============================================================

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params, { rejectWithValue }) => {
    try {
      return await userService.getUsers(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Search Users
// ============================================================

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async ({ query, params }, { rejectWithValue }) => {
    try {
      return await userService.searchUsers(query, params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Suggested Users
// ============================================================

export const getSuggestedUsers = createAsyncThunk(
  'users/getSuggestedUsers',
  async (params, { rejectWithValue }) => {
    try {
      return await userService.getSuggestedUsers(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Follow User
// ============================================================

export const followUser = createAsyncThunk(
  'users/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.followUser(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Unfollow User
// ============================================================

export const unfollowUser = createAsyncThunk(
  'users/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.unfollowUser(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Follow Status
// ============================================================

export const getFollowStatus = createAsyncThunk(
  'users/getFollowStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getFollowStatus(userId)

      return {
        userId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Followers
// ============================================================

export const getFollowers = createAsyncThunk(
  'users/getFollowers',
  async ({ userId, params }, { rejectWithValue }) => {
    try {
      const response = await userService.getFollowers(
        userId,
        params
      )

      return {
        userId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Following
// ============================================================

export const getFollowing = createAsyncThunk(
  'users/getFollowing',
  async ({ userId, params }, { rejectWithValue }) => {
    try {
      const response = await userService.getFollowing(
        userId,
        params
      )

      return {
        userId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Block User
// ============================================================

export const blockUser = createAsyncThunk(
  'users/blockUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.blockUser(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Unblock User
// ============================================================

export const unblockUser = createAsyncThunk(
  'users/unblockUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.unblockUser(userId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Blocked Users
// ============================================================

export const getBlockedUsers = createAsyncThunk(
  'users/getBlockedUsers',
  async (params, { rejectWithValue }) => {
    try {
      return await userService.getBlockedUsers(params)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Delete Account
// ============================================================

export const deleteAccount = createAsyncThunk(
  'users/deleteAccount',
  async (password, { rejectWithValue }) => {
    try {
      return await userService.deleteAccount(password)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Users Slice
// ============================================================

const usersSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    // ----------------------------------------------------------
    // Clear errors
    // ----------------------------------------------------------

    clearError: state => {
      state.error = null
    },

    clearProfileError: state => {
      state.profileError = null
    },

    clearUserError: state => {
      state.userError = null
    },

    clearUpdateProfileError: state => {
      state.updateProfileError = null
    },

    clearAvatarError: state => {
      state.avatarError = null
    },

    clearCoverError: state => {
      state.coverError = null
    },

    clearUsersError: state => {
      state.usersError = null
    },

    clearSearchError: state => {
      state.searchError = null
    },

    clearSuggestionsError: state => {
      state.suggestionsError = null
    },

    clearFollowersError: state => {
      state.followersError = null
    },

    clearFollowingError: state => {
      state.followingError = null
    },

    clearFollowError: state => {
      state.followError = null
    },

    clearBlockedUsersError: state => {
      state.blockedUsersError = null
    },

    clearBlockError: state => {
      state.blockError = null
    },

    clearDeleteAccountError: state => {
      state.deleteAccountError = null
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
      state.profileError = null
      state.userError = null
      state.updateProfileError = null
      state.avatarError = null
      state.coverError = null
      state.usersError = null
      state.searchError = null
      state.suggestionsError = null
      state.followersError = null
      state.followingError = null
      state.followError = null
      state.blockedUsersError = null
      state.blockError = null
      state.deleteAccountError = null
      state.successMessage = null
    },

    // ----------------------------------------------------------
    // Select user
    // ----------------------------------------------------------

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },

    clearSelectedUser: state => {
      state.selectedUser = null
    },

    // ----------------------------------------------------------
    // Clear search results
    // ----------------------------------------------------------

    clearSearchResults: state => {
      state.searchResults = []
    },

    // ----------------------------------------------------------
    // Clear users
    // ----------------------------------------------------------

    clearUsers: state => {
      state.users = []
    },

    // ----------------------------------------------------------
    // Clear followers
    // ----------------------------------------------------------

    clearFollowers: state => {
      state.followers = []
    },

    // ----------------------------------------------------------
    // Clear following
    // ----------------------------------------------------------

    clearFollowing: state => {
      state.following = []
    },

    // ----------------------------------------------------------
    // Clear suggestions
    // ----------------------------------------------------------

    clearSuggestedUsers: state => {
      state.suggestedUsers = []
    },

    // ----------------------------------------------------------
    // Clear blocked users
    // ----------------------------------------------------------

    clearBlockedUsers: state => {
      state.blockedUsers = []
    },

    // ----------------------------------------------------------
    // Set follow status manually
    // ----------------------------------------------------------

    setFollowStatus: (state, action) => {
      const { userId, status } = action.payload

      state.followStatus[userId] = status
    },

    // ----------------------------------------------------------
    // Reset state
    // ----------------------------------------------------------

    resetUsersState: () => {
      return initialState
    }
  },

  // ==========================================================
  // Extra Reducers
  // ==========================================================

  extraReducers: builder => {
    // ========================================================
    // GET PROFILE
    // ========================================================

    builder

      .addCase(getProfile.pending, state => {
        state.isProfileLoading = true
        state.isLoading = true
        state.profileError = null
        state.error = null
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false
        state.isLoading = false

        const data = action.payload

        state.profile =
          data?.user ||
          data?.profile ||
          data?.data?.user ||
          data?.data?.profile ||
          data?.data ||
          data ||
          null
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.isProfileLoading = false
        state.isLoading = false

        state.profileError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET USER BY ID
    // ========================================================

      .addCase(getUserById.pending, state => {
        state.isUserLoading = true
        state.userError = null
        state.error = null
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.isUserLoading = false

        const data = action.payload

        state.selectedUser =
          data?.user ||
          data?.data?.user ||
          data?.data ||
          data ||
          null
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.isUserLoading = false
        state.userError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UPDATE PROFILE
    // ========================================================

      .addCase(updateProfile.pending, state => {
        state.isUpdatingProfile = true
        state.updateProfileError = null
        state.error = null
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false

        const data = action.payload

        const updatedUser =
          data?.user ||
          data?.data?.user ||
          data?.profile ||
          data?.data?.profile ||
          null

        if (updatedUser) {
          state.profile = {
            ...state.profile,
            ...updatedUser
          }
        }

        state.successMessage =
          data?.message ||
          'Profile updated successfully.'
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false
        state.updateProfileError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UPDATE AVATAR
    // ========================================================

      .addCase(updateAvatar.pending, state => {
        state.isUpdatingAvatar = true
        state.avatarError = null
        state.error = null
      })

      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isUpdatingAvatar = false

        const data = action.payload

        const updatedUser =
          data?.user ||
          data?.data?.user ||
          data?.profile ||
          data?.data?.profile ||
          null

        const avatar =
          data?.avatar ||
          data?.data?.avatar ||
          updatedUser?.avatar

        if (updatedUser) {
          state.profile = {
            ...state.profile,
            ...updatedUser
          }
        } else if (avatar && state.profile) {
          state.profile.avatar = avatar
        }

        state.successMessage =
          data?.message ||
          'Profile picture updated successfully.'
      })

      .addCase(updateAvatar.rejected, (state, action) => {
        state.isUpdatingAvatar = false
        state.avatarError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UPDATE COVER IMAGE
    // ========================================================

      .addCase(updateCoverImage.pending, state => {
        state.isUpdatingCover = true
        state.coverError = null
        state.error = null
      })

      .addCase(updateCoverImage.fulfilled, (state, action) => {
        state.isUpdatingCover = false

        const data = action.payload

        const updatedUser =
          data?.user ||
          data?.data?.user ||
          data?.profile ||
          data?.data?.profile ||
          null

        const coverImage =
          data?.coverImage ||
          data?.data?.coverImage ||
          updatedUser?.coverImage

        if (updatedUser) {
          state.profile = {
            ...state.profile,
            ...updatedUser
          }
        } else if (coverImage && state.profile) {
          state.profile.coverImage = coverImage
        }

        state.successMessage =
          data?.message ||
          'Cover image updated successfully.'
      })

      .addCase(updateCoverImage.rejected, (state, action) => {
        state.isUpdatingCover = false
        state.coverError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET USERS
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

    // ========================================================
    // SEARCH USERS
    // ========================================================

      .addCase(searchUsers.pending, state => {
        state.isSearching = true
        state.searchError = null
        state.error = null
      })

      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isSearching = false

        const data = action.payload

        state.searchResults =
          data?.users ||
          data?.results ||
          data?.data?.users ||
          data?.data?.results ||
          data?.data ||
          []
      })

      .addCase(searchUsers.rejected, (state, action) => {
        state.isSearching = false
        state.searchError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // SUGGESTED USERS
    // ========================================================

      .addCase(getSuggestedUsers.pending, state => {
        state.isSuggestionsLoading = true
        state.suggestionsError = null
        state.error = null
      })

      .addCase(getSuggestedUsers.fulfilled, (state, action) => {
        state.isSuggestionsLoading = false

        const data = action.payload

        state.suggestedUsers =
          data?.users ||
          data?.suggestions ||
          data?.data?.users ||
          data?.data?.suggestions ||
          data?.data ||
          []
      })

      .addCase(getSuggestedUsers.rejected, (state, action) => {
        state.isSuggestionsLoading = false
        state.suggestionsError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // FOLLOW USER
    // ========================================================

      .addCase(followUser.pending, (state, action) => {
        state.isFollowLoading = true
        state.followError = null
        state.error = null

        const userId = action.meta.arg

        state.followStatus[userId] = {
          ...state.followStatus[userId],
          isFollowing: true,
          loading: true
        }
      })

      .addCase(followUser.fulfilled, (state, action) => {
        state.isFollowLoading = false

        const userId = action.meta.arg
        const data = action.payload

        state.followStatus[userId] = {
          isFollowing: true,
          loading: false
        }

        // Update selected user
        if (state.selectedUser?.id === userId) {
          state.selectedUser = {
            ...state.selectedUser,
            isFollowing: true,
            followersCount:
              (state.selectedUser.followersCount || 0) + 1
          }
        }

        // Update suggested users
        state.suggestedUsers = state.suggestedUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                isFollowing: true
              }
            : user
        )

        // Update search results
        state.searchResults = state.searchResults.map(user =>
          user.id === userId
            ? {
                ...user,
                isFollowing: true
              }
            : user
        )

        state.successMessage =
          data?.message ||
          'User followed successfully.'
      })

      .addCase(followUser.rejected, (state, action) => {
        state.isFollowLoading = false

        const userId = action.meta.arg

        state.followStatus[userId] = {
          ...state.followStatus[userId],
          isFollowing: false,
          loading: false
        }

        state.followError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UNFOLLOW USER
    // ========================================================

      .addCase(unfollowUser.pending, (state, action) => {
        state.isFollowLoading = true
        state.followError = null
        state.error = null

        const userId = action.meta.arg

        state.followStatus[userId] = {
          ...state.followStatus[userId],
          isFollowing: false,
          loading: true
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isFollowLoading = false

        const userId = action.meta.arg
        const data = action.payload

        state.followStatus[userId] = {
          isFollowing: false,
          loading: false
        }

        if (state.selectedUser?.id === userId) {
          state.selectedUser = {
            ...state.selectedUser,
            isFollowing: false,
            followersCount: Math.max(
              0,
              (state.selectedUser.followersCount || 0) - 1
            )
          }
        }

        state.suggestedUsers = state.suggestedUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                isFollowing: false
              }
            : user
        )

        state.searchResults = state.searchResults.map(user =>
          user.id === userId
            ? {
                ...user,
                isFollowing: false
              }
            : user
        )

        state.successMessage =
          data?.message ||
          'User unfollowed successfully.'
      })

      .addCase(unfollowUser.rejected, (state, action) => {
        state.isFollowLoading = false

        const userId = action.meta.arg

        state.followStatus[userId] = {
          ...state.followStatus[userId],
          isFollowing: true,
          loading: false
        }

        state.followError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET FOLLOW STATUS
    // ========================================================

      .addCase(getFollowStatus.pending, state => {
        state.followError = null
      })

      .addCase(getFollowStatus.fulfilled, (state, action) => {
        const { userId, data } = action.payload

        state.followStatus[userId] =
          data?.status ||
          data?.data?.status ||
          data?.data ||
          data
      })

      .addCase(getFollowStatus.rejected, (state, action) => {
        state.followError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET FOLLOWERS
    // ========================================================

      .addCase(getFollowers.pending, state => {
        state.isFollowersLoading = true
        state.followersError = null
        state.error = null
      })

      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isFollowersLoading = false

        const { data } = action.payload

        state.followers =
          data?.followers ||
          data?.data?.followers ||
          data?.data ||
          []

        const pagination =
          data?.pagination ||
          data?.data?.pagination

        if (pagination) {
          state.followersPagination = {
            ...state.followersPagination,
            ...pagination
          }
        }
      })

      .addCase(getFollowers.rejected, (state, action) => {
        state.isFollowersLoading = false
        state.followersError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET FOLLOWING
    // ========================================================

      .addCase(getFollowing.pending, state => {
        state.isFollowingLoading = true
        state.followingError = null
        state.error = null
      })

      .addCase(getFollowing.fulfilled, (state, action) => {
        state.isFollowingLoading = false

        const { data } = action.payload

        state.following =
          data?.following ||
          data?.data?.following ||
          data?.data ||
          []

        const pagination =
          data?.pagination ||
          data?.data?.pagination

        if (pagination) {
          state.followingPagination = {
            ...state.followingPagination,
            ...pagination
          }
        }
      })

      .addCase(getFollowing.rejected, (state, action) => {
        state.isFollowingLoading = false
        state.followingError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // BLOCK USER
    // ========================================================

      .addCase(blockUser.pending, state => {
        state.isBlockLoading = true
        state.blockError = null
        state.error = null
      })

      .addCase(blockUser.fulfilled, (state, action) => {
        state.isBlockLoading = false

        const userId = action.meta.arg
        const data = action.payload

        // Remove from suggestions/search
        state.suggestedUsers =
          state.suggestedUsers.filter(
            user => user.id !== userId
          )

        state.searchResults =
          state.searchResults.filter(
            user => user.id !== userId
          )

        // Update follow status
        state.followStatus[userId] = {
          isFollowing: false,
          isBlocked: true,
          loading: false
        }

        state.successMessage =
          data?.message ||
          'User blocked successfully.'
      })

      .addCase(blockUser.rejected, (state, action) => {
        state.isBlockLoading = false
        state.blockError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UNBLOCK USER
    // ========================================================

      .addCase(unblockUser.pending, state => {
        state.isBlockLoading = true
        state.blockError = null
        state.error = null
      })

      .addCase(unblockUser.fulfilled, (state, action) => {
        state.isBlockLoading = false

        const userId = action.meta.arg
        const data = action.payload

        state.followStatus[userId] = {
          ...state.followStatus[userId],
          isBlocked: false,
          loading: false
        }

        state.blockedUsers =
          state.blockedUsers.filter(
            user => user.id !== userId
          )

        state.successMessage =
          data?.message ||
          'User unblocked successfully.'
      })

      .addCase(unblockUser.rejected, (state, action) => {
        state.isBlockLoading = false
        state.blockError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET BLOCKED USERS
    // ========================================================

      .addCase(getBlockedUsers.pending, state => {
        state.isBlockedUsersLoading = true
        state.blockedUsersError = null
        state.error = null
      })

      .addCase(getBlockedUsers.fulfilled, (state, action) => {
        state.isBlockedUsersLoading = false

        const data = action.payload

        state.blockedUsers =
          data?.users ||
          data?.blockedUsers ||
          data?.data?.users ||
          data?.data?.blockedUsers ||
          data?.data ||
          []
      })

      .addCase(getBlockedUsers.rejected, (state, action) => {
        state.isBlockedUsersLoading = false
        state.blockedUsersError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // DELETE ACCOUNT
    // ========================================================

      .addCase(deleteAccount.pending, state => {
        state.isDeletingAccount = true
        state.deleteAccountError = null
        state.error = null
      })

      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isDeletingAccount = false

        state.profile = null
        state.selectedUser = null
        state.users = []
        state.searchResults = []
        state.suggestedUsers = []
        state.followers = []
        state.following = []
        state.blockedUsers = []
        state.followStatus = {}

        const data = action.payload

        state.successMessage =
          data?.message ||
          'Account deleted successfully.'
      })

      .addCase(deleteAccount.rejected, (state, action) => {
        state.isDeletingAccount = false
        state.deleteAccountError = action.payload
        state.error = action.payload
      })
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearError,
  clearProfileError,
  clearUserError,
  clearUpdateProfileError,
  clearAvatarError,
  clearCoverError,
  clearUsersError,
  clearSearchError,
  clearSuggestionsError,
  clearFollowersError,
  clearFollowingError,
  clearFollowError,
  clearBlockedUsersError,
  clearBlockError,
  clearDeleteAccountError,
  clearSuccessMessage,
  clearMessages,
  setSelectedUser,
  clearSelectedUser,
  clearSearchResults,
  clearUsers,
  clearFollowers,
  clearFollowing,
  clearSuggestedUsers,
  clearBlockedUsers,
  setFollowStatus,
  resetUsersState
} = usersSlice.actions

// ============================================================
// Basic Selectors
// ============================================================

export const selectUsers = state => state.users

export const selectProfile = state =>
  state.users.profile

export const selectSelectedUser = state =>
  state.users.selectedUser

export const selectUsersList = state =>
  state.users.users

export const selectSearchResults = state =>
  state.users.searchResults

export const selectSuggestedUsers = state =>
  state.users.suggestedUsers

export const selectFollowers = state =>
  state.users.followers

export const selectFollowing = state =>
  state.users.following

export const selectBlockedUsers = state =>
  state.users.blockedUsers

export const selectFollowStatus = (state, userId) =>
  state.users.followStatus[userId]

// ============================================================
// Loading Selectors
// ============================================================

export const selectUsersLoading = state =>
  state.users.isUsersLoading

export const selectProfileLoading = state =>
  state.users.isProfileLoading

export const selectUserLoading = state =>
  state.users.isUserLoading

export const selectUpdatingProfile = state =>
  state.users.isUpdatingProfile

export const selectUpdatingAvatar = state =>
  state.users.isUpdatingAvatar

export const selectUpdatingCover = state =>
  state.users.isUpdatingCover

export const selectSearchingUsers = state =>
  state.users.isSearching

export const selectSuggestionsLoading = state =>
  state.users.isSuggestionsLoading

export const selectFollowersLoading = state =>
  state.users.isFollowersLoading

export const selectFollowingLoading = state =>
  state.users.isFollowingLoading

export const selectFollowLoading = state =>
  state.users.isFollowLoading

export const selectBlockedUsersLoading = state =>
  state.users.isBlockedUsersLoading

export const selectBlockLoading = state =>
  state.users.isBlockLoading

export const selectDeletingAccount = state =>
  state.users.isDeletingAccount

// ============================================================
// Error Selectors
// ============================================================

export const selectUserError = state =>
  state.users.error

export const selectProfileError = state =>
  state.users.profileError

export const selectUsersError = state =>
  state.users.usersError

export const selectSearchError = state =>
  state.users.searchError

export const selectSuggestionsError = state =>
  state.users.suggestionsError

export const selectFollowersError = state =>
  state.users.followersError

export const selectFollowingError = state =>
  state.users.followingError

export const selectFollowError = state =>
  state.users.followError

export const selectBlockedUsersError = state =>
  state.users.blockedUsersError

export const selectBlockError = state =>
  state.users.blockError

export const selectDeleteAccountError = state =>
  state.users.deleteAccountError

// ============================================================
// Message Selector
// ============================================================

export const selectUserSuccess = state =>
  state.users.successMessage

// ============================================================
// Pagination Selectors
// ============================================================

export const selectUsersPagination = state =>
  state.users.usersPagination

export const selectFollowersPagination = state =>
  state.users.followersPagination

export const selectFollowingPagination = state =>
  state.users.followingPagination

// ============================================================
// Export Reducer
// ============================================================

export default usersSlice.reducer

