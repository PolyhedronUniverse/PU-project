import React from 'react';
import './footer.css'
import SpotifyMenu from '../spotify/spotifyMenu.js'


import linkedin_b from '../../assets/linkedin_b.png'
import linkedin_w from'../../assets/linkedin_w.png'
import twitter_b from '../../assets/twitter_b.png'
import twitter_w from '../../assets/twitter_w.png'
import tiktok_b from '../../assets/Tiktok_b.png'
import tiktok_w from '../../assets/Tiktok_w.png'
import youtube_b from '../../assets/youtube_b.png'
import youtube_w from '../../assets/youtube_w.png'
import instagram_b from '../../assets/instagram_b.png'
import instagram_w from '../../assets/instagram_w.png'
import facebook_b from '../../assets/facebook_b.png'
import facebook_w from '../../assets/facebook_w.png'
import twitch_b from '../../assets/Twitch_b.png'
import twitch_w from '../../assets/Twitch_w.png'
import spotify_b from '../../assets/spotify_b.png'
import spotify_w from '../../assets/spotify_w.png'

class SocialIcons extends React.Component {


  render() {
    return (
      <div className='shortcut'>
        <a className='link-sm' href={this.props.social}>
          <img
            className='image-sm'
            alt={this.props.alt}
            src={this.props.white}
            onMouseOut={e=>(e.currentTarget.src=this.props.white)}
            onMouseOver={e=>(e.currentTarget.src=this.props.black)}
            onClick = {this.props.onClick}
            />
        </a>
      </div>
    );
  }
}


export default function Footer(){

  return(
    <>
    <div id='footer'>
      <SocialIcons
        social='https://www.linkedin.com/company/polyhedronuniverse/'
        white={linkedin_w}
        black={linkedin_b}
        alt={'linkedin'}
        />
      <SocialIcons
        social='https://twitter.com/polyhedronuniv'
        white={twitter_w}
        black={twitter_b}
        alt={'twitter'}
        />
      <SocialIcons
        social='https://www.tiktok.com/@pubackstage'
        white={tiktok_w}
        black={tiktok_b}
        alt={'tiktok'}
        />
      <SocialIcons
        social='https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ'
        white={youtube_w}
        black={youtube_b}
        alt={'youtube'}
        />
      <SocialIcons
        social='https://www.instagram.com/polyhedronuniverse/'
        white={instagram_w}
        black={instagram_b}
        alt={'instagram'}
        />
      <SocialIcons
        social='https://www.facebook.com/polyhedronuniverse/'
        white={facebook_w}
        black={facebook_b}
        alt={'facebook'}
        />
      <SocialIcons
        social='https://www.twitch.tv/pu_livestream'
        white={twitch_w}
        black={twitch_b}
        alt={'twitch'}
        />
      <SocialIcons
        white={spotify_w}
        black={spotify_b}
        alt={'spotify'}
        onClick={() => {
          document.getElementById("spotifyMenu").style.width = "25%"
          document.getElementById("spotifyMenu").style.height = "25%"
          document.getElementById("spotifyMenu").style.border = "solid thin"
        }}
      />
    </div>
    <SpotifyMenu />
    </>
  )
}
