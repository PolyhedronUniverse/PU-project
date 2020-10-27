import React from 'react'
import './gui.css'
import imagen from "../../assets/pause.png"
import {AiFillPauseCircle,AiFillPlayCircle} from 'react-icons/ai'

import {Musica} from '../canvas/SceneManager'

export const Gui = () => {
  return (
    <div id="user">
      <div id="gui">
        <p>Click on any nebula to go inside</p>
        <p>Press ENTER to return</p>
      </div>
      <div id="buttons">
        <button id="pause"><AiFillPauseCircle id="pausa"/><AiFillPlayCircle id="play"/></button>
        <button id="back">Back</button>
      </div>
  </div>
  )
}
