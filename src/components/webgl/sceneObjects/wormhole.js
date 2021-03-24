import * as THREE from 'three';
import water from '../sceneAssets/textures/water.jpg';
import rainbow from '../sceneAssets/textures/rainbow.png';

export default function Womhole(scene, loadingManager) {
  const loader = new THREE.TextureLoader(loadingManager);

  const vs = `
  varying vec2 vUv;
      
  void main(){
      vUv = uv;
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4 ( position, 1.0);

  }
  `;

  const fs = `
  precision highp float;
  uniform float time;
  uniform float a;
  varying vec2 vUv;
  uniform sampler2D texture1;
  uniform sampler2D texture2;

  void main(){
      vec4 col1 = texture2D(texture1, vUv + time);
      vec4 col2 = texture2D(texture2, vUv);
      
      gl_FragColor = vec4(col1.rgb * col2.rgb, 1. - pow(abs(vUv.y),a));
  }
  `;

  const geometry = new THREE.CylinderBufferGeometry(5, 0.5, 20, 100, 5, true)
  const material = new THREE.ShaderMaterial({
    vertexShader: vs,
    fragmentShader: fs,
    uniforms: {
      time: { type: 'f', value: 0.0 },
      texture1: {type: 't', value: loader.load(water)},
      texture2: {type: 't', value: loader.load(rainbow)},
      a: {type: 'f', value: 0.0}
    },
    side: THREE.DoubleSide,
    transparent: true,
    // color: 'red',
    // wireframe: true
  })
  material.uniforms.texture1.value.wrapS = material.uniforms.texture1.value.wrapT = THREE.RepeatWrapping
  material.uniforms.texture2.value.wrapS = material.uniforms.texture2.value.wrapT = THREE.RepeatWrapping



  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = Math.PI * 0.5
  mesh.position.z = -10;
  // mesh.rotation.z = 180
  scene.add(mesh)

  // let clock = new THREE.Clock();

  const update = function () {
    // mesh.rotation.x += 0.1
    mesh.material.uniforms.time.value += 0.001
  }

  mesh.userData.reset = function(){
    // console.log(mesh);
    // console.log('holi')
    mesh.material.uniforms.a.value = 0.0;
    mesh.position.z = -10;
  }
  // console.log(mesh)

  return { update }
}
