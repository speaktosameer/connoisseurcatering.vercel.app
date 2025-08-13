"use client"

import { LoginPresenter } from "@/presenters/LoginPresenter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { LogIn, AlertCircle } from "lucide-react"
import Link from "next/link"

export function LoginView() {
  const { formData, isLoading, error, handleInputChange, handleSubmit } = LoginPresenter()

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Demo Credentials:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Admin:</strong> admin@catering.com / admin123
                  </div>
                  <div>
                    <strong>Client:</strong> client@catering.com / client123
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
