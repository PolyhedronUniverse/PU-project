import * as THREE from 'three';

import wleft from '../../assets/skybox_test/wonder/green_nebula_skybox_RT.png'
import wup from '../../assets/skybox_test/wonder/green_nebula_skybox_UP.png'
import wright from '../../assets/skybox_test/wonder/green_nebula_skybox_LF.png'
import wdown from '../../assets/skybox_test/wonder/green_nebula_skybox_DN.png'
import wfront from '../../assets/skybox_test/wonder/green_nebula_skybox_FT.png'
import wback from '../../assets/skybox_test/wonder/green_nebula_skybox_BK.png'

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

import jleft from '../../assets/skybox_test/joy/yellow_nebula_RT.png'
import jup from '../../assets/skybox_test/joy/yellow_nebula_UP.png'
import jright from '../../assets/skybox_test/joy/yellow_nebula_LF.png'
import jdown from '../../assets/skybox_test/joy/yellow_nebula_DN.png'
import jfront from '../../assets/skybox_test/joy/yellow_nebula_FT.png'
import jback from '../../assets/skybox_test/joy/yellow_nebula_BK.png'

import eleft from '../../assets/skybox_test/empowerment/orange_nebula_RT.png'
import eup from '../../assets/skybox_test/empowerment/orange_nebula_UP.png'
import eright from '../../assets/skybox_test/empowerment/orange_nebula_LF.png'
import edown from '../../assets/skybox_test/empowerment/orange_nebula_DN.png'
import efront from '../../assets/skybox_test/empowerment/orange_nebula_FT.png'
import eback from '../../assets/skybox_test/empowerment/orange_nebula_BK.png'

export default function SbTextures(loadingManager){

  let anger, sadness, love, joy, empowerment, wonder;

  let loader = new THREE.TextureLoader(loadingManager);

  wonder = [
    new THREE.MeshBasicMaterial({map: loader.load(wleft), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(wright), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(wup), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(wdown), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(wfront), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(wback), side: THREE.BackSide}),
  ]

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

  joy = [
    new THREE.MeshBasicMaterial({map: loader.load(jleft), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(jright), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(jup), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(jdown), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(jfront), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(jback), side: THREE.BackSide}),
  ];

  empowerment = [
    new THREE.MeshBasicMaterial({map: loader.load(eleft), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(eright), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(eup), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(edown), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(efront), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: loader.load(eback), side: THREE.BackSide}),
  ];

  console.log("texturesTest");

  return {anger, sadness, love, joy, empowerment, wonder};
}
