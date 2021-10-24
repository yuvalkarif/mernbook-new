import styled from "styled-components";
import { Container, TextBox, Button, BigImage } from "../styled/styledTheme";
import { Search } from "@styled-icons/material-rounded";

export const SearchBar = styled.input`
  ${TextBox}
  font-size: 1.25rem;
  font-weight: 600;
  padding-inline: 1.5rem;
  margin: 0;
  border-radius: 1.5rem;
`;

export const SearchContainer = styled(Container)`
  margin-top: 1rem;
  div {
    display: flex;
    position: relative;
  }

  h1 {
    margin-top: 0;

    margin-bottom: 1rem;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.btnBg};
  }
`;

export const SearchButton = styled(Search)`
  color: ${({ theme }) => theme.accentBtnText};
  border-radius: 1.75rem;
  position: absolute;
  right: 0.25rem;
  padding: 0.5rem;
  max-height: 2rem;
  &:hover {
    color: ${({ theme }) => theme.accentBtnBg};
    cursor: pointer;
  }
`;

export const BigAvatar = styled(BigImage)``;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.btnBg};
  padding: 1rem 0.5rem;
  width: 100%;
  cursor: pointer;
  div {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
    width: 100%;

    span:first-of-type {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.accentBtnText};
    }
    span:last-of-type {
      font-size: 0.9rem;
    }
  }
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  &:first-of-type {
    max-width: 10rem;
  }
  &:last-of-type {
    max-width: 15rem;
  }
`;
