/**책장 메인화면 컴포넌트 style */
import styled from "styled-components";
import lock from "assets/icon/lock.png";

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

  top: 30%;

  width: 90%;
  max-height: 40%;
  /* transform: translate(-35%, -40%); */
  color: white;
  text-shadow: 1px 1px 2px black;
  & > div {
    width: 100%;
    max-height: 40%;
    font-size: 200%;
    margin-bottom: 5%;
  }
  & > p {
    width: 100%;
    font-size: 1vw;
  }
`;

export const Mydraweritemimage = styled.img`
  width: 90%;
  /* width: 200px;
  height: 292px; */
`;

export const MySketchbookimage = styled.img`
  width: 90%;
  height: 50vh;
  border-radius: 40px;
  margin-bottom: 3vh;
  cursor: pointer;
  :hover {
    box-shadow: 5px 5px 5px gray;
  }
  /* width: 400px;
  height: 274px; */
`;

export const Container = styled.div`
  width: 70%;
  height: 80%;
  margin: 0 auto;
  margin-top: 10vh;
`;

export const TitleContainer = styled.p`
  font-size: 4rem;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const BeforeBtn = styled.div`
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  font-size: 30px;
  display: block;
  width: 20px;
  height: 20px;
  padding: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
`;
export const AfterBtn = styled.div`
  font-size: 0;
  line-height: 0;
  font-size: 30px;
  position: absolute;
  top: 50%;
  display: block;
  width: 20px;
  height: 20px;
  padding: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
`;

export const ImgTitle = styled.div`
  width: 90%;
  font-size: 230%;
`;
export const ImgP = styled.p`
  width: 90%;
  font-size: 150%;
`;

export const LockImg = styled.img`
  position: absolute;
  z-index: 3;
  top: 35%;
  left: 30%;
  cursor: pointer;
`;
export const MySketchbookLockimage = styled.div`
  width: 90%;
  height: 50vh;
  margin-bottom: 3vh;
  border-radius: 40px;
  padding: 45% 0 0 30%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
  cursor: pointer;
  filter: brightness(50%);
  z-index: -1;
  :hover {
    box-shadow: 5px 5px 5px gray;
  }
`;
export const Lock = styled.img`
  width: 30%;
  height: auto;
  position: absolute;
  top: 35%;
  left: 30%;
  z-index: 10;
  cursor: pointer;
`;
export const MySketchbookLockContainer = styled.div``;
