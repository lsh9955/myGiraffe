/**기본 모달창 컴포넌트 style */
import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 35vw;
  height: 40vh;
  background: #ffffff;
  top: 50%;
  left: 50%;
  border: 3px solid #ff8f5c;
  border-radius: 20px;
  box-shadow: 5px 5px;
  z-index: 9999; /* 최상위로 설정 */
`;
