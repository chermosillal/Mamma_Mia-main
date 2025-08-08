import React, { useState } from "react";
import "../assets/css/cart.css";
import { useCart } from "../context/useCart"; // ✅ Accedemos al carrito
import { useUser } from "../context/useUser"; // 👈 Accedemos al token real

const Cart = () => {
  const { cartItems, increment, reduce, total } = useCart();
  const { token } = useUser(); // 👈 Estado de sesión
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    try {
  const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ cart: cartItems })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setSuccess(false);
        alert(data.error || "Error al procesar la compra");
      }
    } catch (err) {
      setSuccess(false);
      alert("Error de red: " + err.message);
    }
  };

  return (
    <div className="marco">
      <div className="cart">
        <h2><i className="fas fa-shopping-cart"></i> Detalles del pedido</h2>

        {cartItems.length > 0 ? (
          <>
            <table className="cart-table">
              <tbody>
                {cartItems.map(({ id, name, price, img, count }) => (
                  <tr key={id}>
                    <td><img className="foto2" src={img} alt={name} /></td>
                    <td>{name.toUpperCase()}</td>
                    <td>${price.toLocaleString("es-CL")}</td>
                    <td><button onClick={() => reduce(id)}>-</button></td>
                    <td className="cant">{count}</td>
                    <td><button onClick={() => increment(id)}>+</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-container">
              <p className="suma">
                Total: {total.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP"
                })}
              </p>
            </div>

            {/* 👇 Botón "Pagar" condicionado al token */}
            <button className="pay-button" disabled={!token} onClick={handlePay}>
              Pagar
            </button>

            {!token && (
              <p className="alerta-token">
                🔐 Debes iniciar sesión para realizar el pago.
              </p>
            )}
            {success && (
              <p className="alerta-token" style={{ color: 'green', fontWeight: 'bold' }}>
                ✅ ¡Compra realizada con éxito!
              </p>
            )}
          </>
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
