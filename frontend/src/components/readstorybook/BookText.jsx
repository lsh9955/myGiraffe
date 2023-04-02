import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const BookText = ({ text, lost }) => {
  const thisTxt = useSelector((state) => state.book.lostItem);

  return <>{text?.replace("(태깅 결과)", thisTxt)}</>;
};

export default BookText;
