/**팔레트 style*/
import styled from "styled-components";

export const Container = styled.div`
  width: 20%;
  height: 476px;
  border-radius: 20px;
  border: 2px solid #fce76c;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Colors = styled.div`
  width: 45%;
  height: 14%;
  border-radius: 2px;
  box-shadow: 2px 1px 1px grey;
  background-color: ${(props) => props.color};
`;

export const ColorBox = styled.div`
  width: 90%;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 2px solid grey;
  background-color: #ffffff;
  padding: 5% 5%;
  margin: 5% 0;
`;

export const Fin = styled.div`
  width: 80%;
  height: 8%;
  display: flex;
  text-align: center;
  border-radius: 3px;
  align-items: center;
  justify-content: space-evenly;
  font-size: 200%;
  background-color: #fce76c;
`;

export const EditBox = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 5%;
`;
export const PencilBox = styled.div`
  height: auto;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > input {
    width: 100%;
    height: 5%;
  }
`;
export const Revert = styled.img`
  height: auto;
  width: 30%;
`;
export const Pencil = styled.img`
  height: auto;
  width: 50%;
`;
export const Thickness = styled.div`
  width: ${(props) => props.brush + "px"};
  background: ${(props) => props.canvas};
`;
