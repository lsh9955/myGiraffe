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

const Rsp = () => {
  const isLoad = useSelector((state) => state.game.isLoad);
  const [ghostHand, setGhostHand] = useState(null);
  const [ghostHandFi, setGhostHandFi] = useState(null);
  const [isChange, setIsChange] = useState(true);
  const [randomNum, setRandomNum] = useState(null);
  const [timer, setTimer] = useState(3);
  const [showSpinner, setShowSpinner] = useState(false);
  const [start, setStart] = useState(false);
  const [userHand, setUserHand] = useState(null);
  const startHandler = () => {
    setStart(true);
  };
  const userHandHandler = (handInput) => {
    setUserHand(handInput);
  };
  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 3) + 1);
  }, []);
  useEffect(() => {
    console.log("EFEFEFE" + randomNum);
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
        if (ghostHandFi === "rock" && userHand === "rock") {
          console.log("비겼습니다!");
        } else if (ghostHandFi === "scissors" && userHand === "scissors") {
          console.log("비겼습니다!");
        } else if (ghostHandFi === "paper" && userHand === "paper") {
          console.log("비겼습니다!");
        } else if (ghostHandFi === "rock" && userHand === "scissors") {
          console.log("졌습니다!");
        } else if (ghostHandFi === "scissors" && userHand === "paper") {
          console.log("졌습니다!");
        } else if (ghostHandFi === "paper" && userHand === "rock") {
          console.log("졌습니다!");
        } else if (ghostHandFi === "rock" && userHand === "paper") {
          console.log("이겼습니다!");
        } else if (ghostHandFi === "scissors" && userHand === "rock") {
          console.log("이겼습니다!");
        } else if (ghostHandFi === "paper" && userHand === "scissors") {
          console.log("이겼습니다!");
        }
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
      <RspStart startHandler={startHandler}></RspStart>
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
          <FingerPose userHandHandler={userHandHandler} />
        </GameScreen>
      </GameContainer>
    </div>
  );
};

export default Rsp;
