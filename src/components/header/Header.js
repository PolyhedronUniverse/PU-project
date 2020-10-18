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

      <button className='patreon'>
        P A T R E O N
      </button>

    </div>
  )
}
