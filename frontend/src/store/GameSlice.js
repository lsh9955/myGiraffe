import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  isLoad: false,
};

// FingerPose가 로드 끝날때 체크하기 위함
export const GameSlice = createSlice({
  name: "game",
  initialState: initialStateValue,
  reducers: {
    rsp: (state, action) => {
      state.isLoad = action.payload.isLoad;
    },
  },
});

export const { rsp } = GameSlice.actions;

export default GameSlice.reducer;
