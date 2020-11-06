import * as THREE from 'three'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import lensflare0 from '../../assets/lensflare/lensflare0.png'
// import lensflare2 from '../../assets/lensflare/lensflare2.png'
import lensflare3 from '../../assets/lensflare/lensflare3.png'
// import milky from '../../assets/Panning_Scene_Assets/Textures/milky_walpha.png';
// import nebulat from '../../assets/Panning_Scene_Assets/Textures/nebulat_walpha.png';
// import nebulat2 from '../../assets/Panning_Scene_Assets/Textures/nebulat2_walpha.png';
// import tec from '../../assets/Panning_Scene_Assets/Textures/Technical_Texturetest_walpha.png';
// import tec2 from '../../assets/Panning_Scene_Assets/Textures/Technical_Texturetest_walpha_2.png';
// import uvtest from '../../assets/Panning_Scene_Assets/Textures/UVTest.jpg'
import wormhole1 from '../../assets/scene_textures/wormhole_textures/wonder_wormhole_diffuse.png'
import wormhole2 from '../../assets/scene_textures/wormhole_textures/wormhole_opacity.png'
import warp from '../../assets/warp3.jpg'

export default function TubeTest(scene,loadingManager){

  let loader = new THREE.TextureLoader(loadingManager)

  let innerGeom = new THREE.CylinderBufferGeometry( 50, 5, 400, 32, 32, true );
  let innerMat = new THREE.MeshBasicMaterial( {map: loader.load(warp), side: THREE.BackSide, transparent: true, opacity: 0.0, alphaTest: 0.1 } );
  innerMat.map.wrapS = THREE.MirroredRepeatWrapping;
  innerMat.map.wrapT = THREE.MirroredRepeatWrapping;
  innerMat.map.repeat.set(2, 2);
  let innerCylinder = new THREE.Mesh( innerGeom, innerMat );
  // innerCylinder.position.set(0,0,-6900)
  innerCylinder.position.set(0,0,2300)

  innerCylinder.rotation.set(0.5*Math.PI,0,0)
  scene.add(innerCylinder)

  let outerGeom = new THREE.CylinderBufferGeometry( 60, 5, 200, 32, 32, true );
  let outerMat = new THREE.MeshBasicMaterial( {map: loader.load(warp), side: THREE.DoubleSide, alphaTest: 0.1, opacity: 0.5 } );
  outerMat.map.wrapS = THREE.MirroredRepeatWrapping;
  outerMat.map.wrapT = THREE.MirroredRepeatWrapping;
  outerMat.map.repeat.set(2, 2);
  let outerCylinder = new THREE.Mesh( outerGeom, outerMat );
  // outerCylinder.position.set(0,0,-7000)
  outerCylinder.position.set(0,0,2200)

  outerCylinder.rotation.set(0.5*Math.PI,0,0)
  scene.add(outerCylinder)

  let light = new THREE.PointLight( 0x00ff00, 10, 200, 2);
  light.position.set( 0, 0, 2000 );
  let textureFlare0 = loader.load(lensflare0);
  let textureFlare1 = loader.load(lensflare3);

  let lensflare = new Lensflare();

  lensflare.addElement( new LensflareElement( textureFlare0, 512, 0, light.color ) );
  lensflare.addElement( new LensflareElement( textureFlare1, 512, 0, light.color ) );

  light.add( lensflare );
  // scene.add( light )

  let m = new THREE.MeshBasicMaterial({alphaMap: loader.load(wormhole2), map: loader.load(wormhole1), transparent: true})
  let g = new THREE.PlaneBufferGeometry(200,200,10,10);

  const mesh = new THREE.Mesh(g, m);
  // mesh.position.set(0, 0 , -6700 );
  mesh.position.set(0, 0 , 2500 );

  scene.add(mesh)

  // const m = new THREE.MeshBasicMaterial({side: THREE.BackSide})
  // m.color.setHSL(hue, 1.0, 0.5)
  // const g = new THREE.BoxBufferGeometry(3500/2, 3500/2, 3500/2)
  // const box =  new THREE.Mesh(g, m);
  // box.position.set(0, 0, -8000)
  // scene.add(box);

  this.update = function(posz){
    // mesh.rotation.x += 0.1
    // mesh.rotation.y += 0.5
    mesh.rotation.z += 0.01

    // cylinder.material.texture.
    // console.log(posz)
    // if(posz < -6650){
    if(posz < 2500){
      if( !light.visible ){
        light.visible = true;
        innerCylinder.visible = true;
        outerCylinder.visible = true;
      }
      innerCylinder.material.opacity = (-posz + 3000) / 1000 ;
      outerCylinder.material.opacity = (-posz + 3000) / 1000 ;
    }else if(posz > 2500){
      light.visible = false;
      innerCylinder.visible = false;
      outerCylinder.visible = false;
    }

    innerCylinder.material.map.offset.y -= 0.005
    outerCylinder.material.map.offset.y -= 0.01
  }
}
