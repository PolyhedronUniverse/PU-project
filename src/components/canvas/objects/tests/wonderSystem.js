import * as THREE from  'three'
import spark from '../../assets/spark1.png'
import wonder1 from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_diffuse.png'
import wonder2 from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_Ends_diffuse.png'
import wonder1op from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_opacity.png'
import wonder2op from '../../assets/scene_textures/wonder_textures/Wonder_Texture_Swirl_Ends_opacity.png'

export default function WonderSystem(scene, origen, loadingManager){

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
  const loader = new THREE.TextureLoader(loadingManager)
  const texture = loader.load(spark);

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
  points1.position.z = origen.z;
  // scene.add( points1 );


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
  points2.position.z = origen.z;
  // scene.add( points2 );

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
  points3.position.z = origen.z;
  // scene.add( points3 );

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
  points4.position.z = origen.z;
  // scene.add( points4 );

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
  points5.position.z = origen.z;
  // scene.add( points5 );

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
  points6.position.z = origen.z;
  // scene.add( points6 );

  let moveNebula = 0;
  const g = new THREE.PlaneBufferGeometry(4000, 800, 10, 10)
  const m = new THREE.MeshBasicMaterial({color: "green", wireframe: false, transparent:true, opacity: 0.5})
  const cloud = new THREE.Mesh(g,m)
  cloud.position.z = origen.z * 5
  // cloud.rotation.x = Math.PI * 0.7
  // cloud.rotation.y = -Math.PI
  cloud.rotation.z = Math.PI * 0.7
  cloud.name = "wonder"


  let backMaterial = new THREE.MeshBasicMaterial({alphaMap: loader.load(wonder1op), map: loader.load(wonder1), transparent: true})
  let backWonder = new THREE.PlaneBufferGeometry(40000,40000,10,10);
  let meshWonder = new THREE.Mesh(backWonder, backMaterial);

  meshWonder.position.z = -30000;
  meshWonder.rotation.z = -Math.PI * 0.3;
  scene.add(meshWonder)

  let curveMaterialIzq = new THREE.MeshBasicMaterial({alphaMap: loader.load(wonder2op), map: loader.load(wonder2), transparent: true})
  let curveMaterialDer = new THREE.MeshBasicMaterial({alphaMap: loader.load(wonder2op), map: loader.load(wonder2), transparent: true})
  let curveWonder = new THREE.PlaneBufferGeometry(40000,20000,10,10);

  curveMaterialIzq.map.wrapS = THREE.RepeatWrapping;
  curveMaterialIzq.map.repeat.x = - 1;
  curveMaterialIzq.alphaMap.wrapS = THREE.RepeatWrapping;
  curveMaterialIzq.alphaMap.repeat.x = - 1;

  curveMaterialDer.map.wrapT = THREE.RepeatWrapping;
  curveMaterialDer.map.repeat.y = - 1;
  curveMaterialDer.alphaMap.wrapT = THREE.RepeatWrapping;
  curveMaterialDer.alphaMap.repeat.y = - 1;

  let meshCurveIzq = new THREE.Mesh(curveWonder,curveMaterialIzq)
  let meshCurveDer = new THREE.Mesh(curveWonder,curveMaterialDer)

  meshCurveIzq.position.set(-20000, 15000, -40000)
  meshCurveIzq.rotation.z = -0.3
  meshCurveDer.position.set(20000, -15000, -40000)
  meshCurveDer.rotation.z = -0.3

  scene.add(meshCurveIzq)
  scene.add(meshCurveDer)


  scene.add(cloud)
  cloud.visible = false;
  let update = function(){
    return moveNebula;
  }

  return {cloud, update}
}
