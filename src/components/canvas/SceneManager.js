import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

// OTROS
import NebulaTest from './objects/tests/nebulaTest.js'
import WonderTest from './objects/tests/wonderTest.js'
import HudTest from './objects/tests/hudTest.js'
import StarsTest from './objects/tests/starsTest.js'
import MoveTest from './objects/tests/moveTest.js'
import TubeTest from './objects/tests/tubeTest.js'
import InsideTest from './objects/tests/insideTest.js'
import Sonido from './objects/tests/sonidoTest'

// Temp
import Count from './objects/others/count.js'


// Skyboxes
import posx from './assets/skybox_test/main_skybox/main_skybox_RT.png'
import posy from './assets/skybox_test/main_skybox/main_skybox_UP.png'
import negx from './assets/skybox_test/main_skybox/main_skybox_LF.png'
import negy from './assets/skybox_test/main_skybox/main_skybox_DN.png'
import posz from './assets/skybox_test/main_skybox/main_skybox_FT.png'
import negz from './assets/skybox_test/main_skybox/main_skybox_BK.png'

export default function SceneManager ()  {

  // Env
  const clock = new THREE.Clock();

  let offtop = document.getElementById("header").clientHeight;
  let offbottom = document.getElementById("footer").clientHeight;

  let RECURSOSDESCARGADOS = false;
  let loadingManager = new THREE.LoadingManager();

  {
    // loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    //   console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    // };

    loadingManager.onLoad = function ( ) {
      console.log( 'Loading complete!');
      RECURSOSDESCARGADOS = true
    };

    // loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    //   console.log( 'Loaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    // };

    loadingManager.onError = function ( url ) {
      console.log( 'There was an error loading ' + url );
    };
  }

  let control;
  const ratio = 1000;

  const scene = buildScene();
  const camera = buildCamera();
  const renderer = buildRender();
  const sceneSubjects = createSceneSubjects();
  // control = myOrbitControls();


  function buildScene() {// Construye la escena, color de fondo
    const scene = new THREE.Scene();
    const loader = new THREE.CubeTextureLoader(loadingManager)
    const texture = loader.load([
      posx,negx,posy,negy,posz,negz
    ])
    scene.background = texture;
    return scene;
  }

  function buildRender() {// Llama y ajusta al renderer

    offtop = document.getElementById("header").clientHeight;
    offbottom = document.getElementById("footer").clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
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
    scene.add(camera)
    return camera;
  }

  function createSceneSubjects() {// Aqui se agregan los diferentes objetos del canvas
    const nebulas = [
      new NebulaTest(scene, "anger", 0.96, new THREE.Vector3(-1300,1000,700), 0.009), //Anger
      new NebulaTest(scene, "sadness", 0.60, new THREE.Vector3(-1300,-700,500), 0.001), //Sadness
      new NebulaTest(scene, "joy", 0.10, new THREE.Vector3(800,-800,300), 0.004), //Joy
      new NebulaTest(scene, "love", 0.80, new THREE.Vector3(2000,500,500), 0.005), //Love
      new NebulaTest(scene, "empowerment", 0.02, new THREE.Vector3(1000,1000,600), 0.006), //Empowerment
      new WonderTest(scene, new THREE.Vector3(0,0,-700), loadingManager),
    ];

    const others = [
      new StarsTest(scene, loadingManager),
      new TubeTest(scene, loadingManager),
      new MoveTest(scene, camera, nebulas, document.getElementsByTagName("canvas")[0], loadingManager),
      new HudTest(scene,camera, loadingManager),
      new Count(),
      new Sonido(camera, loadingManager),
      new InsideTest(scene,camera,renderer.domElement,document.getElementsByTagName("canvas")[0], loadingManager)
    ];

    return {others, nebulas};
  }

  function myOrbitControls(){
    //Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, -8000);
    controls.maxDistance = 1000;
    controls.saveState();
    controls.update()
    controls.eneablePan = false;
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
    const type = 'fly';
    controls.update(clock.getDelta());
    return {controls, type};
  }

  function update(){
    if(!RECURSOSDESCARGADOS){
      document.getElementById('canvas').style.visibility = 'hidden'
      return;
    }else{
      document.getElementById('canvas').style.visibility = 'visible'
      let query = Object.fromEntries(new URLSearchParams(window.location.search).entries());
      let prev = 'home';

      if(document.querySelector('#debug'))document.querySelector('#query').textContent = query.location

      for(let i = 0; i < sceneSubjects.nebulas.length; i++){
        sceneSubjects.nebulas[i].update(camera.position);
        if(query.location !== 'home' && query.location !== prev){
          sceneSubjects.others[sceneSubjects.others.length - 1].update(query.location);
          prev = query.location
          if(!control){
            control = myFlyControls();
            control.controls.movementSpeed = 1500;
            camera.position.z -= 1;
          }
        }else if(query.location === 'home'){
          sceneSubjects.others[sceneSubjects.others.length - 1].update(query.location);
          prev = query.location
          if(control && control.type === 'orbit'){
            control.controls.reset()
            control.controls.dispose()
            control = null;
            control = myFlyControls();
            control.controls.movementSpeed = -1500;
            camera.position.z += 1;
          }
        }
      }

      var delta = clock.getDelta();

      if(control){
        if(control.type === 'fly'){
          control.controls.update(delta);

          if(camera.position.z < -6500 && query.location !== 'home') {
            if(control.controls.movementSpeed > 1000 ) control.controls.movementSpeed = 75;
            if(camera.position.z < -7100){
              control.controls.dispose();
              control = null;
              control = myOrbitControls()
              camera.position.z = -7500;
            }
          } else if(camera.position.z > 3490 && query.location === 'home'){
            control.controls.dispose();
            control = null;
            camera.position.z = 3500;
          }
          if( document.querySelector('#debug') ){
            document.querySelector('#cont').textContent = "fly";
          }
          document.querySelector('#back').style.display = 'none';
        }else if(control.type === 'orbit') {
          control.controls.update()
          if( document.querySelector('#debug') ){
            document.querySelector('#cont').textContent = "orbit";
          }
          document.querySelector('#back').style.display = 'initial';
        }
      }else{
        if( document.querySelector('#debug') ){
          document.querySelector('#cont').textContent = "none";
        }
        document.querySelector('#back').style.display = 'none';
      }


      sceneSubjects.others[0].update();
      sceneSubjects.others[1].update(camera.position.z)

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
  }
}
