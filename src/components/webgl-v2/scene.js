import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MyStats from "../webgl/other/stats";
import Nebulas from "../webgl/sceneObjects/nebulas";
import NebulasTextures from "../webgl/other/nebulasTextures";
import Hemispheres from "../webgl/sceneObjects/hemispheres";
import OldWonder from "../webgl/sceneObjects/oldWonder";
import Stars from "../webgl/sceneObjects/stars";
import Wormhole from '../webgl/sceneObjects/wormhole'

let renderer, scene, camera, textures, control;
let objects = []
const stats = new MyStats()
const loadingManager = myLoadingManager();
const ratio = 1000; //* Ratio for computation of bigger numbers.


function buildCamera() {

    const fieldOfView = 50;
    const aspectRatio = window.innerWidth / (window.innerHeight*2);
    const nearPlane = 0.1;
    const farPlane = ratio * 1.9;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    //camera = new THREE.PerspectiveCamera();

    camera.name = "MainCamera"
    camera.position.z = 350;
    // camera.focus = 1000;
    scene.add(camera);
}

function myOrbitControls() {

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, -4000);
  controls.maxDistance = 10;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.zoomSpeed = 0.5;
  controls.saveState();
  controls.update();
  const type = "orbit";
  return { controls, type };
}

function myLoadingManager() {
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
    console.log("start");
    console.log(url, itemsLoaded, itemsTotal)
  }

  loadingManager.onProgress = (url, itemsLoaded, itemsTotal ) => {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  loadingManager.onError = ( url ) => {
	  console.log( 'There was an error loading ' + url );
  };

  loadingManager.onLoad = () => {
    console.log("load");
    scene.background = textures.mainTexture;

    setTimeout(() => {
      const butt = document.getElementById('splash-button')
    // butt.disabled = false;
    // todo: check the disabling thing
      butt.className += ' enter-button'
      butt.textContent = 'Enter'
    }, 2000);
  };

  return loadingManager;
}

function init() {

  scene = new THREE.Scene();
  buildCamera();

  //load textures
  textures = NebulasTextures(loadingManager);
  Hemispheres(scene, loadingManager, camera);
  objects.push(new Nebulas(scene, loadingManager));
  objects.push(new Wormhole(camera, loadingManager));
  objects.push(new OldWonder(scene, loadingManager));
  // objects.push(addObject(new WonderSystem(scene, loadingManager)));
  objects.push(new Stars(scene, loadingManager));
  
  
  renderer = new THREE.WebGLRenderer({});
  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setAnimationLoop(update);

  let query = Object.fromEntries(new URLSearchParams(window.location.search).entries());

  if(query.location && query.location !== 'home'){
    control = myOrbitControls();

  }
}

function update() {
  if (!renderer.domElement.parentNode) return;

  stats.update();

  renderer.render(scene, camera);

  if (control) {
    control.controls.update()
  }

  objects.forEach((item, i) => {
        item.update()
  });
  //requestAnimationFrame(update)
}

function resize() {
  const container = renderer.domElement.parentNode.parentNode;
  console.log(container)

  if (container) {
    const width = container.offsetWidth;
	  const height = container.offsetHeight;

    
	  camera.aspect = (width / height);
	  camera.updateProjectionMatrix();
	  renderer.setSize( width, height);
  }
}

window.addEventListener("resize", resize);

export default function Scene(props) {
  
  init();

  const containerRef = useCallback((container) => {
    if (container) {
        console.log(container)
        container.insertBefore(renderer.domElement, container.firstChild);
      resize();
    } else {
      renderer.domElement.remove();
    }
  }, []);

  return <div id={props.name} ref={containerRef} />;
}
