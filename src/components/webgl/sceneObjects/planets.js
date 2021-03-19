import * as THREE from 'three';
import IconsTexture from '../other/iconsTexture';
// import metadata from '../sceneAssets/data/metadata.json'
import metadata from '../sceneAssets/data/metadata2.json'
import DatLoader from '../other/datLoader'
// import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
// import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

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
            // vId = 0.;
            // vColor = color;
            vOpacity = a_opacity;

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

            gl_PointSize = 20. * ( 100.0 / -mvPosition.z );
            // gl_PointSize = 10.;

            gl_Position = projectionMatrix * mvPosition;

        }
        `,
        fragmentShader: `
        precision highp float;

        uniform sampler2D pointTexture[6];
        varying vec3 vColor;
        varying float vId;
        varying float vOpacity;

        void main() {
            int texIdx = int(vId);

            vec4 c = vec4(1.0, 1.0, 1.0, vOpacity);
            vec4 tex;

            if(texIdx == 0){
                tex = texture2D(pointTexture[0], gl_PointCoord);
            }else if(texIdx == 1){
                tex = texture2D(pointTexture[1], gl_PointCoord);
            }else if(texIdx == 2){
                tex = texture2D(pointTexture[2], gl_PointCoord);
            }else if(texIdx == 3){
                tex = texture2D(pointTexture[3], gl_PointCoord);
            }else if(texIdx == 4){
                tex = texture2D(pointTexture[4], gl_PointCoord);
            }else if(texIdx == 5){
                tex = texture2D(pointTexture[5], gl_PointCoord);
            }

            gl_FragColor = tex * c;

        }
        `,
        uniforms: {
            pointTexture: { type: 't', value: iconsT },
            // opacity: { type: 'f', value: 0.5 }
        },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
        // glslVersion: THREE.GLSL3,
    })

    // console.log(shaderPoints)

    // const material = new THREE.LineBasicMaterial({
    //     color: 0xff0000,
    //     linewidth: 10,
    // });

    const material = new THREE.ShaderMaterial({
        vertexShader: `
        varying float vUv;

        void main(){

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_PointSize = 6.0;
            gl_Position = projectionMatrix * mvPosition;
        }
        `,
        fragmentShader: `
        varying vec2 vUv;

        void main(){

            gl_FragColor = vec4(1., 1., 1., 0.5);
        }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
    })

    const aux = DatLoader()
    // console.log(aux)
    function createCluster(json) {
        // console.log(json)
        let positions = [];
        let index = [];
        let textures = [];
        let opacity = [];
        let points = [];
        // let uvs = [];
        let i = 0;
        for (const key in json) {
            if (json.hasOwnProperty(key)) {

                // const r = 100
                // const theta = 2 * Math.PI * Math.random()
                // const phi = Math.acos(2 * Math.random() - 1)
                // const x = r * Math.sin(theta) * Math.cos(phi)
                // const y = r * Math.sin(theta) * Math.sin(phi)
                // const z = r * Math.cos(theta)

                const hrid = json[key]['hr-id'];
                const abbr = json[key]['abbreviation'];

                positions.push(aux.positions[hrid].coords.x)
                positions.push(aux.positions[hrid].coords.y)
                positions.push(aux.positions[hrid].coords.z)

                points.push(aux.positions[aux.linesOrder[abbr][i]].coords)
                // if((i+1)%2 == 0)
                // uvs.push(0.5)
                // else
                // uvs.push(-0.5)
            
                i++;

                // if (key > 3) {
                //     positions.push(aux.positions[hrid].coords.x)
                //     positions.push(aux.positions[hrid].coords.y)
                //     positions.push(aux.positions[hrid].coords.z)

                //     // console.log(aux.positions[aux.linesOrder[abbr][i]])
                //     points.push(aux.positions[aux.linesOrder[abbr][i]].coords)
                //     i++;
                //     // positions.push(x, y, z);
                //     // points.push(new THREE.Vector3(x, y, z));
                // }
                // else {
                //     // console.log(aux.pos.slice(3*(key-1),3*(key)))
                //     // console.log(aux.positions[hrid].coords)

                //     // console.log(3 * (key - 1))
                //     // console.log(key * 3 - 2)
                //     // console.log(key * 3 - 1)
                //     // console.log(aux.pos)
                //     positions.push(aux.pos[3 * (key - 1)], aux.pos[3 * key - 2], aux.pos[3 * key - 1])
                //     points.push(new THREE.Vector3(aux.pos[3 * (key - 1)], aux.pos[3 * key - 2], aux.pos[3 * key - 1]));
                // }


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

        // console.log(textures)

        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        pointsGeo.setAttribute('index', new THREE.Float32BufferAttribute(index, 1));
        pointsGeo.setAttribute('a_ti', new THREE.Float32BufferAttribute(textures, 1));
        // pointsGeo.setAttribute('a_ti', new THREE.Uint32BufferAttribute(textures,1));
        pointsGeo.setAttribute('a_opacity', new THREE.Float32BufferAttribute(opacity, 1));
        const linesGeo = new THREE.BufferGeometry().setFromPoints(points)
        // linesGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 1))
        console.log(linesGeo.attributes)
        return { pointsGeo, linesGeo };
    }

    let angerGeo = createCluster(metadata.anger)
    const angerPoints = new THREE.Points(angerGeo.pointsGeo, shaderPoints);
    angerPoints.userData = metadata.anger;
    angerPoints.position.z = -4000;
    angerPoints.layers.disableAll();
    const line1 = new THREE.Line(angerGeo.linesGeo, material);
    // console.log(material)
    line1.position.z = -4000
    scene.add(line1)
    scene.add(angerPoints);

    let sadnessGeo = createCluster(metadata.sadness)
    const sadnessPoints = new THREE.Points(sadnessGeo.pointsGeo, shaderPoints);
    sadnessPoints.userData = metadata.sadness;
    sadnessPoints.position.z = -4000;
    sadnessPoints.layers.disableAll();
    const line2 = new THREE.Line(sadnessGeo.linesGeo, material);
    line2.position.z = -4000
    scene.add(line2)
    scene.add(sadnessPoints);

    let joyGeo = createCluster(metadata.joy)
    const joyPoints = new THREE.Points(joyGeo.pointsGeo, shaderPoints);
    joyPoints.userData = metadata.joy;
    joyPoints.position.z = -4000;
    joyPoints.layers.disableAll();
    const line3 = new THREE.Line(joyGeo.linesGeo, material);
    line3.position.z = -4000
    scene.add(line3)
    scene.add(joyPoints);

    let loveGeo = createCluster(metadata.love)
    const lovePoints = new THREE.Points(loveGeo.pointsGeo, shaderPoints);
    lovePoints.userData = metadata.love;
    lovePoints.position.z = -4000;
    lovePoints.layers.disableAll();
    const line4 = new THREE.Line(loveGeo.linesGeo, material);
    line4.position.z = -4000
    scene.add(line4)
    scene.add(lovePoints);

    let empowermentGeo = createCluster(metadata.empowerment)
    const empowermentPoints = new THREE.Points(empowermentGeo.pointsGeo, shaderPoints);
    empowermentPoints.userData = metadata.empowerment;
    empowermentPoints.position.z = -4000;
    empowermentPoints.layers.disableAll();
    const line5 = new THREE.Line(empowermentGeo.linesGeo, material);
    line5.position.z = -4000
    scene.add(line5)
    scene.add(empowermentPoints);

    let wonderGeo = createCluster(metadata.wonder)
    const wonderPoints = new THREE.Points(wonderGeo.pointsGeo, shaderPoints);
    wonderPoints.userData = metadata.wonder;
    wonderPoints.position.z = -4000;
    wonderPoints.layers.disableAll();
    const line6 = new THREE.Line(wonderGeo.linesGeo, material);
    line6.position.z = -4000
    scene.add(line6)
    scene.add(wonderPoints);

    // const geometry = new THREE.SphereBufferGeometry(10, 10, 10);
    // const mat = new THREE.MeshBasicMaterial({
    //     color: 'red'
    // })

    // const mesh = new THREE.Mesh(geometry, mat)
    // mesh.position.set(0, 0, -4000)
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