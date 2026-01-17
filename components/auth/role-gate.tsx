"use client"

import { useAuth } from "@/contexts/auth-context"
import type { ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface RoleGateProps {
  children: ReactNode
  allowedRole: "admin" | "user" | "all"
  fallback?: ReactNode
}

export function RoleGate({ children, allowedRole, fallback }: RoleGateProps) {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  if (allowedRole === "all" || user.role === allowedRole || (allowedRole === "user" && user.role === "admin")) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-medium">Access Restricted</h3>
      <p className="mt-2 text-sm text-muted-foreground">You don't have permission to access this feature.</p>
    </div>
  )
}
