import styled from "styled-components";

export const BookName = styled.div`
  margin: 2vw 1vw 1vw 1vw;
  text-align: center;
  width: 100%;
  height: 10%;
  font-size: 400%;
`;

export const BookPageImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  & > img {
    width: 10%;
    height: 10%;
    animation-play-state: paused;
  }
`;
export const GifBox = styled.div`
  cursor: pointer;
  width: 20vw;
  height: 20vw;
  margin: 1vw;
  overflow: hidden;
  & > div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    & > div {
      width: 100%;
      height: 100%;
      object-fit: cover;

      & > canvas {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
