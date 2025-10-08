import * as THREE from  'three'
import wonder1 from '../sceneAssets/textures/wonder_swirl_diffuse.png'
import wonder2 from '../sceneAssets/textures/wonder_ends_diffuse.png'
import wonder1op from '../sceneAssets/textures/wonder_swirl_opacity.png'
import wonder2op from '../sceneAssets/textures/wonder_ends_opacity.png'

export default function WonderSystem(scene, loadingManager){

  const loader = new THREE.TextureLoader(loadingManager)
  const vs = `
  uniform float time;
  varying vec2 vUv;
  varying float vElevation;

  float PI = 3.141592;

  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
  float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
  
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

  void main(){
      vUv = uv;

      float t = time *.3;
      float t2 = time *.1;
      vec2 pos = vUv * 2.0;

      vec3 newPos = position;

      vec2 displacement = vec2(t,t2);
      float p = fbm(displacement + pos, t);
      vec2 pos2 = pos + vec2(p);

      float s = fbm( displacement * 5.0 + pos * 4.0, t * 1.32);
      float d = length( vUv - (0.5 ));
      float ratioElevation = pow( abs(1.0 - d), 5.0);
      // vElevation = s + .2 + ratioElevation * .1;
      vElevation = s + 0.02;
      // vElevation *= 1. - smoothstep(0.0, 0.5, length(uv - .5));

      // newPos.y -= 350.0 * sin((uv.x-0.5) * PI * 1.5);
      // newPos.z -= cos((uv.x-0.5) * PI * 2.5) * 200.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4 ( newPos, 1.0);
  }
  `;

  const fs = `
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform vec2 dir;

  varying vec2 vUv;
  varying float vElevation;

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

  vec3 hsl2rgb(float h, float s, float l){return hsl2rgb(vec3(h, s, l));}

  void main(){
      vec4 alpha = texture2D(texture1, vUv * dir);
      vec4 color = texture2D(texture2, vUv * dir);

      float hue = 100./360.;
      float saturation = vElevation;
      float darkborders = sin(vUv.x * 3.14) * sin(vUv.y * 3.14);
      float brightness = pow( abs(darkborders * 0.2  + vElevation),6.5);

      vec3 col = hsl2rgb(hue, saturation, brightness);


      // gl_FragColor = vec4(alpha.rgb , length(alpha.rgb));
      gl_FragColor = vec4(col, length(alpha.rgb));
      // gl_FragColor = vec4(col, 1.);

  }
  `;

  const shaderSwirl = new THREE.ShaderMaterial({
    vertexShader: vs,
    fragmentShader: fs,
    uniforms:{
        time: { type: 'f', value: 0.0},
        texture1: { type: 't', value: loader.load(wonder1op)},
        texture2: { type: 't', value: loader.load(wonder1)},
        dir: { type: 'v2', value: new THREE.Vector2(1,1)}
    },
    transparent: true,
    // wireframe: true
})

  // const swirlMat = new THREE.MeshBasicMaterial({
  //   alphaMap: loader.load(wonder1op), 
  //   map: loader.load(wonder1), 
  //   transparent: true,  
  // })
  const swirlGeo = new THREE.PlaneGeometry(2000,2000,50,50);
  const swirl = new THREE.Mesh(swirlGeo, shaderSwirl);
  // swirl.position.z = 1;



  const izqShader = new THREE.ShaderMaterial({
    vertexShader: vs,
    fragmentShader: fs,
    uniforms:{
      time: { type: 'f', value: 0.0},
      texture1: { type: 't', value: loader.load(wonder2op)},
      texture2: { type: 't', value: loader.load(wonder2)},
      dir: { type: 'v2', value: new THREE.Vector2(-1,1)}
    },
    transparent: true,
  })

  const derShader = new THREE.ShaderMaterial({
    vertexShader: vs,
    fragmentShader: fs,
    uniforms:{
      time: { type: 'f', value: 0.0},
      texture1: { type: 't', value: loader.load(wonder2op)},
      texture2: { type: 't', value: loader.load(wonder2)},
      dir: { type: 'v2', value: new THREE.Vector2(1,-1)}
    },
    transparent: true,
  })

  // const curveMaterialIzq = new THREE.MeshBasicMaterial({
  //   alphaMap: loader.load(wonder2op), 
  //   map: loader.load(wonder2), 
  //   transparent: true, 
  // })
  // const curveMaterialDer = new THREE.MeshBasicMaterial({
  //   alphaMap: loader.load(wonder2op), 
  //   map: loader.load(wonder2), 
  //   transparent: true,
  //  })
  const curveWonder = new THREE.PlaneGeometry(2000,1000,50,50);

  // curveMaterialIzq.map.wrapS = THREE.RepeatWrapping;
  // curveMaterialIzq.map.repeat.x = - 1;
  // curveMaterialIzq.alphaMap.wrapS = THREE.RepeatWrapping;
  // curveMaterialIzq.alphaMap.repeat.x = - 1;
  izqShader.uniforms.texture1.value.wrapS = THREE.RepeatWrapping;
  izqShader.uniforms.texture1.value.repeat.x = - 1;
  izqShader.uniforms.texture2.value.wrapS = THREE.RepeatWrapping;
  izqShader.uniforms.texture2.value.repeat.x = - 1;
  izqShader.uniformsNeedUpdate = true

  // curveMaterialDer.map.wrapT = THREE.RepeatWrapping;
  // curveMaterialDer.map.repeat.y = - 1;
  // curveMaterialDer.alphaMap.wrapT = THREE.RepeatWrapping;
  // curveMaterialDer.alphaMap.repeat.y = - 1;
  derShader.uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
  derShader.uniforms.texture1.value.repeat.y = - 1;
  derShader.uniforms.texture2.value.wrapT = THREE.RepeatWrapping;
  derShader.uniforms.texture2.value.repeat.y = - 1;

  let meshCurveIzq = new THREE.Mesh(curveWonder,izqShader)
  let meshCurveDer = new THREE.Mesh(curveWonder,derShader)

  meshCurveIzq.position.set(-1250, -330, -50)
  meshCurveIzq.rotation.z = 2/Math.PI;
  meshCurveDer.position.set(1250, 330, -50)
  meshCurveDer.rotation.z = 2/Math.PI
  
  let group = new THREE.Group();
  group.position.set(0,0,-1250)
  group.rotation.z = -Math.PI * 0.3
  scene.add(group);
  group.add(swirl)
  group.add(meshCurveIzq)
  group.add(meshCurveDer)

  let update = function(){
    swirl.material.uniforms.time.value += 0.001;
  }
  return {update}
}
