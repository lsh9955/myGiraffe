import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./AuthSlice";
import bookReducer from "./BookSlice";
import drawReducer from "./DrawSlice";
// getDefaultMiddleware 는 persistReducer에러를 없애기 위해 적용
const reducers = combineReducers({
  user: userReducer,
  book: bookReducer,
  draw: drawReducer,
});
// persisit 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "book", "draw"],
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

