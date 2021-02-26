// todo: reimplementation of stars?
import * as THREE from 'three';
import spark from '../sceneAssets/textures/spark1.png'

export default function Stars(scene, loadingManager) {
    let color = new THREE.Color();
    
    function createGeometry(amount, size, h, s, l) {
        
        let geometry = new THREE.BufferGeometry();
        let colors = [];
        let vertices = [];
        let sizes = [];
        let index = [];
        // let cont=0;

        for (var i = 0; i < amount; i++) {
            const r = 1000
            const theta = 2 * Math.PI * Math.random()
            const phi = Math.acos(2 * Math.random() - 1)
            const x = r * Math.cos(theta) * Math.sin(phi) + (-50 + Math.random() * 100)
            const y = r * Math.sin(theta) * Math.sin(phi) + (-50 + Math.random() * 100)
            const z = r * Math.cos(phi) + (-25 + Math.random() * 50)

            vertices.push(x)
            vertices.push(y)
            vertices.push(-Math.abs(z))

            color.setHSL(h / 360, s, l);
            colors.push(color.r, color.g, color.b);
            sizes.push(size);
            index.push(i);
        }

        // console.log(cont)

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
        geometry.setAttribute('index', new THREE.Float32BufferAttribute(index, 1));
        
        // return geometry;

        return geometry;
    }

    const texture = new THREE.TextureLoader(loadingManager).load(spark);

    const yellow = createGeometry(2048, 1, 48, 1, 0.5)
    const white = createGeometry(1024, 1, 48, 1, 1.0)
    
    const vs = `
    attribute float size;
    attribute float index;

    varying vec3 vColor;
    uniform float time;
    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;

        float period = 5. * (1. + sin( 0.1 * index + time)) + 12.5;
        float pSize = size * (300.0 / -mvPosition.z );

        gl_PointSize = period * pSize;
    }`;

    const fs = `
    uniform sampler2D pointTexture;
    varying vec3 vColor;

    void main() {
        // gl_FragColor = vec4( vColor, 1.0 );
        gl_FragColor = vec4( vColor, 1.0 ) * texture2D( pointTexture, gl_PointCoord );
    }`;

    let shaderMa = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        uniforms:{
            pointTexture: { type: 't', value: texture},
            time: { type: 'f', value: 0.0}
        },
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
    })

    let pointsY = new THREE.Points(yellow, shaderMa)
    let pointsW = new THREE.Points(white, shaderMa)

    scene.add(pointsY)
    scene.add(pointsW)


    let update = function(){
        pointsY.material.uniforms.time.value += 0.01;
        pointsW.material.uniforms.time.value += 0.01;
    }
    return {update}
}