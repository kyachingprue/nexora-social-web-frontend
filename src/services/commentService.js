import api from './api'

const commentService = {
  // ================================
  // Get Comments For A Post
  // ================================

  getComments: async (postId, params = {}) => {
    const response = await api.get(
      `/posts/${postId}/comments`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Get Single Comment
  // ================================

  getCommentById: async commentId => {
    const response = await api.get(
      `/comments/${commentId}`
    )

    return response.data
  },

  // ================================
  // Create Comment
  // ================================

  createComment: async (postId, content) => {
    const response = await api.post(
      `/posts/${postId}/comments`,
      {
        content
      }
    )

    return response.data
  },

  // ================================
  // Create Reply
  // ================================

  createReply: async (commentId, content) => {
    const response = await api.post(
      `/comments/${commentId}/replies`,
      {
        content
      }
    )

    return response.data
  },

  // ================================
  // Get Comment Replies
  // ================================

  getReplies: async (commentId, params = {}) => {
    const response = await api.get(
      `/comments/${commentId}/replies`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Update Comment
  // ================================

  updateComment: async (commentId, content) => {
    const response = await api.patch(
      `/comments/${commentId}`,
      {
        content
      }
    )

    return response.data
  },

  // ================================
  // Delete Comment
  // ================================

  deleteComment: async commentId => {
    const response = await api.delete(
      `/comments/${commentId}`
    )

    return response.data
  },

  // ================================
  // Like Comment
  // ================================

  likeComment: async commentId => {
    const response = await api.post(
      `/comments/${commentId}/like`
    )

    return response.data
  },

  // ================================
  // Unlike Comment
  // ================================

  unlikeComment: async commentId => {
    const response = await api.delete(
      `/comments/${commentId}/like`
    )

    return response.data
  },

  // ================================
  // Get Comment Likes
  // ================================

  getCommentLikes: async (commentId, params = {}) => {
    const response = await api.get(
      `/comments/${commentId}/likes`,
      {
        params
      }
    )

    return response.data
  },

  // ================================
  // Report Comment
  // ================================

  reportComment: async (commentId, reason) => {
    const response = await api.post(
      `/comments/${commentId}/report`,
      {
        reason
      }
    )

    return response.data
  }
}

export default commentService

