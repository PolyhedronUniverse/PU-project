import * as THREE from  'three'
import spark from '../../assets/spark1.png'

export default function WonderTest(scene, origen){

    function random() { return Math.random() * 2 - 1 }
    function createGeometry( amount, step, dir ) {

      var vertices = [];

      for ( var i = 2000; i < amount; i += step ) {

        var angle = i / 12;
        var distance = i / 4;
        var progress = ( i / amount ) * 400 + 0.5;
        const x = progress * random() * random() + Math.sin( angle ) * distance;
        const y = progress;
        const z = progress * random() * random() + Math.cos( angle ) * distance;

        const aux = Math.cos(Math.PI*x/3000 + 0.5*Math.PI) * y * 2 + random() * random() * y;
        const newy =  aux;

        if(dir){
          if(z<0){
            vertices.push(x, newy, z);
          }
          else{
            vertices.push(x, newy, -z);
          }
        }
        else{
          if(z<0){
            vertices.push(x, -newy, -z);
          }
          else{
            vertices.push(x, -newy, z);
          }
        }
      }

      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

      return geometry;

    }

    // Puntos 1
    var geometry = createGeometry( 15000, 5, true );
    var material = new THREE.PointsMaterial( {
      size: 200,
      map: new THREE.TextureLoader().load(spark),
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    var points = new THREE.Points( geometry, material );
    points.rotation.z = -Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 2
    geometry = createGeometry( 15000, 5, false );
    material = new THREE.PointsMaterial( {
      size: 200,
      map: new THREE.TextureLoader().load(spark),
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    points = new THREE.Points( geometry, material );
    points.rotation.y = Math.PI;
    points.rotation.z = Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 3
    geometry = createGeometry( 20000, 8, true );
    material = new THREE.PointsMaterial( {
      size: 40,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    points = new THREE.Points( geometry, material );
    points.rotation.z = -Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 4
    geometry = createGeometry( 20000, 8,false );
    material = new THREE.PointsMaterial( {
      size: 40,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: "green"
    } );
    points = new THREE.Points( geometry, material );
    points.rotation.y = Math.PI;
    points.rotation.z = Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 5
    geometry = createGeometry( 20000, 0.4, true );
    material = new THREE.PointsMaterial( {
      size: 25,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: 'green'
    } );
    points = new THREE.Points( geometry, material );
    points.rotation.z = -Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );

    // Puntos 6
    geometry = createGeometry( 20000, 0.4,false );
    material = new THREE.PointsMaterial( {
      size: 25,
      map: new THREE.TextureLoader().load(spark),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    } );
    points = new THREE.Points( geometry, material );
    points.rotation.y = Math.PI;
    points.rotation.z = Math.PI/12;
    points.position.z = origen.z;
    // points.position.y = 400 * Math.random() - 400;
    scene.add( points );
}
