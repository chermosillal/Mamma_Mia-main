import "../assets/css/card.css";
import { useCart } from "../context/useCart"; // Importa el hook desde el nuevo archivo
import { Link } from "react-router-dom";

const CardPizza = (props) => {
  const { addToCart } = useCart(); // Usa la función del contexto

  const handleAdd = () => {
  const { id, name, price, img } = props;
  addToCart({ id, name, price: Number(price), img }); // Asegura que price sea número
  };

  return (
    <div className="card">
      <img className="foto" src={props.img} alt={props.name} />
      <div className="nombre">
        <h2>Pizza {props.name} <i className="fas fa-pizza-slice"></i></h2>
      </div>
      <div className="linea"></div>
      <p className="tituloIngredientes">Ingredientes:</p>
      <div className="listaIngredientes">
        <ul className="ingredientes">
          {Array.isArray(props.ingredients) ? (
            props.ingredients.map((ingredient, index) => (
              <li key={index}>🍕{ingredient}</li>
            ))
          ) : (
            <li>Ingredientes no disponibles</li>
          )}
        </ul>
      </div>
      <div className="linea"></div>
      <p className="precio">Precio: $ {props.price.toLocaleString("es-CL")}</p>
      <div className="botones">
        <Link to={`/pizza/${props.id}`}>
          <button className="btnVermas">
            <i className="fas fa-eye"></i> Ver más
          </button>
        </Link>
        <button className="btnAdd" onClick={handleAdd}>
          <i className="fas fa-shopping-cart"></i> Añadir
        </button>
      </div>
    </div>
  );
};

export default CardPizza;
