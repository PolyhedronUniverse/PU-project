import React from 'react'
import './header.css'

export const Header = () => {
    return (
        <div className="header">
            P O L Y H E D R O N 
            <img
            className='image'
            src={require('../../assets/PU_Logo.png')}
            />
            U N I V E R S E
        </div>
    )
}
