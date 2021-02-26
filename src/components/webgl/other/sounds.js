import * as THREE from 'three';
import song from '../sceneAssets/audios/pu-home.ogg';
import on from '../sceneAssets/audios/pu-click.ogg'
import out from '../sceneAssets/audios/pu-back.ogg'

export default function Sounds(camera, loadingManager){
    const listener = new THREE.AudioListener();
    camera.add( listener );
  
    const mainSong = new THREE.Audio( listener );
    
    

    const audioLoader = new THREE.AudioLoader(loadingManager);
    audioLoader.load( song, 
        function(buffer){
            mainSong.setBuffer( buffer );
            mainSong.setLoop(true);
            mainSong.setVolume(0.5)
        } 
    );
    
    // const pauseButton = document.getElementById('audio');
    const volUp = document.getElementById('vol-up')
    const volDown = document.getElementById('vol-down')
    const enter = document.getElementById('splash-button')
    
    volDown.style.display = 'none';

    volUp.addEventListener(
        'pointerdown',
        function(event){
            mainSong.pause();
            volDown.style.display = '';
            volUp.style.display = 'none';
            console.log('Up')
        },
        false
    );

    volDown.addEventListener(
        'pointerdown',
        function(event){
            mainSong.play();
            volUp.style.display = '';
            volDown.style.display = 'none';
            console.log('Down')
        },
        false
    );

    enter.addEventListener(
        'pointerdown',
        function(event){
            mainSong.play();
        },
        false
    )


    const info = document.getElementById('gui')
    const infoOff = document.getElementById('info-off')
    const infoOn = document.getElementById('info-on')

    infoOff.style.display = 'none';
    
    infoOff.addEventListener(
        'pointerdown',
        function(event){
            infoOn.style.display = ''
            this.style.display = 'none'
            info.style.display = ''
        },
        false
    )

    infoOn.addEventListener(
        'pointerdown',
        function(event){
            infoOff.style.display = ''
            this.style.display = 'none'
            info.style.display = 'none'
        },
        false
    )

    const onSound = new THREE.Audio(listener)
    const outSound = new THREE.Audio(listener)
    
    audioLoader.load(on,
        function(buffer){
            onSound.setBuffer(buffer);
        }
    )

    audioLoader.load(out,
        function(buffer){
            outSound.setBuffer(buffer);
        }
    )

    return {onSound, outSound}
}