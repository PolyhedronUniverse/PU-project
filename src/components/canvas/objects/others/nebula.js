import * as THREE from 'three'
import NebulaPoints from '../nebula/nebulapoints.js'
import NebulaDos from '../nebula/nebulados.js'
import NebulaBox from '../nebula/nebulabox.js'

export default function Nebula(origen, color, scene, camera){

  // const points = new NebulaPoints(2000, origen, color, scene);
  const dos = new NebulaDos(origen, color, scene);
  const box = new NebulaBox(origen, color, scene, camera)
  let tmp = camera.position;
  let tempText = scene.background;
  this.update = function(){
    dos.update()
    if(camera.position.x < origen.x+300 && camera.position.x > origen.x-300 &&
      camera.position.y < origen.y+150 && camera.position.y > origen.y-150 &&
      camera.position.z < origen.z+300 && camera.position.z > origen.z-300){
      return true;
    }
    else{
      return false;
    }
  }
}
