import * as THREE from 'three';

export default function ShapeTest(scene,{width, height},materialT){
  // const shape = new THREE.Shape();
  //
  // shape.moveTo(-10, 5);
  // shape.lineTo(10, 5);
  // shape.lineTo(10, -5);
  // shape.lineTo(-10,-5)

  // const geometry = new THREE.CircleGeometry( 5, 60 );

  //Holes
  // var hole1 = new THREE.Path();
  // hole1.moveTo(-9,0)
  // console.log(hole1.currentPoint)
  // hole1.bezierCurveTo(-9,5,0,5,0,1)
  // console.log(hole1.currentPoint)
  // hole1.bezierCurveTo(0,5,9,5,9,0)
  // hole1.bezierCurveTo(9,-5,0,-5,0,-1)
  // hole1.bezierCurveTo(0,-5,-9,-5,-9,0)
  // hole1.absellipse(-4.5, 0, 4.5, 4.5, 0, Math.PI * 2, true);
  // shape.holes.push(hole1);

  // var hole2 = new THREE.Path();
  // hole2.absellipse(4.5, 0, 4.5, 4.5, 0, Math.PI * 2, true);
  // shape.holes.push(hole2);

  //Antifaz
  // shape.moveTo(-9,0)
  // shape.bezierCurveTo(-9,5,0,5,0,1)
  // // console.log(hole1.currentPoint)
  // shape.bezierCurveTo(0,5,9,5,9,0)
  // shape.bezierCurveTo(9,-5,0,-5,0,-1)
  // shape.bezierCurveTo(0,-5,-9,-5,-9,0)

  const circle = new THREE.CircleGeometry(4.5, 32);
  const circle2 = new THREE.CircleGeometry(4.5, 32);

  const singleGeometry = new THREE.Geometry();

  const c1 = new THREE.Mesh(circle)
  c1.position.x=-4;
  const c2 = new THREE.Mesh(circle2)
  c2.position.x=4;

  c1.updateMatrix(); // as needed
  singleGeometry.merge(c1.geometry, c1.matrix);

  c2.updateMatrix(); // as needed
  singleGeometry.merge(c2.geometry, c2.matrix);

  var material = new THREE.MeshPhongMaterial({color: 0xFF0000});
  var mesh = new THREE.Mesh(singleGeometry, material);
  scene.add(mesh);

  // const geometry = new THREE.ShapeGeometry( shape );
  // const material = new THREE.MeshBasicMaterial( { color: "gray", wireframe:true } );
  // var mesh = new THREE.Mesh( geometry, material ) ;
  // mesh.position.z=0;
  // scene.add(mesh)
}
