import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { PizzaProvider } from './context/PizzaContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PizzaProvider>
        <CartProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CartProvider>
      </PizzaProvider>
    </BrowserRouter>
  </React.StrictMode>
);