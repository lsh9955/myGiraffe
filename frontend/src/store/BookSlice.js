import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  lostItem: null,
};

// FingerPose가 로드 끝날때 체크하기 위함
export const BookSlice = createSlice({
  name: "book",
  initialState: initialStateValue,
  reducers: {
    item: (state, action) => {
      state.lostItem = action.payload.lostItem;
    },
  },
});

export const { item } = BookSlice.actions;

export default BookSlice.reducer;
