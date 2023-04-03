import React from "react";
import * as P from "./PaletteStyle";
import revert from "assets/icon/revert.svg";
import pencil from "assets/icon/pencil.png";
const Palette = ({
  colors,
  handleChangeComplete,
  handleExport,
  handleRevert,
  handleThick,
  brush,
  canvas,
}) => {
  return (
    <>
      <P.Container>
        <P.EditBox>
          <P.PencilBox>
            <P.Pencil src={pencil} />
            <input
              min="2"
              max="50"
              type="range"
              onChange={(event) => {
                handleThick(event.target.value);
              }}
            />
            <P.Thickness brush={brush} canvas={canvas} />
          </P.PencilBox>
          <P.Revert
            src={revert}
            onClick={() => {
              handleRevert();
            }}
          />
        </P.EditBox>
        <P.ColorBox>
          {colors.map((v) => {
            return (
              <P.Colors
                color={v}
                onClick={() => {
                  handleChangeComplete(v);
                }}
              />
            );
          })}
        </P.ColorBox>
        <P.Fin
          onClick={() => {
            handleExport();
          }}
        >
          완료하기
        </P.Fin>
      </P.Container>
    </>
  );
};

export default Palette;
