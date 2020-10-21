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

  const labelContainerElem = document.querySelector('#nebulas');

  let obj = [nebulas.length];

  const tempV = new THREE.Vector3();
  let ids = [nebulas.length]

  for(let i = 0; i < nebulas.length; i++){
    obj[i] = nebulas[i].cloud;
    const elem = document.createElement('div');
    elem.textContent = obj[i].name;
    labelContainerElem.appendChild(elem);
    elem.style.display = 'none';
    elem.id = obj[i].id;
    elem.className = 'lable';
    ids[i] = obj[i].id;
  }

  // console.log(nebulas.length)

  // console.log(obj)
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

  function onDocumentMouseOver(event) {

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

    if(mouse.y > -1.0 && mouse.y < 1.0) {
      if (intersects.length > 0) {
        // console.log(intersects[0].object.id)
        // intersects[0].object.callback(-1);
        // camera.lookAt(intersects[0].object.position.x, intersects[0].object.position.y, -55000);
        // camera.object.setOrientation(  );
        document.querySelector('#hover').textContent = intersects[0].object.name +" "+ intersects[0].object.id;
        document.getElementById("canvas").style.cursor = "pointer";
        // camera.position.z = 0

        switch(intersects[0].object.id){
          case ids[0]:  document.getElementById(ids[0]).style.display = ''
                        document.getElementById(ids[0]).style.left=(event.clientX-rect.left)+"px";
                        document.getElementById(ids[0]).style.top=(event.clientY-rect.top-30)+"px";
                        break;
          case ids[1]:  document.getElementById(ids[1]).style.display = ''
                        document.getElementById(ids[1]).style.left=(event.clientX-rect.left)+"px";
                        document.getElementById(ids[1]).style.top=(event.clientY-rect.top-30)+"px";
                        break;
          case ids[2]:  document.getElementById(ids[2]).style.display = ''
                        break;
          case ids[3]:  document.getElementById(ids[3]).style.display = ''
                        break;
          case ids[4]:  document.getElementById(ids[4]).style.display = ''
                        document.getElementById(ids[4]).style.left=(event.clientX-rect.left)+"px";
                        document.getElementById(ids[4]).style.top=(event.clientY-rect.top-30)+"px";
                        break;
          case ids[5]:  document.getElementById(ids[5]).style.display = ''
                        document.getElementById(ids[5]).style.left=(event.clientX-rect.left)+"px";
                        document.getElementById(ids[5]).style.top=(event.clientY-rect.top-30)+"px";
                        break;
          default:
                        break;
        }

      }else{
        document.querySelector('#hover').textContent = "none";
        document.getElementById("canvas").style.cursor = "default";
        // if(document.getElementsByClassName('lable')[0].style.display == '')
        const lab = document.getElementsByClassName('lable');
        // console.log(lab)
        for(let i = 0; i< lab.length; i++){
          lab[i].style.display = "none"
        }
      }
    }else{
      document.querySelector('#hover').textContent = "out";
    }

  }

  document.addEventListener("keydown", onDocumentKeyDown, false);
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mousemove', onDocumentMouseOver, false);
}
