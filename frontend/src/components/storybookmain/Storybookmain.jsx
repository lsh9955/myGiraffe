import React from "react";
import Slider from "react-slick";
import {
  MydraweritemContainer,
  MySketchbookimage,
  Container,
  TitleContainer,
  BeforeBtn,
  AfterBtn,
  ImgTitle,
  ImgP,
  LockImg,
  MySketchbookLockimage,
} from "./StorybookmainStyle";
import lock from "assets/icon/lock.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
/**동화책 선택 컴포넌트 */
const Storybookmain = ({ bookData }) => {
  // 이전 버튼 스타일
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <BeforeBtn className={className} onClick={onClick}>
        <KeyboardArrowLeftIcon
          sx={{
            color: "black",
            position: "absolute",
            top: "-100%",
            left: "-150%",
            fontSize: "200%",
          }}
        />
      </BeforeBtn>
    );
  };

  // 다음 버튼 스타일
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <AfterBtn className={className} onClick={onClick}>
        <KeyboardArrowRightIcon
          sx={{
            color: "black",
            position: "absolute",
            top: "-100%",
            right: "-50%",
            fontSize: "200%",
          }}
        />
      </AfterBtn>
    );
  };

  // Slick Carousel 설정을 정의
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <Container>
      <TitleContainer>읽고 싶은 동화를 선택해주세요!</TitleContainer>
      <Slider {...settings}>
        {bookData?.map((data, idx) => (
          <MydraweritemContainer>
            {idx === 2 && <LockImg src={lock} />}
            {idx === 2 ? (
              <MySketchbookLockimage src={data.img} />
            ) : (
              <MySketchbookimage src={data.img} />
            )}
            <ImgTitle>{data.title}</ImgTitle>
          </MydraweritemContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default Storybookmain;
