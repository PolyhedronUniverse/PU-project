import * as THREE from 'three';

export default function Cube(scene){
  var geometry = new THREE.BoxBufferGeometry( 10000, 5000, 5000 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00,wireframe:true} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
}
