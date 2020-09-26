import * as THREE from  'three'
import spark from '../../assets/spark1.png'
import nube from '../../assets/smoke.png'
import nube2 from '../../assets/smoke4.png'

export default function Test(scene, origen){
  // buffer geometry custom attributes - particles https://github.com/mrdoob/three.js/blob/master/examples/webgl_custom_attributes_points.html
  // {
  //   const vertexShader =
  //   `attribute float size;
  //   attribute vec3 customColor;
  //
  //   varying vec3 vColor;
  //   void main() {
  //     vColor = customColor;
  //     vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  //     gl_PointSize = size * ( 300.0 / -mvPosition.z );
  //     gl_Position = projectionMatrix * mvPosition;
  //   }`;
  //
  //   const fragmentShader =
  //   `uniform vec3 color;
  //   uniform sampler2D pointTexture;
  //
  //   varying vec3 vColor;
  //
  //   void main() {
  //     gl_FragColor = vec4( color * vColor, 1.0 );
  //     gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  //   }`;
  //
  //   var amount = 100000;
  //   var radius = 200;
  //
  //   var positions = new Float32Array( amount * 3 );
  //   var colors = new Float32Array( amount * 3 );
  //   var sizes = new Float32Array( amount );
  //
  //   var vertex = new THREE.Vector3();
  //   var color = new THREE.Color( 0xffffff );
  //
  //   for ( var i = 0; i < amount; i ++ ) {
  //     vertex.x = ( Math.random() * 2 - 10 ) * radius;
  //     vertex.y = ( Math.random() * 2 - 1 ) * radius;
  //     vertex.z = ( Math.random() * 2 - 1 ) * radius;
  //     vertex.toArray( positions, i * 3 );
  //
  //     if ( vertex.x < -9 * radius ) {
  //       color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );
  //     } else {
  //       color.setHSL( 0.0 + 0.1 * ( i / amount ), 0.9, 0.5 );
  //     }
  //     color.toArray( colors, i * 3 );
  //     sizes[ i ] = 10;
  //   }
  //   var geometry = new THREE.BufferGeometry();
  //   geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  //   geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
  //   geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
  //
  //   var material = new THREE.ShaderMaterial( {
  //     uniforms: {
  //       color: { value: new THREE.Color( 0xffffff ) },
  //       pointTexture: { value: new THREE.TextureLoader().load(spark) }
  //     },
  //     vertexShader: vertexShader,
  //     fragmentShader: fragmentShader,
  //     blending: THREE.AdditiveBlending,
  //     depthTest: false,
  //     transparent: true
  //   } );
  //   var sphere = new THREE.Points( geometry, material );
  //   scene.add( sphere );
  // }

  // https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_custom_attributes_particles.html
  // {
  //   const vertexShader =
  //   `attribute float size;
  //   varying vec3 vColor;
  //
  //   void main() {
  //     vColor = color;
  //     vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  //     gl_PointSize = size * ( 300.0 / -mvPosition.z );
  //     gl_Position = projectionMatrix * mvPosition;
  //   }
  //   `;
  //
  //   const fragmentShader =
  //   `uniform sampler2D pointTexture;
  //   varying vec3 vColor;
  //   void main() {
  //     gl_FragColor = vec4( vColor, 1.0 );
  //     gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  //   }`;
  //
  //   var particleSystem, uniforms, geometry;
  //   var particles = 100000;
  //
  //   uniforms = {
  //     pointTexture: { value: new THREE.TextureLoader().load(spark) }
  //   };
  //   var shaderMaterial = new THREE.ShaderMaterial( {
  //
  //     uniforms: uniforms,
  //     vertexShader: vertexShader,
  //     fragmentShader: fragmentShader,
  //     blending: THREE.AdditiveBlending,
  //     depthTest: false,
  //     transparent: true,
  //     vertexColors: true
  //
  //   } );
  //
  //   var radius = 200;
  //
  //   geometry = new THREE.BufferGeometry();
  //
  //   var positions = [];
  //   var colors = [];
  //   var sizes = [];
  //
  //   var color = new THREE.Color();
  //
  //   for ( var i = 0; i < particles; i ++ ) {
  //
  //     positions.push( ( Math.random() * 2 - 1 ) * radius );
  //     positions.push( ( Math.random() * 2 - 1 ) * radius );
  //     positions.push( ( Math.random() * 2 - 1 ) * radius );
  //
  //     color.setHSL( i / particles, 1.0, 0.5 );
  //
  //     colors.push( color.r, color.g, color.b );
  //
  //     sizes.push( 20 );
  //
  //   }
  //
  //   geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  //   geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
  //   geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );
  //
  //   particleSystem = new THREE.Points( geometry, shaderMaterial );
  //
  //   scene.add( particleSystem );
  //
  // }

  // Plane points
  // {
  //   const vertexShader =
  //   `attribute float scale;
  //   void main() {
  //     vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  //     gl_PointSize = scale * ( 300.0 / - mvPosition.z );
  //     gl_Position = projectionMatrix * mvPosition;
  //   }`;
  //
  //   const fragmentShader =
  //   `uniform vec3 color;
  //
  //   void main() {
  //     if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
  //     gl_FragColor = vec4( color, 1.0 );
  //   }`;
  //
  //   var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
  //   var particles, count = 0;
  //   var mouseX = 0, mouseY = 0;
  //
  //   var numParticles = AMOUNTX * AMOUNTY;
  //
  //   var positions = new Float32Array( numParticles * 3 );
  //   var scales = new Float32Array( numParticles );
  //
  //   var i = 0, j = 0;
  //
  //   for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
  //     for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
  //       positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
  //       positions[ i + 1 ] = 0; // y
  //       positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
  //       scales[ j ] = 1;
  //       i += 3;
  //       j ++;
  //     }
  //   }
  //   var geometry = new THREE.BufferGeometry();
  //   geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  //   geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
  //
  //   var material = new THREE.ShaderMaterial( {
  //
  //     uniforms: {
  //       color: { value: new THREE.Color( 0xffffff ) },
  //     },
  //     vertexShader: vertexShader,
  //     fragmentShader: fragmentShader
  //
  //   } );
  //   particles = new THREE.Points( geometry, material );
  //   scene.add( particles );
  // }

  // {
  //   let points;
  //   let positions = [];
  //
  //   let r = 8000
  //   for (let i = 0; i < 100000; i++) {
  //     const theta = 7 * Math.PI * Math.random()
  //     const phi = Math.acos(2 * Math.random() - 1)
  //     const ran = Math.random()
  //     const x = (r * Math.sqrt(theta)) * Math.cos(theta) + (1000* Math.random() -500) -1000
  //     const z = (r * Math.sqrt(theta)) * Math.sin(theta) + THREE.MathUtils.randFloatSpread( 2000 );
  //     const y = THREE.MathUtils.randFloatSpread( 2000 );
  //
  //     positions.push(x)
  //     positions.push(y)
  //     positions.push(z)
  //     positions.push(-x)
  //     positions.push(y)
  //     positions.push(-z)
  //   }
  //
  //   const pos = new Float32Array(positions)
  //   const loader = new THREE.TextureLoader()
  //   const geometry = new THREE.BufferGeometry();
  //
  //   const attributes = new THREE.BufferAttribute(pos, 3);
  //   geometry.setAttribute("position",attributes);
  //
  //   const material = new THREE.PointsMaterial({
  //     size: 15,
  //     color: "green",
  //     map:loader.load(spark),
  //     blending: THREE.AdditiveBlending,
  //     depthTest: true,
  //     transparent: true,
  //   })
  //   points = new THREE.Points(geometry, material)
  //   // points.rotation.x = 10
  //   points.rotation.z = -Math.PI/12
  //   points.position.x = 0;
  //   points.position.y = 0;
  //   points.position.z = - 50000;
  //   scene.add(points);
  // }

  {
    function random() { return Math.random() * 2 - 1 }
    //
    function createGeometry( amount, step, dir ) {

      var vertices = [];

      for ( var i = 2000; i < amount; i += step ) {

        var angle = i / 12;
        var distance = i / 4;
        var progress = ( i / amount ) * 400 + 0.5;
        var phi = Math.cos(2*Math.random()-1)
        const x = progress * random() * random() + Math.sin( angle ) * distance;
        const y = progress;
        const z = progress * random() * random() + Math.cos( angle ) * distance;

        const aux = Math.cos(Math.PI*x/3000 + 0.5*Math.PI) * y * 2 + random() * random() * y;
        const newy =  aux;

        if(dir){
          if(z<0){
            vertices.push(x, newy, z);
          }
          else{
            vertices.push(x, newy, -z);
          }
        }
        else{
          if(z<0){
            vertices.push(x, -newy, -z);
          }
          else{
            vertices.push(x, -newy, z);
          }
        }
      }

      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

      return geometry;

    }

    // Puntos 1
    var geometry = createGeometry( 15000, 5, true );
    var material = new THREE.PointsMaterial( {
      size: 200,
      map: new THREE.TextureLoader().load(spark),
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.z = -Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 2
    var geometry = createGeometry( 15000, 5, false );
    var material = new THREE.PointsMaterial( {
      size: 200,
      map: new THREE.TextureLoader().load(spark),
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.y = Math.PI;
    points.rotation.z = Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 3
    var geometry = createGeometry( 20000, 8, true );
    var material = new THREE.PointsMaterial( {
      size: 40,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.z = -Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 4
    var geometry = createGeometry( 20000, 8,false );
    var material = new THREE.PointsMaterial( {
      size: 40,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.y = Math.PI;
    points.rotation.z = Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 5
    var geometry = createGeometry( 20000, 0.4, true );
    var material = new THREE.PointsMaterial( {
      size: 25,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: 'green'
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.z = -Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 6
    var geometry = createGeometry( 20000, 0.4,false );
    var material = new THREE.PointsMaterial( {
      size: 25,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.y = Math.PI;
    points.rotation.z = Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );
  }

}
