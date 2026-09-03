// ==========================================
// Socket Connection Events
// ==========================================

export const SOCKET_CONNECTION_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  ERROR: 'error',
  RECONNECT: 'reconnect',
  RECONNECT_ATTEMPT: 'reconnect_attempt',
  RECONNECT_ERROR: 'reconnect_error',
  RECONNECT_FAILED: 'reconnect_failed'
}

// ==========================================
// User / Presence Events
// ==========================================

export const SOCKET_USER_EVENTS = {
  JOIN_USER: 'join-user',
  LEAVE_USER: 'leave-user',

  USER_ONLINE: 'user-online',
  USER_OFFLINE: 'user-offline',

  ONLINE_USERS: 'online-users',
  USER_STATUS: 'user-status'
}

// ==========================================
// Conversation Events
// ==========================================

export const SOCKET_CONVERSATION_EVENTS = {
  JOIN_CONVERSATION: 'join-conversation',
  LEAVE_CONVERSATION: 'leave-conversation',

  CONVERSATION_CREATED: 'conversation-created',
  CONVERSATION_UPDATED: 'conversation-updated',
  CONVERSATION_DELETED: 'conversation-deleted'
}

// ==========================================
// Message Events
// ==========================================

export const SOCKET_MESSAGE_EVENTS = {
  SEND_MESSAGE: 'send-message',
  NEW_MESSAGE: 'new-message',

  MESSAGE_SENT: 'message-sent',
  MESSAGE_DELIVERED: 'message-delivered',
  MESSAGE_READ: 'message-read',

  MESSAGE_UPDATED: 'message-updated',
  MESSAGE_DELETED: 'message-deleted'
}

// ==========================================
// Typing Events
// ==========================================

export const SOCKET_TYPING_EVENTS = {
  TYPING_START: 'typing-start',
  TYPING_STOP: 'typing-stop',

  USER_TYPING: 'user-typing',
  USER_STOPPED_TYPING: 'user-stopped-typing'
}

// ==========================================
// Notification Events
// ==========================================

export const SOCKET_NOTIFICATION_EVENTS = {
  SEND_NOTIFICATION: 'send-notification',
  NEW_NOTIFICATION: 'new-notification',

  NOTIFICATION_READ: 'notification-read',
  NOTIFICATION_DELETED: 'notification-deleted',

  NOTIFICATION_COUNT_UPDATED:
    'notification-count-updated'
}

// ==========================================
// Post Events
// ==========================================

export const SOCKET_POST_EVENTS = {
  NEW_POST: 'new-post',
  POST_UPDATED: 'post-updated',
  POST_DELETED: 'post-deleted',

  POST_LIKED: 'post-liked',
  POST_UNLIKED: 'post-unliked',

  POST_SAVED: 'post-saved',
  POST_UNSAVED: 'post-unsaved',

  POST_SHARED: 'post-shared'
}

// ==========================================
// Comment Events
// ==========================================

export const SOCKET_COMMENT_EVENTS = {
  NEW_COMMENT: 'new-comment',
  COMMENT_UPDATED: 'comment-updated',
  COMMENT_DELETED: 'comment-deleted',

  COMMENT_LIKED: 'comment-liked',
  COMMENT_UNLIKED: 'comment-unliked',

  NEW_REPLY: 'new-reply'
}

// ==========================================
// Follow Events
// ==========================================

export const SOCKET_FOLLOW_EVENTS = {
  FOLLOW_USER: 'follow-user',
  UNFOLLOW_USER: 'unfollow-user',

  NEW_FOLLOWER: 'new-follower',
  FOLLOW_ACCEPTED: 'follow-accepted',
  FOLLOW_REMOVED: 'follow-removed'
}

// ==========================================
// Global Socket Events
// ==========================================

export const SOCKET_EVENTS = {
  ...SOCKET_CONNECTION_EVENTS,
  ...SOCKET_USER_EVENTS,
  ...SOCKET_CONVERSATION_EVENTS,
  ...SOCKET_MESSAGE_EVENTS,
  ...SOCKET_TYPING_EVENTS,
  ...SOCKET_NOTIFICATION_EVENTS,
  ...SOCKET_POST_EVENTS,
  ...SOCKET_COMMENT_EVENTS,
  ...SOCKET_FOLLOW_EVENTS
}

export default SOCKET_EVENTS

