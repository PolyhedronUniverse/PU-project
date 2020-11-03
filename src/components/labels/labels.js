import React from 'react'
import './labels.css'

export const Labels = () => {
  return (
    <div id="labels">
      <div id="nebula" className="label">
        <div><span id="n-name"></span></div>
      </div>
      <div id="star" className="label">
        <div><span id="s-name"></span></div>
      </div>
      <div id="s-metadata" className="label">
        <div><span id="m-name"></span></div>
        <div>Constelation: <span id="m-const"></span></div>
        <div>Artist: <span id="m-artist"></span></div>
        <div>pu_id: <span id="m-pu_id"></span></div>
      </div>
    </div>
  )
}
