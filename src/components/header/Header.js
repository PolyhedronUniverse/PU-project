import React from 'react'
import './header.css'

export const Header = () => {
    return (
        <div className="header">
            <p className="head1">
            P  O  L  Y  H  E  D  R  O  N
            </p>
            <img
            className='image'
            alt='logo'
            src={require('../../assets/PU_Logo.png')}
            // src={require('../canvas/assets/smoke.png')}
            />
            <p>
            U  N  I  V  E  R  S  E
            </p>
            <div className="button-container">
            <button
            className="patreon"
            onClick={()=>{console.log("Patreon prro");}}>PATREON</button>
            </div>
        </div>
    )
}
