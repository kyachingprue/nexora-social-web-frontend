const middleware = store => next => action => {
  // Development environment এ Redux action দেখতে
  if (import.meta.env.DEV) {
    console.log('Redux Action:', action.type)
  }

  // Action execute করা
  const result = next(action)

  // State update হওয়ার পর
  if (import.meta.env.DEV) {
    console.log('Redux State:', store.getState())
  }

  return result
}

export default middleware
