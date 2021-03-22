import * as THREE from 'three';
import IconsTexture from '../other/iconsTexture';
import metadata from '../sceneAssets/data/metadata2.json'
import DatLoader from '../other/datLoader'

export default function Planets(scene, loadingManager) {

    const iconsT = IconsTexture(loadingManager);
    let shaderPoints = new THREE.ShaderMaterial({
        vertexShader: `
        varying vec3 vColor;
        varying float vId;
        varying float vOpacity;

        attribute float a_ti;
        attribute float a_opacity;

        void main() {

            vColor = position;
            vId = a_ti;
            vOpacity = a_opacity;

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

            gl_PointSize = 20. * ( 100.0 / -mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;
        }
        `,
        fragmentShader: `

        uniform sampler2D points[6];
        varying vec3 vColor;
        varying float vId;
        varying float vOpacity;

        void main() {
            vec4 c = vec4(1.0, 1.0, 1.0, vOpacity);
            vec4 tex;

            float id = vId;

            if(id == 0.0){
                tex = texture2D(points[0], gl_PointCoord);
            }else if(id == 1.0){
                tex = texture2D(points[1], gl_PointCoord);
            }else if(id == 2.0){
                tex = texture2D(points[2], gl_PointCoord);
            }else if(id == 3.0){
                tex = texture2D(points[3], gl_PointCoord);
            }else if(id == 4.0){
                tex = texture2D(points[4], gl_PointCoord);
            }else if(id == 5.0){
                tex = texture2D(points[5], gl_PointCoord);
            }

            gl_FragColor = tex * c;
        }
        `,
        uniforms: {
            points: { type: 't', value: iconsT },
            // opacity: { type: 'f', value: 0.5 }
        },
        // blending: THREE.AdditiveBlending,
        // depthTest: false,
        // depthWrite: false,
        // transparent: true,
        // vertexColors: true,
        // glslVersion: THREE.GLSL3,
    })

    console.log(shaderPoints)


    let shaderPoints2 = new THREE.RawShaderMaterial({
        vertexShader:`
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;

        varying vec3 vColor;
        varying float vId;
        varying float vOpacity;

        attribute vec3 position;
        attribute float a_ti;
        attribute float a_opacity;

        void main() {

            vColor = position;
            vId = a_ti;
            vOpacity = a_opacity;

            vec4 mvPosition = viewMatrix * modelMatrix * vec4( position, 1.0 );

            gl_PointSize = 20. * ( 100.0 / -mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;
        }
        `,
        fragmentShader:`
        precision mediump float;

        uniform sampler2D points1;
        uniform sampler2D points2;
        uniform sampler2D points3;
        uniform sampler2D points4;
        uniform sampler2D points5;
        uniform sampler2D points6;

        varying vec3 vColor;
        varying float vId;
        varying float vOpacity;

        void main() {
            vec4 c = vec4(1.0, 1.0, 1.0, vOpacity);
            vec4 tex;

            if(vId == 0.0){
                tex = texture2D(points1, gl_PointCoord);
            }else if(vId == 1.0){
                tex = texture2D(points2, gl_PointCoord);
            }else if(vId == 2.0){
                tex = texture2D(points3, gl_PointCoord);
            }else if(vId == 3.0){
                tex = texture2D(points4, gl_PointCoord);
            }else if(vId == 4.0){
                tex = texture2D(points5, gl_PointCoord);
            }else if(vId == 5.0){
                tex = texture2D(points6, gl_PointCoord);
            }

            gl_FragColor = tex * c;
        }
        `,
        uniforms: {
            points1: {value: iconsT[0] },
            points2: {value: iconsT[1] },
            points3: {value: iconsT[2] },
            points4: {value: iconsT[3] },
            points5: {value: iconsT[4] },
            points6: {value: iconsT[5] },

            // opacity: { type: 'f', value: 0.5 }
        },
        transparent: true,
        // depthTest: false,
        // depthWrite: false,
    })
    // const material = new THREE.LineBasicMaterial({
    //     color: 0xff0000,
    //     linewidth: 10,
    // });

    const material = new THREE.ShaderMaterial({
        vertexShader: `

        void main(){

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
        }
        `,
        fragmentShader: `
        uniform float opacity;

        void main(){

            gl_FragColor = vec4(1., 1., 1., opacity);
        }
        `,
        uniforms:{
            opacity: {type: 'f', value: 0.5}
        },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
    })

    const aux = DatLoader()

    function createCluster(json) {
        let positions = [];
        let index = [];
        let textures = [];
        let opacity = [];
        let points = [];
        let i = 0;
        for (const key in json) {
            if (json.hasOwnProperty(key)) {

                const hrid = json[key]['hr-id'];
                const abbr = json[key]['abbreviation'];

                positions.push(aux.positions[hrid].coords.x)
                positions.push(aux.positions[hrid].coords.y)
                positions.push(aux.positions[hrid].coords.z)

                let help = aux.linesOrder[abbr][i]
                points.push(aux.positions[parseInt(help)].coords)
                i++;

                index.push(json[key].id);
                switch (json[key].artist) {
                    case 'Dron-Z':
                        textures.push(0);
                        break;
                    case 'Ehy-X':
                        textures.push(1);
                        break;
                    case 'Lop-Y':
                        textures.push(2);
                        break;
                    case 'Nord-Z':
                        textures.push(3);
                        break;
                    case 'Pol-Y':
                        textures.push(4);
                        break;
                    case 'Yhe-X':
                        textures.push(5);
                        break;
                    default:
                        console.error('error en:' + json[key].artist)
                }
                opacity.push(0.5);
            }
        }

        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        pointsGeo.setAttribute('index', new THREE.Float32BufferAttribute(index, 1));
        pointsGeo.setAttribute('a_ti', new THREE.Float32BufferAttribute(textures, 1));
        pointsGeo.setAttribute('a_opacity', new THREE.Float32BufferAttribute(opacity, 1));
        const linesGeo = new THREE.BufferGeometry().setFromPoints(points)
        
        return { pointsGeo, linesGeo };
    }

    let angerGeo = createCluster(metadata.anger)
    const angerPoints = new THREE.Points(angerGeo.pointsGeo, shaderPoints2);
    angerPoints.userData = metadata.anger;
    angerPoints.position.z = -4000;
    angerPoints.layers.disableAll();
    const line1 = new THREE.Line(angerGeo.linesGeo, material);
    line1.layers.disableAll();
    angerPoints.add(line1)
    scene.add(angerPoints);

    let sadnessGeo = createCluster(metadata.sadness)
    const sadnessPoints = new THREE.Points(sadnessGeo.pointsGeo, shaderPoints2);
    sadnessPoints.userData = metadata.sadness;
    sadnessPoints.position.z = -4000;
    sadnessPoints.layers.disableAll();
    const line2 = new THREE.Line(sadnessGeo.linesGeo, material);
    line2.layers.disableAll();
    sadnessPoints.add(line2)
    scene.add(sadnessPoints);

    let joyGeo = createCluster(metadata.joy)
    const joyPoints = new THREE.Points(joyGeo.pointsGeo, shaderPoints2);
    joyPoints.userData = metadata.joy;
    joyPoints.position.z = -4000;
    joyPoints.layers.disableAll();
    console.log(joyPoints.geometry)
    const line3 = new THREE.Line(joyGeo.linesGeo, material);
    line3.layers.disableAll();
    joyPoints.add(line3)
    scene.add(joyPoints);

    let loveGeo = createCluster(metadata.love)
    const lovePoints = new THREE.Points(loveGeo.pointsGeo, shaderPoints2);
    lovePoints.userData = metadata.love;
    lovePoints.position.z = -4000;
    lovePoints.layers.disableAll();
    const line4 = new THREE.Line(loveGeo.linesGeo, material);
    line4.layers.disableAll();
    lovePoints.add(line4)
    scene.add(lovePoints);

    let empowermentGeo = createCluster(metadata.empowerment)
    const empowermentPoints = new THREE.Points(empowermentGeo.pointsGeo, shaderPoints2);
    empowermentPoints.userData = metadata.empowerment;
    empowermentPoints.position.z = -4000;
    empowermentPoints.layers.disableAll();
    const line5 = new THREE.Line(empowermentGeo.linesGeo, material);
    line5.layers.disableAll();
    empowermentPoints.add(line5)
    scene.add(empowermentPoints);

    let wonderGeo = createCluster(metadata.wonder)
    const wonderPoints = new THREE.Points(wonderGeo.pointsGeo, shaderPoints2);
    wonderPoints.userData = metadata.wonder;
    wonderPoints.position.z = -4000;
    wonderPoints.layers.disableAll();
    const line6 = new THREE.Line(wonderGeo.linesGeo, material);
    line6.layers.disableAll();
    wonderPoints.add(line6)
    scene.add(wonderPoints);
    
    
    
    const geometry = new THREE.SphereBufferGeometry(100, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
        color: 'red',
        wireframe: true
    })

    const mesh = new THREE.Mesh(geometry, mat)
    mesh.position.set(0, 0, -4000)
    // scene.add(mesh)



    return {
        angerPoints,
        sadnessPoints,
        joyPoints,
        lovePoints,
        empowermentPoints,
        wonderPoints
    }
}