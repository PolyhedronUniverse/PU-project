import * as THREE from 'three'
import nube from '../assets/smoke.png'
import { Color } from 'three';

export default function Nebulosa(scene,renderer,update){
    let ambient = new THREE.AmbientLight(0x555555);
    let loader = new THREE.TextureLoader();
    let cloudParticles = [];
    let paletteSize = 30;
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xffffff,1);
    directionalLight.position.set(1,0,1);
    scene.add(directionalLight);

    function lerp(a,b,fac){
        var ret=[];
        for(let i = 0; i < Math.min(a.length, b.length); i++) {
            ret[i] = a[i] * (1 - fac) + b[i] * fac;
        }
        return new Color().setRGB(ret[0], ret[1], ret[2]).toString();
    }

    function lerpColors(begin, end, n) {
        var ret = [];
        for(var i = 0; i < n; i++) {
            var fac = i / (n - 1);
            ret.push(lerp(begin.toString(), end.toString(), fac));
        }
        return ret;
    }
    let palette = lerpColors(new Color('#001172'),new Color('#0026FF'),paletteSize);
    // let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
    // orangeLight.position.set(200,300,100);
    // scene.add(orangeLight);
    // let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
    // redLight.position.set(100,300,100);
    // scene.add(redLight);
    // let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
    // blueLight.position.set(300,300,200);
    // scene.add(blueLight);
    console.log("paleta de colores: ",palette);
    let BLight1 = new THREE.PointLight(0x154360,50,450,1.7);
    BLight1.position.set(200,300,100);
    scene.add(BLight1);
    let BLight2 = new THREE.PointLight(0x0F1DAC,200,450,1.7);
    BLight2.position.set(100,300,100);
    scene.add(BLight2);
    let BLight3 = new THREE.PointLight(0x3F51B5,50,450,1.7);
    BLight3.position.set(200,200,200);
    scene.add(BLight3);
    let BLight4 = new THREE.PointLight(0x000964,200,450,1.7);
    BLight4.position.set(0,300,200);
    scene.add(BLight4);
    let BLight5 = new THREE.PointLight(0x000964,50,450,1.7);
    BLight5.position.set(100,0,200);
    scene.add(BLight5);
    let BLight6 = new THREE.PointLight(0x0F1DAC,200,450,1.7);
    BLight6.position.set(500,0,100);
    scene.add(BLight6);
    let BLight7 = new THREE.PointLight(0x000964,50,450,1.7);
    BLight7.position.set(-100,100,0);
    scene.add(BLight7);
    
    renderer.setClearColor(scene.fog.color);
    console.log("1prooooooo1: ",loader);
    loader.load(nube,function(texture){
        let cloudGeo = new THREE.PlaneBufferGeometry(200,200);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map:texture,
            transparent: true,
            alphaTest: 0.05
        });

        

        for (let p = 0; p < 100; p++) {
            let cloud = new  THREE.Mesh(cloudGeo,cloudMaterial);
            cloud.position.set(
                Math.random()*800 - 400,
                400,
                Math.random()*500 - 500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*2*Math.PI;
            cloud.material.opacity = 0.4;
            //console.log("Este es la nube: ",cloud);
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    },undefined
    ,function(err){
        console.log("Error inesperado: ", err);
    });
    this.update = function(){
        cloudParticles.forEach(p =>{
            p.rotation.z -=0.001;
        })
    }
}

