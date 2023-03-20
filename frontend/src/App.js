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
  const [isShow, setIsShow] = useState(true);
  /** nav,footer 보이는지 여부 판단  */
  const onChangeShow = () => {
    setIsShow(!isShow);
  };
  /** 로그인 여부 판단 */
  const userSeq = useSelector((state) => {
    return state.user.userSeq;
  });

  return (
    <div style={{ position: "relative" }}>
      {isShow && <Navbar />}
      <Switch>
        <Route path="/" exact>
          <MainPage
            component={MainPage}
            onChangeShow={onChangeShow}
            isShow={isShow}
          />
        </Route>
        <Route
          path="/diarydraw"
          component={DiaryDrawPage}
          onChangeShow={onChangeShow}
          isShow={isShow}
        />
        <Route path="/mydrawer" component={MydrawerPage} />
        <Route path="/mystorybookdetail/:bookId">
          <MystorybookDetailPage
            component={MystorybookDetailPage}
            onChangeShow={onChangeShow}
          />
        </Route>
        <Route path="/rsppage" component={RspPage} />
        <Route path="/sketchbookdraw" component={SketchbookDrawPage} />
        <Route path="/storybookdetail" component={StorybookDetailPage} />
        <Route path="/storybookdraw" component={StorybookDrawPage} />
        <Route path="/storybooklist" component={StorybookListPage} />
        <Route path="/storybookmldraw" component={StorybookMLDrawPage} />
        <Route path="/Login" exact>
          <LoginPage component={LoginPage} onChangeShow={onChangeShow} />
        </Route>
      </Switch>
      {isShow && <Footer />}
    </div>
  );
}
export default App;
