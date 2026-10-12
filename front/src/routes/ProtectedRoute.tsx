import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !user?.roles?.some((role) => allowedRoles.includes(role.name))
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}