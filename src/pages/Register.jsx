import { useState } from "react"
import Swal from "sweetalert2"
import "../assets/css/login-register.css"
import { useUser } from "../context/useUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 6 caracteres.",
        confirmButtonText: "Reintentar"
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    // Llama al método register del contexto
    const result = await register(email, password);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Bienvenido a Pizzeria Mamma Mia 🍕",
        confirmButtonText: "Continuar"
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: result.error || "No se pudo registrar el usuario.",
        confirmButtonText: "Reintentar"
      });
    }
  };

  return (
    <div className="marco">
      <div class="register">
        <h2>Registro</h2>
        <form class="form" onSubmit={handleSubmit}>
          <div class="input-container">
            <i class="fas fa-envelope"></i>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="input-container">
            <i class="fas fa-lock"></i>
            <input 
              type="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="input-container">
            <i class="fas fa-lock"></i>
            <input 
              type="password" 
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default Register