import React from 'react'
import './footer.css'

export const Footer = () => {
    return (
        <div className="footer">
            <img
            className='imagen'
            alt='youtube'
            src={require('../../assets/youtube.png')}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ')}
            />
            <img
            className='imagen'
            alt='spotify'
            src={require('../../assets/spotify.png')}
            //onClick={() => window.open('')}
            />
            <img
            className='imagen'
            alt='instagram'
            src={require('../../assets/instagram.png')}
            onClick={() => window.open('https://www.instagram.com/polyhedronuniverse/')}
            />
            <img
            className='imagen'
            alt='twitter'
            src={require('../../assets/twitter.png')}
            onClick={() => window.open('https://twitter.com/polyhedronuniv')}
            />
            <img
            className='imagen'
            alt='facebook'
            src={require('../../assets/facebook.png')}
            onClick={() => window.open('https://www.facebook.com/polyhedronuniverse/')}
            />
        </div>
    )
}
