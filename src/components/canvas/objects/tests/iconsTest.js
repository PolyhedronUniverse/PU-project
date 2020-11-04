import * as THREE from 'three';
import wonderCoord from '../../assets/data/wonderCoord.json'
import angerCoord from '../../assets/data/angerCoord.json'
import sadnessCoord from '../../assets/data/sadnessCoord.json'
import loveCoord from '../../assets/data/loveCoord.json'
import joyCoord from '../../assets/data/joyCoord.json'
import empowermentCoord from '../../assets/data/empowermentCoord.json'

import dron from '../../assets/artist_icons/star_dron-z_90.png'
import ehy from '../../assets/artist_icons/star_ehy-x_90.png'
import lop from '../../assets/artist_icons/star_lop-y_90.png'
import nord from '../../assets/artist_icons/star_nord-z_90.png'
import pol from '../../assets/artist_icons/star_pol-y_90.png'
import yhe from '../../assets/artist_icons/star_yhe-x_90.png'

export default function IconsTest(scene, dom, camera, canvas,loadingManager){

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  let wonder = new THREE.Group();
  let anger = new THREE.Group();
  let sadness = new THREE.Group();
  let joy = new THREE.Group();
  let love = new THREE.Group();
  let empowerment = new THREE.Group();

  let loader = new THREE.TextureLoader(loadingManager)

  let textureDron = loader.load(dron)
  let textureEhy = loader.load(ehy)
  let textureLop = loader.load(lop)
  let textureNord = loader.load(nord)
  let texturePol = loader.load(pol)
  let textureYhe = loader.load(yhe)


  function storeMetaData(json, group){
    console.log(json)
    json.forEach((item, i) => {
      let material = new THREE.SpriteMaterial({color: 'red'});
      switch(item.artist){
        case 'Lop-Y':
        material = new THREE.SpriteMaterial( { map: textureLop, opacity: 0.5 } );
        break;
        case 'Pol-Y':
        material = new THREE.SpriteMaterial( { map: texturePol, opacity: 0.5 } );
        break;
        case 'Ehy-X':
        material = new THREE.SpriteMaterial( { map: textureEhy, opacity: 0.5 } );
        break;
        case 'Yhe-X':
        material = new THREE.SpriteMaterial( { map: textureYhe, opacity: 0.5 } );
        break;
        case 'Nord-Z':
        material = new THREE.SpriteMaterial( { map: textureNord, opacity: 0.5 } );
        break;
        case 'Dron-Z':
        material = new THREE.SpriteMaterial( { map: textureDron, opacity: 0.5 } );
        break;
        default: break;
      }
      const rand = Math.random() * 500 - 250;
      const sprite = new THREE.Sprite( material );
      sprite.position.set(item.x + rand, item.y + rand, item.z - 8000 + rand);
      sprite.name = item.name;
      sprite.userData = item;
      // wonderData.push(item);
      sprite.scale.set(40, 40, 1)
      // sprites.push(sprite)
      group.add(sprite);
    });
  }

  wonder.visible = false;
  anger.visible = false;
  sadness.visible = false;

  scene.add( wonder );
  scene.add( anger );
  scene.add( sadness );
  scene.add( love );
  scene.add( joy );
  scene.add( empowerment );

  // console.log(wonderCoord)

  storeMetaData(wonderCoord, wonder);
  storeMetaData(angerCoord, anger);
  storeMetaData(sadnessCoord, sadness);
  storeMetaData(loveCoord, love);
  storeMetaData(joyCoord, joy);
  storeMetaData(empowermentCoord, empowerment)



  // console.log(wonder)

  // document.getElementById("star").style.display = 'none'
  document.getElementById("s-metadata").style.display = 'none'


  function insertUrlParam(key, value) {
    if (window.history.replaceState) {
      console.log(window.history)
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState({path: newurl}, '', newurl);
      console.log("ayo=?")
    }
  }

  function deleteUrlParam(key){
    if(window.history.replaceState){
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(key);
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState({path: newurl}, '', newurl);
    }
  }

  function onMouseMove(event){
    event.preventDefault();
    // console.log("icons")

    const rect = canvas.getBoundingClientRect();

    const pos = {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    }

    mouse.x = (pos.x / canvas.width ) *  2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;


    raycaster.setFromCamera(mouse, camera);
    raycaster.params.Points.threshold = 100;

    let intersects = raycaster.intersectObjects([wonder, anger, sadness, love, joy, empowerment], true);

    if(mouse.y > -1.0 && mouse.y < 1.0 && camera.position.z < 0) {
      if (intersects.length > 0 && intersects[0].object.parent.visible) {

        intersects[0].object.material.opacity = 1.0;
        insertUrlParam('on',intersects[0].object.name)
        const object = intersects[0].object;
        document.getElementById("s-metadata").style.display = '';
        // document.getElementById("s-name-hover").style.display = 'none'
        document.getElementById("m-region").textContent = object.userData.region;
        document.getElementById("m-const").textContent = object.userData.constellation;
        document.getElementById("m-name").textContent = object.userData.name;
        document.getElementById("m-artist").textContent = object.userData.artist + " (ft. " + object.userData.feature + ")";
        document.getElementById("m-pu_id").textContent = object.userData.puID
        document.getElementById("m-star_id").textContent = object.userData.starID
        document.getElementById("m-elements").textContent = object.userData.elements
        document.getElementById("m-status").textContent = object.userData.status
        document.getElementById("m-release").textContent = object.userData.release

        switch( object.userData.region ){
          case 'Anger':
          document.getElementById('m-region').style.color = 'red';
          break;
          case 'Empowerment':
          document.getElementById('m-region').style.color = 'orange';
          break;
          case 'Sadness':
          document.getElementById('m-region').style.color = 'blue';
          break;
          case 'Joy':
          document.getElementById('m-region').style.color = 'yellow';
          break;
          case 'Love':
          document.getElementById('m-region').style.color = 'pink';
          break;
          case 'Wonder':
          document.getElementById('m-region').style.color = 'green';
          break;
          default: break;
        }


        switch( object.userData.status ){
          case 'Active':
          document.getElementById('m-status').style.color = 'green';
          break;
          case 'Inactive':
          document.getElementById('m-status').style.color = 'red';
          break;
          case 'In-Progress':
          document.getElementById('m-status').style.color = 'yellow';
          break;
          default: break;
        }

        // document.getElementById('s-metadata').style.top=(window.innerHeight/2-100)+"px";
        // document.getElementById('s-metadata').style.left=(window.innerWidth/2)+"px";
        document.getElementById('s-metadata').style.left = (event.clientX-rect.left)+"px";
        document.getElementById('s-metadata').style.top = (event.clientY-rect.top+50)+"px";
        // console.log(document.innerWidth)

      }else{

        if(document.querySelector('#debug')){document.querySelector('#hover').textContent = "none";}
        document.getElementById("canvas").style.cursor = "default";
        // document.getElementById('star').style.display = 'none'
        // intersects[0].object.material.opacity = 0.5;

        document.getElementById("s-metadata").style.display = 'none';
        deleteUrlParam('on');
      }
    }
    else{
      if(document.querySelector('#debug')){document.querySelector('#hover').textContent = "out";}
      // document.getElementById("star").style.display = 'none'
      document.getElementById("s-metadata").style.display = 'none';

      deleteUrlParam('on');

    }
  }

  function onMouseDown(event){
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();

    const pos = {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    }

    mouse.x = (pos.x / canvas.width ) *  2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects([wonder,anger,sadness, love, joy, empowerment], true);

    if(mouse.y > -1.0 && mouse.y < 1.0 && Math.abs(mouse.x) < 0.7) {
      if (intersects.length > 0 && intersects[0].object.parent.visible) {
        insertUrlParam('on',intersects[0].object.name)
        const object = intersects[0].object;
        document.getElementById("s-metadata").style.display = '';
        // document.getElementById("s-name-hover").style.display = 'none'
        document.getElementById("m-const").textContent = object.userData.constellation
        document.getElementById("m-name").textContent = object.userData.name;
        document.getElementById("m-artist").textContent = object.userData.artist + "ft. (" + object.userData.feature + ")";
        document.getElementById("m-pu_id").textContent = object.userData.puID
        document.getElementById("m-star_id").textContent = object.userData.starID
        document.getElementById("m-elements").textContent = object.userData.elements
        document.getElementById("m-status").textContent = object.userData.status
        document.getElementById("m-release").textContent = object.userData.release

        switch( object.userData.status ){
          case 'Active':
          document.getElementById('m-status').style.color = 'green';
          break;
          case 'Inactive':
          document.getElementById('m-status').style.color = 'red';
          break;
          case 'In-Progress':
          document.getElementById('m-status').style.color = 'yellow';
          break;
        }

        // document.getElementById('s-metadata').style.top=(window.innerHeight/2-100)+"px";
        // document.getElementById('s-metadata').style.left=(window.innerWidth/2)+"px";
        document.getElementById('s-metadata').style.left = (event.clientX-rect.left)+"px";
        document.getElementById('s-metadata').style.top = (event.clientY-rect.top+50)+"px";
        // console.log(document.innerWidth)

      }else {
        // document.getElementById("star").style.display = 'none'
        document.getElementById("s-metadata").style.display = 'none';
        deleteUrlParam('on');
      }
    }else{
      // document.getElementById("star").style.display = 'none'
      document.getElementById("s-metadata").style.display = 'none';
      deleteUrlParam('on');
    }
  }

  document.addEventListener('mousemove', onMouseMove, true);
  // document.addEventListener('click', onMouseDown, false);


  let icons = [wonder, anger, sadness, love, joy, empowerment]
  // console.log(icons)
  let update = function(){
    icons.forEach((item, i) => {
      if(item.visible){
        item.visible = false;
      }
    });
  }
  return {wonder, anger, sadness, love, joy, empowerment, update}
}
