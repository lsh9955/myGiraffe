// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// // redux-persist 설정
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// // redux store 위치
// import store from './store/index';
// import GlobalStyle from './styles/GlobalStyle';

// // store에 persist 적용, 아래에 loading은 로딩시 보여줄 컴포넌트 설정
// export const persistor = persistStore(store);

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter>
//         <React.StrictMode>
//           <GlobalStyle />
//           <App />
//         </React.StrictMode>
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// );
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
