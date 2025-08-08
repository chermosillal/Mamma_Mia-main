import { useContext } from "react";
import { UserContext } from "./UserContextDef";

export const useUser = () => useContext(UserContext);
