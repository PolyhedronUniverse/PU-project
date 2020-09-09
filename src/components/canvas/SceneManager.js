import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sphere from './objects/sphere.js'
import Stars from './objects/stars.js'
import Nebulosa from './objects/nebulosa.js'
// import Stats from 'three/examples/jsm/libs/stats.module.js';
import Curva from './objects/curva.js'

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
    scene.background = new THREE.Color(0,0,.1);
    scene.fog = new THREE.FogExp2(0x03544e, 0.001);
    return scene;
  }

  function buildRender({ width, height }) {// Llama y ajusta al renderer
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(width,height);

    return renderer;
  }

  function buildCamera({ width, height }) {// Llama y ajusta la cámara
    const fieldOfView = 50;
    const aspectRatio = width/height;
    const nearPlane = 0.01;
    const farPlane = 500000;
    //const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    const camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1000);
    camera.position.z = 10;
    // camera.rotation.x = 1.16;
    // camera.rotation.y = -0.12;
    // camera.rotation.z = 0.27;
    //const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    scene.add( camera );
    //camera.position.z = 10000;
    return camera;
  }

  function createSceneSubjects(scene, screenDimensions) {// Aqui se agregan los diferentes objetos del canvas
    const sceneSubjects = [
      new GeneralLights(scene),
      new Nebulosa(scene,renderer),
      //new Stars(50000, scene),
      //new Sphere(scene)
    ];

    return sceneSubjects;
  }

  function createControls(){
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  function GeneralLights(scene) {
    const ambientLight = new THREE.AmbientLight(0x555555);
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
