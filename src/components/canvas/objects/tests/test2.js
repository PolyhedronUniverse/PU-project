import * as THREE from "three";
import {vs} from '../../assets/shaders/tests/test2.glsl'

export default function Test2(scene, hue, origen, vel){
  let timer = 0;
  let targetRotX1 = Math.PI / 3,
  targetRotX2 = -Math.PI / 3,
  targetRotY1 = 0,
  targetRotY2 = 0;


  const vertexShader =
  `
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  varying vec2 vUv;
  varying float noise;
  uniform float time;

  float turbulence( vec3 p ) {

    float w = 100.0;
    float t = -.5;

    for (float f = 1.0 ; f <= 10.0 ; f++ ){
      float power = pow( 2.0, f );
      t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }

    return t;

  }

  void main() {

    vUv = uv;

    // add time to the noise parameters so it's animated
    noise = 10.0 *  -.10 * turbulence( .5 * normal + time );
    float b = 5.0 * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
    float displacement = - 10. * noise + b;

    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }
  `;

  const fragmentShader =
  `
  varying vec2 vUv;
  varying float noise;
  uniform sampler2D tExplosion;

  float random( vec3 scale, float seed ){
    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
  }

  void main() {

    // get a random offset
    float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
    // lookup vertically in the texture, using noise and offset
    // to get the right RGB colour
    vec2 tPos = vec2( 0, 1.9 * noise + r );
    vec4 color = texture2D( tExplosion, tPos );

    gl_FragColor = vec4( color.rgb, 1.0 );
  }
  `;


  let material = new THREE.RawShaderMaterial({
    vertexShader: `
    attribute vec3 position;
    attribute vec2 uv;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat3 normalMatrix;
    uniform float time;
    uniform vec2 mousePosition;
    varying vec2 vUv;
    varying float vElevation;

    varying float vDisplacement;

    float PI = 3.141592;

    float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
    }

    float fbm(vec2 pos, float t){
      float r;
      r 	= 	noise( vec3( pos, t ) * 01.0 ) * 01.0000;
      r 	+= 	noise( vec3( pos, t ) * 02.0 ) * 00.5000;
      r 	+= 	noise( vec3( pos, t ) * 04.0 ) * 00.2500;
      r 	+= 	noise( vec3( pos, t ) * 08.0 ) * 00.1250;
      r 	+= 	noise( vec3( pos, t ) * 16.0 ) * 00.0625;
      return r / 1.9375;
    }

    void main() {
      vUv = uv;
      float t = time *.3 + sin(time) * .5;
      float t2 = time *.1 + cos(time * .2) * .05;
      vec2 pos = vUv * 2.0;

      vec2 displacement = vec2(t, t2) + (2.0 + mousePosition * .5);

      float p = fbm( displacement * 2.0 + pos * 2.0, t * 1.1);
      vec2 pos2 = pos + vec2(p);

      float q = fbm( displacement * 3.0 + pos2 * 2.0, t * 1.23);
      vec2 pos3 = pos + vec2(q);

      float r = fbm( displacement * 4.0 + pos3 * 2.0, t * 1.23);
      vec2 pos4 = pos + vec2(r);

      float s = fbm( displacement * 5.0 + pos4 * 2.0, t * 1.32);

      float d = length( vUv - (0.5 + mousePosition));

      float ratioElevation = pow( (1.0 - d), 5.0);

      vElevation = s + .1 + ratioElevation * .2;

      vElevation *= 1.0 - smoothstep(0.0, 1.0, length(uv - .5));

      vec3 finalPos = position;
      finalPos.z = -30.0 + pow( s + ratioElevation, 2.0) * 20.0;

      gl_Position = projectionMatrix * modelViewMatrix * vec4 ( finalPos.xy, position.z, 1.0);
    }`,
    fragmentShader: `
    precision highp float;

    varying vec2 vUv;
    varying float vElevation;
    uniform float uHue;

    float hue2rgb(float f1, float f2, float hue) {
      if (hue < 0.0)
      hue += 1.0;
      else if (hue > 1.0)
      hue -= 1.0;
      float res;
      if ((6.0 * hue) < 1.0)
      res = f1 + (f2 - f1) * 6.0 * hue;
      else if ((2.0 * hue) < 1.0)
      res = f2;
      else if ((3.0 * hue) < 2.0)
      res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
      else
      res = f1;
      return res;
    }

    vec3 hsl2rgb(vec3 hsl) {
      vec3 rgb;

      if (hsl.y == 0.0) {
        rgb = vec3(hsl.z); // Luminance
      } else {
        float f2;

        if (hsl.z < 0.5)
        f2 = hsl.z * (1.0 + hsl.y);
        else
        f2 = hsl.z + hsl.y - hsl.y * hsl.z;

        float f1 = 2.0 * hsl.z - f2;

        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
      }
      return rgb;
    }

    vec3 hsl2rgb(float h, float s, float l) {
      return hsl2rgb(vec3(h, s, l));
    }

    void main () {
      float hue = uHue + vElevation * .05;
      hue += smoothstep(.6, 1.0, vElevation) * .2;

      float highlight = sin ( smoothstep(.6, .91, vElevation) * 3.14 );

      hue += highlight * .1;

      float saturation = vElevation * 1.1;
      float darkborders = sin(vUv.x * 3.14) * sin(vUv.y * 3.14);
      float brightness = pow( darkborders * .3 + vElevation, 3.5);
      brightness *= .5 + smoothstep(.6, 1.0, vElevation) * .5;

      brightness += highlight * .8;
      vec3 col = hsl2rgb(hue, saturation, brightness);

      if(brightness < 0.1){
        vec3 col = hsl2rgb(hue, saturation, 1.0-brightness);
        gl_FragColor = vec4(col, 0.0);
      }else if(brightness < 0.13 ){
        vec3 col = hsl2rgb(hue, saturation, .05);
        gl_FragColor = vec4(col, 0.5);
      }
      else{
        vec3 col = hsl2rgb(hue-.01, saturation, brightness);
        gl_FragColor = vec4(col, 1.0);
      }
      // gl_FragColor = vec4(col, 1.0);
    }
    `,
    uniforms: {
      time: { type: "f", value: 1 },
      uHue: { type: "f", value: hue },
      mousePosition: { type: "v2", value: new THREE.Vector2(0.9, 0.9) }
    },
    transparent: true,
    alphaTest: 0.1,
    side: THREE.DoubleSide,
    // wireframe: true
  });

  let material2 = material.clone();
  material2.uniforms.time.value = 1;
  material2.uniforms.uHue.value = 0.6;

  // let shgeometry = new THREE.SphereBufferGeometry(500, 700, 500);
  let shgeometry = new THREE.PlaneBufferGeometry(1500, 1500, 200, 200)
  // let shgeometry = new THREE.TorusKnotBufferGeometry( 100, 80, 100, 16 );
  // let shgeometry = new THREE.IcosahedronBufferGeometry( 500, 7 );

  let cloud = new THREE.Mesh(shgeometry, material);
  // cloud.position.y = 50;
  // cloud.rotation.x = Math.PI / 3;

  let cloud2 = new THREE.Mesh(shgeometry, material2);
  // cloud2.position.y = -50;
  cloud.rotation.z = 2 * Math.PI * Math.random() - Math.PI;
  cloud.position.x = origen.x;
  cloud.position.y = origen.y;
  cloud.position.z = origen.z;
  scene.add(cloud);
  // scene.add(cloud2);


  this.update = function(){
    timer += vel;

    // cloud2.rotation.y += (targetRotY2 - cloud2.rotation.y) * 0.05;
    // cloud2.rotation.x += (targetRotX2 - cloud2.rotation.x) * 0.05;

    cloud.rotation.z += vel;
    // cloud.rotation.x += (targetRotX1 - cloud.rotation.x) * 0.05;

    cloud.material.uniforms.time.value = timer;
    // cloud2.material.uniforms.time.value = timer;
  }
}
