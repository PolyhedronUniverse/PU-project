import * as THREE from 'three';
import wonder1 from '../sceneAssets/textures/wonder_swirl_diffuse.png'
import wonder2 from '../sceneAssets/textures/wonder_ends_diffuse.png'
import wonder1op from '../sceneAssets/textures/wonder_swirl_opacity.png'
import wonder2op from '../sceneAssets/textures/wonder_ends_opacity.png'
// import normal from '../sceneAssets/normal.jpg';

export default function OldWonder(scene, loadingManager) {
  const loader = new THREE.TextureLoader(loadingManager)

  let moveNebula = 0;
  const g = new THREE.PlaneGeometry(4000, 800, 10, 10)
  const m = new THREE.MeshBasicMaterial({color: "green", wireframe: false, transparent:true, opacity: 0.5})
  const cloud = new THREE.Mesh(g,m)
  // cloud.position.z = origen.z * 5
  // cloud.rotation.x = Math.PI * 0.7
  // cloud.rotation.y = -Math.PI
  // cloud.rotation.z = Math.PI * 0.7
  cloud.name = "wonder"


  let backMaterial = new THREE.MeshBasicMaterial({
    alphaMap: loader.load(wonder1op), 
    map: loader.load(wonder1), 
    transparent: true,  
  })
  let backWonder = new THREE.PlaneGeometry(2000,2000,10,10);
  let meshWonder = new THREE.Mesh(backWonder, backMaterial);
  
  meshWonder.position.z = 100;
  // meshWonder.rotation.z = -Math.PI * 0.3;
  // scene.add(meshWonder)
  
  let curveMaterialIzq = new THREE.MeshBasicMaterial({
    alphaMap: loader.load(wonder2op), 
    map: loader.load(wonder2), 
    transparent: true, 
  })
  let curveMaterialDer = new THREE.MeshBasicMaterial({
    alphaMap: loader.load(wonder2op), 
    map: loader.load(wonder2), 
    transparent: true, 
  })
  let curveWonder = new THREE.PlaneGeometry(2000,1000,10,10);

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

  meshCurveIzq.position.set(-1200, -380, -50)
  meshCurveIzq.rotation.z = 2/Math.PI;
  meshCurveDer.position.set(1200, 380, -50)
  meshCurveDer.rotation.z = 2/Math.PI;

  let group = new THREE.Group();
  group.position.set(0,0,-1200)
  group.rotation.z = -Math.PI * 0.3
  scene.add(group);
  group.add(meshWonder)
  group.add(meshCurveIzq)
  group.add(meshCurveDer)


  scene.add(cloud)
  cloud.visible = false;
  let update = function(){
    return moveNebula;
  }

  return {cloud, update}
}