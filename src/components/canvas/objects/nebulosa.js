import * as THREE from 'three'
//import nube from '../assets/smoke.png'
//import nube from '../assets/TextNebulosa1.png'
//import nube from '../assets/TextNebulosa2.png'
//import nube from '../assets/TextNebulosa3.png'
//import nube from '../assets/TextNebulosa4.png'
//import nube from '../assets/TextNebulosa5.png'
//import nube from '../assets/TextNebulosa6.png'
import nube from '../assets/TextNebulosa7.png'
import { Color } from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import lensflare0 from 'three/examples/jsm/textures/lensflare/lensflare0.png'
import lensflare3 from 'three/examples/jsm/textures/lensflare/lensflare3.png'

export default function Nebulosa(scene,origen,color,renderer,loadingManager){


  //LENSFLARE
  // var textureLoader = new THREE.TextureLoader();
  //
  // var textureFlare0 = textureLoader.load( lensflare0 );
  // var textureFlare3 = textureLoader.load( lensflare3 );
  //
  // var light = new THREE.PointLight( "orange", 1.5, 10, 2 );
  // light.position.x = origen.x;
  // light.position.y = origen.y;
  // light.position.z = origen.z+450;
  // var lensflare = new Lensflare();
  // //
  // lensflare.addElement( new LensflareElement( textureFlare0, 100, 0 ) );
  // // lensflare.addElement( new LensflareElement( textureFlare3, 12, 0 ) );
  // // lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
  // //
  // light.add( lensflare );
  //
  // scene.add(light)
  //LENSFLARE - end

  let ambient = new THREE.AmbientLight(0x555555);
  let loader = new THREE.TextureLoader(loadingManager);
  let cloudParticles = [];
  let paletteSize = 30;
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xffffff,1);
  directionalLight.position.set(1,0,1);
  scene.add(directionalLight);

  renderer.setClearColor(scene.fog.color);
  loader.load(nube,function(texture){

    let cloudGeo = new THREE.PlaneBufferGeometry(800,800);
    let cloudMaterial = new THREE.MeshBasicMaterial({
      map:texture,
      transparent: true,
      alphaTest: 0.1,
      color: color,
      side: THREE.DoubleSide
    });

    for (let p = 0; p < 25; p++) {
      let cloud = new  THREE.Mesh(cloudGeo,cloudMaterial);
      cloud.position.set(
        Math.random()*1000-500 + origen.x,
        origen.y,
        Math.random()*1000-200 + origen.z
      );
      cloud.rotation.x = .5;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random()*Math.PI;
      cloud.material.opacity = 0.6;
      //console.log("Este es la nube: ",cloud);
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  },
  undefined,
  function(err){
    console.log("Error inesperado: ", err);
  });
  const rate = Math.random() * (-.04) + .02;
  //Update
  this.update = function(){
    cloudParticles.forEach(p =>{
      p.rotation.z +=rate;
      //p.offset.y-=0.001;
    })
  }

}
