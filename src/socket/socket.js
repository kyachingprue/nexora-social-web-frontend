import { io } from 'socket.io-client'

// ==========================================
// Socket Configuration
// ==========================================

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL?.replace('/api', '') ||
  'http://localhost:5000'

// ==========================================
// Socket Instance
// ==========================================

export const socket = io(SOCKET_URL, {
  path: '/socket.io',

  transports: ['websocket', 'polling'],

  autoConnect: false,

  withCredentials: true,

  reconnection: true,

  reconnectionAttempts: 10,

  reconnectionDelay: 1000,

  reconnectionDelayMax: 5000
})

// ==========================================
// Connect Socket
// ==========================================

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }

  return socket
}

// ==========================================
// Disconnect Socket
// ==========================================

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}

// ==========================================
// Get Socket
// ==========================================

export const getSocket = () => socket

// ==========================================
// Socket Connection Status
// ==========================================

export const isSocketConnected = () => {
  return socket.connected
}

// ==========================================
// Join User Room
// ==========================================

export const joinUserRoom = userId => {
  if (!userId) return

  socket.emit('join-user', userId)
}

// ==========================================
// Leave User Room
// ==========================================

export const leaveUserRoom = userId => {
  if (!userId) return

  socket.emit('leave-user', userId)
}

// ==========================================
// Join Conversation
// ==========================================

export const joinConversation = conversationId => {
  if (!conversationId) return

  socket.emit(
    'join-conversation',
    conversationId
  )
}

// ==========================================
// Leave Conversation
// ==========================================

export const leaveConversation = conversationId => {
  if (!conversationId) return

  socket.emit(
    'leave-conversation',
    conversationId
  )
}

// ==========================================
// Send Message
// ==========================================

export const sendMessage = message => {
  if (!message) return

  socket.emit('send-message', message)
}

// ==========================================
// Typing Started
// ==========================================

export const startTyping = conversationId => {
  if (!conversationId) return

  socket.emit(
    'typing-start',
    conversationId
  )
}

// ==========================================
// Typing Stopped
// ==========================================

export const stopTyping = conversationId => {
  if (!conversationId) return

  socket.emit(
    'typing-stop',
    conversationId
  )
}

// ==========================================
// Send Notification
// ==========================================

export const sendNotification = notification => {
  if (!notification) return

  socket.emit(
    'send-notification',
    notification
  )
}

// ==========================================
// Listen To Event
// ==========================================

export const onSocketEvent = (
  event,
  callback
) => {
  if (!event || !callback) return

  socket.on(event, callback)
}

// ==========================================
// Remove Event Listener
// ==========================================

export const offSocketEvent = (
  event,
  callback
) => {
  if (!event) return

  if (callback) {
    socket.off(event, callback)
  } else {
    socket.off(event)
  }
}

export default socket

