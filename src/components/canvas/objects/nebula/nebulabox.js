import * as THREE from 'three';
import nube from '../../assets/smoke.png'
import nube2 from '../../assets/fog4.png'
import nube3 from '../../assets/smoke.png'
import nube4 from '../../assets/nebulat.png'
import nube5 from '../../assets/nebulat2.png'

import back from '../../assets/nebula/skybox_back.png'
import down from '../../assets/nebula/skybox_down.png'
import front from '../../assets/nebula/skybox_front.png'
import left from '../../assets/nebula/skybox_left.png'
import right from '../../assets/nebula/skybox_right.png'
import up from '../../assets/nebula/skybox_up.png'

import space from '../../assets/space-3.jpg'
import red from '../../assets/red3.png'

export default function NebulaBox(origen, color, scene, cam){

  // const geometry = new THREE.BoxBufferGeometry(600,300,600);
  const geometry = new THREE.SphereBufferGeometry(2,12,12);
  // const geometry = new THREE.TorusKnotBufferGeometry(170,100,32,5,2,3)

  // geometry.scale(2,1,1)

  const loader = new THREE.TextureLoader();
  const materials = [
    new THREE.MeshBasicMaterial({map: loader.load(left), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(right), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(up), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(down), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(front), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(back), side: THREE.BackSide}),
  ];

  const material = new THREE.MeshBasicMaterial({map: loader.load(nube4), alphaTest: 0.1, skinning: true, side: THREE.BackSide,opacity: .4})

  const mesh =  new THREE.Mesh(geometry, material);
  mesh.position.set(origen.x,origen.y,origen.z+30);

  scene.add(mesh)


  // console.log(cam.position)


}
