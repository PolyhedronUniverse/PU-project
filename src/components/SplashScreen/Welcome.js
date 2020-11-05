import React,{useEffect} from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import './splashscreen.css'
import SplashScreen from '../../assets/PU_Splashscreen.png'

export default function Welcome(props){
    const {overlay} = props;
    console.log("Estamos en welcome");

    const over = document.querySelector('#overlay');

    // useEffect(() => {
    //     const disaWelcome = document.querySelector('#disabledWelcome');
    //     const reproWelcome = document.querySelector('#playWelcome');

    //     reproWelcome.style.display = "none";
    // },[]);

    const disaWelcome = document.querySelector('#disabledWelcome');
    const reproWelcome = document.querySelector('#playWelcome');

    if(document.querySelector('#playWelcome')){
        reproWelcome.style.display = "none";
    }

    function onClick(){
        over.style.display = "none";
        document.getElementById('canvas').style.display = ''
    }

    if(document.querySelector('#disabledWelcome') && overlay){
        disaWelcome.style.display = "none";
        reproWelcome.style.display = "inline";
    }
    
    return(
        
        <div id="overlay">
            <img src={require('../../assets/PU_Splashscreen.png')} id="welcomeImage"/>
            <div id="imagenDisable">
                <img id="disabledWelcome" src={require('../../assets/Loading_ns50g_b.png')}/>
            </div>
            <button id="musicaWelcome" onClick={() => onClick()}>
                <img id="playWelcome" src={require('../../assets/Enter_ns75g_h.png')}/>
            </button>
        </div>
    )
}