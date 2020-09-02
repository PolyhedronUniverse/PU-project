import * as THREE from 'three';


export default function Sphere  (scene){
//SPHERE
const geometry = new THREE.SphereBufferGeometry( 200, 32, 32 );
const material = new THREE.MeshBasicMaterial( {color: 'red', wireframe: false} );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
}
