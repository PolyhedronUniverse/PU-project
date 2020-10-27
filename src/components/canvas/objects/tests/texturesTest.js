import * as THREE from 'three';

import sleft from '../../assets/skybox_test/sadness/blue_nebula_RT.png'
import sup from '../../assets/skybox_test/sadness/blue_nebula_UP.png'
import sright from '../../assets/skybox_test/sadness/blue_nebula_LF.png'
import sdown from '../../assets/skybox_test/sadness/blue_nebula_DN.png'
import sfront from '../../assets/skybox_test/sadness/blue_nebula_FT.png'
import sback from '../../assets/skybox_test/sadness/blue_nebula_BK.png'

import aleft from '../../assets/skybox_test/anger/red_nebula_RT.png'
import aup from '../../assets/skybox_test/anger/red_nebula_UP.png'
import aright from '../../assets/skybox_test/anger/red_nebula_LF.png'
import adown from '../../assets/skybox_test/anger/red_nebula_DN.png'
import afront from '../../assets/skybox_test/anger/red_nebula_FT.png'
import aback from '../../assets/skybox_test/anger/red_nebula_BK.png'

import lleft from '../../assets/skybox_test/love/pink_nebula_RT.png'
import lup from '../../assets/skybox_test/love/pink_nebula_UP.png'
import lright from '../../assets/skybox_test/love/pink_nebula_LF.png'
import ldown from '../../assets/skybox_test/love/pink_nebula_DN.png'
import lfront from '../../assets/skybox_test/love/pink_nebula_FT.png'
import lback from '../../assets/skybox_test/love/pink_nebula_BK.png'

export default function SbTextures(){

  let anger, sadness, love, joy, empowerment;

  let loader = new THREE.TextureLoader();

  sadness = [
    new THREE.MeshBasicMaterial({map: loader.load(sleft), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(sright), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(sup), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(sdown), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(sfront), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(sback), side: THREE.BackSide}),
  ];

  anger = [
    new THREE.MeshBasicMaterial({map: loader.load(aleft), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(aright), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(aup), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(adown), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(afront), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(aback), side: THREE.BackSide}),
  ];
  love = [
    new THREE.MeshBasicMaterial({map: loader.load(lleft), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(lright), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(lup), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(ldown), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(lfront), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(lback), side: THREE.BackSide}),
  ];

  joy = new THREE.MeshBasicMaterial({color: 'yellow', side: THREE.BackSide});
  empowerment = new THREE.MeshBasicMaterial({color: 'orange', side: THREE.BackSide})

  return {anger, sadness, love, joy, empowerment};
}
