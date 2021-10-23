import styled, { css } from "styled-components";

export const Button = styled.button`
  color: ${({ theme }) => theme.btnText};
  background-color: ${({ theme }) => theme.btnBg};
  border-radius: 0.3rem;
  padding: 0.7rem;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }
`;
export const Wrapper = styled.div`
  width: 90%;
  max-width: 60rem;
  margin: 0 auto;
  font-size: 1rem;
`;

export const Container = styled.div`
  /* box-shadow: 0 1rem 4rem 0 rgba(00, 00, 00, 0.1); */
  border-radius: 0.8rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.containerBg};
`;
export const FormError = styled.p`
  color: ${({ theme }) => theme.errorText};
  margin: 0;
  text-align: center;
`;
export const BigImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 100%;
`;
export const MediumImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    filter: brightness(115%);
  }
`;
export const SmallImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 100%;
`;

export const TextBox = css`
  line-height: inherit;
  max-width: 100%;
  width: 100%;
  resize: none;
  box-sizing: border-box;
  border-radius: 1rem;
  border: none;
  margin-left: 0.5em;
  padding: 0.5rem 0.75rem;
  background: ${({ theme }) => theme.btnBg};
  color: ${({ theme }) => theme.btnText};
  :focus {
    outline: none;
  }
`;
export const WideButton = css`
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.containerBg};
  color: ${({ theme }) => theme.mainText};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0;
  border-radius: 0.5em;
  & :first-child {
    margin-right: 0.5ch;
  }
  &:hover {
    filter: brightness(125%);
    cursor: pointer;
  }
`;

export const smallIcon = css`
  fill: ${({ theme }) => theme.btnTxt};
  max-width: 1rem;
  max-height: 1rem;
`;
export const bigIcon = css`
  fill: ${({ theme }) => theme.mainTxt};
  max-width: 1.5rem;
  max-height: 1.5rem;
`;
