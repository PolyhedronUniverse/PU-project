import React from 'react'
import '../slidingmenu/slidingmenu.css'

export default function MenuContainer(props){
  const {visible} = props;
  let visibility ="hide";


  if(visible){
    visibility="show";
  }

  // console.log("Valor de si es visible o no: "+ visible);


    return (
      <div id="flyoutMenu"
           className={visibility}>
        <p className="titleArtist">P U {'\xa0'} A R T I S T S</p>
        <div className="cell">
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_lop-y_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_lop-y_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_lop-y_w.png'))}
            onClick={() => window.open('https://www.notion.so/LOP-Y-f825668f0fb1464fb0b3ade33860021a')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_ehy-x_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_ehy-x_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_ehy-x_w.png'))}
            onClick={() => window.open('https://www.notion.so/EHY-X-cb79be675ce541a0a580454f26c4a5b9')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_nord-z_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_nord-z_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_nord-z_w.png'))}
            onClick={() => window.open('https://www.notion.so/NORD-Z-22210fe050564c8486e149fbeda7fd60')}
          />
        </div>
        {/* <div className="cell">
        </div> */}
        <div className="cell">
        <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_pol-y_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_pol-y_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_pol-y_w.png'))}
            onClick={() => window.open('https://open.spotify.com/artist/5HdTXO9LCbV9RGvFmywaK2')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_yhe-x_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_yhe-x_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_yhe-x_w.png'))}
            onClick={() => window.open(' https://www.notion.so/YHE-X-67398dcba81d47b7acb6b5ddaaa86d1a')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_dron-z_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_dron-z_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_dron-z_w.png'))}
            onClick={() => window.open('https://open.spotify.com/artist/537gbKOPT2B3rO7EnPLFTU?si=yOMrlZlrTVeulWHMLRvIzA')}
          />
        </div>
        {/* <div className="cell">
        </div> */}
        {/* <div className="cell">
        </div> */}
        {/* <div className="cell">
        </div> */}
      </div>
    )
}
