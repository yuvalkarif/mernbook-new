import { Auth } from "./interfaces";
import { createContext } from "react";
const UserContext = createContext<Auth>({});
export default UserContext;
