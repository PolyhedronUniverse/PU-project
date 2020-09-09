import * as THREE from 'three';

export default function Wonder(count,scene){
  const positions = [];

  for (let i = 0; i < count; i++) {
    const r = 200000
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * Math.cos(theta) * Math.sin(phi) - r * Math.random()
    const y = Math.sin(theta) * Math.sin(phi)
    const z = r * Math.cos(phi)
    positions.push(x)
    positions.push(y)
    positions.push(z)
  }

  const pos = new Float32Array(positions)

  const geometry = new THREE.BufferGeometry();
  const attributes = new THREE.BufferAttribute(pos, 3);
  geometry.setAttribute("position",attributes);
  const material = new THREE.PointsMaterial({size: 500, sizeAttenuation: true, color:"green"})
  const points = new THREE.Points(geometry, material)
  scene.add(points);
}
