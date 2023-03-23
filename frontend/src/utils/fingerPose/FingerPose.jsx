import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rsp } from "store/GameSlice";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "./model";
import "./FingerPose";
//테스트를 위해 임의로 css생성. 이후 제거할 것
import "./fingerStyle.css";
import "@tensorflow/tfjs-backend-webgl";
/**가위바위보 인식 모델 */
const FingerPose = () => {
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.game.isLoad);

  const config = {
    video: { width: 640, height: 480, fps: 30 },
  };

  const landmarkColors = {
    thumb: "red",
    indexFinger: "blue",
    middleFinger: "yellow",
    ringFinger: "green",
    pinky: "pink",
    palmBase: "white",
  };

  const gestureStrings = {
    paper: "✋",
    scissors: "✌",
    rock: "✊",
  };
  const video = useRef(null);
  const canvas = useRef(null);
  const resultLayer = useRef(null);

  async function main() {
    const ctx = canvas.current.getContext("2d");

    // configure gesture estimator
    // add "✌🏻" and "👍" as sample gestures
    const knownGestures = [
      fp.Gestures.PaperGesture,
      fp.Gestures.ScissorsGesture,
      fp.Gestures.RockGesture,
    ];
    const GE = new fp.GestureEstimator(knownGestures);

    // load handpose model
    const model = await handpose.load();
    console.log("Handpose model loaded");

    // main estimation loop
    const estimateHands = async () => {
      // clear canvas overlay

      ctx.clearRect(0, 0, config.video.width, config.video.height);
      resultLayer.current.innerText = "";

      // get hand landmarks from video
      // Note: Handpose currently only detects one hand at a time
      // Therefore the maximum number of predictions is 1
      const predictions = await model.estimateHands(video.current, true);

      for (let i = 0; i < predictions.length; i++) {
        // draw colored dots at each predicted joint position
        for (let part in predictions[i].annotations) {
          for (let point of predictions[i].annotations[part]) {
            drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
          }
        }

        // estimate gestures based on landmarks
        // using a minimum score of 9 (out of 10)
        // gesture candidates with lower score will not be returned
        const est = GE.estimate(predictions[i].landmarks, 9);

        if (est.gestures.length > 0) {
          // find gesture with highest match score
          let result = est.gestures.reduce((p, c) => {
            return p.score > c.score ? p : c;
          });

          resultLayer.current.innerText = gestureStrings[result.name];
        }

        // update debug info
        updateDebugInfo(est.poseData);
      }

      // ...and so on
      setTimeout(() => {
        estimateHands();
      }, 1000 / config.video.fps);
    };

    estimateHands();
    console.log("Starting predictions");
    dispatch(rsp({ isLoad: true }));
  }

  async function initCamera(width, height, fps) {
    const constraints = {
      audio: false,
      video: {
        facingMode: "user",
        width: width,
        height: height,
        frameRate: { max: fps },
      },
    };

    video.current.width = width;
    video.current.height = height;

    // get video stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    video.current.srcObject = stream;

    return new Promise((resolve) => {
      video.current.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }

  function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function updateDebugInfo(data) {
    for (let fingerIdx in data) {
      document.getElementById("curl-" + fingerIdx).innerText =
        data[fingerIdx][1];
      document.getElementById("dir-" + fingerIdx).innerText =
        data[fingerIdx][2];
    }
  }

  useEffect(() => {
    initCamera(config.video.width, config.video.height, config.video.fps).then(
      (video) => {
        video.current.play();
        video.current.addEventListener("loadeddata", (event) => {
          console.log("Camera is ready");
          main();
        });
      }
    );

    canvas.current.width = config.video.width;
    canvas.current.height = config.video.height;
    console.log("Canvas initialized");
  }, []);

  return (
    <div className="container">
      <div className="video">
        <div id="video-container">
          <video
            id="pose-video"
            className="layer"
            playsInline
            ref={video}
          ></video>
          <canvas id="pose-canvas" className="layer" ref={canvas}></canvas>
          <div id="pose-result" className="layer" ref={resultLayer}></div>
        </div>
      </div>

      <div className="debug">
        <table className="summary">
          <thead>
            <tr>
              <th>Idx</th>
              <th>Finger</th>
              <th style={{ width: "110px" }}>Curl</th>
              <th style={{ width: "170px" }}>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>Thumb</td>
              <td>
                <span id="curl-0">-</span>
              </td>
              <td>
                <span id="dir-0">-</span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Index</td>
              <td>
                <span id="curl-1">-</span>
              </td>
              <td>
                <span id="dir-1">-</span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Middle</td>
              <td>
                <span id="curl-2">-</span>
              </td>
              <td>
                <span id="dir-2">-</span>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ring</td>
              <td>
                <span id="curl-3">-</span>
              </td>
              <td>
                <span id="dir-3">-</span>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Pinky</td>
              <td>
                <span id="curl-4">-</span>
              </td>
              <td>
                <span id="dir-4">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FingerPose;
