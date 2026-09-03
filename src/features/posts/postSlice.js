// src/features/posts/postsSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postService from '../../services/postService'

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

const getResponseData = response => {
  return response?.data ?? response
}

const extractList = (response, keys = []) => {
  const data = getResponseData(response)

  if (Array.isArray(data)) {
    return data
  }

  for (const key of keys) {
    if (Array.isArray(data?.[key])) {
      return data[key]
    }
  }

  if (Array.isArray(data?.data)) {
    return data.data
  }

  if (Array.isArray(data?.data?.items)) {
    return data.data.items
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  return []
}

const extractPost = response => {
  const data = getResponseData(response)

  return (
    data?.post ||
    data?.data?.post ||
    data?.data ||
    data?.item ||
    data ||
    null
  )
}

const getPostId = post => {
  return post?.id || post?._id
}

const updatePostInList = (posts, postId, updater) => {
  return posts.map(post => {
    const id = getPostId(post)

    if (id === postId) {
      return updater(post)
    }

    return post
  })
}

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // Main post collections
  posts: [],
  feedPosts: [],
  userPosts: [],
  savedPosts: [],
  trendingPosts: [],
  searchResults: [],
  hashtagPosts: [],

  // Single post
  selectedPost: null,

  // Pagination
  pagination: {
    posts: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    feed: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    userPosts: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    savedPosts: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    trending: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    search: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    hashtag: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
      hasMore: false
    }
  },

  // Loading states
  isLoading: false,
  isFeedLoading: false,
  isPostLoading: false,
  isUserPostsLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isLikeLoading: false,
  isShareLoading: false,
  isSaveLoading: false,
  isSavedPostsLoading: false,
  isTrendingLoading: false,
  isSearching: false,
  isHashtagLoading: false,
  isReporting: false,
  isHiding: false,

  // Operation-specific loading map
  loadingByPostId: {},

  // Errors
  error: null,
  feedError: null,
  postError: null,
  userPostsError: null,
  createError: null,
  updateError: null,
  deleteError: null,
  likeError: null,
  shareError: null,
  saveError: null,
  savedPostsError: null,
  trendingError: null,
  searchError: null,
  hashtagError: null,
  reportError: null,
  hideError: null,

  // UI messages
  successMessage: null
}

// ============================================================
// Async Thunks
// ============================================================

// ------------------------------------------------------------
// Get Feed Posts
// ------------------------------------------------------------

export const getFeedPosts = createAsyncThunk(
  'posts/getFeedPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await postService.getFeedPosts(params)

      return {
        posts: extractList(response, ['posts', 'feedPosts']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get All Posts
// ------------------------------------------------------------

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await postService.getPosts(params)

      return {
        posts: extractList(response, ['posts']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Single Post
// ------------------------------------------------------------

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.getPostById(postId)

      return extractPost(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get User Posts
// ------------------------------------------------------------

export const getUserPosts = createAsyncThunk(
  'posts/getUserPosts',
  async ({ userId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await postService.getUserPosts(userId, params)

      return {
        posts: extractList(response, ['posts', 'userPosts']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Create Post
// ------------------------------------------------------------

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(postData)

      return extractPost(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Create Post With Media
// ------------------------------------------------------------

export const createPostWithMedia = createAsyncThunk(
  'posts/createPostWithMedia',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postService.createPostWithMedia(formData)

      return extractPost(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Update Post
// ------------------------------------------------------------

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await postService.updatePost(postId, postData)

      return extractPost(response)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Delete Post
// ------------------------------------------------------------

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.deletePost(postId)

      return {
        postId,
        response: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Like Post
// ------------------------------------------------------------

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.likePost(postId)

      return {
        postId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue({
        postId,
        message: getErrorMessage(error)
      })
    }
  }
)

// ------------------------------------------------------------
// Unlike Post
// ------------------------------------------------------------

export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.unlikePost(postId)

      return {
        postId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue({
        postId,
        message: getErrorMessage(error)
      })
    }
  }
)

// ------------------------------------------------------------
// Get Post Likes
// ------------------------------------------------------------

export const getPostLikes = createAsyncThunk(
  'posts/getPostLikes',
  async ({ postId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await postService.getPostLikes(postId, params)

      return {
        postId,
        likes: extractList(response, ['likes', 'users']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Share Post
// ------------------------------------------------------------

export const sharePost = createAsyncThunk(
  'posts/sharePost',
  async ({ postId, data = {} }, { rejectWithValue }) => {
    try {
      const response = await postService.sharePost(postId, data)

      return {
        postId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Save Post
// ------------------------------------------------------------

export const savePost = createAsyncThunk(
  'posts/savePost',
  async postId => {
     const response = await postService.savePost(postId)
      return {
        postId,
        data: getResponseData(response)
      }
  }
)

// ------------------------------------------------------------
// Unsave Post
// ------------------------------------------------------------

export const unsavePost = createAsyncThunk(
  'posts/unsavePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.unsavePost(postId)

      return {
        postId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Saved Posts
// ------------------------------------------------------------

export const getSavedPosts = createAsyncThunk(
  'posts/getSavedPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await postService.getSavedPosts(params)

      return {
        posts: extractList(response, ['posts', 'savedPosts']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Trending Posts
// ------------------------------------------------------------

export const getTrendingPosts = createAsyncThunk(
  'posts/getTrendingPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await postService.getTrendingPosts(params)

      return {
        posts: extractList(response, ['posts', 'trendingPosts']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Search Posts
// ------------------------------------------------------------

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async ({ query, params = {} }, { rejectWithValue }) => {
    try {
      const response = await postService.searchPosts(query, params)

      return {
        posts: extractList(response, ['posts', 'results']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Posts By Hashtag
// ------------------------------------------------------------

export const getPostsByHashtag = createAsyncThunk(
  'posts/getPostsByHashtag',
  async ({ hashtag, params = {} }, { rejectWithValue }) => {
    try {
      const response = await postService.getPostsByHashtag(
        hashtag,
        params
      )

      return {
        hashtag,
        posts: extractList(response, ['posts', 'hashtagPosts']),
        pagination:
          getResponseData(response)?.pagination ||
          getResponseData(response)?.data?.pagination ||
          null
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Report Post
// ------------------------------------------------------------

export const reportPost = createAsyncThunk(
  'posts/reportPost',
  async ({ postId, reason }, { rejectWithValue }) => {
    try {
      const response = await postService.reportPost(postId, reason)

      return {
        postId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Hide Post
// ------------------------------------------------------------

export const hidePost = createAsyncThunk(
  'posts/hidePost',
  async postId => {
      const response = await postService.hidePost(postId)
      return {
        postId,
        data: getResponseData(response)
      }
  }
)

// ------------------------------------------------------------
// Unhide Post
// ------------------------------------------------------------

export const unhidePost = createAsyncThunk(
  'posts/unhidePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await postService.unhidePost(postId)

      return {
        postId,
        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// Slice
// ============================================================

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    // --------------------------------------------------------
    // Clear Errors
    // --------------------------------------------------------

    clearError: state => {
      state.error = null
    },

    clearFeedError: state => {
      state.feedError = null
    },

    clearPostError: state => {
      state.postError = null
    },

    clearCreateError: state => {
      state.createError = null
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

    clearShareError: state => {
      state.shareError = null
    },

    clearSaveError: state => {
      state.saveError = null
    },

    clearSearchError: state => {
      state.searchError = null
    },

    clearHashtagError: state => {
      state.hashtagError = null
    },

    clearReportError: state => {
      state.reportError = null
    },

    clearHideError: state => {
      state.hideError = null
    },

    clearAllErrors: state => {
      state.error = null
      state.feedError = null
      state.postError = null
      state.userPostsError = null
      state.createError = null
      state.updateError = null
      state.deleteError = null
      state.likeError = null
      state.shareError = null
      state.saveError = null
      state.savedPostsError = null
      state.trendingError = null
      state.searchError = null
      state.hashtagError = null
      state.reportError = null
      state.hideError = null
    },

    // --------------------------------------------------------
    // Success Message
    // --------------------------------------------------------

    clearSuccessMessage: state => {
      state.successMessage = null
    },

    // --------------------------------------------------------
    // Selected Post
    // --------------------------------------------------------

    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload
    },

    clearSelectedPost: state => {
      state.selectedPost = null
    },

    // --------------------------------------------------------
    // Clear Lists
    // --------------------------------------------------------

    clearPosts: state => {
      state.posts = []
    },

    clearFeedPosts: state => {
      state.feedPosts = []
    },

    clearUserPosts: state => {
      state.userPosts = []
    },

    clearSavedPosts: state => {
      state.savedPosts = []
    },

    clearTrendingPosts: state => {
      state.trendingPosts = []
    },

    clearSearchResults: state => {
      state.searchResults = []
    },

    clearHashtagPosts: state => {
      state.hashtagPosts = []
    },

    // --------------------------------------------------------
    // Optimistic Like
    // --------------------------------------------------------

    toggleLikeOptimistic: (state, action) => {
      const { postId, isLiked } = action.payload

      const updateLike = post => {
        if (getPostId(post) !== postId) {
          return post
        }

        const currentLikes = post.likesCount ?? post.likeCount ?? 0

        return {
          ...post,
          isLiked,
          likesCount: isLiked
            ? currentLikes + 1
            : Math.max(0, currentLikes - 1)
        }
      }

      state.posts = state.posts.map(updateLike)
      state.feedPosts = state.feedPosts.map(updateLike)
      state.userPosts = state.userPosts.map(updateLike)
      state.savedPosts = state.savedPosts.map(updateLike)
      state.trendingPosts = state.trendingPosts.map(updateLike)
      state.searchResults = state.searchResults.map(updateLike)
      state.hashtagPosts = state.hashtagPosts.map(updateLike)

      if (state.selectedPost) {
        state.selectedPost = updateLike(state.selectedPost)
      }
    },

    // --------------------------------------------------------
    // Optimistic Save
    // --------------------------------------------------------

    toggleSaveOptimistic: (state, action) => {
      const { postId, isSaved } = action.payload

      const updateSave = post => {
        if (getPostId(post) !== postId) {
          return post
        }

        return {
          ...post,
          isSaved,
          saved: isSaved,
          isBookmarked: isSaved
        }
      }

      state.posts = state.posts.map(updateSave)
      state.feedPosts = state.feedPosts.map(updateSave)
      state.userPosts = state.userPosts.map(updateSave)
      state.savedPosts = state.savedPosts.map(updateSave)
      state.trendingPosts = state.trendingPosts.map(updateSave)
      state.searchResults = state.searchResults.map(updateSave)
      state.hashtagPosts = state.hashtagPosts.map(updateSave)

      if (state.selectedPost) {
        state.selectedPost = updateSave(state.selectedPost)
      }
    },

    // --------------------------------------------------------
    // Reset State
    // --------------------------------------------------------

    resetPostsState: () => initialState
  },

  // ==========================================================
  // Extra Reducers
  // ==========================================================

  extraReducers: builder => {
    builder

      // ======================================================
      // GET FEED POSTS
      // ======================================================

      .addCase(getFeedPosts.pending, state => {
        state.isFeedLoading = true
        state.feedError = null
      })

      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.isFeedLoading = false

        const { posts, pagination } = action.payload

        state.feedPosts = posts

        if (pagination) {
          state.pagination.feed = {
            ...state.pagination.feed,
            ...pagination
          }
        }
      })

      .addCase(getFeedPosts.rejected, (state, action) => {
        state.isFeedLoading = false
        state.feedError = action.payload || 'Failed to load feed posts.'
      })

      // ======================================================
      // GET POSTS
      // ======================================================

      .addCase(getPosts.pending, state => {
        state.isLoading = true
        state.error = null
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false

        const { posts, pagination } = action.payload

        state.posts = posts

        if (pagination) {
          state.pagination.posts = {
            ...state.pagination.posts,
            ...pagination
          }
        }
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to load posts.'
      })

      // ======================================================
      // GET SINGLE POST
      // ======================================================

      .addCase(getPostById.pending, state => {
        state.isPostLoading = true
        state.postError = null
      })

      .addCase(getPostById.fulfilled, (state, action) => {
        state.isPostLoading = false
        state.selectedPost = action.payload
      })

      .addCase(getPostById.rejected, (state, action) => {
        state.isPostLoading = false
        state.postError = action.payload || 'Failed to load post.'
      })

      // ======================================================
      // GET USER POSTS
      // ======================================================

      .addCase(getUserPosts.pending, state => {
        state.isUserPostsLoading = true
        state.userPostsError = null
      })

      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isUserPostsLoading = false

        const { posts, pagination } = action.payload

        state.userPosts = posts

        if (pagination) {
          state.pagination.userPosts = {
            ...state.pagination.userPosts,
            ...pagination
          }
        }
      })

      .addCase(getUserPosts.rejected, (state, action) => {
        state.isUserPostsLoading = false
        state.userPostsError =
          action.payload || 'Failed to load user posts.'
      })

      // ======================================================
      // CREATE POST
      // ======================================================

      .addCase(createPost.pending, state => {
        state.isCreating = true
        state.createError = null
        state.successMessage = null
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.isCreating = false

        const post = action.payload

        if (post) {
          state.posts.unshift(post)
          state.feedPosts.unshift(post)
          state.userPosts.unshift(post)
        }

        state.successMessage = 'Post created successfully.'
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isCreating = false
        state.createError =
          action.payload || 'Failed to create post.'
      })

      // ======================================================
      // CREATE POST WITH MEDIA
      // ======================================================

      .addCase(createPostWithMedia.pending, state => {
        state.isCreating = true
        state.createError = null
        state.successMessage = null
      })

      .addCase(createPostWithMedia.fulfilled, (state, action) => {
        state.isCreating = false

        const post = action.payload

        if (post) {
          state.posts.unshift(post)
          state.feedPosts.unshift(post)
          state.userPosts.unshift(post)
        }

        state.successMessage = 'Post with media created successfully.'
      })

      .addCase(createPostWithMedia.rejected, (state, action) => {
        state.isCreating = false
        state.createError =
          action.payload || 'Failed to create post with media.'
      })

      // ======================================================
      // UPDATE POST
      // ======================================================

      .addCase(updatePost.pending, state => {
        state.isUpdating = true
        state.updateError = null
        state.successMessage = null
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.isUpdating = false

        const updatedPost = action.payload
        const postId = getPostId(updatedPost)

        if (!postId) {
          state.successMessage = 'Post updated successfully.'
          return
        }

        const update = post => {
          return getPostId(post) === postId
            ? { ...post, ...updatedPost }
            : post
        }

        state.posts = state.posts.map(update)
        state.feedPosts = state.feedPosts.map(update)
        state.userPosts = state.userPosts.map(update)
        state.savedPosts = state.savedPosts.map(update)
        state.trendingPosts = state.trendingPosts.map(update)
        state.searchResults = state.searchResults.map(update)
        state.hashtagPosts = state.hashtagPosts.map(update)

        if (state.selectedPost) {
          state.selectedPost =
            getPostId(state.selectedPost) === postId
              ? { ...state.selectedPost, ...updatedPost }
              : state.selectedPost
        }

        state.successMessage = 'Post updated successfully.'
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.isUpdating = false
        state.updateError =
          action.payload || 'Failed to update post.'
      })

      // ======================================================
      // DELETE POST
      // ======================================================

      .addCase(deletePost.pending, state => {
        state.isDeleting = true
        state.deleteError = null
        state.successMessage = null
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.isDeleting = false

        const { postId } = action.payload

        const removePost = post =>
          getPostId(post) !== postId

        state.posts = state.posts.filter(removePost)
        state.feedPosts = state.feedPosts.filter(removePost)
        state.userPosts = state.userPosts.filter(removePost)
        state.savedPosts = state.savedPosts.filter(removePost)
        state.trendingPosts = state.trendingPosts.filter(removePost)
        state.searchResults = state.searchResults.filter(removePost)
        state.hashtagPosts = state.hashtagPosts.filter(removePost)

        if (getPostId(state.selectedPost) === postId) {
          state.selectedPost = null
        }

        state.successMessage = 'Post deleted successfully.'
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.isDeleting = false
        state.deleteError =
          action.payload || 'Failed to delete post.'
      })

      // ======================================================
      // LIKE POST
      // ======================================================

      .addCase(likePost.pending, (state, action) => {
        state.isLikeLoading = true
        state.likeError = null

        state.loadingByPostId[action.meta.arg] = true
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.isLikeLoading = false

        const { postId, data } = action.payload

        state.loadingByPostId[postId] = false

        const updateLike = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          const currentLikes =
            post.likesCount ?? post.likeCount ?? 0

          return {
            ...post,
            isLiked: true,
            liked: true,
            likesCount:
              data?.likesCount ??
              data?.likeCount ??
              currentLikes + 1
          }
        }

        state.posts = state.posts.map(updateLike)
        state.feedPosts = state.feedPosts.map(updateLike)
        state.userPosts = state.userPosts.map(updateLike)
        state.savedPosts = state.savedPosts.map(updateLike)
        state.trendingPosts = state.trendingPosts.map(updateLike)
        state.searchResults = state.searchResults.map(updateLike)
        state.hashtagPosts = state.hashtagPosts.map(updateLike)

        if (state.selectedPost) {
          state.selectedPost = updateLike(state.selectedPost)
        }
      })

      .addCase(likePost.rejected, (state, action) => {
        state.isLikeLoading = false

        const postId = action.meta.arg

        state.loadingByPostId[postId] = false

        state.likeError =
          action.payload?.message ||
          action.payload ||
          'Failed to like post.'
      })

      // ======================================================
      // UNLIKE POST
      // ======================================================

      .addCase(unlikePost.pending, (state, action) => {
        state.isLikeLoading = true
        state.likeError = null

        state.loadingByPostId[action.meta.arg] = true
      })

      .addCase(unlikePost.fulfilled, (state, action) => {
        state.isLikeLoading = false

        const { postId, data } = action.payload

        state.loadingByPostId[postId] = false

        const updateLike = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          const currentLikes =
            post.likesCount ?? post.likeCount ?? 0

          return {
            ...post,
            isLiked: false,
            liked: false,
            likesCount:
              data?.likesCount ??
              data?.likeCount ??
              Math.max(0, currentLikes - 1)
          }
        }

        state.posts = state.posts.map(updateLike)
        state.feedPosts = state.feedPosts.map(updateLike)
        state.userPosts = state.userPosts.map(updateLike)
        state.savedPosts = state.savedPosts.map(updateLike)
        state.trendingPosts = state.trendingPosts.map(updateLike)
        state.searchResults = state.searchResults.map(updateLike)
        state.hashtagPosts = state.hashtagPosts.map(updateLike)

        if (state.selectedPost) {
          state.selectedPost = updateLike(state.selectedPost)
        }
      })

      .addCase(unlikePost.rejected, (state, action) => {
        state.isLikeLoading = false

        const postId = action.meta.arg

        state.loadingByPostId[postId] = false

        state.likeError =
          action.payload?.message ||
          action.payload ||
          'Failed to unlike post.'
      })

      // ======================================================
      // GET POST LIKES
      // ======================================================

      .addCase(getPostLikes.pending, state => {
        state.isLoading = true
        state.likeError = null
      })

      .addCase(getPostLikes.fulfilled, (state, action) => {
        state.isLoading = false

        const { postId, likes, pagination } = action.payload

        const post = state.posts.find(
          item => getPostId(item) === postId
        )

        if (post) {
          post.likes = likes
        }

        if (pagination) {
          state.pagination.likes = pagination
        }
      })

      .addCase(getPostLikes.rejected, (state, action) => {
        state.isLoading = false
        state.likeError =
          action.payload || 'Failed to load post likes.'
      })

      // ======================================================
      // SHARE POST
      // ======================================================

      .addCase(sharePost.pending, state => {
        state.isShareLoading = true
        state.shareError = null
      })

      .addCase(sharePost.fulfilled, (state, action) => {
        state.isShareLoading = false

        const { postId, data } = action.payload

        const updateShare = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          const currentShares =
            post.sharesCount ?? post.shareCount ?? 0

          return {
            ...post,
            sharesCount:
              data?.sharesCount ??
              data?.shareCount ??
              currentShares + 1
          }
        }

        state.posts = state.posts.map(updateShare)
        state.feedPosts = state.feedPosts.map(updateShare)
        state.userPosts = state.userPosts.map(updateShare)
        state.trendingPosts = state.trendingPosts.map(updateShare)

        if (state.selectedPost) {
          state.selectedPost = updateShare(state.selectedPost)
        }

        state.successMessage = 'Post shared successfully.'
      })

      .addCase(sharePost.rejected, (state, action) => {
        state.isShareLoading = false
        state.shareError =
          action.payload || 'Failed to share post.'
      })

      // ======================================================
      // SAVE POST
      // ======================================================

      .addCase(savePost.pending, state => {
        state.isSaveLoading = true
        state.saveError = null
      })

      .addCase(savePost.fulfilled, (state, action) => {
        state.isSaveLoading = false

        const { postId, data } = action.payload

        const updateSave = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          return {
            ...post,
            isSaved: true,
            saved: true,
            isBookmarked: true
          }
        }

        state.posts = state.posts.map(updateSave)
        state.feedPosts = state.feedPosts.map(updateSave)
        state.userPosts = state.userPosts.map(updateSave)
        state.trendingPosts = state.trendingPosts.map(updateSave)
        state.searchResults = state.searchResults.map(updateSave)
        state.hashtagPosts = state.hashtagPosts.map(updateSave)

        if (state.selectedPost) {
          state.selectedPost = updateSave(state.selectedPost)
        }

        // Only add returned saved post if API provides one.
        const savedPost = data?.post || data?.data?.post

        if (
          savedPost &&
          !state.savedPosts.some(
            post => getPostId(post) === getPostId(savedPost)
          )
        ) {
          state.savedPosts.unshift(savedPost)
        }

        state.successMessage = 'Post saved successfully.'
      })

      .addCase(savePost.rejected, (state, action) => {
        state.isSaveLoading = false
        state.saveError =
          action.payload || 'Failed to save post.'
      })

      // ======================================================
      // UNSAVE POST
      // ======================================================

      .addCase(unsavePost.pending, state => {
        state.isSaveLoading = true
        state.saveError = null
      })

      .addCase(unsavePost.fulfilled, (state, action) => {
        state.isSaveLoading = false

        const { postId } = action.payload

        const updateSave = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          return {
            ...post,
            isSaved: false,
            saved: false,
            isBookmarked: false
          }
        }

        state.posts = state.posts.map(updateSave)
        state.feedPosts = state.feedPosts.map(updateSave)
        state.userPosts = state.userPosts.map(updateSave)
        state.trendingPosts = state.trendingPosts.map(updateSave)
        state.searchResults = state.searchResults.map(updateSave)
        state.hashtagPosts = state.hashtagPosts.map(updateSave)

        state.savedPosts = state.savedPosts.filter(
          post => getPostId(post) !== postId
        )

        if (state.selectedPost) {
          state.selectedPost = updateSave(state.selectedPost)
        }

        state.successMessage = 'Post removed from saved posts.'
      })

      .addCase(unsavePost.rejected, (state, action) => {
        state.isSaveLoading = false
        state.saveError =
          action.payload || 'Failed to unsave post.'
      })

      // ======================================================
      // GET SAVED POSTS
      // ======================================================

      .addCase(getSavedPosts.pending, state => {
        state.isSavedPostsLoading = true
        state.savedPostsError = null
      })

      .addCase(getSavedPosts.fulfilled, (state, action) => {
        state.isSavedPostsLoading = false

        const { posts, pagination } = action.payload

        state.savedPosts = posts

        if (pagination) {
          state.pagination.savedPosts = {
            ...state.pagination.savedPosts,
            ...pagination
          }
        }
      })

      .addCase(getSavedPosts.rejected, (state, action) => {
        state.isSavedPostsLoading = false
        state.savedPostsError =
          action.payload || 'Failed to load saved posts.'
      })

      // ======================================================
      // GET TRENDING POSTS
      // ======================================================

      .addCase(getTrendingPosts.pending, state => {
        state.isTrendingLoading = true
        state.trendingError = null
      })

      .addCase(getTrendingPosts.fulfilled, (state, action) => {
        state.isTrendingLoading = false

        const { posts, pagination } = action.payload

        state.trendingPosts = posts

        if (pagination) {
          state.pagination.trending = {
            ...state.pagination.trending,
            ...pagination
          }
        }
      })

      .addCase(getTrendingPosts.rejected, (state, action) => {
        state.isTrendingLoading = false
        state.trendingError =
          action.payload || 'Failed to load trending posts.'
      })

      // ======================================================
      // SEARCH POSTS
      // ======================================================

      .addCase(searchPosts.pending, state => {
        state.isSearching = true
        state.searchError = null
      })

      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isSearching = false

        const { posts, pagination } = action.payload

        state.searchResults = posts

        if (pagination) {
          state.pagination.search = {
            ...state.pagination.search,
            ...pagination
          }
        }
      })

      .addCase(searchPosts.rejected, (state, action) => {
        state.isSearching = false
        state.searchError =
          action.payload || 'Failed to search posts.'
      })

      // ======================================================
      // HASHTAG POSTS
      // ======================================================

      .addCase(getPostsByHashtag.pending, state => {
        state.isHashtagLoading = true
        state.hashtagError = null
      })

      .addCase(getPostsByHashtag.fulfilled, (state, action) => {
        state.isHashtagLoading = false

        const { posts, pagination } = action.payload

        state.hashtagPosts = posts

        if (pagination) {
          state.pagination.hashtag = {
            ...state.pagination.hashtag,
            ...pagination
          }
        }
      })

      .addCase(getPostsByHashtag.rejected, (state, action) => {
        state.isHashtagLoading = false
        state.hashtagError =
          action.payload || 'Failed to load hashtag posts.'
      })

      // ======================================================
      // REPORT POST
      // ======================================================

      .addCase(reportPost.pending, state => {
        state.isReporting = true
        state.reportError = null
      })

      .addCase(reportPost.fulfilled, state => {
        state.isReporting = false
        state.successMessage =
          'Post reported successfully.'
      })

      .addCase(reportPost.rejected, (state, action) => {
        state.isReporting = false
        state.reportError =
          action.payload || 'Failed to report post.'
      })

      // ======================================================
      // HIDE POST
      // ======================================================

      .addCase(hidePost.pending, state => {
        state.isHiding = true
        state.hideError = null
      })

      .addCase(hidePost.fulfilled, (state, action) => {
        state.isHiding = false

        const { postId } = action.payload

        const markHidden = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          return {
            ...post,
            isHidden: true,
            hidden: true
          }
        }

        state.posts = state.posts.map(markHidden)
        state.feedPosts = state.feedPosts.map(markHidden)
        state.userPosts = state.userPosts.map(markHidden)
        state.trendingPosts = state.trendingPosts.map(markHidden)

        if (state.selectedPost) {
          state.selectedPost = markHidden(state.selectedPost)
        }

        state.successMessage = 'Post hidden successfully.'
      })

      .addCase(hidePost.rejected, (state, action) => {
        state.isHiding = false
        state.hideError =
          action.payload || 'Failed to hide post.'
      })

      // ======================================================
      // UNHIDE POST
      // ======================================================

      .addCase(unhidePost.pending, state => {
        state.isHiding = true
        state.hideError = null
      })

      .addCase(unhidePost.fulfilled, (state, action) => {
        state.isHiding = false

        const { postId } = action.payload

        const markVisible = post => {
          if (getPostId(post) !== postId) {
            return post
          }

          return {
            ...post,
            isHidden: false,
            hidden: false
          }
        }

        state.posts = state.posts.map(markVisible)
        state.feedPosts = state.feedPosts.map(markVisible)
        state.userPosts = state.userPosts.map(markVisible)
        state.trendingPosts = state.trendingPosts.map(markVisible)

        if (state.selectedPost) {
          state.selectedPost = markVisible(state.selectedPost)
        }

        state.successMessage = 'Post restored successfully.'
      })

      .addCase(unhidePost.rejected, (state, action) => {
        state.isHiding = false
        state.hideError =
          action.payload || 'Failed to restore post.'
      })
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearError,
  clearFeedError,
  clearPostError,
  clearCreateError,
  clearUpdateError,
  clearDeleteError,
  clearLikeError,
  clearShareError,
  clearSaveError,
  clearSearchError,
  clearHashtagError,
  clearReportError,
  clearHideError,
  clearAllErrors,
  clearSuccessMessage,
  setSelectedPost,
  clearSelectedPost,
  clearPosts,
  clearFeedPosts,
  clearUserPosts,
  clearSavedPosts,
  clearTrendingPosts,
  clearSearchResults,
  clearHashtagPosts,
  toggleLikeOptimistic,
  toggleSaveOptimistic,
  resetPostsState
} = postsSlice.actions

// ============================================================
// Selectors
// ============================================================

// Main lists
export const selectPosts = state => state.posts?.posts || []

export const selectFeedPosts = state =>
  state.posts?.feedPosts || []

export const selectUserPosts = state =>
  state.posts?.userPosts || []

export const selectSavedPosts = state =>
  state.posts?.savedPosts || []

export const selectTrendingPosts = state =>
  state.posts?.trendingPosts || []

export const selectSearchResults = state =>
  state.posts?.searchResults || []

export const selectHashtagPosts = state =>
  state.posts?.hashtagPosts || []

// Single post
export const selectSelectedPost = state =>
  state.posts?.selectedPost || null

// Loading
export const selectPostsLoading = state =>
  Boolean(state.posts?.isLoading)

export const selectFeedPostsLoading = state =>
  Boolean(state.posts?.isFeedLoading)

export const selectPostLoading = state =>
  Boolean(state.posts?.isPostLoading)

export const selectUserPostsLoading = state =>
  Boolean(state.posts?.isUserPostsLoading)

export const selectCreatePostLoading = state =>
  Boolean(state.posts?.isCreating)

export const selectUpdatePostLoading = state =>
  Boolean(state.posts?.isUpdating)

export const selectDeletePostLoading = state =>
  Boolean(state.posts?.isDeleting)

export const selectLikePostLoading = state =>
  Boolean(state.posts?.isLikeLoading)

export const selectSharePostLoading = state =>
  Boolean(state.posts?.isShareLoading)

export const selectSavePostLoading = state =>
  Boolean(state.posts?.isSaveLoading)

export const selectSavedPostsLoading = state =>
  Boolean(state.posts?.isSavedPostsLoading)

export const selectTrendingPostsLoading = state =>
  Boolean(state.posts?.isTrendingLoading)

export const selectSearchPostsLoading = state =>
  Boolean(state.posts?.isSearching)

export const selectHashtagPostsLoading = state =>
  Boolean(state.posts?.isHashtagLoading)

export const selectReportPostLoading = state =>
  Boolean(state.posts?.isReporting)

export const selectHidePostLoading = state =>
  Boolean(state.posts?.isHiding)

// Per-post loading
export const selectPostActionLoading = (state, postId) =>
  Boolean(state.posts?.loadingByPostId?.[postId])

// Errors
export const selectPostsError = state =>
  state.posts?.error || null

export const selectFeedError = state =>
  state.posts?.feedError || null

export const selectPostError = state =>
  state.posts?.postError || null

export const selectUserPostsError = state =>
  state.posts?.userPostsError || null

export const selectCreatePostError = state =>
  state.posts?.createError || null

export const selectUpdatePostError = state =>
  state.posts?.updateError || null

export const selectDeletePostError = state =>
  state.posts?.deleteError || null

export const selectLikePostError = state =>
  state.posts?.likeError || null

export const selectSharePostError = state =>
  state.posts?.shareError || null

export const selectSavePostError = state =>
  state.posts?.saveError || null

export const selectSavedPostsError = state =>
  state.posts?.savedPostsError || null

export const selectTrendingPostsError = state =>
  state.posts?.trendingError || null

export const selectSearchPostsError = state =>
  state.posts?.searchError || null

export const selectHashtagPostsError = state =>
  state.posts?.hashtagError || null

export const selectReportPostError = state =>
  state.posts?.reportError || null

export const selectHidePostError = state =>
  state.posts?.hideError || null

// Success
export const selectPostSuccess = state =>
  state.posts?.successMessage || null

// Pagination
export const selectPostsPagination = state =>
  state.posts?.pagination?.posts

export const selectFeedPagination = state =>
  state.posts?.pagination?.feed

export const selectUserPostsPagination = state =>
  state.posts?.pagination?.userPosts

export const selectSavedPostsPagination = state =>
  state.posts?.pagination?.savedPosts

export const selectTrendingPagination = state =>
  state.posts?.pagination?.trending

export const selectSearchPagination = state =>
  state.posts?.pagination?.search

export const selectHashtagPagination = state =>
  state.posts?.pagination?.hashtag

// ============================================================
// Default Export
// ============================================================

export default postsSlice.reducer

