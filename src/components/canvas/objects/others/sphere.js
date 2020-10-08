import * as THREE from 'three';
import rock from '../../assets/rock/rock01.jpg'


export default function Sphere(scene, origen){
  //SPHERE
  const geometry = new THREE.SphereBufferGeometry(5, 16, 16);
  const loader = new THREE.TextureLoader();

  const texture = loader.load(rock);

  const material = new THREE.MeshBasicMaterial( {
    map: texture
  } );
  
  const sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(origen.x,origen.y,origen.z)
  scene.add( sphere );

  // const material = new THREE.MeshBasicMaterial( {color: 'red', wireframe: false} );
  // const material = new THREE.MeshBasicMaterial( {map: texture} );


}
