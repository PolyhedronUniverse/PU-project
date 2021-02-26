import React from 'react'
import './labels.css'

export default function Labels() {
  return (
    <div id="labels">
      <div id="nebula" className="label">
        <div><span id="n-name"></span></div>
      </div>

      <div id="s-metadata" className="label">
        <div>Emotional Region: <span id="m-region"></span></div>
        <div>Constellation: <span id="m-const"></span></div>
        <div>Star Name: <span id="m-name"></span></div>
        <div>Artist: <span id="m-artist"></span></div>
        <div>PU-ID: <span id="m-pu_id"></span></div>
        <div>Star-ID: <span id="m-star_id"></span></div>
        <div>Elements: <span id="m-elements"></span></div>
        <div>Status: <span id="m-status"></span></div>
        <div>Release Date: <span id="m-release"></span></div>
      </div>
    </div>
  )
}
