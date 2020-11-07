import * as THREE from "three";
import wormhole2 from '../../assets/scene_textures/wormhole_textures/Anger_nebula_opacity.png'

export default function NebulaTest(scene, name, hue, origen, vel, loadingManager){

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
      float t = time *.3;
      float t2 = time *.1;
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
    alphaTest: 0.5,
    // depthWrite: false,
    // depthTest: false
    // side: THREE.DoubleSide,
  });

  let shgeometry = new THREE.PlaneBufferGeometry(2500, 2500, 150, 150)

  let cloudN = new THREE.Mesh(shgeometry, material);


  cloudN.rotation.z = 2 * Math.PI * Math.random() - Math.PI;
  cloudN.position.x = origen.x;
  cloudN.position.y = origen.y;
  cloudN.position.z = origen.z;
  //cloud.userData.emotionalregion =

  let loader = new THREE.TextureLoader(loadingManager)
  let color = new THREE.Color();

  let area = new THREE.CircleBufferGeometry(1200, 10);
  let mat = new THREE.MeshBasicMaterial({
    alphaMap: loader.load(wormhole2),
    // map: loader.load(wormhole1),
    transparent: true,
    // opacity: 1.5,
    color: color.setHSL(hue, 1.0, 0.5)
  });

  let cloud = new THREE.Mesh(area, mat);
  cloud.position.set(origen.x, origen.y, origen.z-100);
  cloud.name = name;
  // cloud.visible = false;

  scene.add(cloud)

  scene.add(cloudN);

  // const textures = new SbTextures();


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

    cloudN.rotation.z += vel;

    cloudN.material.uniforms.time.value = timer;

    // cloud.lookAt(cam)

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

  return {update, cloud};
}
