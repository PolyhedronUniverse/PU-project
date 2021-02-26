import * as THREE from 'three';
import wormhole from '../sceneAssets/wormholeTexture/wormhole_opacity.png';
import Shaders from '../sceneAssets/shaders/shaders'

export default function Nebulas(scene, loadingManager) {
  const loader = new THREE.TextureLoader(loadingManager)
  const texture = loader.load(wormhole);
  let myShaders = Shaders();


  function createNebula(geometry, areaGeo, color, position, lookAt, name, speed, shaders) {
    const material = new THREE.ShaderMaterial({
      vertexShader: shaders.vs,
      fragmentShader: shaders.fs,
      // vertexShader: myShaders.vs,
      // fragmentShader: myShaders.fs,
      uniforms: {
        time: { type: "f", value: 1 },
        uHue: { type: "f", value: color },
        mousePosition: { type: "v2", value: new THREE.Vector2(0.9, 0.9) },
        a: { type: "f", value: 0.3 },
        opacity: { type: "f", value: 1.0 }
      },
      transparent: true,
      alphaTest: 0.5,
      wireframe: false,
    })
    // const material = new THREE.MeshBasicMaterial({
    //   color:'red',
    //   map: texture,
    //   transparent: true
    // })

    const nebulaMesh = new THREE.Mesh(geometry, material);
    // nebulaMesh.position.set(position);
    nebulaMesh.name = name + 'Mesh';

    const areaMesh = new THREE.Mesh(
      areaGeo,
      new THREE.MeshBasicMaterial({ alphaMap: texture, color: new THREE.Color().setHSL(color, 1, .5), transparent: true })
    )
    areaMesh.position.z = -200;
    areaMesh.userData.displayName = name;

    const group = new THREE.Group();
    group.add(nebulaMesh);
    group.add(areaMesh);
    group.position.set(position.x, position.y, position.z);
    group.lookAt(lookAt.x, lookAt.y, lookAt.z);
    // console.log(group)
    // scene.add(group)

    let update = function () {
      nebulaMesh.material.uniforms.time.value += speed;
      // console.log('u')
    }

    // ? const box = new THREE.BoxHelper( nebulaMesh, 0xffff00 );
    // ? scene.add( box );


    return { group, update }
  }
  let geometry;
  if(window.devicePixelRatio > 1){
    geometry = new THREE.PlaneBufferGeometry(250, 250, 30, 30);
  }else{
    geometry = new THREE.PlaneBufferGeometry(250, 250, 110, 110);
  }
  const areaG = new THREE.CircleBufferGeometry(80, 10);


  // const anger1 = createNebula(
  //   geometry,
  //   areaG,
  //   0.96,
  //   new THREE.Vector3(-200, 0, -150),
  //   new THREE.Vector3(0, 0, 350),
  //   'vs',
  //   0.001,
  //   {vs: myShaders.vs, fs:myShaders.fs}
  // );
  // scene.add(anger1.group)

  // const anger2 = createNebula(
  //   geometry,
  //   areaG,
  //   0.96,
  //   new THREE.Vector3(200, 0, -150),
  //   new THREE.Vector3(0, 0, 350),
  //   'test',
  //   0.001,
  //   {vs: myShaders.testVS, fs: myShaders.testFS}
  // );
  // scene.add(anger2.group)

  const anger = createNebula(
    geometry,
    areaG,
    0.96,
    new THREE.Vector3(-230, -80, -150),
    new THREE.Vector3(0, 0, 350),
    'anger',
    0.009,
    {vs: myShaders.vs, fs:myShaders.fs}
  );
  scene.add(anger.group)

  const sadness = createNebula(
    geometry,
    areaG,
    0.6,
    new THREE.Vector3(-240, 160, -170),
    new THREE.Vector3(0, 0, 350),
    'sadness',
    -0.001,
    {vs: myShaders.vs, fs:myShaders.fs}
  );
  scene.add(sadness.group)

  const joy = createNebula(
    geometry,
    areaG,
    0.1,
    new THREE.Vector3(240, -120, -130),
    new THREE.Vector3(0, 0, 350),
    'joy',
    0.003,
    {vs: myShaders.vs, fs:myShaders.fs}
  );
  scene.add(joy.group)


  const love = createNebula(
    geometry,
    areaG,
    0.8,
    new THREE.Vector3(350, 100, -150),
    new THREE.Vector3(0, 0, 350),
    'love',
    -0.005,
    {vs: myShaders.vs, fs:myShaders.fs}
  );
  scene.add(love.group)

  const empowerment = createNebula(
    geometry,
    areaG,
    0.02,
    new THREE.Vector3(130, 150, -160),
    new THREE.Vector3(0, 0, 350),
    'empowerment',
    0.006,
    {vs: myShaders.vs, fs:myShaders.fs}
  );
  scene.add(empowerment.group)

  // const wonder = createNebula(
  //   geometry,
  //   areaG,
  //   120/360,
  //   new THREE.Vector3(0,0,-550),
  //   new THREE.Vector3(0,0,350),
  //   'wonder',
  //   0.02,
  //   {vs: myShaders.vs, fs:myShaders.fs}
  // )
  // scene.add(wonder.group)

  const g = new THREE.PlaneBufferGeometry(250, 50, 10, 10)
  const m = new THREE.MeshBasicMaterial({color: "green", wireframe: false, transparent:true, opacity: 0.5})
  const cloud = new THREE.Mesh(g,m)
  // cloud.rotation.x = Math.PI * 0.7
  // cloud.rotation.y = -Math.PI
  cloud.rotation.z = Math.PI * 0.7
  cloud.userData.displayName = "wonder"
  cloud.visible = false;
  scene.add(cloud)

  const update = function () {
    anger.update()
    sadness.update()
    joy.update();
    love.update();
    empowerment.update();
    // wonder.update();
    // anger1.update()
    // ? anger2.update()

  }

  let nebulas = [];
  nebulas.push(
    anger.group.children[1],
    sadness.group.children[1],
    joy.group.children[1],
    love.group.children[1],
    empowerment.group.children[1],
    cloud
    // wonder.group.children[1]
    // ? anger1.group.children[1],
    // ? anger2.group.children[1],

  )

  return { update, nebulas }
}
