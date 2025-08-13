import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AdminDashboardView } from "@/views/AdminDashboardView"

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardView />
    </ProtectedRoute>
  )
}
