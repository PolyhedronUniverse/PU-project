import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import nube from '../assets/smoke.png'

export default function CloudBox(scene,camera){
  // Texture

  const size = 128;
  const data = new Uint8Array( size * size * size );

  let i = 0;
  const scale = 0.05;
  const perlin = new ImprovedNoise();
  const vector = new THREE.Vector3();

  for ( let z = 0; z < size; z ++ ) {

    for ( let y = 0; y < size; y ++ ) {

      for ( let x = 0; x < size; x ++ ) {

        const d = 1.0 - vector.set( x, y, z ).subScalar( size / 2 ).divideScalar( size ).length();
        data[ i ] = ( 128 + 128 * perlin.noise( x * scale / 1.5, y * scale, z * scale / 1.5 ) ) * d * d;
        i ++;

      }

    }

  }

  const texture = new THREE.DataTexture3D( data, size, size, size );
  texture.format = THREE.RedFormat;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.unpackAlignment = 1;

  // Material

  const vertexShader = `
  attribute float vertexDisplacement;
  uniform float delta;
  varying float vOpacity;
  varying vec3 vUv;

  void main(){
    vUv = position;
    vOpacity = vertexDisplacement;

    vec3 p = position;

    p.x += sin(vertexDisplacement) * 5.0;
    p.y += cos(vertexDisplacement) * 5.0;

    vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
  `;

  const fragmentShader = `
  uniform float delta;
  varying float vOpacity;
  varying vec3 vUv;

  void main(){
    float r = 1.0 + cos(vUv.x * delta);
    float g = 0.5 + sin(delta) * 0.5;
    float b = 0.0;
    gl_FragColor = vec4(r, g, b, vOpacity);
  }
  `;
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // const xOffset = 5;   // offset by half the texture
  // const yOffset = 5;  // offset by 1/4 the texture
  // texture.offset.set(xOffset, yOffset);

  const geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
  const uniforms = {
    delta: {value: 0.5}
  }
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader
  })
  // const material = new THREE.RawShaderMaterial( {
  //
  //   vertexShader,
  //   fragmentShader,
  //   side: THREE.BackSide,
  //   transparent: true
  // } );

  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  const vertexDisplacement = new Float32Array(geometry.attributes.position.count);
  for(var j = 0; j<vertexDisplacement.length; j++){
    vertexDisplacement[j]= Math.sin(j);
  }
  geometry.setAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement,1))

  this.update = function(){
    // mesh.material.uniforms.cameraPos.value.copy( camera.position );
  }
}
