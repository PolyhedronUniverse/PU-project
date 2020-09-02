import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export default function Text(canvas){
  const stats = new Stats();
	canvas.appendChild( stats.dom );
  stats.update();
}
