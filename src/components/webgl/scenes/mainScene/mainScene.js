/*
  todo: Clean scripts
  todo: test on mobile and overall the page
  todo: improve the travel
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import Particles from '../../sceneObjects/particles'
import Hemispheres from '../../sceneObjects/hemispheres'
import Nebulas from '../../sceneObjects/nebulas'
// import OldNebulas from '../../sceneObjects/oldNebulas'
import OldWonder from '../../sceneObjects/oldWonder'
import Wormhole from '../../sceneObjects/wormhole'
import Stars from '../../sceneObjects/stars'
// import Planets from '../../sceneObjects/planets'
import OldPlanets from '../../sceneObjects/oldPlanets'

// import Wonder from '../../sceneObjects/wonder'
// import WonderSystem from '../../sceneObjects/wonderSystem'

import InsertParameter from '../../other/InsertParameter'
import NebulasTextures from '../../other/nebulasTextures'
import MyStats from '../../other/stats';
import Sounds from '../../other/sounds'

export default function MainScene(header, footer) {

  // # CONSTANT VARIABLES #

  let LOADED = false; //* Constant that'll change when the scene's assets are fully loaded and will allow the updating of it.
  const width = window.innerWidth; //* Variable for the window width for later calculations.
  const height = window.innerHeight - header - footer; // * Variable for the window height minus the height of the header and footer. Also for later calculations.
  const ratio = 1000; //* Ratio for computation of bigger numbers.

  let travel = 'off';
  let query;
  let target;
  let INTERSECTED = null;

  document.getElementById('header').style.visibility = 'hidden';
  document.getElementById('footer').style.visibility = 'hidden';
  const stats = new MyStats()

  // # END CONSTANT VARIABLES #



  // # FUNCTIONS DECLARATION #

  //* 1. SCENE 
  function buildScene(texture) {
    /** 
     * * This function will generate the scene setting the 
     * * background and other configurations and return it 
     * * for storing and later usage.
     */

    /** 
     *  todo: ?
     */

    const scene = new THREE.Scene();
    scene.name = "MainScene";
    scene.background = texture;
    return scene;
  }

  //* 2. RENDERER 
  function buildRender() {
    /**
     * * This function will ganerate the renderer of the scene,
     * * it also is for the setting of the renderer size and 
     * * others attributes. It will return the Renderer for 
     * * later usage.
     */

    /**
     * todo: ?
     */

    const renderer = new THREE.WebGLRenderer({});
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    return renderer;
  }

  //* 3. CAMERA 
  function buildCamera(scene) {
    /**
     * * This function will ganerate the camera of the scene,
     * * it also is for the setting of the initial position,
     * * and attributes of it. It will recive a SCENE variable
     * * to attach the camera and then return it for later usage.
     */

    /**
     * todo: 
    */

    const fieldOfView = 50;
    const aspectRatio = width / (height);
    const nearPlane = 0.1;
    const farPlane = ratio * 1.9;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.name = "MainCamera"
    camera.position.z = 350;
    // camera.focus = 1000;
    scene.add(camera)

    return camera;
  }

  //* 4. Orbit Controls 
  function myOrbitControls(camera, renderer) {
    /**
     * * This function will ganerate the OrbitControls and set the
     * * needed configuration. It should recive the main camera
     * * and the canvas element.
     */

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, -4000)
    controls.maxDistance = 200;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.zoomSpeed = 0.5;
    controls.saveState();
    controls.update()
    const type = 'orbit'
    return { controls, type };
  }

  //* 5. Add scene objects 
  function addObject(object) {
    // ! need to figuire this shit out
    // let newObj = [];
    // console.log(object)
    return object;
  }

  /* Other functions */
  //* 6. Display nebula name
  function displayNebula(name, left, top, h, w, p) {
    const neb = document.getElementById('nebula')
    // document.getElementById('nebula').style.padding = p;
    
    // document.getElementById('nebula').style.height = (h);
    // document.getElementById('nebula').style.width = (w);

    if(left < window.innerWidth/2){
      neb.style.left = (left + neb.clientWidth) + "px";
    }else{
      neb.style.left = (left - 1.5 * neb.clientWidth) + "px";

    }
    document.getElementById('nebula').style.top = (top) - header + "px";
    document.getElementById('n-name').textContent = name;
    // document.getElementById('n-name').style.opacity = '1';
  }

  //* 7. Display Star Meta data
  function starMetadata(metadata) {
    document.getElementById('s-metadata').style.opacity = '1';

    document.getElementById('s-metadata').style.width = '20vw';
    document.getElementById('s-metadata').style.height = 'auto';
    document.getElementById('s-metadata').style.border = 'thin solid';

    document.getElementById("m-region").textContent = metadata.region;
    document.getElementById("m-const").textContent = metadata.constellation;
    document.getElementById("m-name").textContent = metadata.name;
    if (metadata.feature !== "")
      document.getElementById("m-artist").textContent = metadata.artist + " (ft. " + metadata.feature + ")";
    else {
      document.getElementById("m-artist").textContent = metadata.artist
    }
    document.getElementById("m-pu_id").textContent = metadata.puID
    document.getElementById("m-star_id").textContent = metadata.starID
    document.getElementById("m-elements").textContent = metadata.elements
    document.getElementById("m-status").textContent = metadata.status
    document.getElementById("m-release").textContent = metadata.release

    document.getElementById('m-region').className = metadata.region;

    document.getElementById('m-status').className = metadata.status;
  }

  // # END FUNCTIONS DECLARATION #



  // # OTHER VARIABLES #

  let control;
  // const sceneSubjects = [];
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onLoad = function () {
    console.log('Loading complete!');
    LOADED = true;
    const butt = document.getElementById('splash-button')
    // butt.disabled = false;
    // todo: check the disabling thing
    butt.className += ' enter-button'
    butt.textContent = 'Enter'
    document.getElementById('canvas-area').style.display = '';
    document.getElementById('header').style.visibility = 'visible';
    document.getElementById('footer').style.visibility = 'visible';
  };
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let intersects;

  // # END OTHER VARIABLES #



  // # CALLING FUNCTIONS #

  const nebulas = NebulasTextures(loadingManager); // * Textures for the background
  const scene = buildScene(nebulas.mainTexture); // * Call the scene builder and store it in scene.
  const renderer = buildRender(); // * Call the renderer builder and store it.
  const camera = buildCamera(scene); // * Call the camera builder and pass the scene variable.

  // * por si las moscas - control = myOrbitControls(camera, renderer)

  // # END CALLING FUNCTIONS #



  // # ADD OBJECTS TO THE SCENE #

  let objects = []

  // * static
  const hem = Hemispheres(scene, loadingManager, camera)
  console.log(hem)
  // * needs update
  objects.push(addObject(new Nebulas(scene, loadingManager)));
  objects.push(addObject(new Wormhole(camera, loadingManager)));
  objects.push(addObject(new OldWonder(scene, loadingManager)));
  objects.push(addObject(new Stars(scene, loadingManager)));
  // todo: contine testing shaders - objects.push(addObject(new WonderSystem(scene, loadingManager)))
  // objects.push(addObject(new oldPlanets(scene, loadingManager)));
  const planets = OldPlanets(scene, loadingManager);
  
  
  // # END ADD OBJECTS TO THE SCENE #
  
  

  // # AUDIO SHIT #

  const sounds = Sounds(camera, loadingManager)


  // ? const analyser = new THREE.AudioAnalyser( sound, 128 );

  // # END AUDIO SHIT #



  // # EVENT LISTENERS #

  //* 1. onLoad event
  function onLoad(e) {
    /**
     * * This function will be called when the
     * * page has finished loading all it's elements
     */

    console.log('all loaded');

    displayNebula('0', 0, 0, '0px', '0px', '0em')

    document.getElementById('s-metadata').style.width = '0vw';
    document.getElementById('s-metadata').style.height = '0vh';
    document.getElementById('s-metadata').style.border = '';

    window.addEventListener('pointermove', onMouseMove, false)
    window.addEventListener('pointerdown', onMouseDown, false)

    query = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    if (query.location) {
      if (query.location !== 'home') {
        camera.position.z = -3950;
        control = myOrbitControls(camera, renderer);
        scene.background = nebulas[query.location + 'Texture'];
        planets[query.location + 'Points'].layers.enable(0)
        planets[query.location + 'Points'].userData.enable()
        document.getElementById('back').style.display = ''

      }else{
        document.getElementById('back').style.display = 'none'
      }
    } else {
      InsertParameter('location', 'home');
      query.location = 'home';
      document.getElementById('back').style.display = 'none'

    }

  }

  //* 2. onWindowResize
  function onResize() {
    /**
     * * This function will be called when window of the
     * * browser changes of size
     */

    camera.aspect = window.innerWidth / (window.innerHeight * 0.775);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.775);
  }

  //* 3. OnMouseMove
  function onMouseMove(event) {
    /**
     * * This function will be called when the mouse moves
     * * around in the page, but it'll only work when it's inside
     * * the canvas
     */

    /**
     * todo: Copy the behavior form the old SceneManager
     */

    event.preventDefault();
    // const canvas = renderer.domElement;
    const rect = renderer.domElement.getBoundingClientRect();


    const pos = {
      x: (event.clientX - rect.left) * renderer.domElement.width / rect.width,
      y: (event.clientY - rect.top) * renderer.domElement.height / rect.height,
    }

    mouse.x = (pos.x / renderer.domElement.width) * 2 - 1;
    mouse.y = (pos.y / renderer.domElement.height) * -2 + 1;

    raycaster.setFromCamera(mouse, camera);
    raycaster.params.Points.threshold = 5;
    // let att;
    if (query.location !== 'home') {
      intersects = raycaster.intersectObjects([planets[query.location + 'Points']], true)
      // att = planets[query.location + 'Points'].geometry.attributes;
    } else{
      intersects = raycaster.intersectObjects(objects[0].nebulas, true)
    }


    if (intersects.length > 0 && event.target.id === 'mainCanvas') {
      if (query.location !== 'home') {
        INTERSECTED = intersects[0].object
        INTERSECTED.material.opacity = 1;
      } else{
        document.getElementById('nebula').style.padding = '0.5em';
    
        // document.getElementById('nebula').style.height = (h);
        // document.getElementById('nebula').style.width = (w);
        displayNebula(intersects[0].object.userData.displayName, event.clientX, event.clientY, 'auto', 'auto', '0.5em')
        document.getElementById('nebula').style.height = 'auto';
        document.getElementById('nebula').style.width = 'auto';
  
      }

      document.getElementById('canvas-area').style.cursor = 'pointer';
    } else {
  
      if (INTERSECTED != null && query.location !== 'home') {
        INTERSECTED.material.opacity = 0.5
        INTERSECTED = null;
      }
      
      // document.getElementById('n-name').style.opacity = '0';
      // document.getElementById('nebula').style.height = '0';
      // document.getElementById('nebula').style.width = '0';
  
      // displayNebula('d', event.clientX, event.clientY-rect.top, '0px', '0px', '0em')
      document.getElementById('nebula').style.padding = '0';
      document.getElementById('nebula').style.height = '0';
      document.getElementById('nebula').style.width = '0';

      
      document.getElementById('canvas-area').style.cursor = 'default';
    }
  }

  //* 4. OnMouseDown
  function onMouseDown(event) {
    /**
     * * This function will be called when the left button of the
     * * mouse is pressed. It should change the location of the region and
     * * activate the fly controls.
     */

    /**
     * todo: Copy the behavior form the old SceneManager
     */

    event.preventDefault();
    // console.log(event.which)
    if (event.which !== 1) {
      return;
    }

    // const canvas = renderer.domElement;
    const rect = renderer.domElement.getBoundingClientRect();

    const pos = {
      x: (event.clientX - rect.left) * renderer.domElement.width / rect.width,
      y: (event.clientY - rect.top) * renderer.domElement.height / rect.height,
    }

    mouse.x = (pos.x / renderer.domElement.width) * 2 - 1;
    mouse.y = (pos.y / renderer.domElement.height) * -2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let att;
    if (query.location !== 'home') {
      // console.log(query.location)
      intersects = raycaster.intersectObjects([planets[query.location + 'Points']], true)
      // att = planets[query.location + 'Points'].geometry.attributes;
    } else {
      intersects = raycaster.intersectObjects(objects[0].nebulas, true)
    }


    if (intersects.length > 0 && event.target.id === 'mainCanvas') {

      if (query.location !== 'home') {
        
        starMetadata(intersects[0].object.userData)
        console.log(intersects[0])
        control.controls.target.set(
          intersects[0].object.position.x,
          intersects[0].object.position.y,
          intersects[0].object.position.z - 4000)
        if(intersects[0].distance > 10)
        {camera.translateZ(-intersects[0].distance)}

      } else {
        const name = intersects[0].object.userData.displayName
        InsertParameter('location', name);
        query.location = name;
        camera.position.z -= 10;
        travel = 'forward';
        target = intersects[0].object.parent.position;
        planets[query.location + 'Points'].layers.enable(0)
        planets[query.location + 'Points'].userData.enable()
        sounds.onSound.play();
        // document.getElementById('info').style.display = 'none'

        camera.lookAt(intersects[0].object.parent.position)
        camera.updateProjectionMatrix();
      }
    }else{
      if (query.location !== 'home' && document.getElementById('s-metadata').clientWidth > 0) {
        control.controls.reset()
        document.getElementById('s-metadata').style.opacity = '0';

        document.getElementById('s-metadata').style.width = '0vw';
        // document.getElementById('s-metadata').style.height = '0vh';
        document.getElementById('s-metadata').style.border = '';
      }
    }
  }

  //* 5. OnKeyDown
  function onKeyDown(event) {
    if (event.which === 82) {
      if (query.location !== 'home') {
        if (control) {
          console.log(control)
          control.controls.reset()
          control.controls.dispose()
          control.controls.update()
          console.log(control)
          control = null;
        }
        camera.position.set(0, 0, -3900);
        camera.lookAt(0, 0, -4000);
        camera.updateProjectionMatrix()
        travel = 'backward';
        objects[4][query.location + 'Points'].layers.disableAll();
        // this.style.display = 'none';
        camera.children[0].position.z = 10;
        camera.children[0].material.uniforms.a.value = 1;
        sounds.onSound.play();
        InsertParameter('location', 'home');
        query.location = 'home';
        // starMetadata()
      }


    }
    // console.log(event.which)
  }

  //* 6. Back button
  function backOnPointerDown(event) {
    if (query.location !== 'home') {
      if (control) {
        control.controls.reset()
        control.controls.dispose()
        control = null;
      }
      camera.position.set(0, 0, -3900);
      camera.lookAt(0, 0, -4000);
      camera.updateProjectionMatrix()
      travel = 'backward';
      planets[query.location + 'Points'].layers.disableAll();
      planets[query.location + 'Points'].userData.disable();

      this.style.display = 'none';
      camera.children[0].position.z = 10;
      camera.children[0].material.uniforms.a.value = 1;
      sounds.onSound.play();
      InsertParameter('location', 'home');
      query.location = 'home';
    }
  }

  // # END EVENT LISTENERS #




  // # ATTACH EVENTLISTENERS #

  window.addEventListener('load', onLoad, false)
  // window.addEventListener('pointermove', onMouseMove, false)
  // window.addEventListener('pointerdown', onMouseDown, false)
  // ? window.addEventListener('keydown', onKeyDown, false)
  document.getElementById('back').addEventListener('pointerup', backOnPointerDown, false)

  // # END ATTACH EVENTLISTENERS #




  update()

  function update() {
    requestAnimationFrame(update)
    if (!LOADED) {
      console.log('loading')


    } else {
      objects.forEach((item, i) => {
        item.update()
      });

      if (control) {
        control.controls.update()
      }

      if (travel === 'forward') {
        if (camera.position.z < -3900) {
          travel = 'off';
          camera.children[0].userData.reset();
          document.getElementById('back').style.display = '';
          control = myOrbitControls(camera, renderer)
        } else {
          camera.translateZ(-15);
          camera.children[0].material.uniforms.a.value += 0.1;
          if (camera.position.z <= -3500) {
            camera.children[0].position.z += 0.5;
          }
          if (camera.position.distanceTo(target) < 10) {
            camera.lookAt(0, 0, -4000);
            camera.updateProjectionMatrix();
            scene.background = nebulas[query.location + 'Texture'];
            target = new THREE.Vector3(0, 0, -4000);
          }
        }
      } else if (travel === 'backward') {
        if (camera.position.z > 340) {
          camera.position.set(0, 0, 350)
          camera.lookAt(0, 0, -4000);
          camera.updateProjectionMatrix();
          travel = 'off'
          camera.children[0].userData.reset();
        } else {

          if (camera.position.z > -1200) {
            // camera.children[0].material.uniform.a.value = Math.abs(camera.position.distanceTo(new THREE.Vector3(0,0,350))) ;
            camera.children[0].material.uniforms.a.value = 1 - (camera.position.z + 1200) / 1550;
            // camera.children[0].position.z = -(3500 + camera.position.z )/230;
            camera.translateZ(5);
          } else if (camera.position.z > -3500) {
            camera.translateZ(10);
          } else {
            camera.translateZ(15)
          }
          camera.children[0].position.z -= 0.02

          if (Math.abs(camera.position.distanceTo(new THREE.Vector3(0, 0, -1000))) < 10) {
            scene.background = nebulas['mainTexture'];
          }
        }
      }

      stats.update()

      renderer.render(scene, camera);
    }
  }

  let name = 'Main Scene' + window.devicePixelRatio;
  return (
    {
      renderer,
      onResize,
      name
    }
  )
}
