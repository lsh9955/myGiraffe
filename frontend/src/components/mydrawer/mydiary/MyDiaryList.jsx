import React, { useEffect, useState } from "react";
/**내 스케치북 리스트 컴포넌트 */
import axios from "axios";
import Slider from "react-slick";
import {
  MydraweritemContainer,
  MySketchbookimage,
  Container,
  TitleContainer,
} from "components/mydrawer/MydrawerStyle";

const MyDiaryList = () => {
  // axios로 내 스케치북 데이터 불러오기
  useEffect(() => {
    const sketchBooks = async () => {
      await axios
        .get(
          "https://port-0-nodebook-1b5xkk2fldhlzqkd.gksl2.cloudtype.app/sketchbook"
        )
        .then((response) => {
          console.log(response.data);
          setDatas(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    sketchBooks();
  }, []);

  // 이전 버튼 스타일
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  };

  // 다음 버튼 스타일
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
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

  // 내 스케치북 데이터
  const [datas, setDatas] = useState([]);

  return (
    <Container>
      <TitleContainer>내 그림일기</TitleContainer>
      <Slider {...settings}>
        {datas.map((data) => (
          <MydraweritemContainer>
            <MySketchbookimage src={data.img} />
            <h3>{data.title}</h3>
            <p>{data.date}</p>
          </MydraweritemContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default MyDiaryList;
