// src/services/messageService.js

import api from './api'

// ============================================================
// Conversation APIs
// ============================================================

/**
 * Get all conversations for the current user
 *
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>}
 */
const getConversations = async (params = {}) => {
  const response = await api.get('/messages/conversations', {
    params
  })

  return response.data
}

/**
 * Get a single conversation by ID
 *
 * @param {string} conversationId
 * @returns {Promise<Object>}
 */
const getConversationById = async conversationId => {
  const response = await api.get(
    `/messages/conversations/${conversationId}`
  )

  return response.data
}

/**
 * Create a new conversation
 *
 * @param {Object} data
 *
 * Example:
 * {
 *   participantIds: ['userId1', 'userId2'],
 *   type: 'DIRECT'
 * }
 *
 * @returns {Promise<Object>}
 */
const createConversation = async data => {
  const response = await api.post(
    '/messages/conversations',
    data
  )

  return response.data
}

/**
 * Search conversations
 *
 * @param {string} query
 * @returns {Promise<Object>}
 */
const searchConversations = async query => {
  const response = await api.get(
    '/messages/conversations/search',
    {
      params: {
        search: query
      }
    }
  )

  return response.data
}

// ============================================================
// Message APIs
// ============================================================

/**
 * Get messages from a conversation
 *
 * @param {string} conversationId
 * @param {Object} params
 *
 * Example:
 * {
 *   page: 1,
 *   limit: 30
 * }
 *
 * @returns {Promise<Object>}
 */
const getMessages = async (
  conversationId,
  params = {}
) => {
  const response = await api.get(
    `/messages/conversations/${conversationId}/messages`,
    {
      params
    }
  )

  return response.data
}

/**
 * Get a single message
 *
 * @param {string} messageId
 * @returns {Promise<Object>}
 */
const getMessageById = async messageId => {
  const response = await api.get(
    `/messages/${messageId}`
  )

  return response.data
}

/**
 * Send a text message
 *
 * @param {string} conversationId
 * @param {Object} messageData
 *
 * Example:
 * {
 *   content: 'Hello!'
 * }
 *
 * @returns {Promise<Object>}
 */
const sendMessage = async (
  conversationId,
  messageData
) => {
  const response = await api.post(
    `/messages/conversations/${conversationId}/messages`,
    messageData
  )

  return response.data
}

/**
 * Send a message with media/file
 *
 * @param {string} conversationId
 * @param {FormData} formData
 * @returns {Promise<Object>}
 */
const sendMessageWithMedia = async (
  conversationId,
  formData
) => {
  const response = await api.post(
    `/messages/conversations/${conversationId}/messages`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data
}

/**
 * Update/edit a message
 *
 * @param {string} messageId
 * @param {Object} messageData
 *
 * Example:
 * {
 *   content: 'Updated message'
 * }
 *
 * @returns {Promise<Object>}
 */
const updateMessage = async (
  messageId,
  messageData
) => {
  const response = await api.patch(
    `/messages/${messageId}`,
    messageData
  )

  return response.data
}

/**
 * Delete a message
 *
 * @param {string} messageId
 * @returns {Promise<Object>}
 */
const deleteMessage = async messageId => {
  const response = await api.delete(
    `/messages/${messageId}`
  )

  return response.data
}

// ============================================================
// Read / Seen APIs
// ============================================================

/**
 * Mark a single message as read
 *
 * @param {string} messageId
 * @returns {Promise<Object>}
 */
const markMessageAsRead = async messageId => {
  const response = await api.patch(
    `/messages/${messageId}/read`
  )

  return response.data
}

/**
 * Mark an entire conversation as read
 *
 * @param {string} conversationId
 * @returns {Promise<Object>}
 */
const markConversationAsRead = async conversationId => {
  const response = await api.patch(
    `/messages/conversations/${conversationId}/read`
  )

  return response.data
}

// ============================================================
// Reaction APIs
// ============================================================

/**
 * Add reaction to a message
 *
 * @param {string} messageId
 * @param {string} reaction
 *
 * Example:
 * reaction = '❤️'
 *
 * @returns {Promise<Object>}
 */
const addReaction = async (
  messageId,
  reaction
) => {
  const response = await api.post(
    `/messages/${messageId}/reactions`,
    {
      reaction
    }
  )

  return response.data
}

/**
 * Remove reaction from a message
 *
 * @param {string} messageId
 * @param {string} reaction
 * @returns {Promise<Object>}
 */
const removeReaction = async (
  messageId,
  reaction
) => {
  const response = await api.delete(
    `/messages/${messageId}/reactions`,
    {
      data: {
        reaction
      }
    }
  )

  return response.data
}

// ============================================================
// Export Service
// ============================================================

const messageService = {
  // Conversations
  getConversations,
  getConversationById,
  createConversation,
  searchConversations,

  // Messages
  getMessages,
  getMessageById,
  sendMessage,
  sendMessageWithMedia,
  updateMessage,
  deleteMessage,

  // Read / Seen
  markMessageAsRead,
  markConversationAsRead,

  // Reactions
  addReaction,
  removeReaction
}

export default messageService

