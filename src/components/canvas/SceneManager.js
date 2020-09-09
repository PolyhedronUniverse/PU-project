import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// OTROS
import Sphere from './objects/sphere.js'
import Stars from './objects/stars.js'

import Nebulosa from './objects/nebulosa.js'
import Curva from './objects/curva.js'
=======

// HUD
import Hud from './objects/hud.js'

// Nebulas
import Wonder from './objects/nebulas/wonder.js'
import Joy from './objects/nebulas/joy.js'
import Love from './objects/nebulas/love.js'
import Anger from './objects/nebulas/anger.js'
import Sadness from './objects/nebulas/sadness.js'
import Empower from './objects/nebulas/empower.js'

// Skybox
import posx from './assets/ulukai/corona_lf.png'
import negx from './assets/ulukai/corona_rt.png'
import posy from './assets/ulukai/corona_up.png'
import negy from './assets/ulukai/corona_dn.png'
import posz from './assets/ulukai/corona_ft.png'
import negz from './assets/ulukai/corona_bk.png'

export default function SceneManager (canvas)  {

  const clock = new THREE.Clock();
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }
  // let stats;

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);

  const sceneSubjects = createSceneSubjects(scene, screenDimensions);
  createControls();


  function buildScene() {// Construye la escena, color de fondo
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0,0,.1);
    const loader = new THREE.CubeTextureLoader()
    const texture = loader.load([
      posx,negx,posy,negy,posz,negz
    ])
    scene.background = texture;
    return scene;
  }

  function buildRender({ width, height }) {// Llama y ajusta al renderer
    const renderer = new THREE.WebGLRenderer({canvas,alpha: false});
    renderer.setClearColor(0x0000000);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(width,height);

    return renderer;
  }

  function buildCamera({ width, height }) {// Llama y ajusta la cámara
    const fieldOfView = 50;
    const aspectRatio = width/height;
    const nearPlane = 0.1;
    const farPlane = 500000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    // const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, .1, 50 );
    // const camera = new THREE.PerspectiveCamera();
    scene.add( camera );
    camera.position.z = 300000;
    return camera;
  }

  function createSceneSubjects(screenDimensions) {// Aqui se agregan los diferentes objetos del canvas
    const sceneSubjects = [
      new GeneralLights(scene),
      new Nebulosa(scene,renderer),
      new Stars(2000,scene),
      new Hud(scene,camera),
      new Wonder(200000,scene),
      new Joy(2000, scene),
      new Sphere(scene),
      new Love(3000, scene),
      new Anger(3000, scene),
      new Sadness(3000,scene),
      new Empower(3000,scene)
    ];

    return sceneSubjects;
  }

  function createControls(){
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  function GeneralLights(scene) {
    const ambientLight = new THREE.AmbientLight(0x222222, 0.5);
    scene.add(ambientLight);

    // Probar otras luces
  }

  function update() {
    sceneSubjects[1].update();
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
