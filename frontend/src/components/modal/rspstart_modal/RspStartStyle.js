/**가위바위보 게임 스타트 모달창 컴포넌트 style */
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

export const ModalHeader = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff8f5c;
`;

export const ModalHeaderContent = styled.p`
  width: auto;
  font-size: 80%;
  color: #ffffff;
`;

export const ModalBody = styled.div`
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
`;

export const ModalBodyContnet = styled.p`
  margin: 10%;
  font-size: 10%;
`;

export const ModalFooter = styled.div`
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`;
