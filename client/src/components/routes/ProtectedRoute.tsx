import { HTMLAttributes, useContext } from "react";
import UserContext from "../../constants/context";
import { Redirect, Route } from "react-router";
interface prProps extends HTMLAttributes<HTMLDivElement> {
  path?: string;
  exact?: true;
  alt?: true;
}

const ProtectedRoute = ({ children, alt, ...rest }: prProps) => {
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user.isAuth === true) {
          console.log("Routed Successfully");
          return alt ? (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          ) : (
            children
          );
        } else if (user.isAuth === false) {
          console.log("Routed Failed");
          return alt ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
