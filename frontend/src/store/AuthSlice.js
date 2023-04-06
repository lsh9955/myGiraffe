import { createSlice } from "@reduxjs/toolkit";
// 초기값 설정
// authenticated : 로그인 여부
// user_name, user_id : 유저 정보
const initialStateValue = {
  userId: null,
  userName: null,
  profileImg: null,
  coinAmount: 0,
  accessToken: null,
};
// slice 이름을 user로 함
// login, logout, register로 구분하여 각각 해당하는 값을 action에서 전달
export const AuthSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.profileImg = action.payload.profileImg;
      state.coinAmount = action.payload.coinAmount;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.userId = null;
      state.userName = null;
      state.profileImg = null;
      state.coinAmount = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
