import { useContext, useEffect, useState } from 'react';
import { PizzaContext } from './PizzaContextDef';

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener pizzas:", err);
        setLoading(false);
      });
  }, []);

  const getPizzaById = (id) => pizzas.find(p => p.id === id);

  return (
    <PizzaContext.Provider value={{ pizzas, loading, getPizzaById }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzas = () => useContext(PizzaContext);
