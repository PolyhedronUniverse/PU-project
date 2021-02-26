import React from 'react';
// import splash from '../../assets/1024hud.jpg'
import './loadingScreen.css'
import pulogo from '../../assets/PU_Logo.png'

export default function LoadingScreen(){
  function enterPu(e){
    // console.log(e.target);
    document.getElementById('load-overlay').style.display = 'none';
  }


  return(
    <div id='load-overlay'>
      {/* // todo: ask ken for a new background image */}
      {/* <div id='load-logo' className='overlay-content loading'>
        <img src={pulogo} alt='pu-logo'/>
      </div> */}
      {/* <div id='load-message' className='overlay-content'>
        <p>WELCOME TO POLYHEDRON UNIVERSE</p>
        <p>We recommend the use of headphones for the best experience</p>
        <br/>
        <p>-</p>
        <br/>
        <p>BIENVENIDOS A POLYHEDRON UNIVERSE</p>
        <p>Te recomendamos el uso de audífonos para la mejor experiencia</p>
      </div> */}
      <div id='enter-button' className='overlay-content'>
        <button id='splash-button' className='loading-button' onClick={e=>enterPu(e)}>Loading</button>
      </div>
    </div>
  )
}
