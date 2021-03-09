import React from 'react'
import './info.css'
import {AiFillQuestionCircle} from 'react-icons/ai'
import {GoMute,GoUnmute} from 'react-icons/go'
// import back from '../canvas/assets/Back__ns50_b.png'

export default function Info () {
  return (
    <div id='user'>

      <div id='back'>
        <button id='back'>Back</button>
      </div>
      
      <div id='info-cont'>
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
      </div>
      
      <div id='b-info'>
        <button id='info-button'><AiFillQuestionCircle id='info-icon' className='icon'/></button>
      </div>

      <div id='b-audio'>
        <button id='audio'><GoUnmute id="vol-up" className='icon'/><GoMute id="vol-down" className='icon'/></button>
      </div>
      
  </div>
  )
}
