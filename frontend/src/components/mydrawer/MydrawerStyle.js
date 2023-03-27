/**책장 메인화면 컴포넌트 style */
import styled from "styled-components";

export const MydrawerContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const MydrawerListContainer = styled.div`
  width: auto;
  height: 30%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  border: 2px solid #000000;
`;

export const MydraweritemContainer = styled.div`
  position: relative;
  text-align: center;
`;

export const TextOverlay = styled.div`
  position: absolute;
  top: 35%;
  left: 40%;
  transform: translate(-35%, -40%);
  color: white;
  text-shadow: 1px 1px 2px black;
`;

export const Mydraweritemimage = styled.img`
  width: 200px;
  height: 292px;
`;

export const MySketchbookimage = styled.img`
  width: 400px;
  height: 274px;
`;

export const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
`;

export const TitleContainer = styled.p`
  font-size: 3rem;
  margin-top: 10px;
  margin-bottom: 20px;
`;
