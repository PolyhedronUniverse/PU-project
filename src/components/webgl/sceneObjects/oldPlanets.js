import * as THREE from 'three';
import IconsTexture from '../other/iconsTexture';
import metadata from '../sceneAssets/data/metadata2.json'

export default function OldPlanets(scene, loadingManager) {
    const iconsT = IconsTexture(loadingManager);

    function createCluster(json) {
        const group = new THREE.Group();
        let material = new THREE.SpriteMaterial({ color: 'red' });
        for (const key in json) {

            if (json.hasOwnProperty(key)) {
                switch (json[key].artist) {
                    case 'Lop-Y':
                        material = new THREE.SpriteMaterial({ map: iconsT[2], opacity: 0.5, });
                        break;
                    case 'Pol-Y':
                        material = new THREE.SpriteMaterial({ map: iconsT[4], opacity: 0.5, });
                        break;
                    case 'Ehy-X':
                        material = new THREE.SpriteMaterial({ map: iconsT[1], opacity: 0.5, });
                        break;
                    case 'Yhe-X':
                        material = new THREE.SpriteMaterial({ map: iconsT[5], opacity: 0.5, });
                        break;
                    case 'Nord-Z':
                        material = new THREE.SpriteMaterial({ map: iconsT[3], opacity: 0.5, });
                        break;
                    case 'Dron-Z':
                        material = new THREE.SpriteMaterial({ map: iconsT[0], opacity: 0.5, });
                        break;
                    default: break;
                }
                // const rand = Math.random() * 100 - 50;
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(5, 5)
                sprite.position.set(Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25);
                sprite.userData = json[key];
                group.add(sprite);
            }
        }

        return group
    }


    let angerPoints = createCluster(metadata.anger)
    angerPoints.position.set(0, 0, -4000)
    angerPoints.layers.disableAll();
    angerPoints.userData.enable = function(){
        angerPoints.children.forEach(element => {
            element.layers.enable(0)
        });
    }
    angerPoints.userData.disable = function(){
        angerPoints.children.forEach(element => {
            element.layers.disableAll()
        });
    }
    angerPoints.userData.disable();
    scene.add(angerPoints)

    let sadnessPoints = createCluster(metadata.sadness)
    sadnessPoints.position.set(0, 0, -4000)
    sadnessPoints.layers.disableAll();
    sadnessPoints.userData.enable = function(){
        sadnessPoints.children.forEach(element => {
            element.layers.enable(0)
        });
    }
    sadnessPoints.userData.disable = function(){
        sadnessPoints.children.forEach(element => {
            element.layers.disableAll()
        });
    }
    sadnessPoints.userData.disable();
    scene.add(sadnessPoints)

    let joyPoints = createCluster(metadata.joy)
    joyPoints.position.set(0, 0, -4000)
    joyPoints.layers.disableAll();
    joyPoints.userData.enable = function(){
        joyPoints.children.forEach(element => {
            element.layers.enable(0)
        });
    }
    joyPoints.userData.disable = function(){
        joyPoints.children.forEach(element => {
            element.layers.disableAll()
        });
    }
    joyPoints.userData.disable();
    scene.add(joyPoints)

    let lovePoints = createCluster(metadata.love)
    lovePoints.position.set(0, 0, -4000)
    lovePoints.layers.disableAll();
    lovePoints.userData.enable = function(){
        lovePoints.children.forEach(element => {
            element.layers.enable(0)
        });
    }
    lovePoints.userData.disable = function(){
        lovePoints.children.forEach(element => {
            element.layers.disableAll()
        });
    }
    lovePoints.userData.disable();
    scene.add(lovePoints)

    let empowermentPoints = createCluster(metadata.empowerment)
    empowermentPoints.position.set(0, 0, -4000)
    empowermentPoints.layers.disableAll();
    empowermentPoints.userData.enable = function(){
        empowermentPoints.children.forEach(element => {
            element.layers.enable(0)
        });
    }
    empowermentPoints.userData.disable = function(){
        empowermentPoints.children.forEach(element => {
            element.layers.disableAll()
        });
    }
    empowermentPoints.userData.disable();
    scene.add(empowermentPoints)

    let wonderPoints = createCluster(metadata.wonder)
    wonderPoints.position.set(0, 0, -4000)
    wonderPoints.layers.disableAll();
    wonderPoints.userData.enable = function(){
        wonderPoints.children.forEach(element => {
            element.layers.enable(0)
        });
    }
    wonderPoints.userData.disable = function(){
        wonderPoints.children.forEach(element => {
            element.layers.disableAll()
        });
    }
    wonderPoints.userData.disable();
    scene.add(wonderPoints)

    return {
        angerPoints,
        sadnessPoints,
        joyPoints,
        lovePoints,
        empowermentPoints,
        wonderPoints
    }
}