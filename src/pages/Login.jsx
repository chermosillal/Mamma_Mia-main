import { useState } from "react";
import Swal from "sweetalert2";
import "../assets/css/login-register.css";
import { useUser } from "../context/useUser"; // 👈 Importamos el hook
import { useNavigate } from "react-router-dom";  // 👈 Para redirigir

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser(); // Usamos el método login del contexto
  const navigate = useNavigate(); // Hook para redirigir

  const validarDatos = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
        confirmButtonText: "Aceptar",
        width: "350px"
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 6 caracteres.",
        confirmButtonText: "Reintentar",
        width: "350px"
      });
      return;
    }

    // Llama al método login del contexto
    const result = await login(email, password);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Bienvenido a Pizzería Mamma Mia 🍕",
        confirmButtonText: "Continuar",
        width: "350px"
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: result.error || "Credenciales incorrectas.",
        confirmButtonText: "Reintentar",
        width: "350px"
      });
    }
  };

  return (  // Componente de Login
    <div className="marco">
      <div className="login">
        <h2>Login</h2>
        <form className="form" onSubmit={validarDatos}>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;