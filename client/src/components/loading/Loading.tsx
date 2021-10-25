import { SpinnerCircular } from "spinners-react";
import styled from "styled-components";

export const Loading = () => {
  return (
    <Wrapper>
      <SpinnerCircular
        size={70}
        thickness={150}
        speed={150}
        color="rgba(46, 137, 255, 1)"
        secondaryColor="rgba(0, 0, 0, 0.29)"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;
