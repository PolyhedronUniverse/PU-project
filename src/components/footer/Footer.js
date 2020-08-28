import React from 'react'
import './footer.css'

export const Footer = () => {
    return (
        <div className="footer">
            <img
            className='imagen'
            src={require('../../assets/youtube.png')}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ')}
            />
            <img
            className='imagen'
            src={require('../../assets/spotify.png')}
            //onClick={() => window.open('')}
            />
            <img
            className='imagen'
            src={require('../../assets/instagram.png')}
            onClick={() => window.open('https://www.instagram.com/polyhedronuniverse/')}
            />
            <img
            className='imagen'
            src={require('../../assets/twitter.png')}
            onClick={() => window.open('https://twitter.com/polyhedronuniv')}
            />
            <img
            className='imagen'
            src={require('../../assets/facebook.png')}
            onClick={() => window.open('https://www.facebook.com/polyhedronuniverse/')}
            />
        </div>
    )
}
