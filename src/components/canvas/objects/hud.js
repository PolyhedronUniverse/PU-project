import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import rock from '../assets/rock/rock01.jpg'
import test from '../assets/checkered.png'
import smoke from '../assets/smoke.png'
import stars from '../assets/stars.jpg'
import stars2 from '../assets/stars2.jpg'
import image from '../assets/image.svg'

export default function Hud(scene,camera){
  // const plane = new THREE.PlaneBufferGeometry( 50, 50, 32 );

  const shape = new THREE.Shape();

  // shape.moveTo(0, 2);
  // shape.lineTo(0, 5);
  // shape.lineTo(-15, 5);
  // shape.lineTo(-15, -5);
  // shape.lineTo(0,-5)
  // shape.lineTo(0,-2)

  shape.moveTo(-1.5, .5);
  shape.lineTo(1.5, .5);
  shape.lineTo(1.5, -.5);
  shape.lineTo(-1.5,-.5)

  // shape.moveTo(-1, .5);
  // shape.lineTo(.5, .5);
  // shape.lineTo(.5, -.5);
  // shape.lineTo(-1,-.5)

  //Holes
  var hole1 = new THREE.Path();
  // hole1.absellipse(-0.45, 0, .45, .45, 0, Math.PI * 2, true);
  // hole1.arc(-.45,0,.45,Math.PI*0.05,Math.PI*1.95)
  // hole1.moveTo(0,0.09)
  // hole1.bezierCurveTo(-0.09, 0.69, -0.9, 0.47, -0.9, 0)
  // hole1.bezierCurveTo(-0.9,-0.47,-0.2,-0.69,0,-0.09)
  // hole1.bezierCurveTo(0.2,-0.69,0.9,-0.47,0.9,0)
  // hole1.bezierCurveTo(0.9,0.47,0.2,0.69,0,0.09)

  hole1.moveTo(0,0.2)
  hole1.bezierCurveTo(-0.2, 0.6, -0.84, 0.5, -0.85, 0)
  hole1.bezierCurveTo(-0.84, -0.5,-0.2, -0.6, 0, -0.2)
  hole1.bezierCurveTo(0.2, -0.6, 0.84, -0.5, 0.85, 0)
  hole1.bezierCurveTo(0.84, 0.5, 0.2, 0.6, 0, 0.2)

  shape.holes.push(hole1);
  //
  //
  var hole2 = new THREE.Path();
  // hole2.absellipse(0.45, 0, .45, .45, 0, Math.PI * 2, true);
  hole2.arc(.45,0,.45,Math.PI*1.05,Math.PI*2.95)
  // shape.holes.push(hole2);

  // shape.lineTo(-1,-3)
  // shape.bezierCurveTo(-15,-10,-15,10,0,2)

  // const loader = new THREE.TextureLoader();
  // const texture = loader.load('/assets/rock01.jpg')


  //
  // const textureI = loader.load(stars);
  // const xOffset = .5;   // offset by half the texture
  // const yOffset = .5;  // offset by 1/4 the texture
  // textureI.offset.set(xOffset, yOffset);
  //
  // const materialIzq = new THREE.MeshBasicMaterial( { map: textureI} );
  // const textureD = loader.load(stars2);
  // textureD.offset.set(-xOffset, yOffset);
  // const materialDer = new THREE.MeshBasicMaterial( { map: textureD} );

  // const material = new THREE.MeshBasicMaterial( { map: texture} );
  const material = new THREE.MeshBasicMaterial({color: 'gray', wireframe: false})
  const geometry = new THREE.ShapeGeometry( shape );
  const mesh = new THREE.Mesh(geometry, material);
  //
  mesh.position.z=camera.position.z-1
  // mesh.position.x=-.5
  scene.add(mesh)


  var geo = new THREE.RingBufferGeometry( .45, .55, 32, 2, Math.PI*.06, Math.PI*1.88 );


  var mat = new THREE.MeshBasicMaterial( { color: 'red', wireframe: true} );
  var mesh1 = new THREE.Mesh( geo, mat );
  mesh1.position.x=-.4
  var mesh2 = new THREE.Mesh( geo, mat );
  mesh2.position.x=.4
  mesh2.rotation.z=Math.PI
  mesh1.position.z=camera.position.z-1
  mesh2.position.z=camera.position.z-1

  // scene.add(mesh1)
  // scene.add(mesh2)

}
