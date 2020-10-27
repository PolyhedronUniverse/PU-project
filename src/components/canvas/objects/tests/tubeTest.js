import * as THREE from 'three'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import lensflare0 from '../../assets/lensflare/lensflare0.png'
import lensflare2 from '../../assets/lensflare/lensflare2.png'
import lensflare3 from '../../assets/lensflare/lensflare3.png'
// import milky from '../../assets/Panning_Scene_Assets/Textures/milky_walpha.png';
// import nebulat from '../../assets/Panning_Scene_Assets/Textures/nebulat_walpha.png';
// import nebulat2 from '../../assets/Panning_Scene_Assets/Textures/nebulat2_walpha.png';
// import tec from '../../assets/Panning_Scene_Assets/Textures/Technical_Texturetest_walpha.png';
// import tec2 from '../../assets/Panning_Scene_Assets/Textures/Technical_Texturetest_walpha_2.png';
// import uvtest from '../../assets/Panning_Scene_Assets/Textures/UVTest.jpg'
import warp from '../../assets/warp3.jpg'

export default function TubeTest(scene){
  let loader = new THREE.TextureLoader()

  let innerGeom = new THREE.CylinderBufferGeometry( 50, 5, 400, 32, 32, true );
  let innerMat = new THREE.MeshBasicMaterial( {map: loader.load(warp), side: THREE.BackSide, transparent: true, opacity: 0.0, alphaTest: 0.1 } );
  innerMat.map.wrapS = THREE.MirroredRepeatWrapping;
  innerMat.map.wrapT = THREE.MirroredRepeatWrapping;
  innerMat.map.repeat.set(2, 2);
  // innerMat.map.rotation = THREE.MathUtils.degToRad(45);
  let innerCylinder = new THREE.Mesh( innerGeom, innerMat );
  // innerCylinder.position.set(0,0,-7000)
  innerCylinder.position.set(0,0,-6900)
  innerCylinder.rotation.set(0.5*Math.PI,0,0)
  scene.add(innerCylinder)

  let outerGeom = new THREE.CylinderBufferGeometry( 60, 5, 200, 32, 32, true );
  let outerMat = new THREE.MeshBasicMaterial( {map: loader.load(warp), side: THREE.DoubleSide, alphaTest: 0.1, opacity: 0.5 } );
  outerMat.map.wrapS = THREE.MirroredRepeatWrapping;
  outerMat.map.wrapT = THREE.MirroredRepeatWrapping;
  outerMat.map.repeat.set(2, 2);
  // outerMat.map.rotation = Math.PI ;
  // outerMat.map.rotation = THREE.MathUtils.degToRad(90);
  let outerCylinder = new THREE.Mesh( outerGeom, outerMat );
  // outerCylinder.position.set(0,0,-7000)
  outerCylinder.position.set(0,0,-7000)
  outerCylinder.rotation.set(0.5*Math.PI,0,0)
  scene.add(outerCylinder)

  let light = new THREE.PointLight( 0x00ff00, 10, 200, 2);
  light.position.set( 0, 0, -7000 );
  // light.decay = 2
  let textureFlare0 = loader.load(lensflare0);
  let textureFlare1 = loader.load(lensflare3);
  let textureFlare2 = loader.load(lensflare3);

  let lensflare = new Lensflare();

  lensflare.addElement( new LensflareElement( textureFlare0, 512, 0, light.color ) );
  lensflare.addElement( new LensflareElement( textureFlare1, 512, 0, light.color ) );
  // lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6, light.color ) );

  light.add( lensflare );
  scene.add( light )

  // const m = new THREE.MeshBasicMaterial({side: THREE.BackSide})
  // m.color.setHSL(hue, 1.0, 0.5)
  // const g = new THREE.BoxBufferGeometry(3500/2, 3500/2, 3500/2)
  // const box =  new THREE.Mesh(g, m);
  // box.position.set(0, 0, -8000)
  // scene.add(box);

  this.update = function(posz){
    // cylinder.material.texture.
    // console.log(posz)
    if(posz < -6650){
      if( !light.visible ){
        light.visible = true;
        innerCylinder.visible = true;
        outerCylinder.visible = true;
      }
      innerCylinder.material.opacity = (-posz - 6300) / 1000 ;
      outerCylinder.material.opacity = (-posz - 6500) / 1000 ;
    }else if(posz > -6650){
      light.visible = false;
      innerCylinder.visible = false;
      outerCylinder.visible = false;
    }

    innerCylinder.material.map.offset.y -= 0.005
    outerCylinder.material.map.offset.y -= 0.01
  }
}
