import {/*TextureLoader, MeshBasicMaterial, BackSide,*/ CubeTextureLoader} from 'three';

// import wleft from '../sceneAssets/skyboxTextures/wonder/green_nebula_skybox_RT.png'
// import wup from '../sceneAssets/skyboxTextures/wonder/green_nebula_skybox_UP.png'
// import wright from '../sceneAssets/skyboxTextures/wonder/green_nebula_skybox_LF.png'
// import wdown from '../sceneAssets/skyboxTextures/wonder/green_nebula_skybox_DN.png'
// import wfront from '../sceneAssets/skyboxTextures/wonder/green_nebula_skybox_FT.png'
// import wback from '../sceneAssets/skyboxTextures/wonder/green_nebula_skybox_BK.png'

// import sleft from '../sceneAssets/skyboxTextures/sadness/blue_nebula_RT.png'
// import sup from '../sceneAssets/skyboxTextures/sadness/blue_nebula_UP.png'
// import sright from '../sceneAssets/skyboxTextures/sadness/blue_nebula_LF.png'
// import sdown from '../sceneAssets/skyboxTextures/sadness/blue_nebula_DN.png'
// import sfront from '../sceneAssets/skyboxTextures/sadness/blue_nebula_FT.png'
// import sback from '../sceneAssets/skyboxTextures/sadness/blue_nebula_BK.png'

// import aleft from '../sceneAssets/skyboxTextures/anger/red_nebula_RT.png'
// import aup from '../sceneAssets/skyboxTextures/anger/red_nebula_UP.png'
// import aright from '../sceneAssets/skyboxTextures/anger/red_nebula_LF.png'
// import adown from '../sceneAssets/skyboxTextures/anger/red_nebula_DN.png'
// import afront from '../sceneAssets/skyboxTextures/anger/red_nebula_FT.png'
// import aback from '../sceneAssets/skyboxTextures/anger/red_nebula_BK.png'

// import lleft from '../sceneAssets/skyboxTextures/love/pink_nebula_RT.png'
// import lup from '../sceneAssets/skyboxTextures/love/pink_nebula_UP.png'
// import lright from '../sceneAssets/skyboxTextures/love/pink_nebula_LF.png'
// import ldown from '../sceneAssets/skyboxTextures/love/pink_nebula_DN.png'
// import lfront from '../sceneAssets/skyboxTextures/love/pink_nebula_FT.png'
// import lback from '../sceneAssets/skyboxTextures/love/pink_nebula_BK.png'

// import jleft from '../sceneAssets/skyboxTextures/joy/yellow_nebula_RT.png'
// import jup from '../sceneAssets/skyboxTextures/joy/yellow_nebula_UP.png'
// import jright from '../sceneAssets/skyboxTextures/joy/yellow_nebula_LF.png'
// import jdown from '../sceneAssets/skyboxTextures/joy/yellow_nebula_DN.png'
// import jfront from '../sceneAssets/skyboxTextures/joy/yellow_nebula_FT.png'
// import jback from '../sceneAssets/skyboxTextures/joy/yellow_nebula_BK.png'

// import eleft from '../sceneAssets/skyboxTextures/empowerment/orange_nebula_RT.png'
// import eup from '../sceneAssets/skyboxTextures/empowerment/orange_nebula_UP.png'
// import eright from '../sceneAssets/skyboxTextures/empowerment/orange_nebula_LF.png'
// import edown from '../sceneAssets/skyboxTextures/empowerment/orange_nebula_DN.png'
// import efront from '../sceneAssets/skyboxTextures/empowerment/orange_nebula_FT.png'
// import eback from '../sceneAssets/skyboxTextures/empowerment/orange_nebula_BK.png'

// import posx from '../sceneAssets/skyboxTextures/main_skybox/main_skybox_RT.png'
// import posy from '../sceneAssets/skyboxTextures/main_skybox/main_skybox_UP.png'
// import negx from '../sceneAssets/skyboxTextures/main_skybox/main_skybox_LF.png'
// import negy from '../sceneAssets/skyboxTextures/main_skybox/main_skybox_DN.png'
// import posz from '../sceneAssets/skyboxTextures/main_skybox/main_skybox_FT.png'
// import negz from '../sceneAssets/skyboxTextures/main_skybox/main_skybox_BK.png'


import posx from '../sceneAssets/comp/tinifiedMain/main_skybox_RT.png'
import posy from '../sceneAssets/comp/tinifiedMain/main_skybox_UP.png'
import negx from '../sceneAssets/comp/tinifiedMain/main_skybox_LF.png'
import negy from '../sceneAssets/comp/tinifiedMain/main_skybox_DN.png'
import posz from '../sceneAssets/comp/tinifiedMain/main_skybox_FT.png'
import negz from '../sceneAssets/comp/tinifiedMain/main_skybox_BK.png'

import wleft from '../sceneAssets/comp/tinifiedWonder/green_nebula_skybox_RT.png'
import wup from '../sceneAssets/comp/tinifiedWonder/green_nebula_skybox_UP.png'
import wright from '../sceneAssets/comp/tinifiedWonder/green_nebula_skybox_LF.png'
import wdown from '../sceneAssets/comp/tinifiedWonder/green_nebula_skybox_DN.png'
import wfront from '../sceneAssets/comp/tinifiedWonder/green_nebula_skybox_FT.png'
import wback from '../sceneAssets/comp/tinifiedWonder/green_nebula_skybox_BK.png'

import sleft from '../sceneAssets/comp/tinifiedSadness/blue_nebula_RT.png'
import sup from '../sceneAssets/comp/tinifiedSadness/blue_nebula_UP.png'
import sright from '../sceneAssets/comp/tinifiedSadness/blue_nebula_LF.png'
import sdown from '../sceneAssets/comp/tinifiedSadness/blue_nebula_DN.png'
import sfront from '../sceneAssets/comp/tinifiedSadness/blue_nebula_FT.png'
import sback from '../sceneAssets/comp/tinifiedSadness/blue_nebula_BK.png'

import aleft from '../sceneAssets/comp/tinifiedAnger/red_nebula_RT.png'
import aup from '../sceneAssets/comp/tinifiedAnger/red_nebula_UP.png'
import aright from '../sceneAssets/comp/tinifiedAnger/red_nebula_LF.png'
import adown from '../sceneAssets/comp/tinifiedAnger/red_nebula_DN.png'
import afront from '../sceneAssets/comp/tinifiedAnger/red_nebula_FT.png'
import aback from '../sceneAssets/comp/tinifiedAnger/red_nebula_BK.png'

import lleft from '../sceneAssets/comp/tinifiedLove/pink_nebula_RT.png'
import lup from '../sceneAssets/comp/tinifiedLove/pink_nebula_UP.png'
import lright from '../sceneAssets/comp/tinifiedLove/pink_nebula_LF.png'
import ldown from '../sceneAssets/comp/tinifiedLove/pink_nebula_DN.png'
import lfront from '../sceneAssets/comp/tinifiedLove/pink_nebula_FT.png'
import lback from '../sceneAssets/comp/tinifiedLove/pink_nebula_BK.png'

import jleft from '../sceneAssets/comp/tinifiedJoy/yellow_nebula_RT.png'
import jup from '../sceneAssets/comp/tinifiedJoy/yellow_nebula_UP.png'
import jright from '../sceneAssets/comp/tinifiedJoy/yellow_nebula_LF.png'
import jdown from '../sceneAssets/comp/tinifiedJoy/yellow_nebula_DN.png'
import jfront from '../sceneAssets/comp/tinifiedJoy/yellow_nebula_FT.png'
import jback from '../sceneAssets/comp/tinifiedJoy/yellow_nebula_BK.png'

import eleft from '../sceneAssets/comp/tinifiedEmpowerment/orange_nebula_RT.png'
import eup from '../sceneAssets/comp/tinifiedEmpowerment/orange_nebula_UP.png'
import eright from '../sceneAssets/comp/tinifiedEmpowerment/orange_nebula_LF.png'
import edown from '../sceneAssets/comp/tinifiedEmpowerment/orange_nebula_DN.png'
import efront from '../sceneAssets/comp/tinifiedEmpowerment/orange_nebula_FT.png'
import eback from '../sceneAssets/comp/tinifiedEmpowerment/orange_nebula_BK.png'


export default function NebulasTextures(loadingManager){
  const loader = new CubeTextureLoader(loadingManager);
  const mainTexture = loader.load([posx,negx,posy,negy,posz,negz])
  const wonderTexture = loader.load([wleft, wright, wup, wdown, wfront, wback])
  const sadnessTexture = loader.load([sleft, sright, sup, sdown, sfront, sback])
  const angerTexture = loader.load([aleft, aright, aup, adown, afront, aback]);
  const loveTexture = loader.load([lleft, lright, lup, ldown, lfront, lback])
  const joyTexture = loader.load([jleft, jright, jup, jdown, jfront, jback])
  const empowermentTexture = loader.load([eleft, eright, eup, edown, efront, eback])

  // const test = loader.load([coronafront, coronaback, coronaup, coronadown, coronaright, coronaleft])
  return{mainTexture,wonderTexture,sadnessTexture,angerTexture,loveTexture,joyTexture,empowermentTexture}
}
