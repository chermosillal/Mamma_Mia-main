//redirige al home si el usuario ya está logueado
import { Navigate } from "react-router-dom";
import { useUser } from "../context/useUser";

const RedirectIfAuthenticated = ({ children }) => {
  const { token } = useUser();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;

