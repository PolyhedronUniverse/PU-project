import * as THREE from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
// import spriteT from '../sceneAssets/icon_1.png';

const WIDTH = 4;

const PARTICLES = WIDTH * WIDTH;


const fragmentShaderPos =
`
uniform float time;
void main()	{

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 tmpPos = texture2D( texturePosition, uv );
  vec3 position = tmpPos.xyz;
  vec3 velocity = texture2D( textureVelocity, uv ).xyz;

  float phase = tmpPos.w;

  phase = mod( ( phase + delta +
    length( velocity.xz ) * delta * 3. +
    max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

    // gl_FragColor = vec4( position + velocity * delta * 15. , phase );
    gl_FragColor = vec4( position + velocity * delta , phase );
  }
  `;

  const fragmentShaderVel =
  `
  uniform float time;
  const float UPPER_BOUNDS = BOUNDS;
	const float LOWER_BOUNDS = -UPPER_BOUNDS;
  const float SPEED_LIMIT = 9.0;


  void main(){

    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
  }
  `;


  const particleVertexShader =
  `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix *    vec4(position, 1.0);
  }
  `;
  const particleFragmentShader =
  `
  varying vec2 v_uv;

  void main() {

    gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
  }
  `;
  function random() { return Math.random() * 2 - 1 }

  function fillTextures( texturePosition, textureVelocity ) {

    const posArray = texturePosition.image.data;
    const velArray = textureVelocity.image.data;

    for ( let k = 0, kl = posArray.length; k < kl; k += 4 ) {

      var angle = k / 12;
      var distance = k / 4;
      var progress = ( k / 200 ) * 400 + 0.5;
      const x = progress * random() * random() + Math.sin( angle ) * distance;
      const y = progress + 100
      const z = progress * random() * random() + Math.cos( angle ) * distance;


      // Fill in texture values
      posArray[ k + 0 ] = x;
      posArray[ k + 1 ] = y;
      posArray[ k + 2 ] = z;
      posArray[ k + 3 ] = 1;

      velArray[ k + 0 ] = random();
      velArray[ k + 1 ] = random();
      velArray[ k + 2 ] = random();
      velArray[ k + 3 ] = 1.0;

    }

  }


  export default function Particles(scene, renderer, loadingManager, camera){


    var gpuCompute = new GPUComputationRenderer( 1024, 1024, renderer );

    var pos0 = gpuCompute.createTexture();
    var vel0 = gpuCompute.createTexture();

    var velVar = gpuCompute.addVariable( "textureVelocity", fragmentShaderVel, pos0 );
    var posVar = gpuCompute.addVariable( "texturePosition", fragmentShaderPos, vel0 );

    gpuCompute.setVariableDependencies( velVar, [ velVar, posVar ] );
    gpuCompute.setVariableDependencies( posVar, [ velVar, posVar ] );

    fillTextures( pos0, vel0 );

    velVar.material.uniforms.time = { value: 0.0 };

    var error = gpuCompute.init();


    let geometry = new THREE.BufferGeometry();

    const positions = new Float32Array( PARTICLES * 3 );

    let p = 0;

    for ( let i = 0; i < PARTICLES; i ++ ) {

      positions[ p ++ ] = ( Math.random() * 2 - 1 ) * 10;
      positions[ p ++ ] = 0; //( Math.random() * 2 - 1 ) * effectController.radius;
      positions[ p ++ ] = ( Math.random() * 2 - 1 ) * 10;

    }

    const uvs = new Float32Array( PARTICLES * 2 );
    p = 0;

    for ( let j = 0; j < WIDTH; j ++ ) {

      for ( let i = 0; i < WIDTH; i ++ ) {

        uvs[ p ++ ] = i / ( WIDTH - 1 );
        uvs[ p ++ ] = j / ( WIDTH - 1 );

      }

    }

    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

    let particleUniforms = {
      "texturePosition": { value: null },
      "textureVelocity": { value: null },
    };
    const material = new THREE.ShaderMaterial( {
      uniforms: particleUniforms,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader
    } );

    material.extensions.drawBuffers = true;

    const particles = new THREE.Points( geometry, material );
    particles.matrixAutoUpdate = false;
    particles.updateMatrix();

    scene.add( particles );

    if ( error !== null ) {

      console.error( error );

    }

    let update = function ( ) {
      gpuCompute.compute();

    }

    return {
      update
    }
  }
