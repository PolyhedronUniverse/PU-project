import * as THREE from 'three';
import part from '../../assets/star.png'

export default function NebulaPoints(count,origen,color,scene){
  const positions = [];

  for (let i = 0; i < count; i++) {
    const r = 400
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(2 * Math.random() - 1)
    const x = (r * 2 * Math.cos(theta) * Math.sin(phi) + (-20 + Math.random() * 40)) * Math.random()
    const y = (r * Math.sin(theta) * Math.sin(phi) + (-20 + Math.random() * 40)) * Math.random()
    const z = (r * Math.cos(phi) + (-10 + Math.random() * 20)) * Math.random()
    positions.push(x)
    positions.push(y)
    positions.push(z)
  }

  const pos = new Float32Array(positions)
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.BufferGeometry();
  const attributes = new THREE.BufferAttribute(pos, 3);
  geometry.setAttribute("position",attributes);
  const material = new THREE.PointsMaterial({
    size: 2.5,
    sizeAttenuation: true,
    color:color,
    map:loader.load(part),
    transparent: true,
    alphaTest: 0.1
 })
  const points = new THREE.Points(geometry, material)
  points.position.x = origen.x;
  points.position.y = origen.y;
  points.position.z = origen.z;
  scene.add(points);
}
