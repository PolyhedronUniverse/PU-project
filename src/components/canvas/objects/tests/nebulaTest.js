import * as THREE from "three";
// import SbTextures from './texturesTest.js'

import sleft from '../../assets/skybox_test/sadness/blue_nebula_RT.png'
import sup from '../../assets/skybox_test/sadness/blue_nebula_UP.png'
import sright from '../../assets/skybox_test/sadness/blue_nebula_LF.png'
import sdown from '../../assets/skybox_test/sadness/blue_nebula_DN.png'
import sfront from '../../assets/skybox_test/sadness/blue_nebula_FT.png'
import sback from '../../assets/skybox_test/sadness/blue_nebula_BK.png'

import aleft from '../../assets/skybox_test/anger/red_nebula_RT.png'
import aup from '../../assets/skybox_test/anger/red_nebula_UP.png'
import aright from '../../assets/skybox_test/anger/red_nebula_LF.png'
import adown from '../../assets/skybox_test/anger/red_nebula_DN.png'
import afront from '../../assets/skybox_test/anger/red_nebula_FT.png'
import aback from '../../assets/skybox_test/anger/red_nebula_BK.png'

import lleft from '../../assets/skybox_test/love/pink_nebula_RT.png'
import lup from '../../assets/skybox_test/love/pink_nebula_UP.png'
import lright from '../../assets/skybox_test/love/pink_nebula_LF.png'
import ldown from '../../assets/skybox_test/love/pink_nebula_DN.png'
import lfront from '../../assets/skybox_test/love/pink_nebula_FT.png'
import lback from '../../assets/skybox_test/love/pink_nebula_BK.png'


export default function NebulaTest(scene, name, hue, origen, vel,raycaster){

  let timer = 0;
  let moveNebula = 0;

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

      vec2 displacement = vec2(t, t2) + (1.0 + mousePosition * .5);

      float p = fbm( displacement * 2.0 + pos * 2.0, t * 1.1);
      vec2 pos2 = pos + vec2(p);

      float q = fbm( displacement * 3.0 + pos2 * 2.0, t * 1.23);
      vec2 pos3 = pos + vec2(q);

      float r = fbm( displacement * 4.0 + pos3 * 2.0, t * 1.23);
      vec2 pos4 = pos + vec2(r);

      float s = fbm( displacement * 5.0 + pos4 * 2.0, t * 1.32);

      float d = length( vUv - (0.5 + mousePosition));

      float ratioElevation = pow( (1.0 - d), 5.0);

      vElevation = s + .2 + ratioElevation * .2;

      vElevation *= 1.0 - smoothstep(0.0, 1.0, length(uv - .5));



      gl_Position = projectionMatrix * modelViewMatrix * vec4 ( position, 1.0);
    }`,
    fragmentShader: `
    precision highp float;

    varying vec2 vUv;
    varying float vElevation;
    uniform float uHue;

    uniform float a;
    uniform float b;
    uniform float c;
    uniform float d;
    uniform float e;

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
      float brightness = pow( darkborders * a + vElevation, 3.5);
      brightness *= .5 + smoothstep(.6, 1.0, vElevation) * .5;

      brightness += highlight * .2;
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
      mousePosition: { type: "v2", value: new THREE.Vector2(0.9, 0.9) },
      a: { type: "f", value: 0.3},
      b: { type: "f", value: 3.5},
      c: { type: "f", value: 0.5},
      d: { type: "f", value: 0.6},
      e: { type: "f", value: 0.5},
    },
    transparent: true,
    alphaTest: 0.1,
    // side: THREE.DoubleSide,
  });

  let shgeometry = new THREE.PlaneBufferGeometry(1500, 1500, 150, 150)

  let cloud = new THREE.Mesh(shgeometry, material);
  // let object = raycaster(hue);
  // console.log("This is the object: ", object);

  cloud.rotation.z = 2 * Math.PI * Math.random() - Math.PI;
  cloud.position.x = origen.x;
  cloud.position.y = origen.y;
  cloud.position.z = origen.z;
  //cloud.userData.emotionalregion =
  cloud.callback = function(dir){
    // vel = -vel;

    moveNebula = dir;

    // const inout = document.querySelector('#io'); // To enable FOG
    // inout.textContent = hue;
  }
  cloud.name = name;
  scene.add(cloud);

  // const textures = new SbTextures();
  const loader = new THREE.TextureLoader();
  let texture;
  switch(name){
    case 'anger': texture = [
        new THREE.MeshBasicMaterial({map: loader.load(aleft), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map: loader.load(aright), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map: loader.load(aup), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map: loader.load(adown), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map: loader.load(afront), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map: loader.load(aback), side: THREE.BackSide}),
      ];
      break;
    case 'sadness': texture = [
      new THREE.MeshBasicMaterial({map: loader.load(sleft), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(sright), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(sup), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(sdown), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(sfront), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(sback), side: THREE.BackSide}),
    ];
      break;
    case 'love': texture = [
      new THREE.MeshBasicMaterial({map: loader.load(lleft), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(lright), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(lup), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(ldown), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(lfront), side: THREE.BackSide}),
      new THREE.MeshBasicMaterial({map: loader.load(lback), side: THREE.BackSide}),
    ];
      break;
    case 'joy': texture = new THREE.MeshBasicMaterial({color: 'yellow', side: THREE.BackSide});
      break;
    case 'empower': texture = new THREE.MeshBasicMaterial({color: 'orange', side: THREE.BackSide})
      break;
    default: break;
  }

  const g = new THREE.BoxBufferGeometry(3500/2, 3500/2, 3500/2)
  let box =  new THREE.Mesh(g, texture);
  box.position.set(0, 0, -8000)
  box.name = name;
  box.visible = false;
  scene.add(box);

  // const parameters = { a: 0.3, b: 3.5, c: 0.5, d: 0.6, e: 0.5 };

  // const gui = new GUI();
  // gui.add( parameters, 'a', 0, 1, 0.01 ).onChange( this.update );
  // gui.add( parameters, 'b', 0, 5, 0.01 ).onChange( this.update );
  // gui.add( parameters, 'c', 0, 1, 0.01 ).onChange( this.update );
  // gui.add( parameters, 'd', 0, 1, 0.01 ).onChange( this.update );
  // gui.add( parameters, 'e', 0, 1, 0.01 ).onChange( this.update );

  let update = function(cam){
    timer += vel;

    cloud.rotation.z += vel;

    cloud.material.uniforms.time.value = timer;

    cloud.lookAt(cam)

    // mesh.rotation.y += vel/10;

    // box.visible = vis
    // box.position.x = origen.x;

    // cloud.material.uniforms.a.value = parameters.a;
    // cloud.material.uniforms.b.value = parameters.b;
    // cloud.material.uniforms.c.value = parameters.c;
    // cloud.material.uniforms.d.value = parameters.d;
    // cloud.material.uniforms.e.value = parameters.e;

    return moveNebula;
  }

  return {update, cloud, box};
}
