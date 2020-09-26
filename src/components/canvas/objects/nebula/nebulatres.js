import * as THREE from 'three'
import nube from '../../assets/smoke.png'
import nube2 from '../../assets/smoke4.png'
import { Color } from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import lensflare0 from 'three/examples/jsm/textures/lensflare/lensflare0.png'
import lensflare3 from 'three/examples/jsm/textures/lensflare/lensflare3.png'

export default function NebulaTres(origen, color, scene){

  let loader = new THREE.TextureLoader();

  loader.load(nube,function(texture){

    let cloudGeo = new THREE.PlaneBufferGeometry(3600,3600);
    let cloudMaterial = new THREE.MeshBasicMaterial({
      map:texture,
      transparent: true,
      alphaTest: 0.1,
      color: color,
      side: THREE.DoubleSide,
      opacity: 0.1
    });

    for (let p = 0; p < 2; p++) {
      let cloud = new  THREE.Mesh(cloudGeo,cloudMaterial);
      cloud.position.set(
        Math.random()*1000-500 + origen.x,
        origen.y,
        Math.random()*500 + origen.z
      );
      cloud.rotation.x = .5;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random()*Math.PI;
      cloud.material.opacity = 1;
      //console.log("Este es la nube: ",cloud);
      cloudParticles.push(cloud);
      radios.push(origen.distanceTo(cloud.position))
      scene.add(cloud);
    }
  },
  undefined,
  function(err){
    console.log("Error inesperado: ", err);
  });

  // loader.load(nube2,function(texture){
  //
  //   let cloudGeo = new THREE.PlaneBufferGeometry(800,800);
  //   let cloudMaterial = new THREE.MeshBasicMaterial({
  //     map:texture,
  //     transparent: true,
  //     alphaTest: 0.1,
  //     color: color,
  //     side: THREE.DoubleSide
  //   });
  //
  //   for (let p = 0; p < 5; p++) {
  //     let cloud = new  THREE.Mesh(cloudGeo,cloudMaterial);
  //     cloud.position.set(
  //       Math.random()*1000-500 + origen.x,
  //       origen.y,
  //       Math.random()*500 + origen.z
  //     );
  //     cloud.rotation.x = .5;
  //     cloud.rotation.y = -0.12;
  //     cloud.rotation.z = Math.random()*Math.PI;
  //     cloud.material.opacity = 1;
  //     //console.log("Este es la nube: ",cloud);
  //     cloudParticles.push(cloud);
  //     scene.add(cloud);
  //   }
  // },
  // undefined,
  // function(err){
  //   console.log("Error inesperado: ", err);
  // });


  const rate = Math.random() * (-.04) + .02;
  // console.log(origen)
  let aux = 0;
  // console.log(radios)

  //Update
  this.update = function(){
    let c = 0
    cloudParticles.forEach(p =>{
      p.rotation.z +=rate;
      // p.position.x = radios[c] * Math.cos(Math.PI*aux)
      // p.position.z = radios[c] * Math.sin(Math.PI*aux)
      aux+=rate/10
      c++
    })
  }

  // return cloudParticles
}
