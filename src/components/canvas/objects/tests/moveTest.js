import * as THREE from 'three';
import inAudio from '../../assets/sounds/in.mp3'
import outAudio from '../../assets/sounds/out.mp3'

export default function MoveTest(scene, camera, nebulas, canvas){
  document.addEventListener("keydown", onDocumentKeyDown, false);

  let keyCode;

  let listener = new THREE.AudioListener();
  camera.add( listener );
  let sound = new THREE.Audio( listener );
  scene.add(sound)

  let obj = [nebulas.length];

  for(let i = 0; i<nebulas.length; i++){
    obj[i] = nebulas[i].cloud;
  }

  function onDocumentKeyDown(event) {
    keyCode = event.which;

    var audioLoader = new THREE.AudioLoader();

    // if(keyCode === 71){
    //   // Place camera on x axis
    //   // controls.target.set(0,0,-55000);
    //   // camera.position.set(0,0,-54000)
    //   // audioLoader.load( inAudio, function( buffer ) {
    //   //   sound.setBuffer( buffer );
    //   //   sound.play();
    //   // });
    // }else
    if(keyCode === 13){
      // controls.target.set(0,0,0);
      camera.position.set(0,0,3500)
      audioLoader.load( outAudio, function( buffer ) {
        sound.setBuffer( buffer );
        sound.play();
      });
    }
  }

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  function onDocumentMouseDown(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    let audioLoader = new THREE.AudioLoader();
    //console.log(rect)

    const pos = {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    }
    //console.log(pos)

    mouse.x = (pos.x / canvas.width ) *  2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;

    if(mouse.y > -1.0 && mouse.y < 1.0)
    {
      raycaster.setFromCamera(mouse, camera);

      let intersects = raycaster.intersectObjects(obj);
      //console.log(obj)
      if (intersects.length > 0) {
        intersects[0].object.callback();
        camera.position.set(0,0,-54000)
        audioLoader.load( inAudio, function( buffer ) {
          sound.setBuffer( buffer );
          sound.play();
        });
      }
    }
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();

    const pos = {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    }

    // if(event.clientY > window.innerHeight * 0.2 && event.clientY < window.innerHeight * 0.9)
    // {
    mouse.x = (pos.x / canvas.width ) *  2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;


    // const xElem = document.querySelector('#x');
    // const yElem = document.querySelector('#y');
    //
    // xElem.textContent = mouse.x;
    // yElem.textContent = mouse.y;

  }

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  // this.update = function(){
  //   raycaster.setFromCamera( mouse, camera );
  //   let intersects = raycaster.intersectObjects( scene.children );
  //
  //   if ( intersects.length > 0 ) {
  //     if ( INTERSECTED != intersects[ 0 ].object ) {
  //       INTERSECTED = intersects[ 0 ].object;
  //
  //       if(INTERSECTED.type == "Mesh"){
  //         camera.position.set(INTERSECTED.position.x,INTERSECTED.position.y,500)
  //         console.log(INTERSECTED.position.x)
  //       }
  //     }
  //     // INTERSECTED = null;
  //   } else {
  //
  //     if ( INTERSECTED ) console.log("adios")
  //     INTERSECTED = null;
  //   }
  // }
}
