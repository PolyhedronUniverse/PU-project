import React from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import './splashscreen.css'

export default function Welcome(){
    console.log("Estamos en welcome");
    
    return(
        
        <div id="overlay">
            <button id="musicaWelcome"><AiFillPlayCircle id="playWelcome"/></button>
        </div>
    )
}