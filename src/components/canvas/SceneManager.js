import react,{useState} from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import * as THREE from 'three';

import '../../index.css'

import Stats from 'three/examples/jsm/libs/stats.module'
import PU from '../../assets/PU_Logo.png';

// OTROS
import Sphere from './objects/others/sphere.js'
import NebulaTest from './objects/tests/nebulaTest.js'
import WonderTest from './objects/tests/wonderTest.js'
import HudTest from './objects/tests/hudTest.js'
import StarsTest from './objects/tests/starsTest.js'
import MoveTest from './objects/tests/moveTest.js'
import RandomCubes from './objects/others/randomCubes.js'
import Sonido from './objects/tests/sonidoTest'

// Skyboxes
//Ken's
import posx from './assets/skybox_test/main_skybox/main_skybox_RT.png'
import posy from './assets/skybox_test/main_skybox/main_skybox_UP.png'
import negx from './assets/skybox_test/main_skybox/main_skybox_LF.png'
import negy from './assets/skybox_test/main_skybox/main_skybox_DN.png'
import posz from './assets/skybox_test/main_skybox/main_skybox_FT.png'
import negz from './assets/skybox_test/main_skybox/main_skybox_BK.png'

import { render } from '@testing-library/react';


export default function SceneManager (canvas)  {

  // Env
  // const clock = new THREE.Clock();
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }
  //let LOADINGMANAGER = null;
  let RECURSOSDESCARGADOS = false;

  const ratio = 1000;

  let loadingManager = new THREE.LoadingManager();

  const scene = buildScene(loadingManager);
  const renderer = buildRender(screenDimensions,canvas);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(screenDimensions,canvas);

  let loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, screenDimensions.width/screenDimensions.height, 0.1, 1000),
    loader: new THREE.TextureLoader(loadingManager),
    geometry: new THREE.PlaneGeometry(9, 10*.75)
  }

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

  let light = new THREE.PointLight( 0xffffff, 1, 0 );
  light.position.set(1, 1, 100 );
  loadingScreen.scene.add(light);

  function buildScene(loadingManager) {// Construye la escena, color de fondo
    const scene = new THREE.Scene();
    const loader = new THREE.CubeTextureLoader(loadingManager)
    const texture = loader.load([
      posx,negx,posy,negy,posz,negz
    ])
    scene.background = texture;
    return scene;
  }

  function buildRender({ width, height },canvas) {// Llama y ajusta al renderer
    const renderer = new THREE.WebGLRenderer({canvas,alpha: false, antialias:true});
    renderer.setClearColor(0x0000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width,height);
    canvas.parentElement.appendChild(renderer.domElement)
    return renderer;
  }

  function buildCamera({ width, height }) {// Llama y ajusta la cámara
    const fieldOfView = 50;
    const aspectRatio = width/height;
    const nearPlane = 0.1;
    const farPlane = ratio*45;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    scene.add( camera );
    camera.position.z = 3500;
    camera.focus = 1000;
    return camera;
  }

  function createSceneSubjects(screenDimensions,canvas) {// Aqui se agregan los diferentes objetos del canvas
    const nebulas = [
      new NebulaTest(scene, 0.96, new THREE.Vector3(-1300,1000,700), 0.009), //Anger
      new NebulaTest(scene, 0.60, new THREE.Vector3(-1300,-700,500), 0.001), //Sadness
      new NebulaTest(scene, 0.10, new THREE.Vector3(800,1000,300), 0.004), //Joy
      new NebulaTest(scene, 0.80, new THREE.Vector3(2000,500,500), 0.005), //Love
      new NebulaTest(scene, 0.02, new THREE.Vector3(1000,-800,600), 0.006), //Empowerment
    ];

    const others = [
      // new Stars(20000,scene),
      new HudTest(scene,camera),
      new Sphere(scene, new THREE.Vector3(0,0,-55000)),
      new StarsTest(scene),
      // new Hud(scene, camera),
      new MoveTest(scene, camera, nebulas, canvas),
      new WonderTest(scene, new THREE.Vector3(0,0,-700)),
      new Sonido(camera),

    ];

    return {others, nebulas};
  }

  function createControls(){
    //Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    // controls.maxDistance = camera.position.z*1;

    //Fly Controls
    // const controls = new FlyControls( camera, renderer.domElement );
    // controls.autoForward = false;
    // controls.domElement = renderer.domElement;
    // controls.dragToLook = false;
    // controls.movementSpeed = 500;
    // controls.rollSpeed = 0.05;
    // controls.maxDistance = camera.position.z;

    //Add
    return controls;
  }

  function update(){

    if(RECURSOSDESCARGADOS === false){
      //requestAnimationFrame(update);
      renderer.render(loadingScreen.scene,loadingScreen.camera);
      return;
    }else{
      for(let i = 0; i<5; i++){
        sceneSubjects.nebulas[i].update();
      }
      sceneSubjects.others[2].update();
      sceneSubjects.others[5].update();
      // sceneSubjects.test[0].update();

      // console.log(sceneSubjects.nebulas[0])
      // var delta = clock.getDelta();

      // controls.update( delta );

      // xElem.textContent = camera.position.x.toFixed(3);
      // yElem.textContent = camera.position.y.toFixed(3);
      // zElem.textContent = camera.position.z.toFixed(3);
      // inout.textContent = "hola";
      // stats.update();

      renderer.render(scene, camera);
    }
  }

  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  return {
    update,
    onWindowResize,
    // stats
  }
}
