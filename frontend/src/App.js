import React from "react";
import CanvasTool from "./utils/canvas/CanvasTool";
import FingerPose from "./utils/fingerPose/FingerPose";
function App() {
  return (
    <div className="App">
      <FingerPose />
      <CanvasTool />
    </div>
  );
}

export default App;
