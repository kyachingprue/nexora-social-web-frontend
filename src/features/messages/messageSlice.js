// src/features/messages/messagesSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import messageService from '../../services/messageService.js'

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
  return item?.id || item?._id
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

  if (Array.isArray(data?.items)) {
    return data.items
  }

  if (Array.isArray(data?.data?.items)) {
    return data.data.items
  }

  return []
}

const extractItem = (response, keys = []) => {
  const data = getResponseData(response)

  for (const key of keys) {
    if (data?.[key]) {
      return data[key]
    }

    if (data?.data?.[key]) {
      return data.data[key]
    }
  }

  return data?.data || data?.item || data || null
}

const getPagination = response => {
  const data = getResponseData(response)

  return (
    data?.pagination ||
    data?.data?.pagination ||
    null
  )
}

// ============================================================
// Initial State
// ============================================================

const initialState = {
  // ----------------------------------------------------------
  // Conversations
  // ----------------------------------------------------------

  conversations: [],

  selectedConversation: null,

  conversationById: {},

  // ----------------------------------------------------------
  // Messages
  // ----------------------------------------------------------

  messagesByConversation: {},

  selectedMessage: null,

  // ----------------------------------------------------------
  // UI / Chat State
  // ----------------------------------------------------------

  activeConversationId: null,

  replyingTo: null,

  editingMessage: null,

  // ----------------------------------------------------------
  // Typing Users
  // ----------------------------------------------------------

  typingUsers: {},

  // Example:
  // {
  //   conversationId: ["userId1", "userId2"]
  // }

  // ----------------------------------------------------------
  // Online Users
  // ----------------------------------------------------------

  onlineUsers: {},

  // ----------------------------------------------------------
  // Pagination
  // ----------------------------------------------------------

  pagination: {
    conversations: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
      hasMore: false
    },

    messages: {}
  },

  // ----------------------------------------------------------
  // Loading
  // ----------------------------------------------------------

  isLoading: false,

  isConversationsLoading: false,

  isMessagesLoading: false,

  isConversationLoading: false,

  isSending: false,

  isUpdating: false,

  isDeleting: false,

  isMarkingRead: false,

  isReactionLoading: false,

  isSearching: false,

  isCreatingConversation: false,

  // Per message loading
  loadingByMessageId: {},

  // Per conversation loading
  loadingByConversationId: {},

  // ----------------------------------------------------------
  // Errors
  // ----------------------------------------------------------

  error: null,

  conversationsError: null,

  messagesError: null,

  conversationError: null,

  sendError: null,

  updateError: null,

  deleteError: null,

  readError: null,

  reactionError: null,

  searchError: null,

  createConversationError: null,

  // ----------------------------------------------------------
  // Success
  // ----------------------------------------------------------

  successMessage: null
}

// ============================================================
// Async Thunks
// ============================================================

// ============================================================
// CONVERSATIONS
// ============================================================

// ------------------------------------------------------------
// Get Conversations
// ------------------------------------------------------------

export const getConversations = createAsyncThunk(
  'messages/getConversations',

  async (params = {}, { rejectWithValue }) => {
    try {
      const response =
        await messageService.getConversations(params)

      return {
        conversations: extractList(response, [
          'conversations'
        ]),

        pagination: getPagination(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Conversation By ID
// ------------------------------------------------------------

export const getConversationById = createAsyncThunk(
  'messages/getConversationById',

  async (conversationId, { rejectWithValue }) => {
    try {
      const response =
        await messageService.getConversationById(
          conversationId
        )

      return extractItem(response, [
        'conversation'
      ])
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Create Conversation
// ------------------------------------------------------------

export const createConversation = createAsyncThunk(
  'messages/createConversation',

  async (data, { rejectWithValue }) => {
    try {
      const response =
        await messageService.createConversation(data)

      return extractItem(response, [
        'conversation'
      ])
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Search Conversations
// ------------------------------------------------------------

export const searchConversations = createAsyncThunk(
  'messages/searchConversations',

  async (query, { rejectWithValue }) => {
    try {
      const response =
        await messageService.searchConversations(query)

      return extractList(response, [
        'conversations',
        'results'
      ])
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// MESSAGES
// ============================================================

// ------------------------------------------------------------
// Get Messages
// ------------------------------------------------------------

export const getMessages = createAsyncThunk(
  'messages/getMessages',

  async (
    { conversationId, params = {} },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await messageService.getMessages(
          conversationId,
          params
        )

      return {
        conversationId,

        messages: extractList(response, [
          'messages'
        ]),

        pagination: getPagination(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Get Single Message
// ------------------------------------------------------------

export const getMessageById = createAsyncThunk(
  'messages/getMessageById',

  async (messageId, { rejectWithValue }) => {
    try {
      const response =
        await messageService.getMessageById(messageId)

      return extractItem(response, ['message'])
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Send Message
// ------------------------------------------------------------

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',

  async (
    { conversationId, messageData },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await messageService.sendMessage(
          conversationId,
          messageData
        )

      return {
        conversationId,

        message: extractItem(response, [
          'message'
        ])
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Send Message With Media
// ------------------------------------------------------------

export const sendMessageWithMedia = createAsyncThunk(
  'messages/sendMessageWithMedia',

  async (
    { conversationId, formData },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await messageService.sendMessageWithMedia(
          conversationId,
          formData
        )

      return {
        conversationId,

        message: extractItem(response, [
          'message'
        ])
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Update Message
// ------------------------------------------------------------

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',

  async (
    { messageId, messageData },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await messageService.updateMessage(
          messageId,
          messageData
        )

      return extractItem(response, ['message'])
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Delete Message
// ------------------------------------------------------------

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',

  async (messageId, { rejectWithValue }) => {
    try {
      const response =
        await messageService.deleteMessage(messageId)

      return {
        messageId,

        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// READ STATUS
// ============================================================

// ------------------------------------------------------------
// Mark Message As Read
// ------------------------------------------------------------

export const markMessageAsRead = createAsyncThunk(
  'messages/markMessageAsRead',

  async (messageId, { rejectWithValue }) => {
    try {
      const response =
        await messageService.markMessageAsRead(
          messageId
        )

      return {
        messageId,

        message: extractItem(response, [
          'message'
        ])
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Mark Conversation As Read
// ------------------------------------------------------------

export const markConversationAsRead = createAsyncThunk(
  'messages/markConversationAsRead',

  async (conversationId, { rejectWithValue }) => {
    try {
      const response =
        await messageService.markConversationAsRead(
          conversationId
        )

      return {
        conversationId,

        data: getResponseData(response)
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// REACTIONS
// ============================================================

// ------------------------------------------------------------
// Add Reaction
// ------------------------------------------------------------

export const addReaction = createAsyncThunk(
  'messages/addReaction',

  async (
    { messageId, reaction },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await messageService.addReaction(
          messageId,
          reaction
        )

      return {
        messageId,

        reaction,

        message: extractItem(response, [
          'message'
        ])
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ------------------------------------------------------------
// Remove Reaction
// ------------------------------------------------------------

export const removeReaction = createAsyncThunk(
  'messages/removeReaction',

  async (
    { messageId, reaction },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await messageService.removeReaction(
          messageId,
          reaction
        )

      return {
        messageId,

        reaction,

        message: extractItem(response, [
          'message'
        ])
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

// ============================================================
// SLICE
// ============================================================

const messagesSlice = createSlice({
  name: 'messages',

  initialState,

  reducers: {
    // ========================================================
    // BASIC
    // ========================================================

    clearError: state => {
      state.error = null
    },

    clearConversationsError: state => {
      state.conversationsError = null
    },

    clearMessagesError: state => {
      state.messagesError = null
    },

    clearConversationError: state => {
      state.conversationError = null
    },

    clearSendError: state => {
      state.sendError = null
    },

    clearUpdateError: state => {
      state.updateError = null
    },

    clearDeleteError: state => {
      state.deleteError = null
    },

    clearReadError: state => {
      state.readError = null
    },

    clearReactionError: state => {
      state.reactionError = null
    },

    clearSearchError: state => {
      state.searchError = null
    },

    clearCreateConversationError: state => {
      state.createConversationError = null
    },

    clearAllErrors: state => {
      state.error = null
      state.conversationsError = null
      state.messagesError = null
      state.conversationError = null
      state.sendError = null
      state.updateError = null
      state.deleteError = null
      state.readError = null
      state.reactionError = null
      state.searchError = null
      state.createConversationError = null
    },

    // ========================================================
    // SUCCESS
    // ========================================================

    clearSuccessMessage: state => {
      state.successMessage = null
    },

    // ========================================================
    // CONVERSATION
    // ========================================================

    setActiveConversation: (state, action) => {
      state.activeConversationId =
        action.payload
    },

    clearActiveConversation: state => {
      state.activeConversationId = null
    },

    setSelectedConversation: (state, action) => {
      const conversation =
        action.payload

      state.selectedConversation =
        conversation

      state.activeConversationId =
        getId(conversation)
    },

    clearSelectedConversation: state => {
      state.selectedConversation = null
      state.activeConversationId = null
    },

    // ========================================================
    // MESSAGE
    // ========================================================

    setSelectedMessage: (state, action) => {
      state.selectedMessage =
        action.payload
    },

    clearSelectedMessage: state => {
      state.selectedMessage = null
    },

    setReplyingTo: (state, action) => {
      state.replyingTo = action.payload
    },

    clearReplyingTo: state => {
      state.replyingTo = null
    },

    setEditingMessage: (state, action) => {
      state.editingMessage =
        action.payload
    },

    clearEditingMessage: state => {
      state.editingMessage = null
    },

    // ========================================================
    // TYPING
    // ========================================================

    setTypingUsers: (
      state,
      action
    ) => {
      const {
        conversationId,
        userIds
      } = action.payload

      state.typingUsers[
        conversationId
      ] = userIds
    },

    addTypingUser: (
      state,
      action
    ) => {
      const {
        conversationId,
        userId
      } = action.payload

      if (
        !state.typingUsers[
          conversationId
        ]
      ) {
        state.typingUsers[
          conversationId
        ] = []
      }

      if (
        !state.typingUsers[
          conversationId
        ].includes(userId)
      ) {
        state.typingUsers[
          conversationId
        ].push(userId)
      }
    },

    removeTypingUser: (
      state,
      action
    ) => {
      const {
        conversationId,
        userId
      } = action.payload

      if (
        state.typingUsers[
          conversationId
        ]
      ) {
        state.typingUsers[
          conversationId
        ] =
          state.typingUsers[
            conversationId
          ].filter(
            id => id !== userId
          )
      }
    },

    clearTypingUsers: (
      state,
      action
    ) => {
      delete state.typingUsers[
        action.payload
      ]
    },

    // ========================================================
    // ONLINE STATUS
    // ========================================================

    setUserOnline: (
      state,
      action
    ) => {
      const {
        userId,
        online = true,
        lastSeen = null
      } = action.payload

      state.onlineUsers[
        userId
      ] = {
        online,
        lastSeen
      }
    },

    setUserOffline: (
      state,
      action
    ) => {
      const {
        userId,
        lastSeen = new Date().toISOString()
      } = action.payload

      state.onlineUsers[
        userId
      ] = {
        online: false,
        lastSeen
      }
    },

    setOnlineUsers: (
      state,
      action
    ) => {
      state.onlineUsers =
        action.payload || {}
    },

    // ========================================================
    // SOCKET: ADD REAL-TIME MESSAGE
    // ========================================================

    addIncomingMessage: (
      state,
      action
    ) => {
      const {
        conversationId,
        message
      } = action.payload

      if (!conversationId || !message) {
        return
      }

      if (
        !state.messagesByConversation[
          conversationId
        ]
      ) {
        state.messagesByConversation[
          conversationId
        ] = []
      }

      const messageId =
        getId(message)

      const exists =
        state.messagesByConversation[
          conversationId
        ].some(
          item =>
            getId(item) ===
            messageId
        )

      if (!exists) {
        state.messagesByConversation[
          conversationId
        ].push(message)
      }

      // Update conversation preview
      state.conversations =
        state.conversations.map(
          conversation => {
            if (
              getId(conversation) !==
              conversationId
            ) {
              return conversation
            }

            return {
              ...conversation,

              lastMessage: message,

              updatedAt:
                message.createdAt ||
                new Date().toISOString()
            }
          }
        )
    },

    // ========================================================
    // SOCKET: MESSAGE UPDATED
    // ========================================================

    updateIncomingMessage: (
      state,
      action
    ) => {
      const {
        conversationId,
        message
      } = action.payload

      if (!conversationId || !message) {
        return
      }

      const messageId =
        getId(message)

      const messages =
        state.messagesByConversation[
          conversationId
        ]

      if (!messages) {
        return
      }

      state.messagesByConversation[
        conversationId
      ] = messages.map(
        item =>
          getId(item) === messageId
            ? {
                ...item,
                ...message
              }
            : item
      )

      if (
        getId(
          state.selectedMessage
        ) === messageId
      ) {
        state.selectedMessage = {
          ...state.selectedMessage,
          ...message
        }
      }
    },

    // ========================================================
    // SOCKET: MESSAGE DELETED
    // ========================================================

    removeIncomingMessage: (
      state,
      action
    ) => {
      const {
        conversationId,
        messageId
      } = action.payload

      if (
        !state.messagesByConversation[
          conversationId
        ]
      ) {
        return
      }

      state.messagesByConversation[
        conversationId
      ] =
        state.messagesByConversation[
          conversationId
        ].filter(
          message =>
            getId(message) !==
            messageId
        )

      if (
        getId(
          state.selectedMessage
        ) === messageId
      ) {
        state.selectedMessage = null
      }
    },

    // ========================================================
    // LOCAL MESSAGE UPDATE
    // ========================================================

    updateMessageLocally: (
      state,
      action
    ) => {
      const {
        conversationId,
        messageId,
        changes
      } = action.payload

      const messages =
        state.messagesByConversation[
          conversationId
        ]

      if (!messages) {
        return
      }

      state.messagesByConversation[
        conversationId
      ] = messages.map(
        message =>
          getId(message) ===
          messageId
            ? {
                ...message,
                ...changes
              }
            : message
      )
    },

    // ========================================================
    // CLEAR MESSAGES
    // ========================================================

    clearMessages: (
      state,
      action
    ) => {
      const conversationId =
        action.payload

      delete state.messagesByConversation[
        conversationId
      ]

      delete state.pagination.messages[
        conversationId
      ]
    },

    clearAllMessages: state => {
      state.messagesByConversation = {}
      state.pagination.messages = {}
    },

    // ========================================================
    // RESET
    // ========================================================

    resetMessagesState: () =>
      initialState
  },

  // ==========================================================
  // EXTRA REDUCERS
  // ==========================================================

  extraReducers: builder => {
    builder

      // ======================================================
      // GET CONVERSATIONS
      // ======================================================

      .addCase(
        getConversations.pending,
        state => {
          state.isConversationsLoading = true
          state.conversationsError = null
        }
      )

      .addCase(
        getConversations.fulfilled,
        (
          state,
          action
        ) => {
          state.isConversationsLoading =
            false

          const {
            conversations,
            pagination
          } = action.payload

          state.conversations =
            conversations

          if (pagination) {
            state.pagination.conversations =
              {
                ...state.pagination
                  .conversations,
                ...pagination
              }
          }

          conversations.forEach(
            conversation => {
              const id =
                getId(conversation)

              if (id) {
                state.conversationById[
                  id
                ] = conversation
              }
            }
          )
        }
      )

      .addCase(
        getConversations.rejected,
        (
          state,
          action
        ) => {
          state.isConversationsLoading =
            false

          state.conversationsError =
            action.payload ||
            'Failed to load conversations.'
        }
      )

      // ======================================================
      // GET CONVERSATION BY ID
      // ======================================================

      .addCase(
        getConversationById.pending,
        (
          state
        ) => {
          state.isConversationLoading =
            true

          state.conversationError = null
        }
      )

      .addCase(
        getConversationById.fulfilled,
        (
          state,
          action
        ) => {
          state.isConversationLoading =
            false

          const conversation =
            action.payload

          state.selectedConversation =
            conversation

          const id =
            getId(conversation)

          if (id) {
            state.conversationById[
              id
            ] = conversation
          }
        }
      )

      .addCase(
        getConversationById.rejected,
        (
          state,
          action
        ) => {
          state.isConversationLoading =
            false

          state.conversationError =
            action.payload ||
            'Failed to load conversation.'
        }
      )

      // ======================================================
      // CREATE CONVERSATION
      // ======================================================

      .addCase(
        createConversation.pending,
        state => {
          state.isCreatingConversation =
            true

          state.createConversationError =
            null
        }
      )

      .addCase(
        createConversation.fulfilled,
        (
          state,
          action
        ) => {
          state.isCreatingConversation =
            false

          const conversation =
            action.payload

          if (!conversation) {
            return
          }

          const id =
            getId(conversation)

          if (id) {
            state.conversationById[
              id
            ] = conversation
          }

          const exists =
            state.conversations.some(
              item =>
                getId(item) === id
            )

          if (!exists) {
            state.conversations.unshift(
              conversation
            )
          }

          state.selectedConversation =
            conversation

          state.activeConversationId =
            id

          state.successMessage =
            'Conversation created successfully.'
        }
      )

      .addCase(
        createConversation.rejected,
        (
          state,
          action
        ) => {
          state.isCreatingConversation =
            false

          state.createConversationError =
            action.payload ||
            'Failed to create conversation.'
        }
      )

      // ======================================================
      // SEARCH CONVERSATIONS
      // ======================================================

      .addCase(
        searchConversations.pending,
        state => {
          state.isSearching = true
          state.searchError = null
        }
      )

      .addCase(
        searchConversations.fulfilled,
        (
          state,
          action
        ) => {
          state.isSearching = false

          state.conversations =
            action.payload
        }
      )

      .addCase(
        searchConversations.rejected,
        (
          state,
          action
        ) => {
          state.isSearching = false

          state.searchError =
            action.payload ||
            'Failed to search conversations.'
        }
      )

      // ======================================================
      // GET MESSAGES
      // ======================================================

      .addCase(
        getMessages.pending,
        (
          state,
          action
        ) => {
          state.isMessagesLoading =
            true

          state.messagesError = null

          const conversationId =
            action.meta.arg
              .conversationId

          state.loadingByConversationId[
            conversationId
          ] = true
        }
      )

      .addCase(
        getMessages.fulfilled,
        (
          state,
          action
        ) => {
          state.isMessagesLoading =
            false

          const {
            conversationId,
            messages,
            pagination
          } = action.payload

          state.loadingByConversationId[
            conversationId
          ] = false

          state.messagesByConversation[
            conversationId
          ] = messages

          if (pagination) {
            state.pagination.messages[
              conversationId
            ] = pagination
          }
        }
      )

      .addCase(
        getMessages.rejected,
        (
          state,
          action
        ) => {
          state.isMessagesLoading =
            false

          const conversationId =
            action.meta.arg
              .conversationId

          state.loadingByConversationId[
            conversationId
          ] = false

          state.messagesError =
            action.payload ||
            'Failed to load messages.'
        }
      )

      // ======================================================
      // GET SINGLE MESSAGE
      // ======================================================

      .addCase(
        getMessageById.pending,
        state => {
          state.isLoading = true
          state.error = null
        }
      )

      .addCase(
        getMessageById.fulfilled,
        (
          state,
          action
        ) => {
          state.isLoading = false

          state.selectedMessage =
            action.payload
        }
      )

      .addCase(
        getMessageById.rejected,
        (
          state,
          action
        ) => {
          state.isLoading = false

          state.error =
            action.payload ||
            'Failed to load message.'
        }
      )

      // ======================================================
      // SEND MESSAGE
      // ======================================================

      .addCase(
        sendMessage.pending,
        (
          state,
          action
        ) => {
          state.isSending = true
          state.sendError = null

          const conversationId =
            action.meta.arg
              .conversationId

          state.loadingByConversationId[
            conversationId
          ] = true
        }
      )

      .addCase(
        sendMessage.fulfilled,
        (
          state,
          action
        ) => {
          state.isSending = false

          const {
            conversationId,
            message
          } = action.payload

          state.loadingByConversationId[
            conversationId
          ] = false

          if (!message) {
            return
          }

          if (
            !state.messagesByConversation[
              conversationId
            ]
          ) {
            state.messagesByConversation[
              conversationId
            ] = []
          }

          const messageId =
            getId(message)

          const exists =
            state.messagesByConversation[
              conversationId
            ].some(
              item =>
                getId(item) ===
                messageId
            )

          if (!exists) {
            state.messagesByConversation[
              conversationId
            ].push(message)
          }

          state.conversations =
            state.conversations.map(
              conversation => {
                if (
                  getId(conversation) !==
                  conversationId
                ) {
                  return conversation
                }

                return {
                  ...conversation,
                  lastMessage: message,
                  updatedAt:
                    message.createdAt ||
                    new Date().toISOString()
                }
              }
            )
        }
      )

      .addCase(
        sendMessage.rejected,
        (
          state,
          action
        ) => {
          state.isSending = false

          const conversationId =
            action.meta.arg
              .conversationId

          state.loadingByConversationId[
            conversationId
          ] = false

          state.sendError =
            action.payload ||
            'Failed to send message.'
        }
      )

      // ======================================================
      // SEND MESSAGE WITH MEDIA
      // ======================================================

      .addCase(
        sendMessageWithMedia.pending,
        (
          state,
          action
        ) => {
          state.isSending = true
          state.sendError = null

          const conversationId =
            action.meta.arg
              .conversationId

          state.loadingByConversationId[
            conversationId
          ] = true
        }
      )

      .addCase(
        sendMessageWithMedia.fulfilled,
        (
          state,
          action
        ) => {
          state.isSending = false

          const {
            conversationId,
            message
          } = action.payload

          state.loadingByConversationId[
            conversationId
          ] = false

          if (!message) {
            return
          }

          if (
            !state.messagesByConversation[
              conversationId
            ]
          ) {
            state.messagesByConversation[
              conversationId
            ] = []
          }

          const exists =
            state.messagesByConversation[
              conversationId
            ].some(
              item =>
                getId(item) ===
                getId(message)
            )

          if (!exists) {
            state.messagesByConversation[
              conversationId
            ].push(message)
          }

          state.conversations =
            state.conversations.map(
              conversation => {
                if (
                  getId(conversation) !==
                  conversationId
                ) {
                  return conversation
                }

                return {
                  ...conversation,
                  lastMessage: message,
                  updatedAt:
                    message.createdAt ||
                    new Date().toISOString()
                }
              }
            )
        }
      )

      .addCase(
        sendMessageWithMedia.rejected,
        (
          state,
          action
        ) => {
          state.isSending = false

          const conversationId =
            action.meta.arg
              .conversationId

          state.loadingByConversationId[
            conversationId
          ] = false

          state.sendError =
            action.payload ||
            'Failed to send media message.'
        }
      )

      // ======================================================
      // UPDATE MESSAGE
      // ======================================================

      .addCase(
        updateMessage.pending,
        (
          state,
          action
        ) => {
          state.isUpdating = true
          state.updateError = null

          state.loadingByMessageId[
            action.meta.arg.messageId
          ] = true
        }
      )

      .addCase(
        updateMessage.fulfilled,
        (
          state,
          action
        ) => {
          state.isUpdating = false

          const message =
            action.payload

          const messageId =
            getId(message)

          state.loadingByMessageId[
            messageId
          ] = false

          Object.keys(
            state.messagesByConversation
          ).forEach(
            conversationId => {
              state.messagesByConversation[
                conversationId
              ] =
                state.messagesByConversation[
                  conversationId
                ].map(
                  item =>
                    getId(item) ===
                    messageId
                      ? {
                          ...item,
                          ...message
                        }
                      : item
                )
            }
          )

          if (
            getId(
              state.selectedMessage
            ) === messageId
          ) {
            state.selectedMessage = {
              ...state.selectedMessage,
              ...message
            }
          }

          state.editingMessage = null

          state.successMessage =
            'Message updated successfully.'
        }
      )

      .addCase(
        updateMessage.rejected,
        (
          state,
          action
        ) => {
          state.isUpdating = false

          const messageId =
            action.meta.arg.messageId

          state.loadingByMessageId[
            messageId
          ] = false

          state.updateError =
            action.payload ||
            'Failed to update message.'
        }
      )

      // ======================================================
      // DELETE MESSAGE
      // ======================================================

      .addCase(
        deleteMessage.pending,
        (
          state,
          action
        ) => {
          state.isDeleting = true
          state.deleteError = null

          state.loadingByMessageId[
            action.meta.arg
          ] = true
        }
      )

      .addCase(
        deleteMessage.fulfilled,
        (
          state,
          action
        ) => {
          state.isDeleting = false

          const {
            messageId
          } = action.payload

          state.loadingByMessageId[
            messageId
          ] = false

          Object.keys(
            state.messagesByConversation
          ).forEach(
            conversationId => {
              state.messagesByConversation[
                conversationId
              ] =
                state.messagesByConversation[
                  conversationId
                ].filter(
                  message =>
                    getId(message) !==
                    messageId
                )
            }
          )

          if (
            getId(
              state.selectedMessage
            ) === messageId
          ) {
            state.selectedMessage = null
          }

          state.successMessage =
            'Message deleted successfully.'
        }
      )

      .addCase(
        deleteMessage.rejected,
        (
          state,
          action
        ) => {
          state.isDeleting = false

          const messageId =
            action.meta.arg

          state.loadingByMessageId[
            messageId
          ] = false

          state.deleteError =
            action.payload ||
            'Failed to delete message.'
        }
      )

      // ======================================================
      // MARK MESSAGE AS READ
      // ======================================================

      .addCase(
        markMessageAsRead.pending,
        (
          state,
          action
        ) => {
          state.isMarkingRead = true
          state.readError = null

          state.loadingByMessageId[
            action.meta.arg
          ] = true
        }
      )

      .addCase(
        markMessageAsRead.fulfilled,
        (
          state,
          action
        ) => {
          state.isMarkingRead = false

          const {
            messageId,
            message
          } = action.payload

          state.loadingByMessageId[
            messageId
          ] = false

          Object.keys(
            state.messagesByConversation
          ).forEach(
            conversationId => {
              state.messagesByConversation[
                conversationId
              ] =
                state.messagesByConversation[
                  conversationId
                ].map(
                  item =>
                    getId(item) ===
                    messageId
                      ? {
                          ...item,
                          ...(message ||
                            {}),
                          isRead: true,
                          read: true
                        }
                      : item
                )
            }
          )
        }
      )

      .addCase(
        markMessageAsRead.rejected,
        (
          state,
          action
        ) => {
          state.isMarkingRead = false

          const messageId =
            action.meta.arg

          state.loadingByMessageId[
            messageId
          ] = false

          state.readError =
            action.payload ||
            'Failed to mark message as read.'
        }
      )

      // ======================================================
      // MARK CONVERSATION AS READ
      // ======================================================

      .addCase(
        markConversationAsRead.pending,
        state => {
          state.isMarkingRead = true
          state.readError = null
        }
      )

      .addCase(
        markConversationAsRead.fulfilled,
        (
          state,
          action
        ) => {
          state.isMarkingRead = false

          const {
            conversationId
          } = action.payload

          if (
            state.messagesByConversation[
              conversationId
            ]
          ) {
            state.messagesByConversation[
              conversationId
            ] =
              state.messagesByConversation[
                conversationId
              ].map(
                message => ({
                  ...message,
                  isRead: true,
                  read: true
                })
              )
          }

          state.conversations =
            state.conversations.map(
              conversation =>
                getId(conversation) ===
                conversationId
                  ? {
                      ...conversation,
                      unreadCount: 0
                    }
                  : conversation
            )
        }
      )

      .addCase(
        markConversationAsRead.rejected,
        (
          state,
          action
        ) => {
          state.isMarkingRead = false

          state.readError =
            action.payload ||
            'Failed to mark conversation as read.'
        }
      )

      // ======================================================
      // ADD REACTION
      // ======================================================

      .addCase(
        addReaction.pending,
        (
          state,
          action
        ) => {
          state.isReactionLoading =
            true

          state.reactionError = null

          state.loadingByMessageId[
            action.meta.arg.messageId
          ] = true
        }
      )

      .addCase(
        addReaction.fulfilled,
        (
          state,
          action
        ) => {
          state.isReactionLoading =
            false

          const {
            messageId,
            reaction,
            message
          } = action.payload

          state.loadingByMessageId[
            messageId
          ] = false

          Object.keys(
            state.messagesByConversation
          ).forEach(
            conversationId => {
              state.messagesByConversation[
                conversationId
              ] =
                state.messagesByConversation[
                  conversationId
                ].map(
                  item => {
                    if (
                      getId(item) !==
                      messageId
                    ) {
                      return item
                    }

                    if (message) {
                      return {
                        ...item,
                        ...message
                      }
                    }

                    const reactions =
                      Array.isArray(
                        item.reactions
                      )
                        ? [
                            ...item.reactions
                          ]
                        : []

                    reactions.push(
                      reaction
                    )

                    return {
                      ...item,
                      reactions
                    }
                  }
                )
            }
          )
        }
      )

      .addCase(
        addReaction.rejected,
        (
          state,
          action
        ) => {
          state.isReactionLoading =
            false

          const messageId =
            action.meta.arg.messageId

          state.loadingByMessageId[
            messageId
          ] = false

          state.reactionError =
            action.payload ||
            'Failed to add reaction.'
        }
      )

      // ======================================================
      // REMOVE REACTION
      // ======================================================

      .addCase(
        removeReaction.pending,
        (
          state,
          action
        ) => {
          state.isReactionLoading =
            true

          state.reactionError = null

          state.loadingByMessageId[
            action.meta.arg.messageId
          ] = true
        }
      )

      .addCase(
        removeReaction.fulfilled,
        (
          state,
          action
        ) => {
          state.isReactionLoading =
            false

          const {
            messageId,
            reaction,
            message
          } = action.payload

          state.loadingByMessageId[
            messageId
          ] = false

          Object.keys(
            state.messagesByConversation
          ).forEach(
            conversationId => {
              state.messagesByConversation[
                conversationId
              ] =
                state.messagesByConversation[
                  conversationId
                ].map(
                  item => {
                    if (
                      getId(item) !==
                      messageId
                    ) {
                      return item
                    }

                    if (message) {
                      return {
                        ...item,
                        ...message
                      }
                    }

                    return {
                      ...item,
                      reactions:
                        Array.isArray(
                          item.reactions
                        )
                          ? item.reactions.filter(
                              itemReaction =>
                                itemReaction !==
                                reaction
                            )
                          : []
                    }
                  }
                )
            }
          )
        }
      )

      .addCase(
        removeReaction.rejected,
        (
          state,
          action
        ) => {
          state.isReactionLoading =
            false

          const messageId =
            action.meta.arg.messageId

          state.loadingByMessageId[
            messageId
          ] = false

          state.reactionError =
            action.payload ||
            'Failed to remove reaction.'
        }
      )
  }
})

// ============================================================
// Actions
// ============================================================

export const {
  clearError,
  clearConversationsError,
  clearMessagesError,
  clearConversationError,
  clearSendError,
  clearUpdateError,
  clearDeleteError,
  clearReadError,
  clearReactionError,
  clearSearchError,
  clearCreateConversationError,
  clearAllErrors,

  clearSuccessMessage,

  setActiveConversation,
  clearActiveConversation,

  setSelectedConversation,
  clearSelectedConversation,

  setSelectedMessage,
  clearSelectedMessage,

  setReplyingTo,
  clearReplyingTo,

  setEditingMessage,
  clearEditingMessage,

  setTypingUsers,
  addTypingUser,
  removeTypingUser,
  clearTypingUsers,

  setUserOnline,
  setUserOffline,
  setOnlineUsers,

  addIncomingMessage,
  updateIncomingMessage,
  removeIncomingMessage,

  updateMessageLocally,

  clearMessages,
  clearAllMessages,

  resetMessagesState
} = messagesSlice.actions

// ============================================================
// Selectors
// ============================================================

// ------------------------------------------------------------
// Conversations
// ------------------------------------------------------------

export const selectConversations = state =>
  state.messages?.conversations || []

export const selectSelectedConversation = state =>
  state.messages?.selectedConversation || null

export const selectActiveConversationId = state =>
  state.messages?.activeConversationId || null

export const selectConversationById = (
  state,
  conversationId
) =>
  state.messages?.conversationById?.[
    conversationId
  ] || null

// ------------------------------------------------------------
// Messages
// ------------------------------------------------------------

export const selectMessages = (
  state,
  conversationId
) =>
  state.messages?.messagesByConversation?.[
    conversationId
  ] || []

export const selectSelectedMessage = state =>
  state.messages?.selectedMessage || null

// ------------------------------------------------------------
// Reply / Edit
// ------------------------------------------------------------

export const selectReplyingTo = state =>
  state.messages?.replyingTo || null

export const selectEditingMessage = state =>
  state.messages?.editingMessage || null

// ------------------------------------------------------------
// Typing
// ------------------------------------------------------------

export const selectTypingUsers = (
  state,
  conversationId
) =>
  state.messages?.typingUsers?.[
    conversationId
  ] || []

export const selectIsAnyoneTyping = (
  state,
  conversationId
) =>
  (
    state.messages?.typingUsers?.[
      conversationId
    ] || []
  ).length > 0

// ------------------------------------------------------------
// Online
// ------------------------------------------------------------

export const selectOnlineUsers = state =>
  state.messages?.onlineUsers || {}

export const selectUserOnlineStatus = (
  state,
  userId
) =>
  state.messages?.onlineUsers?.[
    userId
  ] || {
    online: false,
    lastSeen: null
  }

export const selectIsUserOnline = (
  state,
  userId
) =>
  Boolean(
    state.messages?.onlineUsers?.[
      userId
    ]?.online
  )

// ------------------------------------------------------------
// Pagination
// ------------------------------------------------------------

export const selectConversationPagination =
  state =>
    state.messages?.pagination
      ?.conversations

export const selectMessagesPagination = (
  state,
  conversationId
) =>
  state.messages?.pagination?.messages?.[
    conversationId
  ] || {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasMore: false
  }

// ------------------------------------------------------------
// Loading
// ------------------------------------------------------------

export const selectMessagesLoading = state =>
  Boolean(state.messages?.isLoading)

export const selectConversationsLoading =
  state =>
    Boolean(
      state.messages
        ?.isConversationsLoading
    )

export const selectMessagesListLoading = state =>
  Boolean(
    state.messages?.isMessagesLoading
  )

export const selectConversationLoading = state =>
  Boolean(
    state.messages
      ?.isConversationLoading
  )

export const selectSendingMessage = state =>
  Boolean(state.messages?.isSending)

export const selectUpdatingMessage = state =>
  Boolean(state.messages?.isUpdating)

export const selectDeletingMessage = state =>
  Boolean(state.messages?.isDeleting)

export const selectMarkingRead = state =>
  Boolean(state.messages?.isMarkingRead)

export const selectReactionLoading = state =>
  Boolean(
    state.messages?.isReactionLoading
  )

export const selectSearchingConversations =
  state =>
    Boolean(
      state.messages?.isSearching
    )

export const selectCreatingConversation =
  state =>
    Boolean(
      state.messages
        ?.isCreatingConversation
    )

// ------------------------------------------------------------
// Per Message Loading
// ------------------------------------------------------------

export const selectMessageActionLoading = (
  state,
  messageId
) =>
  Boolean(
    state.messages
      ?.loadingByMessageId?.[
      messageId
    ]
  )

// ------------------------------------------------------------
// Per Conversation Loading
// ------------------------------------------------------------

export const selectConversationActionLoading =
  (
    state,
    conversationId
  ) =>
    Boolean(
      state.messages
        ?.loadingByConversationId?.[
        conversationId
      ]
    )

// ------------------------------------------------------------
// Errors
// ------------------------------------------------------------

export const selectMessagesError = state =>
  state.messages?.error || null

export const selectConversationsError = state =>
  state.messages
    ?.conversationsError || null

export const selectMessagesListError = state =>
  state.messages
    ?.messagesError || null

export const selectConversationError = state =>
  state.messages
    ?.conversationError || null

export const selectSendMessageError = state =>
  state.messages?.sendError || null

export const selectUpdateMessageError = state =>
  state.messages
    ?.updateError || null

export const selectDeleteMessageError = state =>
  state.messages
    ?.deleteError || null

export const selectReadMessageError = state =>
  state.messages?.readError || null

export const selectReactionError = state =>
  state.messages
    ?.reactionError || null

export const selectSearchConversationError =
  state =>
    state.messages
      ?.searchError || null

export const selectCreateConversationError =
  state =>
    state.messages
      ?.createConversationError || null

// ------------------------------------------------------------
// Success
// ------------------------------------------------------------

export const selectMessageSuccess = state =>
  state.messages
    ?.successMessage || null

// ============================================================
// Default Export
// ============================================================

export default messagesSlice.reducer

