import React,{useEffect} from 'react'
import musica from '../../assets/SonidosMusica/pu-home.ogg'
import {FaVolumeMute,FaVolumeUp} from 'react-icons/fa'
import './musicCel.css'

export const MusicCel = () => {


    useEffect(()=>{
        let audio = new Audio(musica);
        const pauseMusica = document.querySelector('#pausaCel');
        const playMusica =document.querySelector('#playCel');
        const sonidoCel= document.querySelector('#musicaCel');
    
        pauseMusica.style.display = "none"

        function reproducir(){

            if(document.querySelector("#celular")){
            if(audio.paused){
                audio.play();
                pauseMusica.style.display = "inline"
                playMusica.style.display = "none"
            }else{
                audio.pause();
                pauseMusica.style.display = "none"
                playMusica.style.display = "inline"
            }
        }

    }
    sonidoCel.addEventListener("click", reproducir, false);
    },[]);


    return (
        <div id="celular">
            <button id="musicaCel"><FaVolumeUp id="pausaCel"/><FaVolumeMute id="playCel"/></button>
        </div>
    )
}
