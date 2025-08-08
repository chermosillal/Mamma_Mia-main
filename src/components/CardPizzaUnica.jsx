import "../assets/css/card.css";

const CardPizzaUnica = (props) => {
  return (
  <div className="card2">
      <img className="foto" src={props.img} alt={props.name} />
      <div className="nombre"><h2 >Pizza {props.name} <i className="fas fa-pizza-slice"></i></h2></div>
      <div className="linea"></div>
      <div className="desc">{props.desc}</div>
      <div className="linea"></div>
      <p className="tituloIngredientes">Ingredientes:</p>
      <div className="listaIngredientes">
        <ul className="ingredientes">
          {Array.isArray(props.ingredients) ? (props.ingredients.map((ingredients, index) => (
          <li key={index}>🍕{ingredients}</li>
          ))
          ) : (<li>Ingredientes no disponibles</li>)}
        </ul>
      </div>
      <div className="linea"></div>
      <p className="precio">Precio: $ {props.price.toLocaleString("es-CL")}</p>
      <div className="botones">
        <button className="btnVermas"><i className="fas fa-eye"></i> Ver más</button>
        <button className="btnAdd"><i className="fas fa-shopping-cart"></i> Añadir</button>
      </div>
  </div>
  )
}

export default CardPizzaUnica