import * as THREE from 'three';
import IconsTexture from '../other/iconsTexture';
// import metadata from '../sceneAssets/data/metadata.json'
import metadata from '../sceneAssets/data/metadata2.json'

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

            gl_PointSize = 25. * ( 300.0 / -mvPosition.z );

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

            vec4 c = vec4(1.,1.,1.,vOpacity);

            if (texIdx == 0) {
                gl_FragColor = texture2D(pointTexture[0], gl_PointCoord ) * c;
            } else if(texIdx == 1) {
                gl_FragColor = texture2D(pointTexture[1], gl_PointCoord ) * c;
            } else if(texIdx == 2) {
                gl_FragColor = texture2D(pointTexture[2], gl_PointCoord ) * c;
            } else if(texIdx == 3) {
                gl_FragColor = texture2D(pointTexture[3], gl_PointCoord ) * c;
            } else if(texIdx == 4) {
                gl_FragColor = texture2D(pointTexture[4], gl_PointCoord ) * c;
            } else if(texIdx == 5) {
                gl_FragColor = texture2D(pointTexture[5], gl_PointCoord ) * c;
            }

            // * vec4(1., ., 0., opacity)
        }
        `,
        uniforms: {
            pointTexture: { type: 't', value: iconsT },
            // opacity: { type: 'f', value: 0.5 }
        },
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
    })



    function createCluster(json){

        let positions = [];
        let index = [];
        let textures = [];
        let opacity = [];

        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                // console.log(json[key].id);
                // positions.push(element.x * Math.random() - element.x, element.y * Math.random(), element.z * Math.random());
                positions.push(100 * Math.random() - 50, 100 * Math.random() - 50, 100 * Math.random() - 50);
                index.push(json[key].id);
                switch(json[key].artist){
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

        

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('index', new THREE.Float32BufferAttribute(index, 1));
        geometry.setAttribute('a_ti', new THREE.Float32BufferAttribute(textures, 1));
        geometry.setAttribute('a_opacity', new THREE.Float32BufferAttribute(opacity, 1));

        return geometry;
    }

    let angerGeo = createCluster(metadata.anger)
    const angerPoints = new THREE.Points(angerGeo, shaderPoints);
    angerPoints.userData = metadata.anger;
    angerPoints.position.z = -4000;
    angerPoints.layers.disableAll();
    scene.add(angerPoints);

    let sadnessGeo = createCluster(metadata.sadness)
    const sadnessPoints = new THREE.Points(sadnessGeo, shaderPoints);
    sadnessPoints.userData = metadata.sadness;
    sadnessPoints.position.z = -4000;
    sadnessPoints.layers.disableAll();
    scene.add(sadnessPoints);
    
    let joyGeo = createCluster(metadata.joy)
    const joyPoints = new THREE.Points(joyGeo, shaderPoints);
    joyPoints.userData = metadata.joy;
    joyPoints.position.z = -4000;
    joyPoints.layers.disableAll();
    scene.add(joyPoints);

    let loveGeo = createCluster(metadata.love)
    const lovePoints = new THREE.Points(loveGeo, shaderPoints);
    lovePoints.userData = metadata.love;
    lovePoints.position.z = -4000;
    lovePoints.layers.disableAll();
    scene.add(lovePoints);

    let empowermentGeo = createCluster(metadata.empowerment)
    const empowermentPoints = new THREE.Points(empowermentGeo, shaderPoints);
    empowermentPoints.userData = metadata.empowerment;
    empowermentPoints.position.z = -4000;
    empowermentPoints.layers.disableAll();
    scene.add(empowermentPoints);

    let wonderGeo = createCluster(metadata.wonder)
    const wonderPoints = new THREE.Points(wonderGeo, shaderPoints);
    wonderPoints.userData = metadata.wonder;
    wonderPoints.position.z = -4000;
    wonderPoints.layers.disableAll();
    scene.add(wonderPoints);

    // const geometry = new THREE.SphereBufferGeometry(10, 10, 10);
    // const mat = new THREE.MeshBasicMaterial({
    //     color: 'red'
    // })

    // const mesh = new THREE.Mesh(geometry, mat)
    // mesh.position.set(0, 0, -4000)
    // scene.add(mesh)

    let update = function () {

    }

    return { 
        update, 
        angerPoints, 
        sadnessPoints, 
        joyPoints, 
        lovePoints, 
        empowermentPoints, 
        wonderPoints 
    }
}