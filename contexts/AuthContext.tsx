"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { AuthModel, type User, type LoginCredentials } from "@/models/AuthModel"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await AuthModel.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Failed to initialize auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const loggedInUser = await AuthModel.login(credentials)
      if (loggedInUser) {
        setUser(loggedInUser)
        AuthModel.saveUser(loggedInUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await AuthModel.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
