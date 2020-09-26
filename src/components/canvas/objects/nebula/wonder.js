import * as THREE from 'three';
import star from '../../assets/star.png'
import part from '../../assets/particle.png'
import back from '../../assets/milky.png'

export default function Wonder(count,color,origen,scene){
  let points1, points2;
  {
    let positions = [];

    const r = 20000
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * 2 * Math.cos(theta) * Math.sin(phi)
      const y = (r * 0.1 * Math.sin(Math.PI + x/15000) + (7000*Math.random()-3500))*(Math.random()*2-1) - x/5
      const z = 2 * r * Math.cos(Math.PI + x/20000) + (4000*Math.random()-4000)

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

    points1 = new THREE.Points(geometry, material)
    points1.position.x = origen.x;
    points1.position.y = origen.y;
    points1.position.z = origen.z;
    scene.add(points1);
  }

  {
    let positions = [];

    const r = 20000
    for (let i = 0; i < count/5; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * 2 * Math.cos(theta) * Math.sin(phi)
      const y = (r * 0.4 * Math.sin(Math.PI + x/15000) + (7000*Math.random()-3500))*(Math.random()*2-1) - x/5
      const z = 2 * r * Math.cos(Math.PI + x/20000) + (4000*Math.random()-4000) - 10000

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
      color: "white",
      map:loader.load(star),
      // transparent: true
    })

    points2 = new THREE.Points(geometry, material)
    points2.position.x = origen.x;
    points2.position.y = origen.y;
    points2.position.z = origen.z;
    scene.add(points2);
  }

  // {
  //   const loader = new THREE.TextureLoader()
  //
  //   const geo = new THREE.PlaneBufferGeometry(200000,20000,20)
  //   const mat = new THREE.MeshBasicMaterial({
  //     map: loader.load(back),
  //     transparent: true,
  //     alphaTest: 0.1
  //   })
  //   const mesh = new THREE.Mesh(geo, mat)
  //   mesh.position.set(0,0,-70000)
  //   scene.add(mesh)
  // }

  this.update = function(){
    points1.position.x += 0.01;
    points2.position.x += 0.01;
  }
}
