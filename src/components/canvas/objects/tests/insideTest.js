import * as THREE from 'three';
import SbTextures from './texturesTest.js'
import IconsTest from './iconsTest.js'

export default function InsideTest(scene, camera, dom, canvas,loadingManager){
  function getQuery() {
    // let url = Object.fromEntries(new URLSearchParams(window.location.search).append('loc',0))
    return Object.fromEntries(new URLSearchParams(window.location.search).entries());
  }
  const query = getQuery();

  let icons = new IconsTest(scene, dom, camera, canvas,loadingManager);


  if(document.querySelector('#debug')){document.querySelector("#search").textContent = query.debug;}
  // console.log(query[0])
  let textures = new SbTextures(loadingManager);

  const g = new THREE.BoxBufferGeometry(3500/2, 3500/2, 3500/2)
  const material = new THREE.MeshBasicMaterial({color: 'black'});
  let box =  new THREE.Mesh(g, material);
  box.position.set(0, 0, 1200)
  // box.name = name;
  // console.log(textures)

  box.visible = false;
  scene.add(box);

  this.update = function(name){

    // icons.update();

    switch(name){
      case 'wonder':
      if(box.material !== textures.wonder){
        box.material = textures.wonder;
      }
      if(camera.position.z < 2200)
      icons.wonder.children.forEach((item, i) => {
        item.layers.set(0)
        // console.log(item)
      });
      break;
      case 'anger':
      if(box.material !== textures.anger){
        box.material = textures.anger;
      }
      if(camera.position.z < 2200)
      icons.anger.children.forEach((item, i) => {
        item.layers.set(0)
        // console.log(item)
      });
      break;
      case 'joy':
      if(box.material !== textures.joy){
        box.material = textures.joy;
      }
      if(camera.position.z < 2200)
      icons.joy.children.forEach((item, i) => {
        item.layers.set(0)
        // console.log(item)
      });
      break;
      case 'sadness':
      if(box.material !== textures.sadness){
        box.material = textures.sadness;
      }
      if(camera.position.z < 2200)
      icons.sadness.children.forEach((item, i) => {
        item.layers.set(0)
        // console.log(item)
      });
      break;
      case 'love':
      if(box.material !== textures.love){
        box.material = textures.love;
      }
      if(camera.position.z < 2200)
      icons.love.children.forEach((item, i) => {
        item.layers.set(0)
        // console.log(item)
      });
      break;
      case 'empowerment':
      if(box.material !== textures.empowerment){
        box.material = textures.empowerment;
      }
      if(camera.position.z < 2200)
      icons.empowerment.children.forEach((item, i) => {
        item.layers.set(0)
        // console.log(item)
      });
      break;
      default: box.material = material; if(camera.position.z > 2000) {icons.update(); }
      break;
    }

    if(camera.position.z < 2200){
      // console.log(getQuery())

      box.visible = true;
    }else {
      box.visible = false;
    }
  }
}
