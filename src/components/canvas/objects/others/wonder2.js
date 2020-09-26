import * as THREE from 'three';
import star from '../assets/star.png'
import part from '../assets/particle.png'

export default function Wonder(count,color,origen,scene){
  let positions = [];

  const r = 50000
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(-2 * Math.random() + 1)
    const x = r * 2 * Math.cos(theta) * Math.sin(phi)
    const y = 5000 * Math.sin(theta)
    const z = -10000
    positions.push(x)
    positions.push(y)
    positions.push(z)
  }

  const pos = new Float32Array(positions)
  const loader = new THREE.TextureLoader()
  const geometry = new THREE.BufferGeometry();

  const attributes = new THREE.BufferAttribute(pos, 3);
  geometry.setAttribute("position",attributes);

  const material = new THREE.PointsMaterial({
    size: 2.5,
    color: color,
    map:loader.load(star),
    // transparent: true
  })

  const points = new THREE.Points(geometry, material)
  points.position.x = origen.x;
  points.position.y = origen.y;
  points.position.z = origen.z;
  scene.add(points);

  // var geo = new THREE.BoxBufferGeometry( 10, 10, 10 );
  // var mat = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true} );
  // var cube = new THREE.Mesh( geo, mat );
  // // cube.position.x = -4000
  // scene.add( cube );

  this.update = function(){
    points.position.x += 0.01;
  }
}
