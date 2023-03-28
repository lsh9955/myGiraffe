import Readstorybook from "components/readstorybook/Readstorybook";
import React from "react";
/**동화책을 보는 페이지 */
const StorybookDetailPage = () => {
  return (
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
      <Readstorybook />
    </div>
  );
};

export default StorybookDetailPage;
