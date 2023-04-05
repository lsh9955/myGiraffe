import React, { useEffect, useState } from "react";
/**내 스케치북 리스트 컴포넌트 */
import { useSelector } from "react-redux";

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
} from "components/mydrawer/MydrawerStyle";
//mui아이콘 중 방향 버튼 아이콘을 가져
import Modal from "@mui/material/Modal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DrawSaved from "utils/canvas/DrawSaved";

import diaryBackground from "assets/image/diaryBackground.svg";

const MyDiaryList = () => {
  // 모달 오픈 변수
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  // 내 스케치북 데이터
  const [datas, setDatas] = useState([]);
  // 스케치북 드로우 데이터(모달에 띄우는)
  const [sketchDraw, setSketchDraw] = useState([]);
  // axios로 내 스케치북 데이터 불러오기
  const userSeq = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    const sketchBooks = async () => {
      await axios
        .get("https://j8b201.p.ssafy.io/api/members/diaries/list", {
          headers: {
            Authorization: userSeq,
          },
        })
        .then((response) => {
          console.log(response.data.content);
          setDatas(response.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    sketchBooks();
  }, []);

  // 일기 클릭했을 때 axios로 값을 불러옴
  const handleClick = (id) => {
    axios
      .get(`https://j8b201.p.ssafy.io/api/members/diaries/${id}`, {
        headers: {
          Authorization: userSeq,
        },
      })
      .then((response) => {
        console.log(response.data.content.diaryTraceData);
        setOpen(true);
        setSketchDraw(response.data.content.diaryTraceData);
      })
      .catch((error) => {
        console.log(error);
      });
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
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <Container>
      <TitleContainer>내 그림일기</TitleContainer>
      {datas.length > 0 ? (
        <Slider {...settings}>
          {datas.map((data) => (
            <MydraweritemContainer key={data.diaryId}>
              <MySketchbookimage
                bgImg={diaryBackground}
                src={data.diaryImgUrl}
                onClick={() => handleClick(data.diaryId)}
              />
              {/* <Modal open={open} onClose={handleClose}>
              </Modal> */}
              <DrawSaved sketchDraw={sketchDraw} />
              <ImgP>
                {new Date(data.savedAt).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </ImgP>
            </MydraweritemContainer>
          ))}
        </Slider>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MyDiaryList;
