import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const useAuthData = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthData must be used inside an AuthProvider')
  }

  const { user, loading } = context

  return {
    user,
    loading
  }
}

export default useAuthData
