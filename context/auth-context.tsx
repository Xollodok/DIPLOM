"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user type
type User = {
  id: string
  name: string
  email: string
  phone?: string
  isAdmin?: boolean
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setIsAuthenticated(true)
    }
  }, [])

  // Login function - in a real app, this would call an API
  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll accept any email/password with some predefined users
    let userData: User

    // Admin user
    if (email === "admin@example.com") {
      userData = {
        id: "admin-1",
        name: "Администратор",
        email: "admin@example.com",
        isAdmin: true,
      }
    } else {
      // Regular user
      userData = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name: email.split("@")[0],
        email: email,
        isAdmin: false,
      }
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  // Register function - in a real app, this would call an API
  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      isAdmin: false,
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
