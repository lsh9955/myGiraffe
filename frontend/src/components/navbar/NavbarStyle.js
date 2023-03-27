/**상단바 컴포넌트 style*/
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 10vh;
  background: #8bd0fc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  width: auto;
  height: 10vh;
`;

export const ServiceName = styled.p`
  margin-left: 1vw;
  width: auto;
  font-size: 8vh;
  height: 8vh;
  color: #fce76c;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const RightMargin = styled.div`
  width: 64px;
`;
