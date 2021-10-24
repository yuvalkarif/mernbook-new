import styled, { css } from "styled-components";
import { School } from "@styled-icons/material-rounded/School";
import { LocationOn } from "@styled-icons/material-rounded/LocationOn";
import { AccessTime } from "@styled-icons/material-rounded/AccessTime";
import { Edit } from "@styled-icons/material-rounded";
import { BirthdayCake } from "@styled-icons/fa-solid";
import { Button, Container, TextBox } from "../styled/styledTheme";
import { Work, PersonAdd } from "@styled-icons/material-rounded";

export const ProfilePicBig = styled.img`
  display: block;
  border-radius: 100%;
  width: 168px;
  height: 168px;
  object-fit: cover;
  border: 0.3rem solid ${({ theme }) => theme.containerBg};
`;

export const HeaderContainer = styled.section`
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;

    h1,
    p {
      margin: 0;
    }
    padding-bottom: 1em;
    border-bottom: 1px solid ${({ theme }) => theme.btnBg};
  }
  background: linear-gradient(
      to top,
      rgb(36, 37, 38),
      rgb(36, 37, 38),
      rgb(36, 37, 38),
      rgba(36, 37, 38, 0.9),
      rgba(36, 37, 38, 0.7),
      rgba(36, 37, 38, 0.4),
      rgba(36, 37, 38, 0)
    ),
    ${({ theme }) => theme.btnBg};
`;
export const BarContainer = styled.div`
  background-color: ${({ theme }) => theme.containerBg};
  & > div {
    &:first-child {
      display: flex;
      justify-content: space-between;
      width: 90%;
      align-items: center;

      div {
        display: flex;
      }

      span {
        padding: 1rem;
        display: inline-block;
        font-weight: 600;
        font-size: 0.9rem;
        background-color: ${({ theme }) => theme.containerBg};
        border-radius: 0.3rem;

        &:hover {
          cursor: pointer;
          filter: brightness(110%);
        }
      }
    }
  }
`;

export const AboutContainer = styled(Container)`
  display: flex;
  flex-direction: column;

  span {
    display: flex;
    align-items: bottom;
    font-weight: 500;
    strong {
      margin-left: 0.5ch;
      font-weight: 600;
      color: ${({ theme }) => theme.btnText};
    }
  }
`;
const miniIcon = css`
  fill: ${({ theme }) => theme.btnTxt};
  max-width: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
  max-height: 1.5rem;
  margin-right: 0.5em;
  display: flex;
`;
export const EduIcon = styled(School)`
  ${miniIcon}
`;
export const LocationIcon = styled(LocationOn)`
  ${miniIcon}
`;
export const TimeIcon = styled(AccessTime)`
  ${miniIcon}
`;
export const BirthdayIcon = styled(BirthdayCake)`
  ${miniIcon}
`;
export const WorkIcon = styled(Work)`
  ${miniIcon}
`;
export const EditIcon = styled(Edit)`
  ${miniIcon}
  min-height: 1.1rem;
  max-height: 1.1rem;
  margin: 0;
`;
export const PersonAddIcon = styled(PersonAdd)`
  ${miniIcon}
  min-height: 1.1rem;
  max-height: 1.1rem;
  margin: 0;
`;

export const ProfileBody = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  & > :nth-child(1) {
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > :nth-child(1) {
      width: 100%;
      max-width: min(40.5rem, 35%);
      height: fit-content;
    }
    & > :nth-child(2) {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
      max-width: min(40.5rem, 65%);
      width: 100%;
    }
  }
`;

export const EditorWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 100%;
  z-index: 2;
  .react-datepicker-wrapper {
    position: relative;
  }
`;
export const EditorContainer = styled(Container)`
  margin: 0 auto;
  margin-top: 2rem;
  max-width: 680px;
  width: 90%;
  display: flex;
  flex-direction: column;
  h2 {
    color: ${({ theme }) => theme.accentBtnText};
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.btnBg};
    padding-bottom: 0.5rem;
  }
  h3 {
    color: ${({ theme }) => theme.accentBtnText};
    font-weight: 600;
  }
  textarea {
    ${TextBox}
    font-weight: 500;
    font-size: 1.1rem;
    transition: min-height 250ms ease-out;
    margin-left: 0;
    display: flex;
  }
  .edit-about {
    display: flex;
    flex-direction: column;
    span {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      p {
        min-width: 4.5rem;
      }
    }
  }
  .edit-btns {
    display: flex;
    justify-content: center;
  }
`;

export const InputEdit = styled.input`
  ${TextBox};

  width: 100%;
`;

export const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.accentBtnBg};
  color: ${({ theme }) => theme.accentBtnText};
  margin: 0 0.5rem;
`;
export const ExitButton = styled(Button)`
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.accentBtnBg};
  color: ${({ theme }) => theme.accentBtnBg};
  margin: 0 0.5rem;
`;

export const ProfileWrapper = styled.div`
  position: relative;
`;

export const EditButton = styled(Button)`
  background-color: ${({ theme }) => theme.accentBtnBg};
  color: ${({ theme }) => theme.accentBtnText};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;
