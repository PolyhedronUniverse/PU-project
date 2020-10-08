import React from 'react'
import './footer.css'

export const Footer = () => {
  return (
    <div className="footer">
      <div className='item'>
        <img
          className='shortcut'
          alt='youtube'
          src = {require('../../assets/youtube_b.png')}
          onMouseOver = {e => (e.currentTarget.src = require('../../assets/youtube_w.png'))}
          onMouseOut = {e => (e.currentTarget.src = require('../../assets/youtube_b.png'))}
          onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ')}
          />
      </div>
      <div className='item'>
        <img
          className='shortcut'
          alt='linkedin'
          src={require('../../assets/linkedin_b.png')}
          onMouseOver = {e => (e.currentTarget.src = require('../../assets/linkedin_w.png'))}
          onMouseOut = {e => (e.currentTarget.src = require('../../assets/linkedin_b.png'))}
          //onClick={() => window.open('')}
          />
      </div>
      <div className='item'>
        <img
          className='shortcut'
          alt='instagram'
          src={require('../../assets/instagram_b.png')}
          onMouseOver = {e => (e.currentTarget.src = require('../../assets/instagram_w.png'))}
          onMouseOut = {e => (e.currentTarget.src = require('../../assets/instagram_b.png'))}
          onClick={() => window.open('https://www.instagram.com/polyhedronuniverse/')}
          />
      </div>
      <div className='item'>
        <img
          className='shortcut'
          alt='twitter'
          src={require('../../assets/twitter_b.png')}
          onMouseOver = {e => (e.currentTarget.src = require('../../assets/twitter_w.png'))}
          onMouseOut = {e => (e.currentTarget.src = require('../../assets/twitter_b.png'))}
          onClick={() => window.open('https://twitter.com/polyhedronuniv')}
          />
      </div>
      <div className='item'>
        <img
          className='shortcut'
          alt='facebook'
          src={require('../../assets/facebook_b.png')}
          onMouseOver = {e => (e.currentTarget.src = require('../../assets/facebook_w.png'))}
          onMouseOut = {e => (e.currentTarget.src = require('../../assets/facebook_b.png'))}
          onClick={() => window.open('https://www.facebook.com/polyhedronuniverse/')}
          />
      </div>
    </div>
  )
}
