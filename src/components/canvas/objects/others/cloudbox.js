import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import nube from '../../assets/smoke.png'
import nube2 from '../../assets/nebulat.png'
import nube3 from '../../assets/nebulat2.png'


export default function CloudBox(scene,camera){
  // Texture

  const size = 128;
  const data = new Uint8Array( size * size * size );

  let i = 0;
  const scale = 0.5;
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
  void main()
  {
    vec3 posChanged = position;
    posChanged.x = posChanged.x*(abs(sin(time*1.0)));
    posChanged.y = posChanged.y*(abs(cos(time*1.0)));
    posChanged.z = posChanged.z*(abs(sin(time*1.0)));
    gl_Position = projectionMatrix * modelViewMatrix *
    vec4(posChanged,1.0);
  }
  `;

  const fragmentShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  uniform float time;
  uniform vec2 resolution;
  void main( void )
  {
    vec2 uPos = ( gl_FragCoord.xy / resolution.xy );

    uPos.x -= 1.0;
    uPos.y -= 0.5;

    vec3 color = vec3(0.0);
    float vertColor = 2.0;
    for( float i = 0.0; i < 15.0; ++i ) {
      float t = time * (0.9);

      uPos.y += sin( uPos.x*i + t+i/2.0 ) * 0.1;
      float fTemp = abs(1.0 / uPos.y / 100.0);
      vertColor += fTemp;
      color += vec3( fTemp*(10.0-i)/10.0, fTemp*i/10.0,
      pow(fTemp,1.5)*1.5 );
    }

    vec4 color_final = vec4(color, 1.0);
    gl_FragColor = color_final;
  }
  `;
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // const xOffset = 5;   // offset by half the texture
  // const yOffset = 5;  // offset by 1/4 the texture
  // texture.offset.set(xOffset, yOffset);

  const geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
  const attributes = {};
  const uniforms = {
    time: {type: 'f', value: 0.2},
    scale: {type: 'f', value: 0.2},
    alpha: {type: 'f', value: 0.6},
    resolution: {type : 'v2', value: new THREE.Vector2()}
  };

  uniforms.resolution.value.x = window.innerWidth;
  uniforms.resolution.value.y = window.innerHeight;

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    attributes: attributes,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
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
