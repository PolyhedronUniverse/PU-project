import * as THREE from  'three'
import wonder1 from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_diffuse.png'
import wonder2 from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_Ends_diffuse.png'
import wonder1op from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_opacity.png'
import wonder2op from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_Ends_opacity.png'

export default function WonderSystem(scene, origen, loadingManager){

  const loader = new THREE.TextureLoader(loadingManager)

  let moveNebula = 0;
  const g = new THREE.PlaneBufferGeometry(4000, 800, 10, 10)
  const m = new THREE.MeshBasicMaterial({color: "green", wireframe: false, transparent:true, opacity: 0.5})
  const cloud = new THREE.Mesh(g,m)
  cloud.position.z = origen.z * 5
  // cloud.rotation.x = Math.PI * 0.7
  // cloud.rotation.y = -Math.PI
  cloud.rotation.z = Math.PI * 0.7
  cloud.name = "wonder"


  let backMaterial = new THREE.MeshBasicMaterial({alphaMap: loader.load(wonder1op), map: loader.load(wonder1), transparent: true,  })
  let backWonder = new THREE.PlaneBufferGeometry(40000,40000,10,10);
  let meshWonder = new THREE.Mesh(backWonder, backMaterial);

  meshWonder.position.z = -25000;
  meshWonder.rotation.z = -Math.PI * 0.3;
  scene.add(meshWonder)

  let curveMaterialIzq = new THREE.MeshBasicMaterial({alphaMap: loader.load(wonder2op), map: loader.load(wonder2), transparent: true, })
  let curveMaterialDer = new THREE.MeshBasicMaterial({alphaMap: loader.load(wonder2op), map: loader.load(wonder2), transparent: true, })
  let curveWonder = new THREE.PlaneBufferGeometry(40000,20000,10,10);

  curveMaterialIzq.map.wrapS = THREE.RepeatWrapping;
  curveMaterialIzq.map.repeat.x = - 1;
  curveMaterialIzq.alphaMap.wrapS = THREE.RepeatWrapping;
  curveMaterialIzq.alphaMap.repeat.x = - 1;

  curveMaterialDer.map.wrapT = THREE.RepeatWrapping;
  curveMaterialDer.map.repeat.y = - 1;
  curveMaterialDer.alphaMap.wrapT = THREE.RepeatWrapping;
  curveMaterialDer.alphaMap.repeat.y = - 1;

  let meshCurveIzq = new THREE.Mesh(curveWonder,curveMaterialIzq)
  let meshCurveDer = new THREE.Mesh(curveWonder,curveMaterialDer)

  meshCurveIzq.position.set(-20000, 15000, -30000)
  meshCurveIzq.rotation.z = -0.3
  meshCurveDer.position.set(20000, -15000, -30000)
  meshCurveDer.rotation.z = -0.3

  scene.add(meshCurveIzq)
  scene.add(meshCurveDer)


  scene.add(cloud)
  cloud.visible = false;
  let update = function(){
    return moveNebula;
  }

  return {cloud, update}
}
