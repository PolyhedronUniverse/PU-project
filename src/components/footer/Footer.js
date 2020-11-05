import React from 'react'
import './footer.css'

export const Footer = (props) => {
  const {visible,setVisible}= props;
  return (
    <div className="footer" id="footer">
      <div>
          <img
            className='shortcut'
            alt='linkedin'
            src={require('../../assets/linkedin_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/linkedin_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/linkedin_w.png'))}
            onClick = {e => (window.open('#', '_blank'))}
            />
      </div>
      <div>
          <img
            className='shortcut'
            alt='twitter'
            src={require('../../assets/twitter_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/twitter_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/twitter_w.png'))}
            onClick={() => window.open('https://twitter.com/polyhedronuniv')}
            />
      </div>

      <div>
          <img
            className='shortcut'
            alt='tiktok'
            src={require('../../assets/Tiktok_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Tiktok_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Tiktok_w.png'))}
            onClick = {e => (window.open('#', '_blank'))}
            />
      </div>

      <div>
          <img
            className='shortcut'
            alt='youtube'
            src = {require('../../assets/youtube_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/youtube_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/youtube_w.png'))}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
            />
      </div>

      <div>
          <img
            className='shortcut'
            alt='instagram'
            src={require('../../assets/instagram_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/instagram_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/instagram_w.png'))}
            onClick={() => window.open('https://www.instagram.com/polyhedronuniverse/')}
            />
      </div>

      <div>
          <img
            className='shortcut'
            alt='facebook'
            src={require('../../assets/facebook_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/facebook_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/facebook_w.png'))}
            onClick={() => window.open('https://www.facebook.com/polyhedronuniverse/')}
            />
      </div>

      <div>
          <img
            className='shortcut'
            alt='twitch'
            src={require('../../assets/Twitch_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Twitch_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Twitch_w.png'))}
            onClick = {e => (window.open('#', '_blank'))}
            />
      </div>

      <div>
          <img
            className='shortcut'
            alt='spotify'
            src={require('../../assets/spotify_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/spotify_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/spotify_w.png'))}
            onClick={() => setVisible(!visible)}
            />
      </div>
    </div>
  )
}
