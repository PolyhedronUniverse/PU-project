import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

import Stats from 'three/examples/jsm/libs/stats.module'
import PU from '../../assets/PU_Logo.png';

// OTROS
import Stars from './objects/others/stars.js'
import NebulaTest from './objects/tests/nebulaTest.js'
import WonderTest from './objects/tests/wonderTest.js'

// HUD
import HudTest from './objects/tests/hudTest.js'

// Nebulas


// Skyboxes
//Morado
// import posx from './assets/ulukai/corona_ft.png'
// import negx from './assets/ulukai/corona_bk.png'
// import posy from './assets/ulukai/corona_up.png'
// import negy from './assets/ulukai/corona_dn.png'
// import posz from './assets/ulukai/corona_rt.png'
// import negz from './assets/ulukai/corona_lf.png'

// Azul
import posx from './assets/skybox/1.png'
import negx from './assets/skybox/3.png'
import posy from './assets/skybox/5.png'
import negy from './assets/skybox/6.png'
import posz from './assets/skybox/2.png'
import negz from './assets/skybox/4.png'
import { render } from '@testing-library/react';

// stars
// import Star1 from './objects/stars/star1.js'

export default function SceneManager (canvas)  {

  const xElem = document.querySelector('#x');
  const yElem = document.querySelector('#y');
  const zElem = document.querySelector('#z');
  const fpsElem = document.querySelector('#fps');
  // const inout = document.querySelector('#io');

  // let io = [5];

  const clock = new THREE.Clock();
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }
  let stats = Stats();
  fpsElem.appendChild(stats.dom)

  const ratio = 1000;

  let loadingManager = new THREE.LoadingManager();

  const scene = buildScene(loadingManager);
  const renderer = buildRender(screenDimensions,canvas);
  const camera = buildCamera(screenDimensions);
  // let back = scene.background;
  const sceneSubjects = createSceneSubjects(screenDimensions,canvas);
  const control = createControls();

  let loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, screenDimensions.width/screenDimensions.height, 0.1, 1000),
    loader: new THREE.TextureLoader(loadingManager),
    geometry: new THREE.PlaneGeometry(9, 10*.75)
  }

  //let LOADINGMANAGER = null;
  let RECURSOSDESCARGADOS = false;

  loadingManager.onProgress= function(item,loaded,total){
    console.log(item,loaded,total);
  }

  loadingManager.onLoad = function(){
    console.log('loaded all resources');
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
    // scene.background = new THREE.Color(0,0,.1);
    scene.fog = new THREE.FogExp2(0x03544e, 0.0001);
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
    const farPlane = ratio*100;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    scene.add( camera );
    camera.position.z = 3500;
    camera.focus = 1000;
    // var helper = new THREE.CameraHelper( camera );
    return camera;
  }

  function createSceneSubjects(screenDimensions,canvas) {// Aqui se agregan los diferentes objetos del canvas
    const sceneSubjects = [
      // new Nebulosa(scene,new THREE.Vector3(-2000,1500,0),"red",renderer,loadingManager),
      // new Nebulosa(scene,new THREE.Vector3(300,1400,0),"yellow",renderer,loadingManager),
      // new Nebulosa(scene,new THREE.Vector3(2300,1400,0),"pink",renderer,loadingManager),
      // new Nebulosa(scene,new THREE.Vector3(-1500,-600,0),"blue",renderer,loadingManager),
      // new Nebulosa(scene,new THREE.Vector3(1300,-600,0),"orange",renderer,loadingManager),
      new Stars(2000,scene),
      new HudTest(scene,camera),
      new WonderTest(scene, new THREE.Vector3(0,0,-700)),
      new NebulaTest(scene, 0.96, new THREE.Vector3(-1300,1000,700), 0.009), //Anger
      new NebulaTest(scene, 0.60, new THREE.Vector3(-1300,-700,500), 0.001), //Sadness
      new NebulaTest(scene, 0.10, new THREE.Vector3(800,1000,300), 0.004), //Joy
      new NebulaTest(scene, 0.80, new THREE.Vector3(2000,500,500), 0.005), //Love
      new NebulaTest(scene, 0.02, new THREE.Vector3(1000,-800,600), 0.006), //Empowerment
    ];

    return sceneSubjects;
  }

  function MouseArriba(){
    console.log("Estamos encima de una nebulosa");
  }

  function createControls(){
    //Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxDistance = camera.position.z*1;

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
    // io[0] = sceneSubjects[6].update()
    // io[1] = sceneSubjects[7].update()
    // io[2] = sceneSubjects[8].update()
    // io[3] = sceneSubjects[9].update()
    // io[4] = sceneSubjects[10].update()
    //
    // if(io[0]){
    //   scene.fog = new THREE.FogExp2("red", .01)
    //   // scene.background = new THREE.Color("red")
    // }
    // if(io[1]){
    //   scene.fog = new THREE.FogExp2("blue", .01)
    //   // scene.background = new THREE.Color("blue")
    // }
    // if(io[2]){
    //   scene.fog = new THREE.FogExp2("yellow", .01)
    //   // scene.fog = new THREE.Color("yellow")
    // }
    // if(io[3]){
    //   scene.fog = new THREE.FogExp2("yellow", .01)
    // }
    // if(io[4]){
    //   scene.fog = new THREE.FogExp2("yellow", .01)
    // }
    // if(io[0]||io[1]||io[2]||io[3]||io[4]) {
    //   inout.textContent = "in"
    // }
    // else{
    //   inout.textContent = "out"
    //   // scene.background = back
    //   scene.fog = new THREE.FogExp2("black", .00001)
    // }
    // sceneSubjects[3].update()

    sceneSubjects[3].update()
    sceneSubjects[4].update()
    sceneSubjects[5].update()
    sceneSubjects[6].update()
    sceneSubjects[7].update()
    // sceneSubjects[8].update()


    if(RECURSOSDESCARGADOS == false){
      //requestAnimationFrame(update);
      renderer.render(loadingScreen.scene,loadingScreen.camera);
      return;
    }else{
      // sceneSubjects[1].update();
      // sceneSubjects[2].update();
      // sceneSubjects[3].update();
      // sceneSubjects[4].update();
      // sceneSubjects[5].update();
      // sceneSubjects[15].update();

      var delta = clock.getDelta();
      control.update( delta );

      xElem.textContent = camera.position.x.toFixed(3);
      yElem.textContent = camera.position.y.toFixed(3);
      zElem.textContent = camera.position.z.toFixed(3);

      stats.update();
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

  function onMouseDown(e) {
    var vectorMouse = new THREE.Vector3(-(window.innerWidth/2-e.clientX)*2/window.innerWidth, (window.innerHeight/2-e.clientY)*2/window.innerHeight, -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
    vectorMouse.applyQuaternion(camera.quaternion);
    vectorMouse.normalize();
    var vectorObject = new THREE.Vector3(); //vector from camera to object
    // vectorObject.set(sceneSubjects[6].x - camera.position.x, sceneSubjects[6].y - camera.position.y, sceneSubjects[6].z - camera.position.z);
    vectorObject.normalize();
    if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 1) {
      //mouse's position is near object's position
    }
  }

  return {
    update,
    onWindowResize,
    stats
  }
}
