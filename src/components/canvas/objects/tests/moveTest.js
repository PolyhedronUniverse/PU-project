import * as THREE from 'three';
import inAudio from '../../assets/sounds/pu-click.ogg'
import outAudio from '../../assets/sounds/back-sound.ogg'

export default function MoveTest(scene, camera, nebulas, canvas, loadingManager){

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  let audioLoader = new THREE.AudioLoader(loadingManager);

  let listenerIn = new THREE.AudioListener();
  let listenerOut = new THREE.AudioListener();

  camera.add( listenerIn );
  camera.add( listenerOut );

  let soundIn = new THREE.Audio( listenerIn );
  let soundOut = new THREE.Audio( listenerOut );
  // scene.add(sound)

  // sound.vol

  audioLoader.load(inAudio, function (buffer){
    soundIn.setBuffer(buffer);
    soundIn.setVolume(0.3)
  });


  audioLoader.load(outAudio, function (buffer){
    soundOut.setBuffer(buffer);
    soundOut.setVolume(0.3)
  });

  // inSound.setVolume( 1.5 );
  // let outSound = audioLoader.load(outAudio);

  let obj = [nebulas.length];

  for(let i = 0; i < nebulas.length; i++){
    obj[i] = nebulas[i].cloud;
  }

  document.getElementById("nebula").style.display = 'none'


  function insertUrlParam(key, value) {
    if (window.history.replaceState) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('on');
      searchParams.set(key, value);
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState({path: newurl}, '', newurl);
    }
  }

  function back(event) {
    event.preventDefault()

    if(camera.position.z < 3500) {
      camera.position.set(0,0,-7101)

      soundOut.play();

      insertUrlParam('location','home')
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
      if(mouse.y > -1.0 && mouse.y < 1.0 && Math.abs(mouse.x) < 0.7 && camera.position.z > 3498) {
        if (intersects.length > 0) {

          insertUrlParam('location',intersects[0].object.name)

          // sound.setBuffer(inSound);
          soundIn.play();

          // audioLoader.load( inAudio, function( buffer ) {
          //   sound.setBuffer( buffer );
          //   sound.play();
          // });
        }
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

    mouse.x = (pos.x / canvas.width ) *  2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;

    if( document.querySelector('#debug') ){
      document.querySelector('#xt').textContent = mouse.x
      document.querySelector('#yt').textContent = mouse.y
    }

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(obj);
    // console.log(intersects)


    if(mouse.y > -1.0 && mouse.y < 1.0 && camera.position.z > 3498) {
      if (intersects.length > 0) {
        if(document.querySelector('#debug')) document.querySelector('#hover').textContent = intersects[0].object.name +" "+ intersects[0].object.id;

        document.getElementById("canvas").style.cursor = "pointer";
        document.getElementById("n-name").textContent = intersects[0].object.name;
        document.getElementById("nebula").style.display = ''
        document.getElementById('nebula').style.left=(event.clientX-rect.left)+"px";
        document.getElementById('nebula').style.top=(event.clientY-rect.top+50)+"px";
      }else{
        document.getElementById("canvas").style.cursor = "default";
        document.getElementById("nebula").style.display = 'none'
      }
    }else{
      document.getElementById("nebula").style.display = 'none'
      document.getElementById("canvas").style.cursor = "default";
    }
  }

  function onLoad(event){
    event.preventDefault()
    insertUrlParam('location','home')
    document.querySelector('#back').style.display = 'none';
    document.querySelector('#info-off').style.display = 'none';
    // document.querySelector('#gui').style.display = '';


    document.getElementById("back").addEventListener("mousedown", back, false);

    document.getElementById("info").addEventListener("mousedown", onInfoHover, false);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
  }

  function onInfoHover(event){
    event.preventDefault();

    // this.childNodes[0].style.display = 'none';
    // this.childNodes[1].style.display = '';
    let gui = document.getElementById("gui");
    // console.log(gui.style)

    if(gui.style.display === "none"){
      gui.style.display = '';
      this.childNodes[0].style.display = 'none';
      this.childNodes[1].style.display = '';
      // console.log("Primer if ." + gui.style.display + ".")
    }else if(gui.style.display === ""){
      gui.style.display = 'none';
      this.childNodes[0].style.display = '';
      this.childNodes[1].style.display = 'none';
      // console.log("Segundo if ." + gui.style.display + ".")
    }
  }



  window.addEventListener('load', onLoad,false);

}
