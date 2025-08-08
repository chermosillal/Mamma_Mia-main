import { useState, useMemo } from 'react';
import { CartContext } from './CartContextDef';

export const CartProvider = ({ children }) => {
  const initialCart = [];

  const [cartItems, setCartItems] = useState(initialCart);

  const increment = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const reduce = (id) => {
    setCartItems(items =>
      items
        .map(item =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter(item => item.count > 0)
    );
  };

  const addToCart = (pizza) => {
    setCartItems((prev) => {
      const exists = prev.find(item => item.id === pizza.id);
      if (exists) {
        return prev.map(item =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...pizza, count: 1 }];
      }
    });
  };

  const total = useMemo(() => cartItems.reduce((acc, item) => acc + item.price * item.count, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, increment, reduce, total, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// El hook useCart ahora está en useCart.js
