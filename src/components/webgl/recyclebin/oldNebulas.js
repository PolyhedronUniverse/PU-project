import * as THREE from 'three';
import wormhole from '../sceneAssets/wormholeTexture/wormhole_opacity.png';

export default function OldNebulas(scene, loadingManager) {
  const loader = new THREE.TextureLoader(loadingManager)
  const texture = loader.load(wormhole);

  const vs = `
  uniform float time;
  // uniform vec2 mousePosition;

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

    vec2 mousePosition;

    vUv = uv;
    float t = time *.3;
    float t2 = time *.1;
    vec2 pos = vUv * 2.0;

    mousePosition = vec2(0., 1. * cos(time ));

    vec2 displacement = vec2(t, t2) + mousePosition;
    float p = fbm( displacement * 2.0 +pos * 2.0, t * 1.1);
    vec2 pos2 = pos + vec2(p);

    float q = fbm( displacement * 3.0 + pos2 * 2.0, t * 1.23);
    vec2 pos3 = pos + vec2(q);

    float r = fbm( displacement * 4.0 + pos3 * 2.0, t * 1.23);
    vec2 pos4 = pos + vec2(r);

    float s = fbm( displacement * 5.0 + pos4 * 2.0, t * 1.32);

    float d = length( vUv - (0.5 ));

    float ratioElevation = pow( (1.0 - d), 5.0);

    vElevation = s + .2 + ratioElevation * .2;

    vElevation *= 1.0 - smoothstep(0.0, 1.0, length(uv - .5));

    vec3 newPos = position - normal * vElevation * 200.;

    // newPos = vec3(position.xy, position.z + vElevation * 1000.);

    gl_Position = projectionMatrix * modelViewMatrix * vec4 ( newPos, 1.0);

    // gl_Position = projectionMatrix * modelViewMatrix * vec4 ( position, 1.0);
  }
  `;

  const fs = `
  precision highp float;

  varying vec2 vUv;
  varying float vElevation;
  uniform float uHue;

  uniform float a;
  uniform float b;
  uniform float c;
  uniform float d;
  uniform float e;
  uniform float opacity;

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

    float hue = uHue;
    float saturation = vElevation;

    float darkborders = sin(vUv.x * 3.14) * sin(vUv.y * 3.14);
    float brightness = pow( darkborders * a + vElevation, 4.5);

    vec3 col = hsl2rgb(hue, saturation, brightness);

    // if(length(col) > 0.05){
    //   gl_FragColor = vec4(col, 1.);
    // }else{
    //   // gl_FragColor = vec4(1.0, 0., 0., 1.);
    //   discard;
    // }

    if(length(col) < 0.05 ){
      discard;
    }else if(length(col) > 1.){
      gl_FragColor = vec4(hsl2rgb(hue, 1., 0.5),1.);
      // discard;
    }
    else{
      // discard;
      gl_FragColor = vec4(col, 1.);
    }
  }
  `;


  const geometry = new THREE.PlaneBufferGeometry(250, 250, 80, 80);
  // const areaG = new THREE.PlaneBufferGeometry(100,100,2,2);
  const areaG = new THREE.CircleBufferGeometry(80, 10);

  function createNebula(geometry, areaGeo, color, position, lookAt, name, speed) {
    const material = new THREE.ShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        time: { type: 'f', value: 0.0 },
        opacity: { type: 'f', value: 1.0 },
        a: { type: 'f', value: 0.2 },
        uHue: { type: 'f', value: color }
      },
      transparent: true,
      alphaTest: 0.5,
      wireframe: false,
    })

    const nebulaMesh = new THREE.Mesh(geometry, material);
    // nebulaMesh.position.set(position);
    nebulaMesh.name = name + 'Mesh';

    const areaMesh = new THREE.Mesh(
      areaGeo,
      new THREE.MeshBasicMaterial({ alphaMap: texture, color: new THREE.Color().setHSL(color, 1, .5), transparent: true })
    )
    areaMesh.position.z = -200;
    areaMesh.userData.displayName = name;

    const group = new THREE.Group();
    group.add(nebulaMesh);
    group.add(areaMesh);
    group.position.set(position.x, position.y, position.z);
    group.lookAt(lookAt.x, lookAt.y, lookAt.z);
    // console.log(group)
    // scene.add(group)

    let update = function () {
      nebulaMesh.material.uniforms.time.value += speed;
      // console.log('u')
    }


    return { group, update }
  }

  const anger = createNebula(
    geometry,
    areaG,
    0.0,
    new THREE.Vector3(-230, -80, -150),
    new THREE.Vector3(0, 0, 350),
    'anger',
    0.01
  );
  // scene.add(anger.group)

  const sadness = createNebula(
    geometry,
    areaG,
    240 / 360,
    new THREE.Vector3(-240, 160, -170),
    new THREE.Vector3(0, 0, 350),
    'sadness',
    -0.01
  );
  // scene.add(sadness.group)

  const joy = createNebula(
    geometry,
    areaG,
    60 / 360,
    new THREE.Vector3(240, -120, -130),
    new THREE.Vector3(0, 0, 350),
    'joy',
    0.03
  );
  // scene.add(joy.group)


  const love = createNebula(
    geometry,
    areaG,
    300 / 360,
    new THREE.Vector3(350, 100, -150),
    new THREE.Vector3(0, 0, 350),
    'love',
    -0.02
  );
  // scene.add(love.group)

  const empowerment = createNebula(
    geometry,
    areaG,
    30 / 360,
    new THREE.Vector3(130, 150, -160),
    new THREE.Vector3(0, 0, 350),
    'empowerment',
    0.02
  );
  // scene.add(empowerment.group)

  const wonder = createNebula(
    geometry,
    areaG,
    120 / 360,
    new THREE.Vector3(0, 0, -550),
    new THREE.Vector3(0, 0, 350),
    'wonder',
    0.02
  )
  // scene.add(wonder.group)

  // const box = new THREE.BoxHelper( test, 0xffff00 );
  // scene.add( box );

  let update = function () {

    // anger.update();
    // sadness.update()
    // joy.update();
    // love.update();
    // empowerment.update();
    // wonder.update();
  }

  let nebulas = [];
  nebulas.push(
    anger.group.children[1],
    sadness.group.children[1],
    joy.group.children[1],
    love.group.children[1],
    empowerment.group.children[1],
    wonder.group.children[1]
  )
  // console.log(nebulas)

  return { update, nebulas }
}
