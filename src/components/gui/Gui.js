import React from 'react'
import './gui.css'
import {AiFillQuestionCircle, AiOutlineQuestionCircle} from 'react-icons/ai'
import {FaVolumeMute,FaVolumeUp} from 'react-icons/fa'
import back from '../canvas/assets/Back__ns50_b.png'

export const Gui = () => {
  return (
    <div id="user">
      <div id="gui">
        <ol>
          <li>Click on any Emotional Region </li>
          <li>Inside the nebula, drag your mouse to rotate the camera</li>
        </ol>
          <br/>
        <ol>
          <li>Da click en cualquier Region Emocional</li>
          <li>Dentro de las nebulosas, arrastra el mouse para rotar la camara</li>
        </ol>
      </div>
      <div id="buttons">
        <button id="pause"><FaVolumeUp id="pausa"/><FaVolumeMute id="play"/></button>
        <button id="info"><AiFillQuestionCircle id="info-off"/><AiOutlineQuestionCircle id="info-on"/></button>
        <button id="back"><img id="b-back" src={back} alt="back"></img></button>
      </div>
  </div>
  )
}
