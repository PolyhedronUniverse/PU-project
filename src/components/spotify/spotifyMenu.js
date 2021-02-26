import React from 'react';
import './spotifyMenu.css'

import lopyW from '../../assets/Artist_UI_Icons_Light/artist_lop-y_w.png'
import lopyB from '../../assets/Artist_UI_Icons_Light/artist_lop-y_b.png'
import ehyxW from '../../assets/Artist_UI_Icons_Light/artist_ehy-x_w.png'
import ehyxB from '../../assets/Artist_UI_Icons_Light/artist_ehy-x_b.png'
import nordzW from'../../assets/Artist_UI_Icons_Light/artist_nord-z_w.png'
import nordzB from'../../assets/Artist_UI_Icons_Light/artist_nord-z_b.png'
import polyW from '../../assets/Artist_UI_Icons_Light/artist_pol-y_w.png'
import polyB from '../../assets/Artist_UI_Icons_Light/artist_pol-y_b.png'
import yheW from '../../assets/Artist_UI_Icons_Light/artist_yhe-x_w.png'
import yheB from '../../assets/Artist_UI_Icons_Light/artist_yhe-x_b.png'
import dronzW from '../../assets/Artist_UI_Icons_Light/artist_dron-z_w.png'
import dronzB from '../../assets/Artist_UI_Icons_Light/artist_dron-z_b.png'

class SpotifyArtist extends React.Component {


  render() {
    return (
      <div className='s-artist'>
        <a className='s-link' href={this.props.link}>
          <img
            className='s-image'
            alt={this.props.alt}
            src={this.props.white}
            onMouseOut={e=>(e.currentTarget.src=this.props.white)}
            onMouseOver={e=>(e.currentTarget.src=this.props.black)}
            />
        </a>
      </div>
    );
  }
}


export default function SpotifyMenu(){

  window.addEventListener('mousedown', function(e){
    e.preventDefault();

    let s_menu = document.getElementById('spotifyMenu');
    // console.log(s_menu.clientWidth);
    // console.log(document.getElementById('spotifyMenu').contains(e.target))

    if(!s_menu.contains(e.target) && s_menu.clientWidth > 0){
      // console.log(e.target.id)
      console.log('hide');
      s_menu.style.width = "0%"
      s_menu.style.height = "0%"
      s_menu.style.border = ""
      // s_menu
    }
  })

  return(
    <div id='spotifyMenu'>
      <p className='titleArtist'>P U {'\xa0'} A R T I S T S</p>
    <div id='flexContainer' >
      <SpotifyArtist
      link='https://open.spotify.com/artist/7tNQTfmH8piyvI5tPoCKu0?si=oIo7lzWvRV-2DqnH1ecvwQ'
      alt='LOP-Y'
      white={lopyW}
      black={lopyB}
      />
      <SpotifyArtist
      link='https://open.spotify.com/artist/6Y7mmCgTmm5iMI7OTzwY5K?si=hSisVqkfR4q1Plp2AlgC8Q'
      alt='EHY-X'
      white={ehyxW}
      black={ehyxB}
      />
      <SpotifyArtist
      link='https://open.spotify.com/artist/2oTpOYg3y1NZqIcZKCRgCD?si=mLB0Pp2vTPGQuv06nPYpRA'
      alt='NORD-Z'
      white={nordzW}
      black={nordzB}
      />
      <SpotifyArtist
      link='https://open.spotify.com/artist/5HdTXO9LCbV9RGvFmywaK2'
      alt='POL-Y'
      white={polyW}
      black={polyB}
      />
      <SpotifyArtist
      link='https://open.spotify.com/artist/3OetgG3Q4Jvp8zKk3gcz2k?si=eXWKBNiIQQKYHcV52VBojQ'
      alt='YHE-X'
      white={yheW}
      black={yheB}
      />
      <SpotifyArtist
      link='https://open.spotify.com/artist/537gbKOPT2B3rO7EnPLFTU?si=yOMrlZlrTVeulWHMLRvIzA'
      alt='DRON-Z'
      white={dronzW}
      black={dronzB}
      />
    </div>
  </div>
  )
}
