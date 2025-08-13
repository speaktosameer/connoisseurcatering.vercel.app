"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "client"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        const dashboardPath = user.role === "admin" ? "/admin" : "/client"
        router.push(dashboardPath)
        return
      }
    }
  }, [user, isLoading, requiredRole, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading...
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Checking authentication status...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  if (requiredRole && user.role !== requiredRole) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
