import { ProtectedRoute } from "@/components/ProtectedRoute"
import { ClientDashboardView } from "@/views/ClientDashboardView"

export default function ClientPage() {
  return (
    <ProtectedRoute requiredRole="client">
      <ClientDashboardView />
    </ProtectedRoute>
  )
}
