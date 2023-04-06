import React from "react";
import footerImg from "assets/image/Footer.png";
/**바닥글 컴포넌트 */
const Footer = () => {
  return (
    <div style={{ marginTop: "25vh" }}>
      <img src={footerImg} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default Footer;
