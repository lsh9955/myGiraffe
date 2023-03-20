import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./AuthSlice";
// getDefaultMiddleware 는 persistReducer에러를 없애기 위해 적용
const reducers = combineReducers({
  user: userReducer,
});
// persisit 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "prefer"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // non-serializable value was detected 라고 뜨는 에러 처리를 위해 사용
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
