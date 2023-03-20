/**상단바 컴포넌트 style*/
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 15vh;
  background: #8bd0fc;

  // 네브바에 들어갈 이미지 파일
  & div {
    width: 10vw;
    height: 12vh;
  }

  // 네브바에 들어갈 서비스명
  & p {
  }
`;
