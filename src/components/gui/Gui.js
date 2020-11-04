import React from 'react'
import './gui.css'
import {AiFillPauseCircle,AiFillPlayCircle} from 'react-icons/ai'

export const Gui = () => {
  return (
    <div id="user">
      <div id="gui">
        <p>Click on any nebula to go inside</p>
      </div>
      <div id="buttons">
        <button id="pause"><AiFillPauseCircle id="pausa"/><AiFillPlayCircle id="play"/></button>
        <button id="back">Back</button>
      </div>
  </div>
  )
}
