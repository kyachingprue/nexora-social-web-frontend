// src/services/api.js

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ======================================================
// AUTOMATIC ACCESS TOKEN REFRESH
// ======================================================

let isRefreshing = false
let failedQueue = []

const processQueue = error => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve()
    }
  })

  failedQueue = []
}

api.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config

    // Only handle 401 errors
    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    // Don't refresh these endpoints
    const requestUrl = originalRequest?.url || ''

    if (
      requestUrl.includes('/api/auth/login') ||
      requestUrl.includes('/api/auth/register') ||
      requestUrl.includes('/api/auth/refresh-token') ||
      requestUrl.includes('/api/auth/logout')
    ) {
      return Promise.reject(error)
    }

    // Prevent infinite retry
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    // If another request is already refreshing
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            resolve(api(originalRequest))
          },
          reject
        })
      })
    }

    isRefreshing = true

    try {
      console.log('🔄 Access token expired. Refreshing...')

      // IMPORTANT:
      // Do NOT use authService here because it imports api
      // and can create circular/interceptor problems.
      await api.post('/api/auth/refresh-token')

      console.log('✅ Access token refreshed successfully')

      processQueue(null)

      // Retry original request
      return api(originalRequest)
    } catch (refreshError) {
      console.error(
        '❌ Refresh token failed:',
        refreshError?.response?.data || refreshError?.message
      )

      processQueue(refreshError)

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
