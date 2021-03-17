import * as THREE from 'three';
import MyStats from '../../other/stats';


export default function Birds() {
    let LOADED = false; //* Constant that'll change when the scene's assets are fully loaded and will allow the updating of it.
    const width = window.innerWidth; //* Variable for the window width for later calculations.
    const height = window.innerHeight; // * Variable for the window height minus the height of the header and footer. Also for later calculations.  
    const ratio = 1000; //* Ratio for computation of bigger numbers.
    let query;
    const stats = new MyStats()

    //* 1. SCENE 
    function buildScene(texture) {
        /** 
         * * This function will generate the scene setting the 
         * * background and other configurations and return it 
         * * for storing and later usage.
         */

        /** 
         *  todo: ?
         */

        const scene = new THREE.Scene();
        scene.name = "MainScene";
        scene.background = texture;
        return scene;
    }

    //* 2. RENDERER 
    function buildRender() {
        /**
         * * This function will ganerate the renderer of the scene,
         * * it also is for the setting of the renderer size and 
         * * others attributes. It will return the Renderer for 
         * * later usage.
         */

        /**
         * todo: ?
         */

        const renderer = new THREE.WebGLRenderer({});
        renderer.setPixelRatio(1);
        renderer.setSize(width, height);
        return renderer;
    }

    //* 3. CAMERA 
    function buildCamera(scene) {
        /**
         * * This function will ganerate the camera of the scene,
         * * it also is for the setting of the initial position,
         * * and attributes of it. It will recive a SCENE variable
         * * to attach the camera and then return it for later usage.
         */

        /**
         * todo: 
        */

        const fieldOfView = 50;
        const aspectRatio = width / (height);
        const nearPlane = 0.1;
        const farPlane = ratio * 1.9;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.name = "MainCamera"
        camera.position.z = 350;
        // camera.focus = 1000;
        scene.add(camera)

        return camera;
    }

    //* 4. Orbit Controls 
    function myOrbitControls(camera, renderer) {
        /**
         * * This function will ganerate the OrbitControls and set the
         * * needed configuration. It should recive the main camera
         * * and the canvas element.
         */

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, -4000)
        controls.maxDistance = 200;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.zoomSpeed = 0.5;
        controls.saveState();
        controls.update()
        const type = 'orbit'
        return { controls, type };
    }


    let control;
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = function () {
        console.log('Loading complete!');
        LOADED = true;
        const butt = document.getElementById('splash-button')
        // butt.disabled = false;
        // todo: check the disabling thing
        butt.className += ' enter-button'
        butt.textContent = 'Enter'
        document.getElementById('canvas-area').style.display = '';
        document.getElementById('header').style.visibility = 'visible';
        document.getElementById('footer').style.visibility = 'visible';
    };

    const scene = buildScene(nebulas.mainTexture); // * Call the scene builder and store it in scene.
    const renderer = buildRender(); // * Call the renderer builder and store it.
    const camera = buildCamera(scene); // * Call the camera builder and pass the scene variable.

    //* 2. onWindowResize
    function onResize() {
        /**
         * * This function will be called when window of the
         * * browser changes of size
         */

        camera.aspect = window.innerWidth / (window.innerHeight);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    



    update();

    function update() {
        requestAnimationFrame(update)

        renderer.render(scene, camera);
    }

    let name = 'Main Scene' + window.devicePixelRatio;

    return (
        {
            renderer,
            onResize,
            name
        }
    )
}