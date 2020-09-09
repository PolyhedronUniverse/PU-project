import * as THREE from 'three';

export default function Sadness(count,scene){
  const positions = [];

  for (let i = 0; i < count; i++) {
    const r = 20000
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * 2 * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
    const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
    const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000)
    positions.push(x)
    positions.push(y)
    positions.push(z)
  }

  const pos = new Float32Array(positions)

  const geometry = new THREE.BufferGeometry();
  const attributes = new THREE.BufferAttribute(pos, 3);
  geometry.setAttribute("position",attributes);
  const material = new THREE.PointsMaterial({size: 500, sizeAttenuation: true, color:"blue"})
  const points = new THREE.Points(geometry, material)
  points.position.set(-100000,-100000,0);
  scene.add(points);
}
