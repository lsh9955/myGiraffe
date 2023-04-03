import React, { useRef } from "react";
import html2canvas from "html2canvas";

function Capture() {
  const captureRef = useRef(null);

  const handleCapture = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      console.log(dataUrl);
      // 이미지 데이터를 사용하여 다른 작업을 수행합니다.
    });
  };

  return (
    <div>
      <div ref={captureRef} id="capture">
        <h1>캡처할 내용</h1>
        <p>캡처할 내용을 작성합니다.</p>
      </div>
      <button onClick={handleCapture}>캡처</button>
    </div>
  );
}

export default Capture;
