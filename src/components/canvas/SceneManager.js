import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {FlyControls} from 'three/examples/jsm/controls/FlyControls'
// OTROS
import Sphere from './objects/sphere.js'
import Stars from './objects/stars.js'
import CloudBox from './objects/cloudbox.js'
import Nebulosa from './objects/nebulosa.js'
import Cube from './objects/cube.js'

// HUD
import Hud from './objects/hud.js'

// Nebulas
import Wonder from './objects/nebulas/wonder.js'
// import Joy from './objects/nebulas/joy.js'
// import Love from './objects/nebulas/love.js'
// import Anger from './objects/nebulas/anger.js'
// import Sadness from './objects/nebulas/sadness.js'
// import Empower from './objects/nebulas/empower.js'
import Nebula from './objects/nebulas/nebula.js'

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

export default function SceneManager (canvas)  {

  const clock = new THREE.Clock();
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }
  // let stats;
  const ratio = 1000;

  const scene = buildScene();
  const renderer = buildRender(screenDimensions,canvas);
  const camera = buildCamera(screenDimensions);

  const sceneSubjects = createSceneSubjects(screenDimensions,canvas);
  const control = createControls();


  function buildScene() {// Construye la escena, color de fondo
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0,0,.1);
    scene.fog = new THREE.FogExp2(0x03544e, 0.0001);
    const loader = new THREE.CubeTextureLoader()
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
    // renderer.outputEncoding = THREE.sRGBEncoding;
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
    camera.lookAt(new THREE.Vector3(0,0,-1));
    scene.add( camera );
    camera.position.z = ratio*6;
    var helper = new THREE.CameraHelper( camera );
    scene.add( helper );
    return camera;
  }

  function createSceneSubjects(screenDimensions,canvas) {// Aqui se agregan los diferentes objetos del canvas
    const sceneSubjects = [
      new GeneralLights(scene),
      new Nebulosa(scene,new THREE.Vector3(-2000,1500,0),"red",renderer),
      new Nebulosa(scene,new THREE.Vector3(300,1400,0),"yellow",renderer),
      new Nebulosa(scene,new THREE.Vector3(2300,1400,0),"pink",renderer),
      new Nebulosa(scene,new THREE.Vector3(-1500,-600,0),"blue",renderer),
      new Nebulosa(scene,new THREE.Vector3(1300,-600,0),"orange",renderer),
      new Stars(2000,scene),
      new Hud(scene,camera),
      new Wonder(2000, "green", new THREE.Vector3(0,0,0), scene),
      new Nebula(300, "red", new THREE.Vector3(-2000,1500,0), scene),
      new Nebula(300, "yellow", new THREE.Vector3(300,1400,0), scene),
      new Nebula(300, "pink", new THREE.Vector3(2300,1400,0), scene),
      new Nebula(300, "blue", new THREE.Vector3(-1500,-600,0), scene),
      new Nebula(300, "orange", new THREE.Vector3(1300,-600,0), scene),
      new Cube(scene),
      new CloudBox(scene,camera)
    ];

    return sceneSubjects;
  }

  function createControls(){
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxDistance = camera.position.z
    // const controls = new FlyControls( camera, renderer.domElement );
    // controls.movementSpeed = 5000;
    // controls.domElement = renderer.domElement;
    // // controls.rollSpeed = Math.PI / 10;
    // controls.autoForward = false;
    // controls.dragToLook = false;
    return controls;
  }

  function GeneralLights(scene) {
    // const ambientLight = new THREE.AmbientLight(0x222222, 0.5);
    // scene.add(ambientLight);

    // Probar otras luces
  }

  function update() {
    sceneSubjects[1].update();
    sceneSubjects[2].update();
    sceneSubjects[3].update();
    sceneSubjects[4].update();
    sceneSubjects[5].update();
    sceneSubjects[15].update();

    var delta = clock.getDelta();
    control.update( delta );

    renderer.render(scene, camera);
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
    onWindowResize
  }
}
