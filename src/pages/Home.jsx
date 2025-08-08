import { usePizzas } from "../context/usePizzas";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import "../assets/css/home.css";

const Home = () => {
  const { pizzas, loading } = usePizzas();

  return (
    <>
      <Header />
      <div className="marco">
        {loading ? (
          <p>Cargando pizzas...</p>
        ) : (
          pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              id={pizza.id}
              img={pizza.img}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;



