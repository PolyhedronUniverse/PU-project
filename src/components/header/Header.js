import React from 'react'
import './header.css'

export const Header = () => {
  return (
    <div className="header" id="header">

      <p>P  O  L  Y  H  E  D  R  O  N</p>
      <img
        className='logo'
        id="logo"
        alt='logo'
        src={require('../../assets/PU_Logo.png')}
        />
      <p>U  N  I  V  E  R  S  E</p>

      <img
          className='patreonButton'
          alt='patreon'
          src = {require('../../assets/Patreon_w_160.png')}
          onMouseOver = {e => (e.currentTarget.src = require('../../assets/Patreon_b_160.png'))}
          onMouseOut = {e => (e.currentTarget.src = require('../../assets/Patreon_w_160.png'))}
          onClick={() => window.open('https://www.patreon.com/polyhedronuniverse?')}
        />

    </div>
  )
}
