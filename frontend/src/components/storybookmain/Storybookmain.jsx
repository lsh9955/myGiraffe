import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useSelector } from "react-redux";

/**동화책 선택 컴포넌트 */
const Storybookmain = ({ bookData }) => {
  const userSeq = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [userBook, setUserBook] = useState(null);
  const [bookBuyCheck, setBookBuyCheck] = useState(false);
  //유저가 가진 책 정보 가져오기
  const haveBook = async () => {
    const book = await axios.get(
      "https://j8b201.p.ssafy.io/api/members/scenarios",
      {
        headers: {
          Authorization: userSeq.accessToken,
        },
      }
    );
    const bookContent = book;
    console.log(
      bookContent.data.content.map((v) => {
        return v.scenarioId;
      })
    );
    setUserBook(
      bookContent.data.content.map((v) => {
        return v.scenarioId;
      })
    );
  };
  useEffect(() => {
    haveBook();
    //책 구입시도 실행시킬 것
  }, [bookBuyCheck]);
  //책 구입시 실행
  const buyHandler = () => {
    setBookBuyCheck(!bookBuyCheck);
  };

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
      <BookInfo
        isOpen={isOpen}
        openCheck={openCheck}
        data={data}
        userBook={userBook}
        buyHandler={buyHandler}
      />
      <TitleContainer>읽고 싶은 동화를 선택해주세요!</TitleContainer>
      <Slider {...settings}>
        {bookData?.map((clickdata, idx) => (
          <MydraweritemContainer
            onClick={() => {
              bookInfoShowHandler(clickdata);
            }}
          >
            {userBook?.indexOf(clickdata.scenarioId) === -1 ? (
              // 아직 구입하지 않은 책
              <MySketchbookLockContainer
                onClick={() => {
                  bookInfoShowHandler(clickdata);
                  setData(clickdata);
                }}
              >
                <MySketchbookLockimage bgImg={clickdata.thumbnailImgUrl} />
                <Lock src={lock} />
              </MySketchbookLockContainer>
            ) : (
              // 구입한 책
              <MySketchbookimage
                src={clickdata.thumbnailImgUrl}
                onClick={() => {
                  bookInfoShowHandler(idx);
                  setData(clickdata);
                }}
              />
            )}
            <ImgTitle>{clickdata.title}</ImgTitle>
          </MydraweritemContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default Storybookmain;
