import Readstorybook from "components/readstorybook/Readstorybook";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

/**동화책을 보는 페이지 */
const StorybookDetailPage = () => {
  const captureRef = useRef(null);
  const [getPageImg, setGetPageImg] = useState(null);
  const handleCapture = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      setGetPageImg(dataUrl);
      console.log(dataUrl);
      // 이미지 데이터를 사용하여 다른 작업을 수행합니다.
    });
  };
  return (
    <>
      <div ref={captureRef} id="capture">
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Readstorybook
            handleCapture={handleCapture}
            getPageImg={getPageImg}
          />
        </div>
      </div>
    </>
  );
};

export default StorybookDetailPage;
