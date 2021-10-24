import React, { useState } from "react";
import * as styled from "./Signup.styles";
import { Account } from "../../constants/interfaces";
import { login, signup } from "../../helpers/api";
import { FormError } from "../styled/styledTheme";
import { useError } from "../../hooks/useError";
import { useTitle } from "../../hooks/useTitle";
import { useHistory } from "react-router";

export const Signup = ({
  checkForUser,
}: {
  checkForUser: () => Promise<void>;
}) => {
  useTitle("Login | Mernbook");
  const history = useHistory();
  const [account, setAccount] = useState<Account>({
    username: "",
    displayname: "",
    password: "",
  });
  const [error, checkError] = useError();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (account) {
      let response;
      try {
        response = await signup(account);

        if (response) {
          const checkLogin = await login(account);

          if (checkLogin) {
            await checkForUser();
            history.push("/");
          }
        }
      } catch (e: unknown) {
        checkError(e);
      }
    }
  };
  const handleToLogin = () => {
    history.push("/login");
  };
  return (
    <>
      <styled.Wrapper>
        <styled.Container>
          <styled.Main className="Main">
            <div>
              <h2>Create a new Account</h2>
              <p> it's quick and easy.</p>
              {error && <FormError>{error}</FormError>}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
              ></input>
              <input
                type="text"
                id="displayname"
                placeholder="Display Name (will be shown to others)"
                onChange={(e) =>
                  setAccount({ ...account, displayname: e.target.value })
                }
              ></input>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
              ></input>
              <styled.AccentButton type="submit">Sign Up</styled.AccentButton>
            </form>
            <styled.AltAccentButton type="button" onClick={handleToLogin}>
              Already have an account?
            </styled.AltAccentButton>
          </styled.Main>
        </styled.Container>
      </styled.Wrapper>
    </>
  );
};
