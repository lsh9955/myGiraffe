import React from "react";

import {
  MainContainer,
  FairyContent,
  DiaryContent,
  SketchContent,
  ContentName,
  ImageContainer,
} from "components/main/MainStyle";

import FairyImage from "assets/image/fairytale.png";

/**메인화면 컴포넌트 */
const Main = () => {
  return (
    <MainContainer>
      <FairyContent>
        <ImageContainer src={FairyImage} alt="동화나라" />
        <ContentName>동화나라</ContentName>
      </FairyContent>

      <DiaryContent>
        <ContentName>그림일기</ContentName>
      </DiaryContent>

      <SketchContent>
        <ContentName>스케치북</ContentName>
      </SketchContent>
    </MainContainer>
  );
};

export default Main;
