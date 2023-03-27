import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
//nav,footer 항목(그림책 외 모두 적용)
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
//라우터별 페이지 항목
import MainPage from "./pages/MainPage";
import DiaryDrawPage from "./pages/DiaryDrawPage";
import MydrawerPage from "./pages/MydrawerPage";
import MystorybookDetailPage from "./pages/MystorybookDetailPage";
import RspPage from "./pages/RspPage";
import SketchbookDrawPage from "./pages/SketchbookDrawPage";
import StorybookDetailPage from "./pages/StorybookDetailPage";
import StorybookDrawPage from "./pages/StorybookDrawPage";
import StorybookListPage from "./pages/StorybookListPage";
import StorybookMLDrawPage from "./pages/StorybookMLDrawPage";

//로그인 페이지
import LoginPage from "./pages/LoginPage";

function App() {
  /** 로그인 여부 판단 */
  const userSeq = useSelector((state) => {
    return state.user.userSeq;
  });

  return (
    <div style={{ position: "relative" }}>
      <Switch>
        <Route path="/" exact>
          <Navbar />
          <MainPage component={MainPage} />
        </Route>
        <Route path="/diarydraw" component={DiaryDrawPage} />
        <Route path="/mydrawer">
          <Navbar />
          <MydrawerPage component={MydrawerPage} />
          <Footer />
        </Route>
        <Route path="/mybookdetail/:mybookId">
          <Navbar />
          <MystorybookDetailPage component={MystorybookDetailPage} />
        </Route>
        <Route path="/rsppage" component={RspPage} />
        <Route path="/sketchdraw" component={SketchbookDrawPage} />
        <Route path="/bookdetail/:bookId" component={StorybookDetailPage} />
        <Route path="/bookdraw" component={StorybookDrawPage} />
        <Route path="/booklist">
          <Navbar />
          <StorybookListPage component={StorybookListPage} />
        </Route>
        <Route path="/bookmldraw" component={StorybookMLDrawPage} />
        <Route path="/login" exact>
          <LoginPage component={LoginPage} />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
