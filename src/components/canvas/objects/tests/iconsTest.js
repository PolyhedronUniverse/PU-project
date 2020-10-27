import * as THREE from 'three';
import wonderCoord from '../../assets/data/wonderCoord.json'

export default function IconsTest(scene){
  let geometry = new THREE.BufferGeometry();
  let vertices = [];

  // for ( var i = 0; i < 10; i ++ ) {
  //
  //   let x = Math.random() * 2000 - 1000;
  //   let y = Math.random() * 2000 - 1000;
  //   let z = (Math.random() * 2000 - 1000) - 8000;
  //
  //   vertices.push( x, y, z );
  //
  // }

  wonderCoord.forEach((item, i) => {
    let x = item.x;
    let y = item.y;
    let z = item.z - 8000;

      vertices.push( x, y, z );

  });


  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  let material = new THREE.PointsMaterial({size: 20})

  let particles = new THREE.Points( geometry, material );
  console.log(wonderCoord)
  scene.add(particles)
}
