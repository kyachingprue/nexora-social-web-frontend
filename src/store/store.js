import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import messagesReducer from '../features/messages/messagesSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

import middleware from './middleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleware),

  devTools: import.meta.env.MODE !== 'production'
})

export default store
