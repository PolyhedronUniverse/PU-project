import * as THREE from 'three';
import song from '../sceneAssets/audios/pu-home.ogg';
import on from '../sceneAssets/audios/pu-click.ogg'
import out from '../sceneAssets/audios/pu-back.ogg'

export default function Sounds(camera, loadingManager) {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const mainSong = new THREE.Audio(listener);



    const audioLoader = new THREE.AudioLoader(loadingManager);
    audioLoader.load(song,
        function (buffer) {
            mainSong.setBuffer(buffer);
            mainSong.setLoop(true);
            mainSong.setVolume(0.5)
        }
    );

    const audioButton = document.getElementById('audio');
    const volUp = document.getElementById('vol-up')
    const volDown = document.getElementById('vol-down')
    

    audioButton.addEventListener(
        'pointerdown',
        function(event){
            if(mainSong.isPlaying){
                volUp.style.display = 'none'
                volDown.style.display = ''
                mainSong.pause()
            }else{                
                volUp.style.display = ''
                volDown.style.display = 'none'
                mainSong.play()
            }
        },
        false
    );

    const enter = document.getElementById('splash-button')

    enter.addEventListener(
        'pointerdown',
        function (event) {
            mainSong.play();
            volUp.style.display = ''
            volDown.style.display = 'none'
        },
        false
    )


    const info = document.getElementById('info-cont');
    const infoIcon = document.getElementById('info-icon');
    const infoButton = document.getElementById('info-button')

    info.style.width = '0vw';
    info.style.padding = '0';
    info.style.border = '0';
    info.style.opacity = '0';

    infoButton.addEventListener(
        'pointerdown',
        function (event) {
            if (info.clientWidth > 0) {
                infoIcon.style.filter = 'invert(0)';
                info.style.width = '0vw';
                info.style.padding = '0';
                info.style.border = '0';
                info.style.opacity = '0';

            } else {
                info.style.width = '50vw';
                infoIcon.style.filter = 'invert(100)';
                info.style.padding = '';
                info.style.border = '';
                info.style.opacity = '1';

            }
        },
        false
    )



    const onSound = new THREE.Audio(listener)
    const outSound = new THREE.Audio(listener)

    audioLoader.load(on,
        function (buffer) {
            onSound.setBuffer(buffer);
        }
    )

    audioLoader.load(out,
        function (buffer) {
            outSound.setBuffer(buffer);
        }
    )

    return { onSound, outSound }
}