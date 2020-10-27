import React from 'react'
import '../slidingmenu/slidingmenu.css'

export default function MenuContainer(props){
  const {visible} = props;
  let visibility ="hide";


  if(visible){
    visibility="show";
  }

  console.log("Valor de si es visible o no: "+ visible);


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
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_ehy-x_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_ehy-x_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_ehy-x_w.png'))}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_nord-z_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_nord-z_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_nord-z_w.png'))}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
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
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_yhe-x_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_yhe-x_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_yhe-x_w.png'))}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
          />
          <img
            className='short'
            alt='youtube'
            src = {require('../../assets/Artist_UI_Icons_Light/artist_dron-z_w.png')}
            onMouseOver = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_dron-z_b.png'))}
            onMouseOut = {e => (e.currentTarget.src = require('../../assets/Artist_UI_Icons_Light/artist_dron-z_w.png'))}
            onClick={() => window.open(' https://www.youtube.com/channel/UCniBFi3JxA4f0f3rOF-GiRQ', '_blank')}
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
