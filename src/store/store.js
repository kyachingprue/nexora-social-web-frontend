import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import usersReducer from '../features/users/userSlice'
import postsReducer from '../features/posts/postSlice'
import messagesReducer from '../features/messages/messageSlice'
import notificationsReducer from '../features/notification/notificationSlice'
import commentsReducer from '../features/comments/commentSlice'
import followsReducer from '../features/follows/followSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
    comments: commentsReducer,
    follows: followsReducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),

  devTools: import.meta.env.MODE !== 'production'
})

export default store
