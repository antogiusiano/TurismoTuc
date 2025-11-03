import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    // No hay usuario logueado → redirigimos al login
    return <Navigate to="/admin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Usuario logueado pero sin permisos
    return <Navigate to="/" replace />;
  }

  return children;
}
