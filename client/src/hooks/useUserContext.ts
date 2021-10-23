import UserContext from "../constants/context";
import { useContext } from "react";
import { Auth } from "../constants/interfaces";

export const useUserContext = () => {
  const user = useContext<Auth>(UserContext);
  return user;
};
