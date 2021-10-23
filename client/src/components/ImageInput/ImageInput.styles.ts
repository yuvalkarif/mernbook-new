import styled from "styled-components";
import { TextBox, bigIcon } from "../styled/styledTheme";
import { Upload } from "@styled-icons/material-rounded";
export const LinkInput = styled.input`
  ${TextBox}
  width: 100%;
  margin-left: 0;
`;

export const UploadIcon = styled(Upload)`
  ${bigIcon}
  margin: .5rem;
  width: 100%;
  :hover {
    color: ${({ theme }) => theme.altAccent};
    cursor: pointer;
  }
`;
export const LinkContainer = styled.div`
  display: flex;
`;

export const ProfilePicBig = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 100%;
  width: 168px;
  height: 168px;

  border: 0.3rem solid ${({ theme }) => theme.containerBg};
  margin: 0 auto;
  margin-bottom: 1rem;
`;

export const Wrapper = styled.div``;
