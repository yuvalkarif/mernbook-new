import styled from "styled-components";
import { bigIcon, smallIcon, TextBox, WideButton } from "../styled/styledTheme";
import { Search, Logout } from "@styled-icons/material-rounded";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.containerBg};
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }

  padding-block: 0.2rem;
`;

export const HeaderProfile = styled.div`
  justify-self: flex-end;
  margin-inline: 1rem;
  span {
    font-weight: 600;
    color: ${({ theme }) => theme.btnText};
    margin-left: 0.25rem;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
export const SearchInput = styled.input`
  ${TextBox}
  max-width: 20rem;
  max-height: 2.5rem;
  border-radius: 1.5rem;
  margin: 0 auto;
  padding-right: 2rem;
`;
export const HeaderSearch = styled.div`
  justify-self: center;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    ${WideButton}
    max-width: fit-content;
    padding: 0.5rem 0.5rem;
    span {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
`;

export const SearchIcon = styled(Search)`
  ${bigIcon}
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
