import React from 'react'

import MainCanvas from '../components/webgl/scenes/mainScene/mainSceneComponent'
import LoadingScreen from '../components/loading-screen/loadingScreen'
import RotateDevice from '../components/rotateDevice/rotateDevice'

export default function Home() {
  return(
    <div className='webgl'>
      <MainCanvas />
      <RotateDevice />
      <LoadingScreen/>
    </div>
  )
}
