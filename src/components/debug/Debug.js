import React from 'react'
import './debug.css'

export const Debug = () => {
  return (
    <div id="debug">
      <div>x:<span id="x"></span></div>
      <div>y:<span id="y"></span></div>
      <div>z:<span id="z"></span></div>

      <div>xt:<span id="xt"></span></div>
      <div>yt:<span id="yt"></span></div>
      <div>zt:<span id="zt"></span></div>

      <div>fps:<span id="fps"></span></div>
      <div>i/o:<span id="io"></span></div>
      <div>move:<span id="move"></span></div>
      <div>dir:<span id="dir"></span></div>
      <div>control:<span id="cont"></span></div>
      <div>hover:<span id="hover"></span></div>
      <div>search:<span id="search"></span></div>
      <div>query:<span id="query"></span></div>
    </div>
  )
}
