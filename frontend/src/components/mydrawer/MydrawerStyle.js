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
  width: 200px;
  height: 292px;
  margin: 10px;
`;

export const Mydraweritemimage = styled.img`
  width: 200px;
  height: 292px;
`;
