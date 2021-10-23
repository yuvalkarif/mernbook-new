import React, { useState } from "react";
import * as styled from "./Login.styles";
import { FormError } from "../styled/styledTheme";
import { login } from "../../helpers/api";
import { useError } from "../../hooks/useError";
import { Account } from "../../constants/interfaces";
import { useHistory } from "react-router";
import { useTitle } from "../../hooks/useTitle";

export const Login = ({
  checkForUser,
}: {
  checkForUser: () => Promise<void>;
}) => {
  useTitle("Login | Mernbook");
  const [error, checkError] = useError();
  const history = useHistory();
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const handleGuest = () => {
    setAccount({ username: "yuvalkarif", password: "asdf" });
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (account) {
      try {
        const checkLogin = await login(account);
        if (checkLogin) {
          await checkForUser();
          history.push("/");
        }
      } catch (e: unknown) {
        checkError(e);
      }
    }
  };
  const handleSignup = () => {
    history.push("/signup");
  };
  return (
    <>
      <styled.Wrapper>
        <styled.Container>
          <div>
            <h1>Mernbook</h1>
            <p>Connect with friends and the web around you on Mernbook.</p>
          </div>
          <styled.Main className="Main">
            <form onSubmit={handleSubmit}>
              {error && <FormError>{error}</FormError>}
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
                value={account.username}
              ></input>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                value={account.password}
              ></input>
              <styled.AccentButton type="submit">Log In</styled.AccentButton>
              <styled.OutlineButton type="button" onClick={handleGuest}>
                Log In as Guest
              </styled.OutlineButton>
            </form>
            <styled.AltAccentButton type="button" onClick={handleSignup}>
              Create New Account
            </styled.AltAccentButton>
          </styled.Main>
        </styled.Container>
      </styled.Wrapper>
    </>
  );
};
