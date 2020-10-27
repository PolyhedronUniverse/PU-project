import * as THREE from  'three'
import spark from '../../assets/spark1.png'

import left from '../../assets/skybox_test/wonder/green_nebula_skybox_RT.png'
import up from '../../assets/skybox_test/wonder/green_nebula_skybox_UP.png'
import right from '../../assets/skybox_test/wonder/green_nebula_skybox_LF.png'
import down from '../../assets/skybox_test/wonder/green_nebula_skybox_DN.png'
import front from '../../assets/skybox_test/wonder/green_nebula_skybox_FT.png'
import back from '../../assets/skybox_test/wonder/green_nebula_skybox_BK.png'

export default function WonderTest(scene, origen){

  function random() { return Math.random() * 2 - 1 }
  function createGeometry( amount, step, dir ) {


    let geometry = new THREE.BufferGeometry();
    let vertices = [];

    for ( var i = 2000; i < amount; i += step ) {

      var angle = i / 12;
      var distance = i / 4;
      var progress = ( i / amount ) * 400 + 0.5;
      const x = progress * random() * random() + Math.sin( angle ) * distance;
      const y = progress + 100
      const z = progress * random() * random() + Math.cos( angle ) * distance;

      const aux = Math.cos(Math.PI*x/3500 + 0.5*Math.PI) * y * 2 + random() * random() * y;
      const newy =  aux * 1;

      if(dir){
        if(z<0){
          vertices.push(x, newy, z);
          // geometry.vertices.push(new THREE.Vector3(x, newy, z));
        }
        else{
          vertices.push(x, newy, -z);
          // geometry.vertices.push(new THREE.Vector3(x, newy, -z));
        }
      }
      else{
        if(z<0){
          vertices.push(x, -newy, -z);
          // geometry.vertices.push(new THREE.Vector3(x, -newy, -z));
        }
        else{
          vertices.push(x, -newy, z);
          // geometry.vertices.push(new THREE.Vector3(x, -newy, z));
        }
      }

    }


    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    return geometry;

  }

  const texture = new THREE.TextureLoader().load(spark);

  // Puntos 1
  let geometry1 = createGeometry( 15000, 5, true );
  let material1 = new THREE.PointsMaterial( {
    size: 200,
    map: texture,
    depthWrite: false,
    transparent: true,
    color: "green"
  } );
  let points1 = new THREE.Points( geometry1, material1 );
  // points1.rotation.z = -Math.PI/12;
  // points1.rotation.z = Math.PI/18;
  points1.position.z = origen.z;
  // points.position.y = 400 * Math.random() - 400;
  scene.add( points1 );
  points1.name = "wonder";

  // Puntos 2
  let geometry2 = createGeometry( 15000, 5, false );
  let material2 = new THREE.PointsMaterial( {
    size: 200,
    map: texture,
    depthWrite: false,
    transparent: true,
    color: "green"
  } );
  let points2 = new THREE.Points( geometry2, material2 );
  points2.rotation.y = Math.PI;
  // points2.rotation.z = Math.PI/12;
  // points2.rotation.z = -Math.PI/16;
  points2.position.z = origen.z;
  // points.position.y = 400 * Math.random() - 400;
  scene.add( points2 );
  points2.name = "wonder"

  // Puntos 3
  let geometry3 = createGeometry( 20000, 8, true );
  let material3 = new THREE.PointsMaterial( {
    size: 40,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    color: "green"
  } );
  let points3 = new THREE.Points( geometry3, material3 );
  // points3.rotation.z = -Math.PI/12;
  // points3.rotation.z = Math.PI/16;
  points3.position.z = origen.z;
  // points.position.y = 400 * Math.random() - 400;
  scene.add( points3 );
  points3.name = "wonder"

  // Puntos 4
  let geometry4 = createGeometry( 20000, 8,false );
  let material4 = new THREE.PointsMaterial( {
    size: 40,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    color: "green"
  } );
  let points4 = new THREE.Points( geometry4, material4 );
  points4.rotation.y = Math.PI;
  // points4.rotation.z = Math.PI/12;
  // points4.rotation.z = -Math.PI/16;
  points4.position.z = origen.z;
  // points.position.y = 400 * Math.random() - 400;
  scene.add( points4 );
  points4.name = "wonder"

  // Puntos 5
  let geometry5 = createGeometry( 20000, 0.4, true );
  let material5 = new THREE.PointsMaterial( {
    size: 25,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    color: 'green'
  } );
  let points5 = new THREE.Points( geometry5, material5 );
  // points5.rotation.z = -Math.PI/12;
  // points5.rotation.z = Math.PI/16;
  points5.position.z = origen.z;
  // points.position.y = 400 * Math.random() - 400;
  scene.add( points5 );
  points5.name = "wonder"

  // Puntos 6
  let geometry6 = createGeometry( 20000, 0.4,false );
  let material6 = new THREE.PointsMaterial( {
    size: 25,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true
  } );
  let points6 = new THREE.Points( geometry6, material6 );
  points6.rotation.y = Math.PI;
  // points6.rotation.z = Math.PI/12;
  // points6.rotation.z = -Math.PI/16;
  points6.position.z = origen.z;
  // points.position.y = 400 * Math.random() - 400;
  scene.add( points6 );
  points6.name = "Wonder"

  // console.log(geometry1.getAttribute('position'));
  // let a = geometry1.getAttribute('position')

  // let cloud = new THREE.Group();
  // cloud.add(points1)
  // cloud.add(points2)
  // cloud.add(points3)
  // cloud.add(points4)
  // cloud.add(points5)
  // cloud.add(points6)
  //
  // scene.add(cloud)
  // console.log(cloud)

  const geometry = new THREE.BoxBufferGeometry(3500/2,3500/2,3500/2);

  const loader = new THREE.TextureLoader()
  const materials = [
    new THREE.MeshBasicMaterial({map: loader.load(left), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(right), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(up), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(down), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(front), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(back), side: THREE.BackSide}),
  ];
  // const wo = loader.load([left, right, up, down, front, back])
  // const materials = new THREE.MeshBasicMaterial({
  //   map: wo,
  //   side: THREE.BackSide
  // })

  let box =  new THREE.Mesh(geometry, materials);
  box.position.set(0,0,-8000);
  box.name="wonder"
  box.visible = false;
  scene.add(box)

  let moveNebula = 0;
  const g = new THREE.TorusKnotBufferGeometry(2000, 200, 100, 10, 1, 1)
  const m = new THREE.MeshBasicMaterial({color: "green", wireframe: false, transparent:true, opacity: 0.0})
  const cloud = new THREE.Mesh(g,m)
  cloud.position.z = origen.z * 5
  cloud.rotation.x = Math.PI * 0.5
  cloud.rotation.y = -Math.PI
  cloud.rotation.z = -Math.PI * 0.5
  cloud.name = "wonder"
  cloud.callback = function(dir){
    moveNebula = dir;
    // document.querySelector('#io').textContent = "callback";
  }
  // mg.rotation.y = 0.1
  scene.add(cloud)

  let update = function(){

    // box.visible = vis
    // box.position.x = origen.x;

    return moveNebula;

    // geometry1.vertices.forEach((i,j) => {
    //   var dX, dY, dZ;
    //   dX = Math.random() * 6 - 3;
    //   dY = Math.random() * 6 - 3;
    //   dZ = Math.random() * 6 - 3;
    //
    //   i.add(new THREE.Vector3(dX, dY, dZ));
    //   if(j==0)
    //   console.log(dX)
    // });
    // geometry1.verticesNeedUpdate = true;

    // geometry3.vertices.forEach((i,j) => {
    //   var dX, dY, dZ;
    //   dX = Math.random() * 2 - 1;
    //   dY = Math.random() * 2 - 1;
    //   dZ = Math.random() * 2 - 1;
    //
    //   i.add(new THREE.Vector3(dX, dY, dZ));
    //   geometry3.colors[j] = new THREE.Color(Math.random(), Math.random(), Math.random());
    // });
    // geometry3.verticesNeedUpdate = true;
    // geometry3.colorsNeedUpdate = true;
    //
    // geometry5.vertices.forEach((i,j) => {
    //   var dX, dY, dZ;
    //   dX = Math.random() * 2 - 1;
    //   dY = Math.random() * 2 - 1;
    //   dZ = Math.random() * 2 - 1;
    //
    //   i.add(new THREE.Vector3(dX, dY, dZ));
    //   geometry5.colors[j] = new THREE.Color(Math.random(), Math.random(), Math.random());
    // });
    // geometry5.verticesNeedUpdate = true;
    // geometry5.colorsNeedUpdate = true;

  }

  return {cloud, update, box}
}
