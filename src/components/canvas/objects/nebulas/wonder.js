import * as THREE from 'three';

export default function Wonder(count,color,origen,scene){
  const positions = [];

  for (let i = 0; i < count; i++) {
    const r = 2000
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * 2 * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
    const y = - 600 * Math.sin(Math.PI * x/4000) + (400 - Math.random() * 200)
    const z = r * Math.cos(phi) - 500
    positions.push(x)
    positions.push(y)
    positions.push(z)
  }

  const pos = new Float32Array(positions)

  const geometry = new THREE.BufferGeometry();
  const attributes = new THREE.BufferAttribute(pos, 3);
  geometry.setAttribute("position",attributes);
  const material = new THREE.PointsMaterial({size: 5, sizeAttenuation: true, color:color})
  const points = new THREE.Points(geometry, material)
  points.position.x = origen.x;
  points.position.y = origen.y;
  points.position.z = origen.z;
  scene.add(points);

  var geo = new THREE.BoxBufferGeometry( 10, 10, 10 );
  var mat = new THREE.MeshBasicMaterial( {color: 0x00ff00,wireframe:true} );
  var cube = new THREE.Mesh( geo, mat );
  // cube.position.x = -4000
  scene.add( cube );
}
