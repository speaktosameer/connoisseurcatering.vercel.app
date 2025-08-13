export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "client"
}

export interface LoginCredentials {
  email: string
  password: string
}

export class AuthModel {
  private static users: Array<User & { password: string }> = [
    {
      id: "1",
      email: "admin@catering.com",
      password: "admin123",
      name: "Admin User",
      role: "admin",
    },
    {
      id: "2",
      email: "client@catering.com",
      password: "client123",
      name: "Client User",
      role: "client",
    },
  ]

  static async login(credentials: LoginCredentials): Promise<User | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = this.users.find((u) => u.email === credentials.email && u.password === credentials.password)

    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }

    return null
  }

  static async getCurrentUser(): Promise<User | null> {
    // In a real app, this would validate a token or session
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      try {
        return JSON.parse(userData)
      } catch {
        return null
      }
    }
    return null
  }

  static async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    localStorage.removeItem("currentUser")
  }

  static saveUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}
