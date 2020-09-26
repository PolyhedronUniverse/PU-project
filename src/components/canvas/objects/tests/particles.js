import * as THREE from 'three';
import {GPUComputationRenderer} from 'three/examples/jsm/misc/GPUComputationRenderer.js'

export default function Particles(scene,renderer,origen,colorN){
  let position_fs, velocity_fs, bird_vs, bird_fs;

  position_fs =
  `
  uniform float time;
  uniform float delta;

  void main()	{

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D( texturePosition, uv );
    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D( textureVelocity, uv ).xyz;

    float phase = tmpPos.w;

    phase = mod( ( phase + delta + length( velocity.xz ) * delta * 3. + max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

    gl_FragColor = vec4( position + velocity * delta * 1.0 , phase );
    // gl_FragColor = vec4( position.x-1., position.y, 0.0 , phase );

  }
  `;

  velocity_fs =
  `
  uniform float time;
  uniform float testing;
  uniform float delta; // about 0.016
  uniform float separationDistance; // 20
  uniform float alignmentDistance; // 40
  uniform float cohesionDistance; //
  uniform float freedomFactor;
  uniform vec3 predator;

  const float width = resolution.x;
  const float height = resolution.y;

  const float PI = 3.141592653589793;
  const float PI_2 = PI * 2.0;
  // const float VISION = PI * 0.55;

  float zoneRadius = 40.0;
  float zoneRadiusSquared = 1600.0;

  float separationThresh = 0.45;
  float alignmentThresh = 0.65;

  const float UPPER_BOUNDS = BOUNDS;
  const float LOWER_BOUNDS = -UPPER_BOUNDS;

  const float SPEED_LIMIT = 9.0;

  float rand( vec2 co ){
    return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
  }

  void main() {

    zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
    separationThresh = separationDistance / zoneRadius;
    alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
    zoneRadiusSquared = zoneRadius * zoneRadius;


    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 birdPosition, birdVelocity;

    vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
    vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

    float dist;
    vec3 dir; // direction
    float distSquared;

    float separationSquared = separationDistance * separationDistance;
    float cohesionSquared = cohesionDistance * cohesionDistance;

    float f;
    float percent;

    vec3 velocity = selfVelocity;

    float limit = SPEED_LIMIT;

    dir = predator * UPPER_BOUNDS - selfPosition;
    dir.z = 0.;
    // dir.z *= 0.6;
    dist = length( dir );
    distSquared = dist * dist;

    float preyRadius = 150.0;
    float preyRadiusSq = preyRadius * preyRadius;


    // move birds away from predator
    if ( dist < preyRadius ) {

      f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
      velocity += normalize( dir ) * f;
      limit += 5.0;
    }


    // if (testing == 0.0) {}
    // if ( rand( uv + time ) < freedomFactor ) {}


    // Attract flocks to the center
    vec3 central = vec3( 0., 0., 0. );
    dir = selfPosition - central;
    dist = length( dir );

    dir.y *= 2.5;
    velocity -= normalize( dir ) * delta * 5.;

    for ( float y = 0.0; y < height; y++ ) {
      for ( float x = 0.0; x < width; x++ ) {

        vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
        birdPosition = texture2D( texturePosition, ref ).xyz;

        dir = birdPosition - selfPosition;
        dist = length( dir );

        if ( dist < 0.0001 ) continue;

        distSquared = dist * dist;

        if ( distSquared > zoneRadiusSquared ) continue;

        percent = distSquared / zoneRadiusSquared;

        if ( percent < separationThresh ) { // low

          // Separation - Move apart for comfort
          f = ( separationThresh / percent - 1.0 ) * delta;
          velocity -= normalize( dir ) * f;

        } else if ( percent < alignmentThresh ) { // high

          // Alignment - fly the same direction
          float threshDelta = alignmentThresh - separationThresh;
          float adjustedPercent = ( percent - separationThresh ) / threshDelta;

          birdVelocity = texture2D( textureVelocity, ref ).xyz;

          f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
          velocity += normalize( birdVelocity ) * f;

        } else {

          // Attraction / Cohesion - move closer
          float threshDelta = 1.0 - alignmentThresh;
          float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

          f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

          velocity += normalize( dir ) * f;

        }

      }

    }



    // this make tends to fly around than down or up
    // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

    // Speed Limits
    if ( length( velocity ) > limit ) {
      velocity = normalize( velocity ) * limit;
    }

    gl_FragColor = vec4( velocity, 1.0 );

  }
  `;

  bird_vs =
  `
  attribute vec2 reference;
  attribute float birdVertex;

  attribute vec3 birdColor;

  uniform sampler2D texturePosition;
  uniform sampler2D textureVelocity;

  varying vec4 vColor;
  varying float z;

  uniform float time;

  void main() {

    vec4 tmpPos = texture2D( texturePosition, reference );
    vec3 pos = tmpPos.xyz;
    vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);

    vec3 newPosition = position-100.0;

    if ( birdVertex == 4.0 || birdVertex == 7.0 ) {
      // flap wings
      newPosition.y = sin( tmpPos.w ) * 5.;
    }

    newPosition = mat3( modelMatrix ) * newPosition;


    velocity.z *= -1.;
    float xz = length( velocity.xz );
    float xyz = 1.;
    float x = sqrt( 1. - velocity.y * velocity.y );

    float cosry = velocity.x / xz;
    float sinry = velocity.z / xz;

    float cosrz = x / xyz;
    float sinrz = velocity.y / xyz;

    mat3 maty =  mat3(
      cosry, 0, -sinry,
      0    , 1, 0     ,
      sinry, 0, cosry

    );

    mat3 matz =  mat3(
      cosrz , sinrz, 0,
      -sinrz, cosrz, 0,
      0     , 0    , 1
    );

    newPosition =  maty * matz * newPosition;
    newPosition += pos;

    z = newPosition.z;

    vColor = vec4( birdColor, 1.0 );
    gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );
  }`;

  bird_fs=
  `
  varying vec4 vColor;
  varying float z;

  uniform vec3 color;

  void main() {
    // Fake colors for now
    float z2 = 0.2 + ( 1000. - z ) / 1000. * vColor.x;
    gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );

  }`;

  console.log(colorN)

  let WIDTH = 64;
  let PARTICLES = WIDTH * WIDTH;

  var gpuCompute;
  var velocityVariable;
  var positionVariable;
  var positionUniforms;
  var velocityUniforms;
  var particleUniforms;
  var last = performance.now();

  let ParticleGeometry = function(){
    let points = PARTICLES * 3;

    THREE.BufferGeometry.call( this );

    let vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    let colors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
    let references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
    let particleVertex = new THREE.BufferAttribute(new Float32Array(points), 1);

    this.setAttribute('position', vertices);
    this.setAttribute('color', colors);
    this.setAttribute('reference', references);
    this.setAttribute('particleVertex', particleVertex);

    var v = 0;

    function verts_push() {
      for ( var i = 0; i < arguments.length; i ++ ) {
        vertices.array[ v ++ ] = arguments[ i ];
      }
      // console.log(arguments.length)
    }

    var wingsSpan = 10;

    for ( var f = 0; f < PARTICLES; f ++ ) {

      // Body
      verts_push(
        -5, -5, 0,
        5, 5*Math.random(), 0,
        5, -5, 0
      );

      // Left Wing
      // verts_push(
      //   0, 0, - 15,
      //   - wingsSpan, 0, 0,
      //   0, 0, 15
      // );

      // Right Wing
      // verts_push(
      //   0, 0, 15,
      //   wingsSpan, 0, 0,
      //   0, 0, - 15
      // );

    }

    for ( var v = 0; v < points ; v ++ ) {

      var i = ~ ~ ( v / 3 );
      var x = ( i % WIDTH ) / WIDTH;
      var y = ~ ~ ( i / WIDTH ) / WIDTH;

      var c = new THREE.Color(
        0x444444 +
        ~ ~ ( v / 9 ) / PARTICLES * 0x666666
      );

      colors.array[ v * 3 + 0 ] = c.r;
      colors.array[ v * 3 + 1 ] = c.g;
      colors.array[ v * 3 + 2 ] = c.b;

      references.array[ v * 2 ] = x;
      references.array[ v * 2 + 1 ] = y;

      particleVertex.array[ v ] = v % 9;
    }

    // this.scale( 0.2, 0.2, 0.2 );
    // this.position.x = -1000;
  };

  ParticleGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );

  var BOUNDS = 400, BOUNDS_HALF = BOUNDS / 2;

  {
    initComputeRenderer();

    var effectController = {
      separation: 20.0,
      alignment: 20.0,
      cohesion: 20.0,
      freedom: 0.9
    };

    var valuesChanger = function () {

      velocityUniforms[ "separationDistance" ].value = effectController.separation;
      velocityUniforms[ "alignmentDistance" ].value = effectController.alignment;
      velocityUniforms[ "cohesionDistance" ].value = effectController.cohesion;
      velocityUniforms[ "freedomFactor" ].value = effectController.freedom;

    };

    valuesChanger();
    initBirds();
  }

  function initComputeRenderer(){
    gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );

    var dtPosition = gpuCompute.createTexture();
    var dtVelocity = gpuCompute.createTexture();
    fillPositionTexture( dtPosition );
    fillVelocityTexture( dtVelocity );

    velocityVariable = gpuCompute.addVariable( "textureVelocity", velocity_fs, dtVelocity );
    positionVariable = gpuCompute.addVariable( "texturePosition", position_fs, dtPosition );

    gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
    gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

    positionUniforms = positionVariable.material.uniforms;
    velocityUniforms = velocityVariable.material.uniforms;

    positionUniforms[ "time" ] = { value: 0.0 };
    positionUniforms[ "delta" ] = { value: 0.0 };
    velocityUniforms[ "time" ] = { value: 1.0 };
    velocityUniforms[ "delta" ] = { value: 0.0 };
    velocityUniforms[ "testing" ] = { value: 1.0 };
    velocityUniforms[ "separationDistance" ] = { value: 1.0 };
    velocityUniforms[ "alignmentDistance" ] = { value: 1.0 };
    velocityUniforms[ "cohesionDistance" ] = { value: 1.0 };
    velocityUniforms[ "freedomFactor" ] = { value: 1.0 };
    velocityUniforms[ "predator" ] = { value: new THREE.Vector3() };
    velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed( 2 );

    velocityVariable.wrapS = THREE.RepeatWrapping;
    velocityVariable.wrapT = THREE.RepeatWrapping;
    positionVariable.wrapS = THREE.RepeatWrapping;
    positionVariable.wrapT = THREE.RepeatWrapping;

    var error = gpuCompute.init();

    if ( error !== null ) {
      console.error( error );
    }
  }

  function initBirds() {

    var geometry = new ParticleGeometry();

    // For Vertex and Fragment
    particleUniforms = {
      "color": { value: new THREE.Color( colorN ) },
      "texturePosition": { value: null },
      "textureVelocity": { value: null },
      "time": { value: 1.0 },
      "delta": { value: 0.0 }
    };

    // THREE.ShaderMaterial
    var material = new THREE.ShaderMaterial( {
      uniforms: particleUniforms,
      vertexShader: bird_vs,
      fragmentShader: bird_fs,
      side: THREE.DoubleSide,
      // wireframe: true,
    } );

    var birdMesh = new THREE.Mesh( geometry, material );
    // birdMesh.rotation.y = Math.PI / 2;
    // birdMesh.position.x = origen.x;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();

    scene.add( birdMesh );

    let g = new THREE.BoxGeometry(1,1,1)
    let m = new THREE.MeshBasicMaterial({color: 'red'})

    scene.add(new THREE.Mesh(g,m))
  }

  function fillPositionTexture( texture ) {
    var theArray = texture.image.data;
    for ( var k = 0, kl = theArray.length; k < kl; k += 4 ) {
      var x = Math.random() * BOUNDS - BOUNDS_HALF;
      var y = Math.random() * BOUNDS - BOUNDS_HALF;
      var z = Math.random() * BOUNDS - BOUNDS_HALF;

      theArray[ k + 0 ] = x;
      theArray[ k + 1 ] = y;
      theArray[ k + 2 ] = z;
      theArray[ k + 3 ] = 1;
    }
  }

  function fillVelocityTexture( texture ) {
    var theArray = texture.image.data;
    for ( var k = 0, kl = theArray.length; k < kl; k += 4 ) {
      var x = Math.random() - 0.5;
      var y = Math.random() - 0.5;
      var z = Math.random() - 0.5;

      theArray[ k + 0 ] = x * 10;
      theArray[ k + 1 ] = y * 10;
      theArray[ k + 2 ] = z * 10;
      theArray[ k + 3 ] = 1;
    }
  }

  this.update = function(){

    var now = performance.now();
    var delta = ( now - last ) / 1000;

    if ( delta > 1 ) delta = 1; // safety cap on large deltas
    last = now;

    positionUniforms[ "time" ].value = now;
    positionUniforms[ "delta" ].value = delta;
    velocityUniforms[ "time" ].value = now;
    velocityUniforms[ "delta" ].value = delta;
    particleUniforms[ "time" ].value = now;
    particleUniforms[ "delta" ].value = delta;

    // velocityUniforms[ "predator" ].value.set( 0.5 * mouseX / windowHalfX, - 0.5 * mouseY / windowHalfY, 0 );

    gpuCompute.compute();

    particleUniforms[ "texturePosition" ].value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
    particleUniforms[ "textureVelocity" ].value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;

  }
}
