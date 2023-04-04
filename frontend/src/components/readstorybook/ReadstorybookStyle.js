/**읽고 있는 동화책 컴포넌트 style*/

import styled from "styled-components";
import bookBackground from "assets/image/bookBackground.png";
import bookTextBackground from "assets/image/bookTextBackground.png";
export const Book = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0% 1.5% 0.5% 1.5%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${bookBackground});
`;

export const PageInput = styled.input`
  display: none;
  &:checked ~ .flip-book #${(props) => props.targetLabel} {
    transform: rotateY(-180deg);
    z-index: ${(props) => Number(props.pageIdx)};
  }
`;

export const Cover = styled.div`
  width: 50%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${bookTextBackground});

  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
  }
  & > div {
    padding: 5% 5%;
    font-size: 300%;
    width: 200%;
    white-space: pre-wrap;
  }
`;
export const FlipBook = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  perspective: 1500px;
`;

export const Flip = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: left;
  transform-style: preserve-3d;
  transform: rotateY(0deg);

  transition: ${(props) => (props.isRendered === false ? "0s" : "0.5s")};
  color: #000;
  z-index: ${(props) => 2 - Number(props.pageIdx)};
`;

export const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${bookTextBackground});
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  & > label {
    position: absolute;
    top: 50%;
    right: 0%;
    cursor: pointer;
    color: black;
    & > svg {
      width: 50px;
      height: 50px;
      & > path {
        fill: black;
        stroke: #ffffff;
        stroke-width: 0.5px;
        stroke-dasharray: 0;
        stroke-linejoin: round;
      }
    }
  }

  & div {
    width: 100%;
    white-space: pre-wrap;

    font-size: 500%;
    padding: 10% 10%;
    position: relative;
  }
`;
export const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(${bookTextBackground});
  overflow: hidden;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  background-color: #ffffff;
  & > label {
    position: absolute;
    top: 50%;
    left: 0%;
    cursor: pointer;
    color: black;
    & > svg {
      width: 50px;
      height: 50px;
      & > path {
        fill: black;
        stroke: #ffffff;
        stroke-width: 0.5px;
        stroke-dasharray: 0;
        stroke-linejoin: round;
      }
    }
  }
  & > img {
    position: relative;
    width: 100%;
    height: 100%;
  }
  & div {
    width: 200%;

    font-size: 300%;
    padding: 5% 5%;
    position: relative;
  }
  & button {
    position: absolute;
    background-color: white;
    width: 30%;
    height: 8%;
    border-radius: 20px;
    top: 50%;
    left: 35%;
    color: black;
    font-size: 250%;
  }
`;

export const NextBtn = styled.label`
  position: absolute;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
  color: #000;
`;

export const FindKey = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 70%;
  left: 5%;
  width: 40%;
  height: 20%;
  z-index: 30;
  flex-direction: row;
  & > button {
    width: 30%;
    height: 50%;
    font-size: 300%;

    background-color: white;
    border-radius: 4px;
    :hover {
      background-color: gray;
    }
  }
`;
export const TrashBox = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  top: 60%;
  left: 12%;
  width: 20%;
  height: 20%;
  z-index: 30;
`;

export const TrashClick = styled.div`
  position: absolute;
  display: flex;

  top: 55%;
  left: 18%;
  width: 20%;
  height: 20%;
  z-index: 20;
  & > div {
    color: white;
    font-size: 500%;
    text-align: left;
  }
`;

export const EndButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  bottom: 10%;
  left: 30%;
  width: 50%;
  font-size: 500%;
  height: 10%;
  background-color: white;
  z-index: 20;
  border-radius: 20px;
  :hover {
    background-color: gray;
  }
`;

export const TeachersPicture = styled.img`
  width: 150px;
  height: auto;
`;

export const ModalPicture = styled.img`
  width: 600px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TeachersBall = styled.img`
  width: 130px;
  height: auto;
`;

export const ModalBall = styled.img`
  width: 400px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TeachersRose = styled.img`
  width: 100px;
  height: auto;
`;

export const ModalRose = styled.img`
  width: 250px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TeachersItemPositionPicture = styled.div`
  position: absolute;
  display: flex;
  top: 47%;
  left: 8%;
  z-index: 20;
`;

export const TeachersItemPositionBall = styled.div`
  position: absolute;
  display: flex;
  top: 75%;
  left: 28%;
  z-index: 20;
`;

export const TeachersItemPositionRose = styled.div`
  position: absolute;
  display: flex;
  top: 38%;
  left: 38%;
  z-index: 20;
`;
