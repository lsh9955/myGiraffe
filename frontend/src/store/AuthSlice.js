import { createSlice } from '@reduxjs/toolkit';
// 초기값 설정
// authenticated : 로그인 여부
// user_name, user_id : 유저 정보
const initialStateValue = {
  userSeq: null,
  authenticated: false,
  userAccountStatus: null,
  userCookCategory: null,
  userCreateDate: null,
  userEmail: null,
  userId: null,
  userImg: null,
  userIntroduce: null,
  userLastLoginDate: null,
  userName: null,
  userNickname: null,
  userRoleType: null,
  userSnsType: null,
  userTemp: null,
  accessToken: null,
};
// slice 이름을 user로 함
// login, logout, register로 구분하여 각각 해당하는 값을 action에서 전달
export const AuthSlice = createSlice({
  name: 'user',
  initialState: initialStateValue,
  reducers: {
    login: (state, action) => {
      const changeState = state;
      changeState.userSeq = action.payload.userSeq;
      changeState.authenticated = action.payload.authenticated;
      changeState.userAccountStatus = action.payload.userAccountStatus;
      changeState.userCookCategory = action.payload.userCookCategory;
      changeState.userCreateDate = action.payload.userCreateDate;
      changeState.userEmail = action.payload.userEmail;
      changeState.userId = action.payload.userId;
      changeState.userImg = action.payload.userImg;
      changeState.userIntroduce = action.payload.userIntroduce;
      changeState.userLastLoginDate = action.payload.userLastLoginDate;
      changeState.userName = action.payload.userName;
      changeState.userNickname = action.payload.userNickname;
      changeState.userRoleType = action.payload.userRoleType;
      changeState.userSnsType = action.payload.userSnsType;
      changeState.userTemp = action.payload.userTemp;
      changeState.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      const changeState = state;
      changeState.userSeq = null;
      changeState.authenticated = false;
      changeState.userAccountStatus = null;
      changeState.userCookCategory = null;
      changeState.userCreateDate = null;
      changeState.userEmail = null;
      changeState.userId = null;
      changeState.userImg = null;
      changeState.userIntroduce = null;
      changeState.userLastLoginDate = null;
      changeState.userName = null;
      changeState.userNickname = null;
      changeState.userRoleType = null;
      changeState.userSnsType = null;
      changeState.userTemp = null;
      changeState.accessToken = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
