import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  ServiceName,
  GameScreen,
  GameContainer,
  TimerScreen,
  TimerTime,
  RspImg,
} from "components/rsp/RspStyle";

import RspStart from "components/modal/rspstart/RspStart";
import rock from "assets/image/rock.png";
import scissors from "assets/image/scissors.png";
import paper from "assets/image/paper.png";
import rsp from "assets/image/rsp.gif";

import RspSpinner from "components/rsp/RspSpinner";
import FingerPose from "utils/fingerPose/FingerPose";
import WinLose from "./WinLose";

const Rsp = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [ghostHand, setGhostHand] = useState(null);
  const [ghostHandFi, setGhostHandFi] = useState(null);
  const [isChange, setIsChange] = useState(true);
  const [restartGame, setRestartGame] = useState(true);
  const [randomNum, setRandomNum] = useState(null);
  const [timer, setTimer] = useState(3);
  const [showSpinner, setShowSpinner] = useState(false);
  const [start, setStart] = useState(false);
  const [userHand, setUserHand] = useState(null);
  //웹캠 재생을 게임 종료시 중단시키기 위해 state생성
  const [isGameEnd, setIsGameEnd] = useState(false);
  /**타이머 시작 판단 함수 */
  const startHandler = () => {
    setStart(true);
  };
  /** 실시간 사용자 손 모양 판단 함수 */
  const userHandHandler = (handInput) => {
    setUserHand(handInput);
  };
  /**모델 로딩 여부 판단 함수 */
  const isLoadHandler = (loadState) => {
    setIsLoad(loadState);
  };
  /**비겼을 때 다시 시간 초기화 함수 */
  const resetTimer = () => {
    setTimer(3);
    setRestartGame(!restartGame);
  };
  /**비기지 않아 게임이 종료될 때 게임 종료 여부 알려주는 함수 */
  const endGameHandler = () => {
    console.log("hello");
    setIsGameEnd(true);
  };
  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 3) + 1);
  }, [restartGame]);
  useEffect(() => {
    if (start) {
      if (randomNum === 1) {
        setGhostHand(rock);
        setGhostHandFi("rock");
      } else if (randomNum === 2) {
        setGhostHand(scissors);
        setGhostHandFi("scissors");
      } else if (randomNum === 3) {
        setGhostHand(paper);
        setGhostHandFi("paper");
      }

      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(interval);
        setIsChange(false);
        console.log(ghostHandFi);
      }

      return () => clearInterval(interval);
    }
  }, [timer, start]);

  useEffect(() => {
    if (isLoad) {
      setShowSpinner(false);
    } else {
      setShowSpinner(true);
    }
  }, [isLoad]);

  return (
    <div>
      <>
        <RspStart startHandler={startHandler} isLoad={isLoad}></RspStart>
        <WinLose
          ghostHandFi={ghostHandFi}
          userHand={userHand}
          timer={timer}
          resetTimer={resetTimer}
          endGameHandler={endGameHandler}
        />
        <Container>
          <ServiceName>재미있는 가위바위보 게임</ServiceName>
        </Container>

        <RspSpinner showSpinner={showSpinner} />

        <GameContainer showSpinner={showSpinner}>
          <GameScreen>
            {timer === 0 ? (
              <RspImg src={ghostHand} alt="유령의손" />
            ) : (
              <RspImg src={rsp} alt="유령가위바위보" />
            )}
          </GameScreen>

          <TimerScreen>
            <TimerTime>{timer}</TimerTime>
          </TimerScreen>

          <GameScreen>
            <FingerPose
              userHandHandler={userHandHandler}
              isLoadHandler={isLoadHandler}
              isGameEnd={isGameEnd}
            />
          </GameScreen>
        </GameContainer>
      </>
    </div>
  );
};

export default Rsp;
