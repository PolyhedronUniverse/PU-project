import React from "react";

import MainCanvas from "../components/webgl/scenes/mainScene/mainSceneComponent";
import LoadingScreen from "../components/loading-screen/loadingScreen";
import RotateDevice from "../components/rotateDevice/rotateDevice";
import SceneManager from "../components/webgl-v2/sceneManager";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="webgl">
        <RotateDevice />
        <SceneManager />
      </div>
      <Footer />
    </>
  );
}
