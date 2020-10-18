import * as THREE from 'three';
import inAudio from '../../assets/sounds/in.mp3'
import outAudio from '../../assets/sounds/out.mp3'

export default function MoveTest(scene, camera, nebulas, canvas){

  let keyCode;

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  let listener = new THREE.AudioListener();
  camera.add( listener );
  let sound = new THREE.Audio( listener );
  scene.add(sound)

  let obj = [nebulas.length];

  for(let i = 0; i<nebulas.length; i++){
    obj[i] = nebulas[i].cloud;
  }

  let audioLoader = new THREE.AudioLoader();

  function onDocumentKeyDown(event) {
    keyCode = event.which;
    if(keyCode === 13){
      onDocumentMouseDown(event)
      audioLoader.load( outAudio, function( buffer ) {
        sound.setBuffer( buffer );
        sound.play();
      });
    }
  }

  function onDocumentMouseDown(event) {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const pos = {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    }


    mouse.x = (pos.x / canvas.width ) *  2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(obj);

    if(event.which === 1) {
      if(mouse.y > -1.0 && mouse.y < 1.0) {
        if (intersects.length > 0) {
          intersects[0].object.callback(-1);
          // camera.lookAt(intersects[0].object.position.x, intersects[0].object.position.y, -55000);
          // camera.object.setOrientation(  );
          document.querySelector('#io').textContent = intersects[0].object.name;
          audioLoader.load( inAudio, function( buffer ) {
            sound.setBuffer( buffer );
            sound.play();
          });
          // camera.position.z = 0
        }
      }
    }else if(event.which === 13) {
      if(camera.position.z < 3500) {
        camera.position.set(0,0,-7000)
        // camera.position.z = -7000;
        obj[0].callback(1);

      }
    }
  }

  document.addEventListener("keydown", onDocumentKeyDown, false);
  document.addEventListener('mousedown', onDocumentMouseDown, false);
}
