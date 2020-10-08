import React from 'react'
import './header.css'

export const Header = () => {
  return (
    <div className="header">

      <p>
        P  O  L  Y  H  E  D  R  O  N
      </p>
      <img
        className='logo'
        alt='logo'
        src={require('../../assets/PU_Logo.png')}
        />
      <p>
        U  N  I  V  E  R  S  E
      </p>

      <img
        className='patreon'
        alt='patreon'
        src={require('../../assets/patreon/PNG/Digital-Patreon-Wordmark_Black.png')}
        onMouseOver = {e => (e.currentTarget.src = require('../../assets/patreon/PNG/Digital-Patreon-Wordmark_White.png'))}
        onMouseOut = {e => (e.currentTarget.src = require('../../assets/patreon/PNG/Digital-Patreon-Wordmark_Black.png'))}
        />

    </div>
  )
}
