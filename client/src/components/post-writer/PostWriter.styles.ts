import styled from "styled-components";
import {
  bigIcon,
  Container,
  MediumImage,
  TextBox,
  WideButton,
} from "../styled/styledTheme";
import { Photo, Upload } from "@styled-icons/material-rounded";

export const WriterContainer = styled(Container).attrs(
  (props: { expanded?: Boolean }) => props
)`
  textarea {
    min-height: ${(props) => (props.expanded ? "6rem" : "0")};
  }
  margin-bottom: 1rem;
  & > div:last-of-type {
    margin-top: 0.5em;
    display: flex;
    flex-direction: ${(props) => (props.expanded ? "column" : "row")};
    justify-content: space-between;

    & > :last-child {
      margin-top: ${(props) => (props.expanded ? "1rem" : "0")};
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export const TopContainer = styled.div`
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.btnBg};
    > textarea {
      ${TextBox}
      font-weight: 500;
      font-size: 1.1rem;
      transition: min-height 250ms ease-out;
    }
  }
  & > img {
    margin: 0 auto;
    align-self: center;
    overflow: hidden;
    width: 100%;
  }
`;

export const WriterProfile = styled(MediumImage)``;

export const ActionButton = styled.button`
  ${WideButton}
  max-width:fit-content;

  padding: 0.5rem 1rem;
  span {
    /* overflow: hidden; */
    white-space: nowrap;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const PhotoIcon = styled(Photo)`
  ${bigIcon}
  color: ${({ theme }) => theme.altAccent};
  @media (max-width: 768px) {
    margin-right: 0 !important;
  }
`;
export const PostButton = styled.button.attrs(
  (props: { body?: boolean }) => props
)`
  ${WideButton}
  max-width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.accentBtnBg};
  color: ${({ theme }) => theme.accentBtnText};
  height: 100%;
  /* opacity: ${(props) => (props.body ? "1" : "0.2")}; */
  background-color: ${(props) =>
    props.body ? ({ theme }) => theme.accentBg : ({ theme }) => theme.greyedBg};
  color: ${(props) =>
    props.body
      ? ({ theme }) => theme.accentBtnText
      : ({ theme }) => theme.mainText};
`;
export const LinkInput = styled.input`
  ${TextBox}
  width: 100%;
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

export const LinkContainer = styled.div``;
