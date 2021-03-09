import React from 'react'

import {isMobile} from 'react-device-detect';

import Header from '../components/header/header.js'
import Footer from '../components/footer/footer.js'
// import Canvas from '../components/canvas/canvas'
import MainCanvas from '../components/webgl/scenes/mainScene/mainSceneComponent'
// import Experience01 from '../components/webgl/scenes/experience01/exp01Component'
import LoadingScreen from '../components/loading-screen/loadingScreen'
// import SceneManager from '../components/webgl/sceneManager'
import Generic from '../components/webgl/scenes/generic/generic'

export default function Home() {
  // console.log(SceneManager())


  if (isMobile) {
  return(
    <div className="webgl">
      <Header/>
      <MainCanvas />
      <Generic />
      <Footer/>
      <LoadingScreen/>

    </div>
  )
  }else{
    return(
      <div className="webgl">
        <Header/>
        <MainCanvas />
        <Generic />
        <Footer/>
        <LoadingScreen/>
      </div>
    )
  }
}
