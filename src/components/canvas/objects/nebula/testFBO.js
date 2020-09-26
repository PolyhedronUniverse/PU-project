import * as THREE from 'three';
import Fbo from '../FBO/fbo.js';
import s_vs from '../FBO/glsl/noise/simulation_vs.glsl';
import s_fs from '../FBO/glsl/noise/simulation_fs.glsl';
import r_vs from '../FBO/glsl/noise/render_vs.glsl';
import r_fs from '../FBO/glsl/noise/render_fs.glsl';

export default function TestFBO(scene, camera, renderer){
  let sshader;
  let height = 256;
  let width = 512;
  let elevation = 64;

  let data = getRandomData(width, height, 256)
  let texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping );
  texture.needsUpdate = true;

  sshader = new THREE.ShaderMaterial({
    uniforms: {
      texture: { type: "t", value: texture },
      timer: { type: "f", value: 0},
      frequency: { type: "f", value: 0.01 },
      amplitude: { type: "f", value: 48 },
      maxDistance: { type: "f", value: 24 }
    },
    vertexShader: s_vs,
    fragmentShader: s_fs,
  });

  var rshader = new THREE.ShaderMaterial({
    uniforms: {
      positions: { type: "t", value: null },
      pointSize: { type: "f", value: 3 },
      big: { type: "v3", value: new THREE.Vector3(255,100,100).multiplyScalar(1/0xFF) },
      small: { type: "v3", value: new THREE.Vector3(255,255,20).multiplyScalar(1/0xFF) }
    },
    vertexShader: r_vs,
    fragmentShader: r_fs,
    transparent: true,
    side: THREE.DoubleSide,
    // blending:THREE.AdditiveBlending
  });

  new Fbo.init(width, height, renderer, sshader, rshader);
  scene.add(Fbo.particles);
  // FBO.particles.rotation.x = 10
  this.update = function(){
    Fbo.update();
    sshader.uniforms.timer.value += 0.01;
    Fbo.particles.position.x = Math.cos( Date.now() *.001 ) * Math.PI / 180 * 2;
    Fbo.particles.rotation.y -= Math.PI / 180 * .05;
  }



  function getRandomData(width, height, size){
    var len = width * height * 3;
    var data = new Float32Array( len );
    while( len-- )data[len] = ( Math.random() - 0.5 ) * size ;
    return data;
  }
}
