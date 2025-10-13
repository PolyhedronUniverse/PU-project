import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MyStats from "../webgl/other/stats";
import Nebulas from "../webgl/sceneObjects/nebulas";
import NebulasTextures from "../webgl/other/nebulasTextures";

let renderer, scene, camera;
const stats = new MyStats()

function myOrbitControls() {
  /**
   * * This function will ganerate the OrbitControls and set the
   * * needed configuration. It should recive the main camera
   * * and the canvas element.
   */

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

  loadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log("start");
    console.log(url, itemsLoaded, itemsTotal)
  }

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal ) {
      console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };


  loadingManager.onError = function( url ){
	  console.log( 'There was an error loading ' + url );
  };

  return loadingManager;
}

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 1;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({});


  renderer.setAnimationLoop(update);

  const neb = NebulasTextures(myLoadingManager());
}

function update() {
  if (!renderer.domElement.parentNode) return;

  stats.update();

  renderer.render(scene, camera);
}

function resize() {
  const container = renderer.domElement.parentNode.parentNode;
  console.log(container)

  if (container) {
    const width = container.offsetWidth;
	const height = container.offsetHeight;

	renderer.setSize( window.innerWidth, height );

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
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
