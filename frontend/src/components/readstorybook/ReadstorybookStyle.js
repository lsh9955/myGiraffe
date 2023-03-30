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
  }
`;
export const FlipBook = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  perspective: 1500px;
`;

export const Filp = styled.div`
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

    font-size: 300%;
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
`;

export const NextBtn = styled.label`
  position: absolute;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
  color: #000;
`;
