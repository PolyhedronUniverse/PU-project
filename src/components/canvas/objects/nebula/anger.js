import * as THREE from 'three';

export default function Anger(scene,origen,count){
  //Espiral
  {
    const positions = [];

    let r = 4000, rate = r/count
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random()
      const phi =  Math.acos(2 * Math.random() - 1)
      const x = Math.cosh(theta) * Math.sin(phi)
      const y = Math.cos(Math.PI - x)
      const z = r * Math.cos(Math.PI + x)
      positions.push(x)
      positions.push(y)
      positions.push(z)
      // r-=rate
      // console.log(x)
    }

    const pos = new Float32Array(positions)
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.BufferGeometry();
    const attributes = new THREE.BufferAttribute(pos, 3);
    geometry.setAttribute("position",attributes);
    const material = new THREE.PointsMaterial({
      size: 2.5,
      color:"red",
    })
    const points = new THREE.Points(geometry, material)
    points.position.x = origen.x;
    points.position.y = origen.y;
    points.position.z = origen.z;
    // scene.add(points);
  }

  // {
  //   const points = [];
  //   for (let i = 0; i < 10; ++i) {
  //     points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 30, (i - 5) * 10));
  //     console.log(points)
  //   }
  //   const geometry = new THREE.LatheBufferGeometry( points );
  //   const material = new THREE.MeshBasicMaterial( {
  //     color: 0xffff00,
  //     side: THREE.DoubleSide
  //   } );
  //   const lathe = new THREE.Mesh( geometry, material );
  //   scene.add( lathe );
  // }
}
