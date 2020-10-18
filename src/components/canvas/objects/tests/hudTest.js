import * as THREE from 'three';
import hudtexture from '../../assets/1024hud.jpg'
// import rock from '../../assets/rock/rock01.jpg'

export default function HudTest(scene,camera){

  const texture = new THREE.TextureLoader().load(hudtexture);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );
  const shape = new THREE.Shape();

  // shape.moveTo(-1.5, 1.5 * 0.544);
  // shape.lineTo( 1.5, 1.5 * 0.544);
  // shape.lineTo( 1.5, -1.5 * 0.544);
  // shape.lineTo(-1.5, -1.5 * 0.544)

  shape.moveTo(-1.5, 1.5 * 0.5);
  shape.lineTo( 1.5, 1.5 * 0.5);
  shape.lineTo( 1.5, -1.5 * 0.5);
  shape.lineTo(-1.5, -1.5 * 0.5)

  //Holes
  var hole1 = new THREE.Path();
  hole1.moveTo(-0.03, 0.25)
  hole1.bezierCurveTo(-0.25, 0.59, -0.83, 0.49, -0.85, 0)
  hole1.bezierCurveTo(-0.83, -0.49, -0.25, -0.59, -0.03, -0.25)

  hole1.bezierCurveTo(-0.01, -0.23, 0.01, -0.23, 0.03, -0.25)

  hole1.bezierCurveTo(0.25, -0.59, 0.83, -0.49, 0.85, 0)
  hole1.bezierCurveTo(0.83, 0.49, 0.25, 0.59, 0.03, 0.25)

  hole1.bezierCurveTo(0.01, 0.23, -0.01, 0.23, -0.03, 0.25)


  shape.holes.push(hole1);

  var hole2 = new THREE.Path();
  hole2.arc(.45,0,.45,Math.PI*1.05,Math.PI*2.95)

  // const material = new THREE.MeshBasicMaterial({color: 'gray', wireframe: false})
  const material = new THREE.MeshBasicMaterial( { map: texture} );
  const geometry = new THREE.ShapeGeometry( shape );
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z=camera.position.z-0.97
  scene.add(mesh)


  // scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,1.0888,2,2), new THREE.MeshBasicMaterial({map: texture,})))

}
