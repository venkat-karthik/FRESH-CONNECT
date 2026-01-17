"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  avatar?: string
  phone?: string
  bio?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample users for demo
const USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@freshserve.com",
    password: "admin123",
    role: "admin" as const,
    avatar: "AU",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "user123",
    role: "user" as const,
    avatar: "JD",
  },
]

// Cookie helper functions
function setCookie(name: string, value: string, days: number) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `; expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}${expires}; path=/`
}

function getCookie(name: string) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        // Try to get user from localStorage
        const storedUser = localStorage.getItem("freshserve-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          // If not in localStorage, try cookies
          const cookieUser = getCookie("freshserve-user")
          if (cookieUser) {
            const parsedUser = JSON.parse(cookieUser)
            setUser(parsedUser)
            // Also set in localStorage for consistency
            localStorage.setItem("freshserve-user", cookieUser)
          }
        }
      } catch (error) {
        console.error("Error loading user:", error)
        // Clear potentially corrupted data
        localStorage.removeItem("freshserve-user")
        eraseCookie("freshserve-user")
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = foundUser

        // Store user in state
        setUser(userWithoutPassword)

        // Store user in localStorage
        const userString = JSON.stringify(userWithoutPassword)
        localStorage.setItem("freshserve-user", userString)

        // Store user in cookie for middleware
        setCookie("freshserve-user", userString, 7) // 7 days

        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear user from state
    setUser(null)

    // Clear user from localStorage
    localStorage.removeItem("freshserve-user")

    // Clear user from cookie
    eraseCookie("freshserve-user")
  }

  const isAdmin = user?.role === "admin"

  const contextValue = {
    user,
    isLoading,
    login,
    logout,
    isAdmin,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
