import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commentService from '../../services/commentService'

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Comments grouped by post ID
  commentsByPost: {},

  // Replies grouped by comment ID
  repliesByComment: {},

  // Selected comment
  selectedComment: null,

  // Comment likes
  commentLikes: {},

  // Loading states
  isLoading: false,
  isCommentsLoading: false,
  isRepliesLoading: false,
  isCreating: false,
  isCreatingReply: false,
  isUpdating: false,
  isDeleting: false,
  isLiking: false,
  isLoadingLikes: false,
  isReporting: false,

  // Error states
  error: null,
  commentsError: null,
  repliesError: null,
  createError: null,
  replyError: null,
  updateError: null,
  deleteError: null,
  likeError: null,
  likesError: null,
  reportError: null,

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
// Get Comments
// ============================================================

export const getComments = createAsyncThunk(
  'comments/getComments',
  async ({ postId, params }, { rejectWithValue }) => {
    try {
      const response = await commentService.getComments(
        postId,
        params
      )

      return {
        postId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Comment By ID
// ============================================================

export const getCommentById = createAsyncThunk(
  'comments/getCommentById',
  async (commentId, { rejectWithValue }) => {
    try {
      return await commentService.getCommentById(commentId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Create Comment
// ============================================================

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await commentService.createComment(
        postId,
        content
      )

      return {
        postId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Create Reply
// ============================================================

export const createReply = createAsyncThunk(
  'comments/createReply',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await commentService.createReply(
        commentId,
        content
      )

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Replies
// ============================================================

export const getReplies = createAsyncThunk(
  'comments/getReplies',
  async ({ commentId, params }, { rejectWithValue }) => {
    try {
      const response = await commentService.getReplies(
        commentId,
        params
      )

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Update Comment
// ============================================================

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await commentService.updateComment(
        commentId,
        content
      )

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Delete Comment
// ============================================================

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response =
        await commentService.deleteComment(commentId)

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Like Comment
// ============================================================

export const likeComment = createAsyncThunk(
  'comments/likeComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response =
        await commentService.likeComment(commentId)

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Unlike Comment
// ============================================================

export const unlikeComment = createAsyncThunk(
  'comments/unlikeComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response =
        await commentService.unlikeComment(commentId)

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Get Comment Likes
// ============================================================

export const getCommentLikes = createAsyncThunk(
  'comments/getCommentLikes',
  async ({ commentId, params }, { rejectWithValue }) => {
    try {
      const response =
        await commentService.getCommentLikes(
          commentId,
          params
        )

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Report Comment
// ============================================================

export const reportComment = createAsyncThunk(
  'comments/reportComment',
  async ({ commentId, reason }, { rejectWithValue }) => {
    try {
      const response =
        await commentService.reportComment(
          commentId,
          reason
        )

      return {
        commentId,
        data: response
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Comments Slice
// ============================================================

const commentSlice = createSlice({
  name: 'comments',

  initialState,

  reducers: {
    // ----------------------------------------------------------
    // Clear errors
    // ----------------------------------------------------------

    clearError: state => {
      state.error = null
    },

    clearCommentsError: state => {
      state.commentsError = null
    },

    clearRepliesError: state => {
      state.repliesError = null
    },

    clearCreateError: state => {
      state.createError = null
    },

    clearReplyError: state => {
      state.replyError = null
    },

    clearUpdateError: state => {
      state.updateError = null
    },

    clearDeleteError: state => {
      state.deleteError = null
    },

    clearLikeError: state => {
      state.likeError = null
    },

    clearLikesError: state => {
      state.likesError = null
    },

    clearReportError: state => {
      state.reportError = null
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
      state.commentsError = null
      state.repliesError = null
      state.createError = null
      state.replyError = null
      state.updateError = null
      state.deleteError = null
      state.likeError = null
      state.likesError = null
      state.reportError = null
      state.successMessage = null
    },

    // ----------------------------------------------------------
    // Select comment
    // ----------------------------------------------------------

    setSelectedComment: (state, action) => {
      state.selectedComment = action.payload
    },

    clearSelectedComment: state => {
      state.selectedComment = null
    },

    // ----------------------------------------------------------
    // Clear post comments
    // ----------------------------------------------------------

    clearPostComments: (state, action) => {
      const postId = action.payload

      delete state.commentsByPost[postId]
    },

    // ----------------------------------------------------------
    // Clear comment replies
    // ----------------------------------------------------------

    clearCommentReplies: (state, action) => {
      const commentId = action.payload

      delete state.repliesByComment[commentId]
    },

    // ----------------------------------------------------------
    // Reset state
    // ----------------------------------------------------------

    resetCommentState: () => {
      return initialState
    }
  },

  // ==========================================================
  // Extra Reducers
  // ==========================================================

  extraReducers: builder => {
    // ========================================================
    // GET COMMENTS
    // ========================================================

    builder

      .addCase(getComments.pending, state => {
        state.isCommentsLoading = true
        state.isLoading = true
        state.commentsError = null
        state.error = null
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.isCommentsLoading = false
        state.isLoading = false

        const { postId, data } = action.payload

        const comments =
          data?.comments ||
          data?.data?.comments ||
          data?.data ||
          []

        state.commentsByPost[postId] = comments
      })

      .addCase(getComments.rejected, (state, action) => {
        state.isCommentsLoading = false
        state.isLoading = false

        state.commentsError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET COMMENT BY ID
    // ========================================================

      .addCase(getCommentById.pending, state => {
        state.isLoading = true
        state.error = null
      })

      .addCase(getCommentById.fulfilled, (state, action) => {
        state.isLoading = false

        const data = action.payload

        state.selectedComment =
          data?.comment ||
          data?.data?.comment ||
          data?.data ||
          data ||
          null
      })

      .addCase(getCommentById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    // ========================================================
    // CREATE COMMENT
    // ========================================================

      .addCase(createComment.pending, state => {
        state.isCreating = true
        state.createError = null
        state.error = null
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.isCreating = false

        const { postId, data } = action.payload

        const newComment =
          data?.comment ||
          data?.data?.comment ||
          data?.data ||
          null

        if (newComment) {
          if (!state.commentsByPost[postId]) {
            state.commentsByPost[postId] = []
          }

          state.commentsByPost[postId].unshift(
            newComment
          )
        }

        state.successMessage =
          data?.message ||
          'Comment added successfully.'
      })

      .addCase(createComment.rejected, (state, action) => {
        state.isCreating = false

        state.createError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // CREATE REPLY
    // ========================================================

      .addCase(createReply.pending, state => {
        state.isCreatingReply = true
        state.replyError = null
        state.error = null
      })

      .addCase(createReply.fulfilled, (state, action) => {
        state.isCreatingReply = false

        const { commentId, data } = action.payload

        const newReply =
          data?.reply ||
          data?.data?.reply ||
          data?.data ||
          null

        if (newReply) {
          if (!state.repliesByComment[commentId]) {
            state.repliesByComment[commentId] = []
          }

          state.repliesByComment[commentId].push(
            newReply
          )

          // Update reply count if available
          Object.keys(state.commentsByPost).forEach(
            postId => {
              state.commentsByPost[postId] =
                state.commentsByPost[postId].map(
                  comment =>
                    comment.id === commentId
                      ? {
                          ...comment,
                          repliesCount:
                            (comment.repliesCount || 0) + 1
                        }
                      : comment
                )
            }
          )
        }

        state.successMessage =
          data?.message ||
          'Reply added successfully.'
      })

      .addCase(createReply.rejected, (state, action) => {
        state.isCreatingReply = false

        state.replyError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET REPLIES
    // ========================================================

      .addCase(getReplies.pending, state => {
        state.isRepliesLoading = true
        state.repliesError = null
        state.error = null
      })

      .addCase(getReplies.fulfilled, (state, action) => {
        state.isRepliesLoading = false

        const { commentId, data } = action.payload

        state.repliesByComment[commentId] =
          data?.replies ||
          data?.data?.replies ||
          data?.data ||
          []
      })

      .addCase(getReplies.rejected, (state, action) => {
        state.isRepliesLoading = false

        state.repliesError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UPDATE COMMENT
    // ========================================================

      .addCase(updateComment.pending, state => {
        state.isUpdating = true
        state.updateError = null
        state.error = null
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        state.isUpdating = false

        const { commentId, data } = action.payload

        const updatedComment =
          data?.comment ||
          data?.data?.comment ||
          data?.data ||
          null

        if (updatedComment) {
          Object.keys(state.commentsByPost).forEach(
            postId => {
              state.commentsByPost[postId] =
                state.commentsByPost[postId].map(
                  comment =>
                    comment.id === commentId
                      ? {
                          ...comment,
                          ...updatedComment
                        }
                      : comment
                )
            }
          )

          state.selectedComment = updatedComment
        }

        state.successMessage =
          data?.message ||
          'Comment updated successfully.'
      })

      .addCase(updateComment.rejected, (state, action) => {
        state.isUpdating = false

        state.updateError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // DELETE COMMENT
    // ========================================================

      .addCase(deleteComment.pending, state => {
        state.isDeleting = true
        state.deleteError = null
        state.error = null
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isDeleting = false

        const { commentId, data } = action.payload

        Object.keys(state.commentsByPost).forEach(
          postId => {
            state.commentsByPost[postId] =
              state.commentsByPost[postId].filter(
                comment => comment.id !== commentId
              )
          }
        )

        delete state.repliesByComment[commentId]

        if (state.selectedComment?.id === commentId) {
          state.selectedComment = null
        }

        state.successMessage =
          data?.message ||
          'Comment deleted successfully.'
      })

      .addCase(deleteComment.rejected, (state, action) => {
        state.isDeleting = false

        state.deleteError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // LIKE COMMENT
    // ========================================================

      .addCase(likeComment.pending, state => {
        state.isLiking = true
        state.likeError = null
        state.error = null
      })

      .addCase(likeComment.fulfilled, (state, action) => {
        state.isLiking = false

        const { commentId, data } = action.payload

        // Update all comments containing this comment
        Object.keys(state.commentsByPost).forEach(
          postId => {
            state.commentsByPost[postId] =
              state.commentsByPost[postId].map(
                comment =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        isLiked: true,
                        likesCount:
                          (comment.likesCount || 0) + 1
                      }
                    : comment
              )
          }
        )

        // Update selected comment
        if (state.selectedComment?.id === commentId) {
          state.selectedComment = {
            ...state.selectedComment,
            isLiked: true,
            likesCount:
              (state.selectedComment.likesCount || 0) + 1
          }
        }

        state.successMessage =
          data?.message ||
          'Comment liked successfully.'
      })

      .addCase(likeComment.rejected, (state, action) => {
        state.isLiking = false

        state.likeError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // UNLIKE COMMENT
    // ========================================================

      .addCase(unlikeComment.pending, state => {
        state.isLiking = true
        state.likeError = null
        state.error = null
      })

      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.isLiking = false

        const { commentId, data } = action.payload

        Object.keys(state.commentsByPost).forEach(
          postId => {
            state.commentsByPost[postId] =
              state.commentsByPost[postId].map(
                comment =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        isLiked: false,
                        likesCount: Math.max(
                          0,
                          (comment.likesCount || 0) - 1
                        )
                      }
                    : comment
              )
          }
        )

        if (state.selectedComment?.id === commentId) {
          state.selectedComment = {
            ...state.selectedComment,
            isLiked: false,
            likesCount: Math.max(
              0,
              (state.selectedComment.likesCount || 0) - 1
            )
          }
        }

        state.successMessage =
          data?.message ||
          'Comment unliked successfully.'
      })

      .addCase(unlikeComment.rejected, (state, action) => {
        state.isLiking = false

        state.likeError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // GET COMMENT LIKES
    // ========================================================

      .addCase(getCommentLikes.pending, state => {
        state.isLoadingLikes = true
        state.likesError = null
        state.error = null
      })

      .addCase(getCommentLikes.fulfilled, (state, action) => {
        state.isLoadingLikes = false

        const { commentId, data } = action.payload

        state.commentLikes[commentId] =
          data?.likes ||
          data?.data?.likes ||
          data?.data ||
          []
      })

      .addCase(getCommentLikes.rejected, (state, action) => {
        state.isLoadingLikes = false

        state.likesError = action.payload
        state.error = action.payload
      })

    // ========================================================
    // REPORT COMMENT
    // ========================================================

      .addCase(reportComment.pending, state => {
        state.isReporting = true
        state.reportError = null
        state.error = null
      })

      .addCase(reportComment.fulfilled, (state, action) => {
        state.isReporting = false

        const data = action.payload.data

        state.successMessage =
          data?.message ||
          'Comment reported successfully.'
      })

      .addCase(reportComment.rejected, (state, action) => {
        state.isReporting = false

        state.reportError = action.payload
        state.error = action.payload
      })
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearError,
  clearCommentsError,
  clearRepliesError,
  clearCreateError,
  clearReplyError,
  clearUpdateError,
  clearDeleteError,
  clearLikeError,
  clearLikesError,
  clearReportError,
  clearSuccessMessage,
  clearMessages,
  setSelectedComment,
  clearSelectedComment,
  clearPostComments,
  clearCommentReplies,
  resetCommentState
} = commentSlice.actions

// ============================================================
// Basic Selectors
// ============================================================

export const selectComments = state =>
  state.comments

export const selectCommentsByPost = (state, postId) =>
  state.comments.commentsByPost[postId] || []

export const selectRepliesByComment = (state, commentId) =>
  state.comments.repliesByComment[commentId] || []

export const selectSelectedComment = state =>
  state.comments.selectedComment

export const selectCommentLikes = (state, commentId) =>
  state.comments.commentLikes[commentId] || []

// ============================================================
// Loading Selectors
// ============================================================

export const selectCommentsLoading = state =>
  state.comments.isCommentsLoading

export const selectRepliesLoading = state =>
  state.comments.isRepliesLoading

export const selectCreatingComment = state =>
  state.comments.isCreating

export const selectCreatingReply = state =>
  state.comments.isCreatingReply

export const selectUpdatingComment = state =>
  state.comments.isUpdating

export const selectDeletingComment = state =>
  state.comments.isDeleting

export const selectLikingComment = state =>
  state.comments.isLiking

export const selectLoadingCommentLikes = state =>
  state.comments.isLoadingLikes

export const selectReportingComment = state =>
  state.comments.isReporting

// ============================================================
// Error Selectors
// ============================================================

export const selectCommentError = state =>
  state.comments.error

export const selectCommentsError = state =>
  state.comments.commentsError

export const selectRepliesError = state =>
  state.comments.repliesError

export const selectCreateCommentError = state =>
  state.comments.createError

export const selectReplyError = state =>
  state.comments.replyError

export const selectUpdateCommentError = state =>
  state.comments.updateError

export const selectDeleteCommentError = state =>
  state.comments.deleteError

export const selectLikeCommentError = state =>
  state.comments.likeError

export const selectCommentLikesError = state =>
  state.comments.likesError

export const selectReportCommentError = state =>
  state.comments.reportError

// ============================================================
// Message Selector
// ============================================================

export const selectCommentSuccess = state =>
  state.comments.successMessage

// ============================================================
// Export Reducer
// ============================================================

export default commentSlice.reducer

