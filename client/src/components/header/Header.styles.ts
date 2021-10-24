import styled from "styled-components";
import { bigIcon, WideButton } from "../styled/styledTheme";
import { Search, Logout } from "@styled-icons/material-rounded";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.div`
  max-width: 100%;
  background-color: ${({ theme }) => theme.containerBg};
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }

  padding: 0.2rem 0.5rem;
`;

export const HeaderProfile = styled.div`
  justify-self: flex-end;

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.btnText};
    margin-left: 0.25rem;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const HeaderSearch = styled.div`
  justify-self: center;
  width: 100%;
  margin-left: 0.5rem;
  div {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    ${WideButton}
    max-width: fit-content;
    border-radius: 2rem;
    padding: 0.3rem;
    span {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
`;

export const SearchIcon = styled(Search)`
  ${bigIcon}
  border-radius: 100%;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.btnBg};

  min-width: 1.5rem;
`;
export const LogoutIcon = styled(Logout)`
  ${bigIcon}
  ${WideButton}
  border-radius: 100%;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.btnBg};
  margin-left: 0.5rem;
  min-width: 1.5rem;
`;

export const ProfileButton = styled(Link)`
  ${WideButton}

  text-decoration: none;
  border-radius: 2.5rem;

  @media (max-width: 768px) {
    padding: 0;
    margin-left: 0.5rem;
  }
`;
