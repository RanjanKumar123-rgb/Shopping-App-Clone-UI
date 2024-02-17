
import { AuthContext } from './AuthProvider'
import { useContext } from 'react';

function useAuth() {
  return useContext(AuthContext)
}

export  {useAuth}