import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../assets/css/home.css";
import CardPizza from "../components/CardPizza"; // ✅ Usamos el componente correcto
import { usePizzas } from "../context/usePizzas";

const Pizza = () => {
  const { id } = useParams();
  const { getPizzaById, loading } = usePizzas();
  const pizza = getPizzaById(id);

  return (
    <>
      <Header />
      <div className="marco">
        {loading ? (
          <p>Cargando pizza...</p>
        ) : pizza ? (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            img={pizza.img}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
          />
        ) : (
          <p>Pizza no encontrada.</p>
        )}
      </div>
    </>
  );
};

export default Pizza;
