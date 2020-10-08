import React from 'react'

export const Debug = () => {
    return (
      <div id="debug">
        <div>x:<span id="x"></span></div>
        <div>y:<span id="y"></span></div>
        <div>z:<span id="z"></span></div>
        <div>fps:<span id="fps"></span></div>
        <div>i/o:<span id="io"></span></div>
      </div>
    )
}
