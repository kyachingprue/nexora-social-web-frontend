import api from './api'

const userService = {
  // ================================
  // Get Current User Profile
  // ================================

  getProfile: async () => {
    const response = await api.get('/users/profile')

    return response.data
  },

  // ================================
  // Get User By ID
  // ================================

  getUserById: async userId => {
    const response = await api.get(`/users/${userId}`)

    return response.data
  },

  // ================================
  // Update Profile
  // ================================

  updateProfile: async userData => {
    const response = await api.patch(
      '/users/profile',
      userData
    )

    return response.data
  },

  // ================================
  // Update Avatar
  // ================================

  updateAvatar: async formData => {
    const response = await api.patch(
      '/users/profile/avatar',
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
      '/users/profile/cover',
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
    const response = await api.get('/users/search', {
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
    const response = await api.get('/users', {
      params
    })

    return response.data
  },

  // ================================
  // Follow User
  // ================================

  followUser: async userId => {
    const response = await api.post(
      `/users/${userId}/follow`
    )

    return response.data
  },

  // ================================
  // Unfollow User
  // ================================

  unfollowUser: async userId => {
    const response = await api.delete(
      `/users/${userId}/follow`
    )

    return response.data
  },

  // ================================
  // Get Followers
  // ================================

  getFollowers: async (userId, params = {}) => {
    const response = await api.get(
      `/users/${userId}/followers`,
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
      `/users/${userId}/following`,
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
      '/users/suggestions',
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
      `/users/${userId}/follow-status`
    )

    return response.data
  },

  // ================================
  // Block User
  // ================================

  blockUser: async userId => {
    const response = await api.post(
      `/users/${userId}/block`
    )

    return response.data
  },

  // ================================
  // Unblock User
  // ================================

  unblockUser: async userId => {
    const response = await api.delete(
      `/users/${userId}/block`
    )

    return response.data
  },

  // ================================
  // Get Blocked Users
  // ================================

  getBlockedUsers: async (params = {}) => {
    const response = await api.get(
      '/users/blocked',
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
      '/users/account',
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

