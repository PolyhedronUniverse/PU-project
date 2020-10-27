import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

import PU from '../../assets/PU_Logo.png';

// OTROS
// import Sphere from './objects/others/sphere.js'
import NebulaTest from './objects/tests/nebulaTest.js'
import WonderTest from './objects/tests/wonderTest.js'
import HudTest from './objects/tests/hudTest.js'
import StarsTest from './objects/tests/starsTest.js'
import MoveTest from './objects/tests/moveTest.js'
// import musica from './assets/sounds/Back.ogg'
import Text from './objects/others/text.js'
import TubeTest from './objects/tests/tubeTest.js'
import Count from './objects/others/count.js'
import IconsTest from './objects/tests/iconsTest.js'

import Sonido from './objects/tests/sonidoTest'

// Skyboxes
import posx from './assets/skybox_test/main_skybox/main_skybox_RT.png'
import posy from './assets/skybox_test/main_skybox/main_skybox_UP.png'
import negx from './assets/skybox_test/main_skybox/main_skybox_LF.png'
import negy from './assets/skybox_test/main_skybox/main_skybox_DN.png'
import posz from './assets/skybox_test/main_skybox/main_skybox_FT.png'
import negz from './assets/skybox_test/main_skybox/main_skybox_BK.png'

// import posx from './assets/mm/right.png'
// import negx from './assets/mm/left.png'
//
// import negz from './assets/mm/top.png'
// import posz from './assets/mm/bottom.png'
//
// import posy from './assets/mm/front.png'
// import negy from './assets/mm/back.png'

export default function SceneManager ()  {

  // Env
  const clock = new THREE.Clock();

  let offtop = document.getElementById("header").clientHeight;
  let offbottom = document.getElementById("footer").clientHeight;

  let LOADINGMANAGER = null;
  let RECURSOSDESCARGADOS = false;

  let control;

  const ratio = 1000;

  let loadingManager = new THREE.LoadingManager();

  const camera = buildCamera();
  const scene = buildScene();
  scene.add(camera)
  const renderer = buildRender();
  control = myOrbitControls();

  const sceneSubjects = createSceneSubjects();

  let loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth/(window.innerHeight - offtop - offbottom ), 0.1, 1000),
    loader: new THREE.TextureLoader(loadingManager),
    geometry: new THREE.PlaneGeometry(9, 10*.75)
  }

  {
    loadingManager.onProgress= function(item,loaded,total){
      // console.log(item,loaded,total);
    }

    loadingManager.onLoad = function(){
      // console.log('loaded all resources');
      RECURSOSDESCARGADOS = true;
    }

    loadingScreen.camera.position.z = 5;

    let material = new THREE.MeshBasicMaterial({
      map: loadingScreen.loader.load(PU)
    });
    let meshSplash = new THREE.Mesh(loadingScreen.geometry,material);

    meshSplash.position.set(0,0,0);
    loadingScreen.camera.lookAt(meshSplash.position);
    loadingScreen.scene.add(meshSplash);
  }

  function buildScene() {// Construye la escena, color de fondo
    const scene = new THREE.Scene();
    const loader = new THREE.CubeTextureLoader()
    const texture = loader.load([
      posx,negx,posy,negy,posz,negz
    ])
    scene.background = texture;
    return scene;
  }

  function buildRender() {// Llama y ajusta al renderer

    offtop = document.getElementById("header").clientHeight;
    offbottom = document.getElementById("footer").clientHeight;
    console.log(offtop)

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth , window.innerHeight - offtop - offbottom );
    document.getElementById("canvas").appendChild( renderer.domElement );
    return renderer;
  }

  function buildCamera() {// Llama y ajusta la camera
    const fieldOfView = 50;
    const aspectRatio = window.innerWidth/(window.innerHeight - offtop - offbottom );
    const nearPlane = 0.1;
    const farPlane = ratio*45;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.z = 3500;
    camera.focus = 1000;
    return camera;
  }

  function createSceneSubjects() {// Aqui se agregan los diferentes objetos del canvas
    const nebulas = [
      new NebulaTest(scene, "anger", 0.96, new THREE.Vector3(-1300,1000,700), 0.009), //Anger
      new NebulaTest(scene, "sadness", 0.60, new THREE.Vector3(-1300,-700,500), 0.001), //Sadness
      new NebulaTest(scene, "joy", 0.10, new THREE.Vector3(800,-800,300), 0.004), //Joy
      new NebulaTest(scene, "love", 0.80, new THREE.Vector3(2000,500,500), 0.005), //Love
      new NebulaTest(scene, "empower", 0.02, new THREE.Vector3(1000,1000,600), 0.006), //Empowerment
      new WonderTest(scene, new THREE.Vector3(0,0,-700)),
    ];

    const others = [
      new StarsTest(scene),
      new Text(renderer.domElement),
      new TubeTest(scene),
      new MoveTest(scene, camera, nebulas, document.getElementsByTagName("canvas")[0]),
      // new Stars(20000,scene),
      new HudTest(scene,camera),
      // new Sphere(scene, new THREE.Vector3(0,0,-55000)),
      // new Hud(scene, camera),
      new Count(),
      new Sonido(camera),
      new IconsTest(scene)
    ];

    return {others, nebulas};
  }

  function myOrbitControls(){
    //Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, -8000);
    // controls.enabled = false;
    // controls.maxDistance = 1000;
    // document.querySelector('#cont').textContent = "orbit";
    controls.saveState();
    const type = 'orbit'
    return {controls,type};
  }

  function myFlyControls(){
    //Fly Controls
    const controls = new FlyControls( camera, renderer.domElement );
    controls.domElement = renderer.domElement;
    controls.movementSpeed = 0;
    controls.rollSpeed = 0;
    controls.autoForward = true;
    controls.dragToLook = false;
    // document.querySelector('#cont').textContent = "fly";
    // console.log(controls)
    const type = 'fly';
    return {controls, type};
  }

  function update(){
    if(!RECURSOSDESCARGADOS){
      renderer.render(loadingScreen.scene,loadingScreen.camera);
      return;
    }else{

      let dir;
      let box = null;

      for(let i = 0; i < sceneSubjects.nebulas.length; i++){


        dir = sceneSubjects.nebulas[i].update(camera.position); // Get direction assigned by the callback
        // console.log(i +" "+ dir)
        box = sceneSubjects.nebulas[i].box;


        if( (camera.position.z <= -7100 || camera.position.z >= 3500) ){ //If its either on hud or in nebula
          if( document.querySelector('#debug') ){
            //#### DEBUG ####
            document.querySelector('#move').textContent = "NO MOVEMENT";
            document.querySelector('#dir').textContent = dir;
            //#### DEBUG ####
          }

          if( camera.position.z <= -7100 && dir === -1){ // Activate OrbitControls once inside nebula
            if(control && control.type === 'fly') {
              control.controls.dispose();
              control = null;
              control = myOrbitControls()
              camera.position.z = -7500;
              sceneSubjects.others[3].update();
            }
          }else if(camera.position.z > 3490 && dir === 1){
            if(control){
              control.controls.dispose();
              control = null;
              camera.position.z = 3500;
              sceneSubjects.others[3].update();
            }
          }
        }

        if( dir !== 0 ) { // If its moving
          if( document.querySelector('#debug') ) {
            // DEBUG
            document.querySelector('#move').textContent = "MOVEMENT";
            document.querySelector('#dir').textContent = dir;
            //
          }

          if( dir === -1) { // If going inside nebula
            if(camera.position.z >= 3500 ) { //If its just beginin
              if(!control){
                control = myFlyControls();
                control.controls.movementSpeed = 1500;
              }
              break;
            }else if( camera.position.z < -7000 ){ // if not and its closer activate the nebula and break
              // document.querySelector('#io').textContent = box.name;
              box.visible = true;
              break;
            }
            // console.log("ayo")}
          }else if( dir === 1 ){ //If its going outside
            if(control && control.type === 'orbit'){ //Activate fly on reverse
              camera.position.z = -7500
              control.controls.reset()
              control.controls.dispose()
              control = null;
              control = myFlyControls();
              control.controls.movementSpeed = -1500;
              console.log("que")
            }
            if(camera.position.z > -7000){
              sceneSubjects.nebulas.forEach((item, i) => {
                item.box.visible = false
              });
              // console.log(box.name)
              // break;
            }

          }
        }
        box = null;


      }// END FOR

      var delta = clock.getDelta();

      if(control){
        if(control.type === 'fly'){
          control.controls.update(delta);

          if(camera.position.z < -6500 && dir === -1) {
            control.controls.movementSpeed = 150
          };
          if( document.querySelector('#debug') ){
            document.querySelector('#cont').textContent = "fly";
            document.querySelector('#back').style.display = 'none';
          }
        }else if(control.type === 'orbit') {
          control.controls.update()
          if( document.querySelector('#debug') ){
            document.querySelector('#cont').textContent = "orbit";
            document.querySelector('#back').style.display = 'initial';
          }
        }
      }else{
        if( document.querySelector('#debug') ){
          document.querySelector('#cont').textContent = "none";
          document.querySelector('#back').style.display = 'none';
        }
      }


      sceneSubjects.others[0].update();
      sceneSubjects.others[1].update();
      sceneSubjects.others[2].update(camera.position.z)
      // sceneSubjects.others[5].update(false);

      if(document.querySelector('#debug'))
      {
        document.querySelector('#x').textContent = camera.position.x
        document.querySelector('#y').textContent = camera.position.y
        document.querySelector('#z').textContent = camera.position.z
      }


      renderer.render(scene, camera);
    }
  }

  function onWindowResize(){

    offtop = document.getElementById("header").clientHeight;
    offbottom = document.getElementById("footer").clientHeight;

    camera.aspect = window.innerWidth / (window.innerHeight - offtop - offbottom);
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight - offtop - offbottom );
  }

  window.addEventListener("load", onWindowResize);

  return {
    update,
    onWindowResize,
    // stats
  }
}
