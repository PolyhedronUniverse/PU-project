
import * as THREE from 'three'
import musica from '../../assets/sounds/pu-home.ogg'


export default function Sonido(camera){
let listener = new THREE.AudioListener();
camera.add(listener);
let audioLoader = new THREE.AudioLoader();
let ambiental = new THREE.Audio( listener );

const ambientalMusic = document.querySelector('#pause');
//const welcomeMusic = document.querySelector('#musicaWelcome');
const pauseMusic = document.querySelector('#pausa');
const playMusic = document.querySelector('#play');

pauseMusic.style.display = "none"

function onclick(){
    
  if(ambiental.isPlaying){
    ambiental.pause();
    pauseMusic.style.display = "none"
    playMusic.style.display = "inline"

  }else{
    ambiental.play();
    pauseMusic.style.display = "inline"
    playMusic.style.display = "none"
  }
}

audioLoader.load( musica, function ( buffer ) {

  ambiental.setBuffer( buffer );
  ambiental.setLoop( true );
  ambiental.setVolume( 0.5 );
  
} );

ambientalMusic.addEventListener("click", onclick , false);
//welcomeMusic.addEventListener("click", onclick ,false);
}