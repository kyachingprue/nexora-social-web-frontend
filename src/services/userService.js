import api from './api'

const userService = {
  // ================================
  // Get Current User Profile
  // ================================

  getProfile: async () => {
    const response = await api.get('/api/users/profile')

    return response.data
  },

  // ================================
  // Get User By ID
  // ================================

  getUserById: async userId => {
    const response = await api.get(`/api/users/${userId}`)

    return response.data
  },

  // ================================
  // Update Profile
  // ================================

  updateProfile: async userData => {
    const response = await api.patch(
      '/api/users/profile',
      userData
    )

    return response.data
  },

  // ================================
  // Update Avatar
  // ================================

  updateAvatar: async formData => {
    const response = await api.patch(
      '/api/users/profile/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  },

  // ================================
  // Update Cover Image
  // ================================

  updateCoverImage: async formData => {
    const response = await api.patch(
      '/api/users/profile/cover',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  },

  // ================================
  // Search Users
  // ================================

  searchUsers: async (query, params = {}) => {
    const response = await api.get('/api/users/search', {
      params: {
        search: query,
        ...params
      }
    })

    return response.data
  },

  // ================================
  // Get Users
  // ================================

  getUsers: async (params = {}) => {
    const response = await api.get('/api/users', {
      params
    })

    return response.data
  },

  // ================================
  // Follow User
  // ================================

  followUser: async userId => {
    const response = await api.post(
      `/api/users/${userId}/follow`
    )

    return response.data
  },

  // ================================
  // Unfollow User
  // ================================

  unfollowUser: async userId => {
    const response = await api.delete(
      `/api/users/${userId}/follow`
    )

    return response.data
  },

  // ================================
  // Get Followers
  // ================================

  getFollowers: async (userId, params = {}) => {
    const response = await api.get(
      `/api/users/${userId}/followers`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Get Following
  // ================================

  getFollowing: async (userId, params = {}) => {
    const response = await api.get(
      `/api/users/${userId}/following`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Get Suggested Users
  // ================================

  getSuggestedUsers: async (params = {}) => {
    const response = await api.get(
      '/api/users/suggestions',
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Check Follow Status
  // ================================

  getFollowStatus: async userId => {
    const response = await api.get(
      `/api/users/${userId}/follow-status`
    )

    return response.data
  },

  // ================================
  // Block User
  // ================================

  blockUser: async userId => {
    const response = await api.post(
      `/api/users/${userId}/block`
    )

    return response.data
  },

  // ================================
  // Unblock User
  // ================================

  unblockUser: async userId => {
    const response = await api.delete(
      `/api/users/${userId}/block`
    )

    return response.data
  },

  // ================================
  // Get Blocked Users
  // ================================

  getBlockedUsers: async (params = {}) => {
    const response = await api.get(
      '/api/users/blocked',
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Delete Account
  // ================================

  deleteAccount: async password => {
    const response = await api.delete(
      '/api/users/account',
      {
        data: {
          password
        }
      }
    )

    return response.data
  }
}

export default userService

