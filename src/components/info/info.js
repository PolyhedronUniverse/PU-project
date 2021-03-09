import React from 'react'
import './info.css'
import {AiFillQuestionCircle, AiOutlineQuestionCircle} from 'react-icons/ai'
import {GoMute,GoUnmute} from 'react-icons/go'
// import back from '../canvas/assets/Back__ns50_b.png'

export default function Info () {
  return (
    <div id='user'>

      <div id='back'>
        <button id='back'>Back</button>
      </div>
      
      <div id='info'>
        <div id='info-eng'>
          <p>1. Click on any Emotional Region</p>
          <p>2. Inside the nebula, drag your mouse to rotate the camera</p>
        </div>
        {/* <br/> */}
        <hr/>
        {/* <br/> */}
        <div id='info-spa'>
          <p>1. Da click en cualquier Region Emocional</p>
          <p>2. Dentro de las nebulosas, arrastra el mouse para rotar la cámara</p>
        </div>
        {/* <ol id='info-eng'>
          <li>Click on any Emotional Region </li>
          <li>Inside the nebula, drag your mouse to rotate the camera</li>
        </ol> */}
          {/* <br/>
        <ol id='info-spa'>
          <li>Da click en cualquier Region Emocional</li>
          <li>Dentro de las nebulosas, arrastra el mouse para rotar la camara</li>
        </ol> */}
      </div>
      
      <div id='info-b'>
        <button id='info-b'><AiFillQuestionCircle id='info-icon'/></button>
      </div>

      <div id='audio'>
        <button id='audio'><GoUnmute id="vol-up"/><GoMute id="vol-down"/></button>
      </div>
      
  </div>
  )
}
