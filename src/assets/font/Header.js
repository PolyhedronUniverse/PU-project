import React from 'react'
import './header.css'
import pulogo from '../../assets/PU_Logo.png'
import patreonB from '../../assets/Patreon_b_160.png'
import patreonW from '../../assets/Patreon_w_160.png'

export const Header = () => {
  return (
    <div className="header" id="header">

      <p>P  O  L  Y  H  E  D  R  O  N</p>
      <img
        className='logo'
        id="logo"
        alt='logo'
        src={pulogo}
        />
      <p>U  N  I  V  E  R  S  E</p>

      <img
          className='patreonButton'
          alt='patreon'
          src = {patreonW}
          onMouseOver = {e => (e.currentTarget.src = patreonB)}
          onMouseOut = {e => (e.currentTarget.src = patreonW)}
          onClick={() => window.open('https://www.patreon.com/polyhedronuniverse?')}
        />

    </div>
  )
}
