import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import audio from './sceneAssets/audios/pu-home.ogg'
// import Particles from './sceneObjects/particles'
// import Hemispheres from './sceneObjects/hemispheres'

import posx from './sceneAssets/comp/tinifiedMain/main_skybox_RT.png'
import posy from './sceneAssets/comp/tinifiedMain/main_skybox_UP.png'
import negx from './sceneAssets/comp/tinifiedMain/main_skybox_LF.png'
import negy from './sceneAssets/comp/tinifiedMain/main_skybox_DN.png'
import posz from './sceneAssets/comp/tinifiedMain/main_skybox_FT.png'
import negz from './sceneAssets/comp/tinifiedMain/main_skybox_BK.png'

export default function SceneManager(header, footer){

  /* ######### CONSTANT VARIABLES ######### */

  let LOADED = true; // Constant that'll change when the scene's assets are fully loaded and will allow the updating of it.
  const width = window.innerWidth; // Variable for the window width for later calculations.
  const height = window.innerHeight - header - footer; // Variable for the window height minus the height of the header and footer. Also for later calculations.
  const ratio = 1000; // Ratio for computation of bigger numbers.

  document.getElementById('header').style.visibility = 'hidden';
  document.getElementById('footer').style.visibility = 'hidden';

  /* ####### END CONSTANT VARIABLES ####### */



  /* ####### FUNCTIONS DECLARATION ####### */

  /* 1. SCENE */
  function buildScene(loadingManager) {
    /* ### This function will generate the scene
    setting the background and other configurations
    and return it for storing and later usage. ### */

    /* ### TO DO'S ### */
    /*
      - Set the scene background to the main skybox texture
      - It should recive a loading manager variable for the load of the texture
    */

    const loader = new THREE.CubeTextureLoader(loadingManager)
    const texture = loader.load([
      posx,negx,posy,negy,posz,negz
    ])

    const scene = new THREE.Scene();
    scene.name = "MainScene";
    scene.background = texture;
    // scene.background = new THREE.Color(0xffffff)
    return scene;
  }

  /* 2. RENDERER */
  function buildRender() {
    /* ### This function will ganerate the renderer of the scene,
    it also is for the setting of the renderer size and others attributes. It will return the
    Renderer for later usage. ### */

    /* ### TO DO'S ### */
    /*
      -
    */

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    return renderer;
  }

  /* 3. CAMERA */
  function buildCamera(scene) {
    /* ### This function will ganerate the camera of the scene,
    it also is for the setting of the initial position, and
    attributes of it. It will recive a SCENE variable to attach the
    camera and then return it for later usage. ### */

    /* ### TO DO'S ### */
    /*
      - pass the scene as a parameter
    */

    const fieldOfView = 50;
    const aspectRatio = width/(height);
    const nearPlane = 0.1;
    const farPlane = ratio*45;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.name = "MainCamera"
    camera.position.z = 350;
    // camera.focus = 1000;
    scene.add(camera)

    return camera;
  }

  /* 4. Orbit Controls */
  function myOrbitControls(camera, renderer ){
    /* ### This function will ganerate the OrbitControls and set the
    needed configuration. It should recive the camera of the scene
    and the canvas ### */

    /* ### TO DO'S ### */
    /*
      - copy the code from the old SceneManager
    */
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.target.set(0, 0, 1000);
    // controls.maxDistance = 700;
    // controls.enablePan = false;
    controls.saveState();
    controls.update()
    const type = 'orbit'
    return {controls,type};
  }

  /* 5. Add scene objects */
  // function addObject(object){

    // let newObj = [];
    // console.log(object)
    // return object;
  // }

  /* ##### END FUNCTIONS DECLARATION ##### */



  /* ########## OTHER VARIABLES ########## */

  let control;
  // const sceneSubjects = [];
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!');
    // console.log('Scene Manager')
    // setOverlay(!overlay);
    LOADED = true;
    document.getElementById('canvas-area').style.display = '';
    document.getElementById('header').style.visibility = 'visible';
    document.getElementById('footer').style.visibility = 'visible';
  };

  /* ######## END OTHER VARIABLES ######## */



  /* ######### CALLING FUNCTIONS ######### */

  const scene = buildScene(loadingManager); // Call the scene builder and store it in scene.
  const renderer = buildRender(); // Call the renderer builder and store it.
  const camera = buildCamera(scene); // Call the camera builder and pass the scene variable.
  control = myOrbitControls(camera, renderer)
  /* ####### END CALLING FUNCTIONS ####### */





  /* ########## EVENT LISTENERS ########## */

  /* 1. onLoad event*/
  function onLoad(e){
    /* ### This function will be called when the
    page has finished loading all it's elements ### */

    /* ### TO DO'S ### */
    /*
      - Copy the behavior form the old SceneManager
    */
  }

  /* 2. onWindowResize */
  function onResize(){
    /* ### This function will be called when window of the
     browser changes of size ### */

    camera.aspect = window.innerWidth / (window.innerHeight * 0.775);
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight * 0.775 );
    console.debug('resize')
  }

  // function onMouseMove(){
    /* ### This function will be called when the mouse moves
    around in the page, but it'll only work when it's inside
    the canvas ### */

    /* ### TO DO'S ### */
    /*
      - Copy the behavior form the old SceneManager
    */
  // }

  // function onMouseDown(){
    /* ### This function will be called when the left button of the
    mouse is pressed. It should change the location of the region and
    activate the fly controls. ### */

    /* ### TO DO'S ### */
    /*
      - Copy the behavior form the old SceneManager
    */
  // }

  /* ######## END EVENT LISTENERS ######## */



  /* ####### ATTACH EVENTLISTENERS ####### */

    window.addEventListener('load', onLoad, false)

  /* ##### END ATTACH EVENTLISTENERS ##### */



  /* ###### ADD OBJECTS TO THE SCENE ###### */


  let objects = []

  // objects.push(addObject(new Particles(scene,  renderer, loadingManager, camera)));
  // objects.push(addObject(new Hemispheres(scene, loadingManager, camera)))



  /* #### END ADD OBJECTS TO THE SCENE #### */




  /* ############# AUDIO SHIT ############# */

  const listener = new THREE.AudioListener();
  camera.add( listener );

  const sound = new THREE.Audio( listener );

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( audio, function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });


  // const analyser = new THREE.AudioAnalyser( sound, 128 );

  /* ########### END AUDIO SHIT ########### */


  update()

  function update(){
    requestAnimationFrame(update)
    if(!LOADED){



    }else{
      objects.forEach((item, i) => {
        item.update()
      });

      if(control){
        control.controls.update()
      }

      renderer.render(scene, camera);
    }
  }

  let name = 'Main Scene';

  return(
    {renderer,
    onResize,
    name}
  )
}
