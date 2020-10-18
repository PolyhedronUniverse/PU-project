import Stats from 'three/examples/jsm/libs/stats.module.js';

export default function Text(canvas){
  const stats = new Stats();
	document.body.appendChild( stats.dom );
  stats.update();
  this.update = function(){
    stats.update();
  }
}
