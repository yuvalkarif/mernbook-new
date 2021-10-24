import { useState, useEffect } from "react";
import { Auth } from "../constants/interfaces";
import { checkUser } from "../helpers/api";
export const useAuth = () => {
  const [auth, setAuth] = useState<Auth>({});
  useEffect(() => {
    if (!auth.isAuth) {
      console.log("Checking for user");
      checkForUser();
    }
  });
  const checkForUser = async () => {
    let req;
    try {
      req = await checkUser();
      console.log("Auth Succeeded");
      setAuth({ user: req, isAuth: true, checkForUser: checkForUser });
    } catch (error) {
      console.log("Auth Failed");
      setAuth({ isAuth: false });
    }
  };
  return [auth, checkForUser] as const;
};
