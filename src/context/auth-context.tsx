'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/api'

type AuthContextType = {
  user: { email: string } | null
  loading: boolean
  setUser: (user: { email: string } | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)