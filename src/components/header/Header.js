import React from 'react'
import './header.css'

import pulogo from '../../assets/PU_Logo.png'

export default function Header(){

  return(
    <div id='header'>

      <div id='span'>
      </div>

      <div id='name1'>
        P O L Y H E D R O N
      </div>

      <div id='logo'>
        <img id='logoHeader' alt='pu-logo' src={pulogo}/>
      </div>

      <div id='name2'>
        U N I V E R S E
      </div>


      <div id='button'>
        <button id='patreonButton' alt='patreon'>P A T R E O N</button>
      </div>

    </div>
  )
}
