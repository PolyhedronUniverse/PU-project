import * as THREE from 'three'
import { GPUComputationRender } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
let FBO;
export default FBO = function(exports){

  let scene, orthcam, rtt;
  exports.init = function(width, height, renderer, smaterial, rmaterial){

    let gl = renderer.getContext();
    console.log(gl.getExtension("OES_texture_float"))
    //1 we need FLOAT Textures to store positions
    //https://github.com/KhronosGroup/WebGL/blob/master/sdk/tests/conformance/extensions/oes-texture-float.html
    if(!gl.getExtension("OES_texture_float")){
      throw new Error("float textures not supported" );
    }

    //2 we need to access textures from within the vertex shader
    //https://github.com/KhronosGroup/WebGL/blob/90ceaac0c4546b1aad634a6a5c4d2dfae9f4d124/conformance-suites/1.0.0/extra/webgl-info.html
    if(gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) == 0){
      throw new Error("vertex shader cannot read textures");
    }

    //3 rtt setup
    scene = new THREE.Scene();
    orthcam = new THREE.OrthographicCamera(-1,1,1,-1,1/Math.pow(2,53),1);

    //4 create a target texture
    let options = {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType
    };
    rtt = new THREE.WebGLRenderTarget(width, height, options);


    //5 the simulation:
    //create a bi-unit quadrilateral and uses the simulation material to update the Float Texture
    let geom = new THREE.BufferGeometry();
    geom.addAttribute('position', new THREE.BufferAttribute(new Float32Array([-1,-1,0, 1,-1,0, 1,1,0, -1,-1, 0, 1, 1, 0, -1,1,0]), 3));
    geom.addAttribute('uv', new THREE.BufferAttribute(new Float32Array([0,1, 1,1, 1,0,     0,1, 1,0, 0,0]), 2));
    scene.add(new THREE.Mesh(geom, smaterial));

    let l = (width * height);
    let vertices = new Float32Array(l * 3);
    for(let i = 0; i<l;i++){
      let i3 = i * 3;
      vertices[ i3 ] = (i % width) / width;
      vertices[ i3 + 1 ] = (i/width)/height;
    }

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices,3));

    exports.particles = new THREE.Points(geometry, rmaterial);
    exports.renderer = renderer;

  };

  exports.update = function(){
    exports.renderer.render(scene, orthcam, rtt, true);
    exports.particles.material.uniforms.positions.value = rtt;
  };
  return exports;
}({});
