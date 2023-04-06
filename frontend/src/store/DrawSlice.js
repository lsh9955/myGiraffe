import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  drawImg: null,
};

// FingerPose가 로드 끝날때 체크하기 위함
export const DrawSlice = createSlice({
  name: "draw",
  initialState: initialStateValue,
  reducers: {
    userDraw: (state, action) => {
      state.drawImg = action.payload.drawImg;
    },
  },
});

export const { userDraw } = DrawSlice.actions;

export default DrawSlice.reducer;
