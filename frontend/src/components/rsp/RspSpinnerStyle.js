import styled from "styled-components";

export const SpinnerPosition = styled.div`
  display: ${(props) => (props.showSpinner ? "inline" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SpinnerStyle = styled.div`
  height: 10px;
  width: 100px;
`;
