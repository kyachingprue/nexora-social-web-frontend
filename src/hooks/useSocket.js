import { useCallback, useEffect, useRef, useState } from 'react'

import {
  connectSocket,
  disconnectSocket,
  getSocket,
  joinUserRoom,
  leaveUserRoom,
  joinConversation,
  leaveConversation,
  sendMessage,
  startTyping,
  stopTyping
} from '../socket/socket'

import {
  SOCKET_CONNECTION_EVENTS,
  SOCKET_USER_EVENTS,
  SOCKET_MESSAGE_EVENTS,
  SOCKET_TYPING_EVENTS,
  SOCKET_NOTIFICATION_EVENTS
} from '../constants/socketEvents'

// ==========================================
// useSocket Hook
// ==========================================

const useSocket = userId => {
  const socketRef = useRef(null)

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] =
    useState(null)

  // ==========================================
  // Initialize Socket
  // ==========================================

  useEffect(() => {
    if (!userId) {
      return
    }

    const socket = getSocket()

    socketRef.current = socket

    const handleConnect = () => {
      setIsConnected(true)
      setIsConnecting(false)
      setConnectionError(null)

      joinUserRoom(userId)
    }

    const handleDisconnect = reason => {
      setIsConnected(false)
      setIsConnecting(false)

      console.log(
        'Socket disconnected:',
        reason
      )
    }

    const handleConnectError = error => {
      setIsConnected(false)
      setIsConnecting(false)
      setConnectionError(error?.message || 'Socket connection failed')
    }

    setIsConnecting(true)

    socket.on(
      SOCKET_CONNECTION_EVENTS.CONNECT,
      handleConnect
    )

    socket.on(
      SOCKET_CONNECTION_EVENTS.DISCONNECT,
      handleDisconnect
    )

    socket.on(
      SOCKET_CONNECTION_EVENTS.CONNECT_ERROR,
      handleConnectError
    )

    if (!socket.connected) {
      connectSocket()
    } else {
      handleConnect()
    }

    // ==========================================
    // Cleanup
    // ==========================================

    return () => {
      leaveUserRoom(userId)

      socket.off(
        SOCKET_CONNECTION_EVENTS.CONNECT,
        handleConnect
      )

      socket.off(
        SOCKET_CONNECTION_EVENTS.DISCONNECT,
        handleDisconnect
      )

      socket.off(
        SOCKET_CONNECTION_EVENTS.CONNECT_ERROR,
        handleConnectError
      )
    }
  }, [userId])

  // ==========================================
  // Disconnect Socket
  // ==========================================

  const disconnect = useCallback(() => {
    disconnectSocket()

    setIsConnected(false)
  }, [])

  // ==========================================
  // Join Conversation
  // ==========================================

  const joinRoom = useCallback(
    conversationId => {
      if (!conversationId) return

      joinConversation(conversationId)
    },
    []
  )

  // ==========================================
  // Leave Conversation
  // ==========================================

  const leaveRoom = useCallback(
    conversationId => {
      if (!conversationId) return

      leaveConversation(conversationId)
    },
    []
  )

  // ==========================================
  // Send Message
  // ==========================================

  const sendChatMessage = useCallback(
    message => {
      if (!message) return

      sendMessage(message)
    },
    []
  )

  // ==========================================
  // Start Typing
  // ==========================================

  const typingStart = useCallback(
    conversationId => {
      if (!conversationId) return

      startTyping(conversationId)
    },
    []
  )

  // ==========================================
  // Stop Typing
  // ==========================================

  const typingStop = useCallback(
    conversationId => {
      if (!conversationId) return

      stopTyping(conversationId)
    },
    []
  )

  // ==========================================
  // Subscribe To Event
  // ==========================================

  const on = useCallback(
    (event, callback) => {
      const socket = socketRef.current

      if (!socket || !event || !callback) {
        return
      }

      socket.on(event, callback)

      return () => {
        socket.off(event, callback)
      }
    },
    []
  )

  // ==========================================
  // Remove Event Listener
  // ==========================================

  const off = useCallback(
    (event, callback) => {
      const socket = socketRef.current

      if (!socket || !event) {
        return
      }

      if (callback) {
        socket.off(event, callback)
      } else {
        socket.off(event)
      }
    },
    []
  )

  // ==========================================
  // Listen For New Messages
  // ==========================================

  const onNewMessage = useCallback(
    callback => {
      return on(
        SOCKET_MESSAGE_EVENTS.NEW_MESSAGE,
        callback
      )
    },
    [on]
  )

  // ==========================================
  // Listen For Typing
  // ==========================================

  const onUserTyping = useCallback(
    callback => {
      return on(
        SOCKET_TYPING_EVENTS.USER_TYPING,
        callback
      )
    },
    [on]
  )

  // ==========================================
  // Listen For Stopped Typing
  // ==========================================

  const onUserStoppedTyping = useCallback(
    callback => {
      return on(
        SOCKET_TYPING_EVENTS.USER_STOPPED_TYPING,
        callback
      )
    },
    [on]
  )

  // ==========================================
  // Listen For Online User
  // ==========================================

  const onUserOnline = useCallback(
    callback => {
      return on(
        SOCKET_USER_EVENTS.USER_ONLINE,
        callback
      )
    },
    [on]
  )

  // ==========================================
  // Listen For Offline User
  // ==========================================

  const onUserOffline = useCallback(
    callback => {
      return on(
        SOCKET_USER_EVENTS.USER_OFFLINE,
        callback
      )
    },
    [on]
  )

  // ==========================================
  // Listen For Notification
  // ==========================================

  const onNewNotification = useCallback(
    callback => {
      return on(
        SOCKET_NOTIFICATION_EVENTS.NEW_NOTIFICATION,
        callback
      )
    },
    [on]
  )

  return {
    socket: socketRef.current,

    isConnected,
    isConnecting,
    connectionError,

    disconnect,

    joinRoom,
    leaveRoom,

    sendChatMessage,

    typingStart,
    typingStop,

    on,
    off,

    onNewMessage,
    onUserTyping,
    onUserStoppedTyping,

    onUserOnline,
    onUserOffline,

    onNewNotification
  }
}

export default useSocket

