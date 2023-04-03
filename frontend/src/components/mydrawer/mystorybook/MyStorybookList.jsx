import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/**내 동화책 리스트 컴포넌트 */
import axios from "axios";
import Slider from "react-slick";
import {
  MydraweritemContainer,
  Mydraweritemimage,
  Container,
  TextOverlay,
  TitleContainer,
  BeforeBtn,
  AfterBtn,
} from "components/mydrawer/MydrawerStyle";
//mui아이콘 중 방향 버튼 아이콘을 가져
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// Slick Carousel 스타일을 가져옵니다.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bookimage1 from "assets/bookimage/1.png";
import bookimage2 from "assets/bookimage/2.png";
import bookimage3 from "assets/bookimage/3.png";
import bookimage4 from "assets/bookimage/4.png";
import bookimage5 from "assets/bookimage/5.png";
import bookimage6 from "assets/bookimage/6.png";
import bookimage7 from "assets/bookimage/7.png";
import bookimage8 from "assets/bookimage/8.png";
import bookimage9 from "assets/bookimage/9.png";

const MyStorybookList = () => {
  // axios로 내 동화책 데이터 불러오기
  const bgImg = [
    bookimage1,
    bookimage2,
    bookimage3,
    bookimage4,
    bookimage5,
    bookimage6,
    bookimage7,
    bookimage8,
    bookimage9,
  ];
  const userSeq = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    const fetchBooks = async () => {
      await axios
        .get(
          "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/mybook",
          {
            headers: {
              Authorization: userSeq,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setDatas(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchBooks();
  }, []);

  // 내 동화책 item 컴포넌트로 내려줄 데이터
  const [datas, setDatas] = useState([]);

  // 이전 버튼 스타일
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    console.log(style);
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
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <>
      <Container>
        <TitleContainer>내 동화책</TitleContainer>
        <Slider {...settings}>
          {datas.map((data, idx) => (
            <MydraweritemContainer>
              <Link to={`/mybookdetail/${data.id}`}>
                <Mydraweritemimage src={bgImg[idx % 9]} />
                <TextOverlay>
                  <div>{data.title}</div>
                  <p>{data.date}</p>
                </TextOverlay>
              </Link>
            </MydraweritemContainer>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default MyStorybookList;
