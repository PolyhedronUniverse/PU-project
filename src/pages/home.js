import React from "react";

import MainCanvas from "../components/webgl/scenes/mainScene/mainSceneComponent";
import LoadingScreen from "../components/loading-screen/loadingScreen";
import RotateDevice from "../components/rotateDevice/rotateDevice";
import SceneManager from "../components/webgl-v2/sceneManager";

export default function Home() {
  return (
    <div className="webgl">
      <RotateDevice />
      <LoadingScreen />
    </div>
  );
}
