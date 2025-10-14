import * as THREE from "three";
import hudtexture from "../../../assets/1024hud.jpg";
// import bin from '../sceneAssets/other/bin.png'
// import test from '../sceneAssets/other/test.png'

export default function Hemispheres(scene, loadingManager, camera) {
  const loader = new THREE.TextureLoader(loadingManager);
  const texture = loader.load(hudtexture);
  // let texBin = loader.load(bin);
  // const testTex = loader.load(test);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  const shape = new THREE.Shape();

  shape.moveTo(-1.5, 1.5 * 0.5);
  shape.lineTo(1.5, 1.5 * 0.5);
  shape.lineTo(1.5, -1.5 * 0.5);
  shape.lineTo(-1.5, -1.5 * 0.5);

  var hole1 = new THREE.Path();
  hole1.moveTo(-0.03, 0.25);
  hole1.bezierCurveTo(-0.25, 0.59, -0.83, 0.49, -0.85, 0);
  hole1.bezierCurveTo(-0.83, -0.49, -0.25, -0.59, -0.03, -0.25);

  hole1.bezierCurveTo(-0.01, -0.23, 0.01, -0.23, 0.03, -0.25);

  hole1.bezierCurveTo(0.25, -0.59, 0.83, -0.49, 0.85, 0);
  hole1.bezierCurveTo(0.83, 0.49, 0.25, 0.59, 0.03, 0.25);

  hole1.bezierCurveTo(0.01, 0.23, -0.01, 0.23, -0.03, 0.25);

  shape.holes.push(hole1);

  var hole2 = new THREE.Path();
  let circleRadius = 0.4;
  hole2.moveTo(0, 0);
  hole2.quadraticCurveTo(0, circleRadius, circleRadius, circleRadius);
  hole2.quadraticCurveTo(2 * circleRadius, circleRadius, 2 * circleRadius, 0);
  hole2.quadraticCurveTo(
    2 * circleRadius,
    -circleRadius,
    circleRadius,
    -circleRadius
  );
  hole2.quadraticCurveTo(0, -circleRadius, 0,0);
  //hole2.bezierCurveTo(0.0, 0, 0, 0, -0.064, -0.256);
  hole2.quadraticCurveTo(0, -circleRadius, -circleRadius, -circleRadius);
  hole2.quadraticCurveTo(-2 * circleRadius, -circleRadius, -2 * circleRadius);
  hole2.quadraticCurveTo(
    -2 * circleRadius,
    circleRadius,
    -circleRadius,
    circleRadius
  );
  hole2.quadraticCurveTo(0, circleRadius, 0, 0);

  //shape.holes.push(hole2);

  const material = new THREE.MeshBasicMaterial({
    // alphaMap: testTex,
    map: texture,
    // wireframe: false,
    // transparent: true
  });

  const geometry = new THREE.ShapeGeometry(shape);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = camera.position.z - 0.97;
  // mesh.position.z=-0.97

  mesh.name = "MainHud";
  scene.add(mesh);

  // const g = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
  // const m = new THREE.Mesh(g, material)
  // m.position.z = camera.position.z - 2
  // scene.add(m)

  const s = new THREE.SphereGeometry(200, 10, 10);
  const m = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
  const sphere = new THREE.Mesh(s, m);
  sphere.position.z = -4000;
  //scene.add(sphere);
  return mesh;
}
