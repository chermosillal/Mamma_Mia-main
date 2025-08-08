import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Pizza from './pages/Pizza';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente de ruta protegida
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'; // Importa el componente de redirección

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

