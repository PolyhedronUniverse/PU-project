import * as THREE from  'three'
import spark from '../../assets/spark1.png'

export default function StarsTest(scene, loadingManager){

  function random() { return Math.random() * 2 - .5 }

  function createGeometry(amount, size, glimmer, h,s,l) {

    let geometry = new THREE.BufferGeometry();
    let color = new THREE.Color();
    let colors = [];
    let vertices = [];
    let sizes = [];
    // let cont=0;

    for ( var i = 0; i < amount; i ++ ) {
      const r = 40000
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000)

      vertices.push(x)
      vertices.push(y)
      if(glimmer){
        if(random() < 0){
          vertices.push(-Math.abs(z))
          // cont++;
        }
        else{
          vertices.push(-Math.abs(z))
        }
      }else{
        vertices.push(z)
      }

      color.setHSL( h/360, s, l );
      colors.push( color.r, color.g, color.b );
      sizes.push( size );
    }

    // console.log(cont)

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );
    return geometry;

  }

  const texture = new THREE.TextureLoader(loadingManager).load(spark);


  const vs =
  `
  attribute float size;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }`;

  const fs =
  `
  uniform sampler2D pointTexture;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4( vColor, 1.0 );
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  }`;

  var shaderMaterial = new THREE.ShaderMaterial( {
    uniforms: {
      pointTexture: {value: texture}
    },
    vertexShader: vs,
    fragmentShader: fs,

    blending: THREE.AdditiveBlending,
    depthWrite: false,
    // transparent: true,
    vertexColors: true
  } );

  // Puntos 1
  let geometry1 = createGeometry(8000, 1, true, 48, 1.0, 0.8);
  // let material1 = new THREE.PointsMaterial( {
  //   size: 300,
  //   map: texture,
  //   // depthWrite: false,
  //   // transparent: true,
  //   color: 0xFF0000,
  //   blending: THREE.AdditiveBlending,
  //   sizeAttenuation: true,
  // } );

  let points1 = new THREE.Points( geometry1, shaderMaterial );
  scene.add( points1 );

  // Puntos 2
  let geometry2 = createGeometry(8000, 1, true, 60, 1.0, 0.5);
  // let material2 = new THREE.PointsMaterial( {
  //   size: 100,
  //   map: texture,
  //   // depthWrite: false,
  //   // transparent: true,
  //   color: 0xFFFFFF,
  //   blending: THREE.AdditiveBlending,
  //   sizeAttenuation: true,
  // } );

  let points2 = new THREE.Points( geometry2, shaderMaterial );
  let s2 = []
  for ( var i = 0; i < 2000; i ++ ) {
    s2[ i ] = 1;
  }
  geometry1.attributes.size.needsUpdate = true;

  scene.add( points2 );

  this.update = function(){
    var time = Date.now() * 0.001;
    var sizes = geometry1.attributes.size.array;
    for ( var i = 0; i < 2000; i ++ ) {
      sizes[ i ] = 200 * ( 1 + Math.sin( 0.1 * i + time ) ) + 500;
    }
    geometry1.attributes.size.needsUpdate = true;

    sizes = geometry2.attributes.size.array;
    for ( let i = 0; i < 2000; i ++ ) {
      sizes[ i ] = 100 * ( 1 + Math.sin( 0.1 * i + time ) ) + 500;
    }
    geometry2.attributes.size.needsUpdate = true;
  }
}
