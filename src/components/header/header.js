import React from 'react'
import './header.css'

import pulogo from '../../assets/PU_Logo.png'

export default function Header(){

  const title1 = 'P O L Y H E D R O N';
  const title2 = 'U N I V E R S E';

  return(
    <div className='header' id='header'>
      <div className='title'>
        <div className='text'> 
          <p>{title1}</p>
          <img className='logo' alt='pu-logo' src={pulogo}/>
          <p>{title2}</p>
        </div>
      </div>


      <div className='button'>
        <a href = 'https://www.patreon.com/polyhedronuniverse' rel='noopener noreferrer' target='_blank'>P A T R E O N</a>
      </div> 

    </div>
  )
}
