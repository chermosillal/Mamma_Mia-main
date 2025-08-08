// Navbar.jsx
import "../assets/css/navbar.css";
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useUser } from '../context/useUser'; // 👈 Importa el hook

const toggleMenu = () => {
  const menuLinks = document.querySelector(".nav-links");
  menuLinks.classList.toggle("active");
};

const Navbar = () => {
  const { total } = useCart();
  const { token, logout } = useUser(); // 👈 Obtiene el estado y método del contexto
  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirige al home tras logout
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="title">Pizzería Mamma Mia</h1>
        <button className="hamburger" onClick={toggleMenu}>☰</button>

        <ul className="nav-links">
          {/* Siempre visibles */}
          <li><Link to="/">🍕 Home</Link></li>

          {/* Mostrar según estado del token */}
          {token ? (
            <>
              <li><Link to="/profile">🔓 Profile</Link></li>
              <li>
                <button className="logout" onClick={handleLogout}>
                  🔒 Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">🔐 Login</Link></li>
              <li><Link to="/register">📝 Register</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Total visible siempre */}
      <Link to="/cart">
        <button className="total">
          🛒 Total: {total.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP"
          })}
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
