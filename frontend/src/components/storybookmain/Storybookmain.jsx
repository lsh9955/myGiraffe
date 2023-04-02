import React, { useState } from "react";
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
  Lock,
  MySketchbookLockContainer,
} from "./StorybookmainStyle";
import lock from "assets/icon/lock.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BookInfo from "components/modal/bookInfo_modal/BookInfo";
/**동화책 선택 컴포넌트 */
const Storybookmain = ({ bookData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
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

  //클릭시 책 소개 페이지 나타남
  const bookInfoShowHandler = (data) => {
    //책 소개 모달창 나타낼것
    setIsOpen(true);
  };
  //모달 창 열렸는지 확인
  const openCheck = (e) => {
    if (e != isOpen) {
      setIsOpen(e);
    }
  };

  return (
    <Container>
      <BookInfo isOpen={isOpen} openCheck={openCheck} data={data} />
      <TitleContainer>읽고 싶은 동화를 선택해주세요!</TitleContainer>
      <Slider {...settings}>
        {bookData?.map((data, idx) => (
          <MydraweritemContainer
            onClick={() => {
              bookInfoShowHandler(data);
            }}
          >
            {idx === 2 ? (
              // 아직 구입하지 않은 책
              <MySketchbookLockContainer
                onClick={() => {
                  bookInfoShowHandler(data);
                  setData(data);
                }}
              >
                <MySketchbookLockimage bgImg={data.thumbnailImgUrl} />
                <Lock src={lock} />
              </MySketchbookLockContainer>
            ) : (
              // 구입한 책
              <MySketchbookimage
                src={data.thumbnailImgUrl}
                onClick={() => {
                  bookInfoShowHandler(idx);
                  setData(data);
                }}
              />
            )}
            <ImgTitle>{data.title}</ImgTitle>
          </MydraweritemContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default Storybookmain;
