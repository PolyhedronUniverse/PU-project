import * as THREE from 'three'
import dron from '../sceneAssets/artist_icons/star_dron-z_90.png'
import ehy from '../sceneAssets/artist_icons/star_ehy-x_90.png'
import lop from '../sceneAssets/artist_icons/star_lop-y_90.png'
import nord from '../sceneAssets/artist_icons/star_nord-z_90.png'
import pol from '../sceneAssets/artist_icons/star_pol-y_90.png'
import yhe from '../sceneAssets/artist_icons/star_yhe-x_90.png'

export default function IconsTexture(loadingManager){
  let loader = new THREE.TextureLoader(loadingManager);

  let textureDron = loader.load(dron) //0
  let textureEhy = loader.load(ehy) //1
  let textureLop = loader.load(lop) //2
  let textureNord = loader.load(nord) //3
  let texturePol = loader.load(pol) //4
  let textureYhe = loader.load(yhe) //5

  return [textureDron, textureEhy, textureLop, textureNord, texturePol, textureYhe] 
}
