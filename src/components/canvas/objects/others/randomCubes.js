import * as THREE from 'three';

export default function RandomCubes(scene){
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function rand(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + (max - min) * Math.random();
  }

  function randomColor() {
    return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
  }

  const numObjects = 10;
  let cloud = [10]
  for (let i = 0; i < numObjects; ++i) {
    const material = new THREE.MeshBasicMaterial({
      color: randomColor(),
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.set(rand(-20, 20), rand(-20, 20), rand(-20, 20) + 3400);
    cube.rotation.set(rand(Math.PI), rand(Math.PI), 0);
    cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));

    cube.callback = function(){
      cube.material.color = "red";
    }

    cloud[i] = cube;
  }

  let update = function (){

  }

  return {cloud, update};
}
