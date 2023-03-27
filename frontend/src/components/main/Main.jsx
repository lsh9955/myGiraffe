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
import DrawDiary from "assets/image/drawdiary.png";
import SketchBookImage from "assets/image/sketchbook.png";
import { Link } from "react-router-dom";

/**메인화면 컴포넌트 */
const Main = () => {
  return (
    <MainContainer>
      <FairyContent>
        <Link to="/booklist">
          <ImageContainer src={FairyImage} alt="동화나라" />
          <ContentName>동화나라</ContentName>
        </Link>
      </FairyContent>

      <DiaryContent>
        <Link to="/diarydraw">
          <ImageContainer src={DrawDiary} alt="그림일기" />
          <ContentName>그림일기</ContentName>
        </Link>
      </DiaryContent>

      <SketchContent>
        <Link to="/sketchdraw">
          <ImageContainer src={SketchBookImage} alt="스케치북" />
          <ContentName>스케치북</ContentName>
        </Link>
      </SketchContent>
    </MainContainer>
  );
};

export default Main;
