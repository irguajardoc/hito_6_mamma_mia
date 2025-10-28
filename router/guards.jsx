import { Navigate } from "react-router-dom";
import { useUser } from "../context/usercontext.jsx";

export function PrivateRoute({ children }) {
  const { token } = useUser();
  return token ? children : <Navigate to="/login" replace />;
}

export function RedirectIfAuth({ children }) {
  const { token } = useUser();
  return token ? <Navigate to="/" replace /> : children;
}
