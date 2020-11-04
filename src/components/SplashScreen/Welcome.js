import React from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import './splashscreen.css'

export default function Welcome(props){
    const {overlay, setOverlay} = props;
    console.log("Estamos en welcome");
    
    return(
        
        <div id="overlay">
            <button id="musicaWelcome"><AiFillPlayCircle id="playWelcome"/></button>
        </div>
    )
}