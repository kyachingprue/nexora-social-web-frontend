import api from './api'

const postService = {
  // ================================
  // Get Feed Posts
  // ================================

  getFeedPosts: async (params = {}) => {
    const response = await api.get('/posts/feed', {
      params
    })

    return response.data
  },

  // ================================
  // Get All Posts
  // ================================

  getPosts: async (params = {}) => {
    const response = await api.get('/posts', {
      params
    })

    return response.data
  },

  // ================================
  // Get Single Post
  // ================================

  getPostById: async postId => {
    const response = await api.get(`/posts/${postId}`)

    return response.data
  },

  // ================================
  // Get User Posts
  // ================================

  getUserPosts: async (userId, params = {}) => {
    const response = await api.get(
      `/users/${userId}/posts`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Create Post
  // ================================

  createPost: async postData => {
    const response = await api.post(
      '/posts',
      postData
    )

    return response.data
  },

  // ================================
  // Create Post With Media
  // ================================

  createPostWithMedia: async formData => {
    const response = await api.post(
      '/posts',
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
  // Update Post
  // ================================

  updatePost: async (postId, postData) => {
    const response = await api.patch(
      `/posts/${postId}`,
      postData
    )

    return response.data
  },

  // ================================
  // Delete Post
  // ================================

  deletePost: async postId => {
    const response = await api.delete(
      `/posts/${postId}`
    )

    return response.data
  },

  // ================================
  // Like Post
  // ================================

  likePost: async postId => {
    const response = await api.post(
      `/posts/${postId}/like`
    )

    return response.data
  },

  // ================================
  // Unlike Post
  // ================================

  unlikePost: async postId => {
    const response = await api.delete(
      `/posts/${postId}/like`
    )

    return response.data
  },

  // ================================
  // Get Post Likes
  // ================================

  getPostLikes: async (postId, params = {}) => {
    const response = await api.get(
      `/posts/${postId}/likes`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Share Post
  // ================================

  sharePost: async (postId, content = '') => {
    const response = await api.post(
      `/posts/${postId}/share`,
      {
        content
      }
    )

    return response.data
  },

  // ================================
  // Save Post
  // ================================

  savePost: async postId => {
    const response = await api.post(
      `/posts/${postId}/save`
    )

    return response.data
  },

  // ================================
  // Unsave Post
  // ================================

  unsavePost: async postId => {
    const response = await api.delete(
      `/posts/${postId}/save`
    )

    return response.data
  },

  // ================================
  // Get Saved Posts
  // ================================

  getSavedPosts: async (params = {}) => {
    const response = await api.get(
      '/posts/saved',
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Get Trending Posts
  // ================================

  getTrendingPosts: async (params = {}) => {
    const response = await api.get(
      '/posts/trending',
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Search Posts
  // ================================

  searchPosts: async (query, params = {}) => {
    const response = await api.get(
      '/posts/search',
      {
        params: {
          search: query,
          ...params
        }
      }
    )

    return response.data
  },

  // ================================
  // Get Posts By Hashtag
  // ================================

  getPostsByHashtag: async (hashtag, params = {}) => {
    const response = await api.get(
      `/posts/hashtag/${encodeURIComponent(hashtag)}`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Report Post
  // ================================

  reportPost: async (postId, reason, description = '') => {
    const response = await api.post(
      `/posts/${postId}/report`,
      {
        reason,
        description
      }
    )

    return response.data
  },

  // ================================
  // Hide Post From Feed
  // ================================

  hidePost: async postId => {
    const response = await api.post(
      `/posts/${postId}/hide`
    )

    return response.data
  },

  // ================================
  // Unhide Post
  // ================================

  unhidePost: async postId => {
    const response = await api.delete(
      `/posts/${postId}/hide`
    )

    return response.data
  }
}

export default postService

