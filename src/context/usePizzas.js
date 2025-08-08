import { useContext } from "react";
import { PizzaContext } from "./PizzaContextDef";

export const usePizzas = () => useContext(PizzaContext);
