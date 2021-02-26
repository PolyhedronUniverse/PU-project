import * as THREE from 'three'
import dron from '../sceneAssets/artist_icons/star_dron-z_90.png'
import ehy from '../sceneAssets/artist_icons/star_ehy-x_90.png'
import lop from '../sceneAssets/artist_icons/star_lop-y_90.png'
import nord from '../sceneAssets/artist_icons/star_nord-z_90.png'
import pol from '../sceneAssets/artist_icons/star_pol-y_90.png'
import yhe from '../sceneAssets/artist_icons/star_yhe-x_90.png'

export default function IconsTexture(loadingManager){
  let loader = new THREE.TextureLoader(loadingManager);

  let textureDron = loader.load(dron)
  let textureEhy = loader.load(ehy)
  let textureLop = loader.load(lop)
  let textureNord = loader.load(nord)
  let texturePol = loader.load(pol)
  let textureYhe = loader.load(yhe)

  return [textureDron, textureEhy, textureLop, textureNord, texturePol, textureYhe] 
}
