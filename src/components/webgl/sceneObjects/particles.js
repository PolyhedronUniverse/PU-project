import * as THREE from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
import main from '../sceneAssets/audios/pu-home.ogg'

export default function Particles(scene, renderer, camera) {

	const shaderPosition = `
  	uniform float time;
	uniform float delta;

	void main()	{
		vec2 uv = gl_FragCoord.xy / resolution.xy;
		vec4 tmpPos = texture2D( texturePosition, uv );
		vec3 position = tmpPos.xyz;
		vec3 velocity = texture2D( textureVelocity, uv ).xyz;

		float phase = tmpPos.w;

		phase = mod( ( phase + delta + length( velocity.xz ) * delta * 3. + max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

		// gl_FragColor = vec4( position, phase );
		gl_FragColor = vec4( position + velocity * delta * 15. , phase );
	}`;

	const shaderVelocity = `
	uniform float time;
	uniform float testing;
	uniform float delta; // about 0.016
	uniform float separationDistance; // 20
	uniform float alignmentDistance; // 40
	uniform float cohesionDistance; //
	uniform float freedomFactor;
	uniform vec3 target;
	uniform vec3 predator;
	uniform float distortion;

	const float width = resolution.x;
	const float height = resolution.y;

	const float PI = 3.141592653589793;
	const float PI_2 = PI * 2.0;
	// const float VISION = PI * 0.55;

	float zoneRadius = 40.0;
	float zoneRadiusSquared = 1600.0;

	float separationThresh = 0.05;
	float alignmentThresh = 0.65;

	const float UPPER_BOUNDS = BOUNDS;
	const float LOWER_BOUNDS = -UPPER_BOUNDS;

	const float SPEED_LIMIT = 9.0;

	float rand( vec2 co ){
		return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
	}

	void main() {

		zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
		separationThresh = separationDistance / zoneRadius;
		alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
		zoneRadiusSquared = zoneRadius * zoneRadius;

		vec2 uv = gl_FragCoord.xy / resolution.xy;
		vec3 birdPosition, birdVelocity;

		vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
		vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

		float dist;
		vec3 dir; // direction
		float distSquared;

		float separationSquared = separationDistance * separationDistance;
		float cohesionSquared = cohesionDistance * cohesionDistance;

		float f;
		float percent;

		vec3 velocity = selfVelocity;
		float limit = SPEED_LIMIT;

		// dir = target * UPPER_BOUNDS - selfPosition;
		dir = selfPosition - target;
		dist = length(dir);
		distSquared = dist * dist;

		// if(distortion > 50.)
		if( dist < distortion ){
			f = ( distSquared / (distortion*10.+1.) - 1.0 ) * delta * 100.;
			velocity += normalize( dir ) * f;
			limit += 5.0;
		}

		dir.y *= 2.5;
		velocity -= normalize(dir) * delta * 5.;

		for ( float y = 0.0; y < height; y++ ) {
			for ( float x = 0.0; x < width; x++ ) {

				vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
				birdPosition = texture2D( texturePosition, ref ).xyz;

				dir = birdPosition - selfPosition;
				dist = length( dir );

				if ( dist < 0.0001 ) continue;

				distSquared = dist * dist;

				if ( distSquared > zoneRadiusSquared ) continue;

				percent = distSquared / zoneRadiusSquared;

				if ( percent < separationThresh ) { // low

					// Separation - Move apart for comfort
					f = ( separationThresh / percent - 1.0 ) * delta;
					velocity -= normalize( dir ) * f;

				} else if ( percent < alignmentThresh ) { // high

					// Alignment - fly the same direction
					float threshDelta = alignmentThresh - separationThresh;
					float adjustedPercent = ( percent - separationThresh ) / threshDelta;

					birdVelocity = texture2D( textureVelocity, ref ).xyz;

					f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
					velocity += normalize( birdVelocity ) * f;

				} else {

					// Attraction / Cohesion - move closer
					float threshDelta = 1.0 - alignmentThresh;
					float adjustedPercent;
					if( threshDelta == 0. ) adjustedPercent = 1.;
					else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

					f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

					velocity += normalize( dir ) * f;

				}

			}

		}

		vec3 newVel = normalize(target);

		if ( length( velocity ) > limit ) {
			velocity = normalize( velocity ) * limit;
		}


		gl_FragColor = vec4(  velocity , 1.0 ); //ORIGINAL

	}`

	const birdsVS = `
	attribute vec2 reference;
	attribute float birdVertex;

	attribute vec3 birdColor;

	uniform sampler2D texturePosition;
	uniform sampler2D textureVelocity;

	varying vec4 vColor;
	varying float z;
	varying vec2 vuv;

	uniform float time;

	void main() {

		vec3 pos = texture2D( texturePosition, reference ).xyz;
		// vec3 pos = tmpPos.xyz;
		vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);

		vec3 newPosition = position;

		newPosition = mat3( modelMatrix ) * newPosition;


		velocity.z *= -1.;
		float xz = length( velocity.xz );
		float xyz = 1.;
		float x = sqrt( 1. - velocity.y * velocity.y );

		float cosry = velocity.x / xz;
		float sinry = velocity.z / xz;

		float cosrz = x / xyz;
		float sinrz = velocity.y / xyz;

		mat3 maty =  mat3(
			cosry, 0, -sinry,
			0    , 1, 0     ,
			sinry, 0, cosry

		);

		mat3 matz =  mat3(
			cosrz , sinrz, 0,
			-sinrz, cosrz, 0,
			0     , 0    , 1
		);

		newPosition =  maty * matz * newPosition;
		newPosition += pos;

		vColor = vec4(normalize(newPosition),1.);
		// vColor = vec4(birdColor, 1.);
		gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );
	}`;

	const birdsFS = `
	varying vec4 vColor;
	varying float z;

	uniform vec2 sl;
	uniform float test;

	// All components are in the range [0…1], including hue.
	vec3 rgb2hsv(vec3 c)
	{
		vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
		vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
		vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

		float d = q.x - min(q.w, q.y);
		float e = 1.0e-10;
		return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
	}

	// All components are in the range [0…1], including hue.
	vec3 hsv2rgb(vec3 c)
	{
		vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
		vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
		return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
	}

	vec3 turn(vec3 rgb, vec2 sl){
		float h =  rgb2hsv(rgb).x;
		// s,l /*  */
		/*
		1. Convertir rgb a h
		2. generar nuevo hsl
		3. regresarlo a rgb
		*/
		vec3 hsl;
		hsl = vec3(h, sl.x, sl.y);

		return(hsv2rgb(hsl));
	}

	void main() {
		// Fake colors for now
		// float z2 = 0.2 + ( 1000. - z ) / 1000. * vColor.x;

		// if(test > 40.0){
		// 	gl_FragColor = vColor;
		// }else{
		// 	gl_FragColor = vec4(0., 0., 0., 1.);
		// }

		// if(vColor.x == 1. || vColor.y == 1. || vColor.z == 1.){
		// 	gl_FragColor = vec4(0.,0.,0.,1.);
		// }else{
		// 	gl_FragColor = vec4(1.,0.,0.,1.);
		// }

		// gl_FragColor = vec4(turn(vColor.xyz, sl), 1.);

		gl_FragColor = abs(vColor);
		// gl_FragColor = (birdColor, 1.);
		// gl_FragColor = vec4(vColor.z, 0., 0., 1.0);
		// gl_FragColor = vec4( color, 1. );
	}`;

	const WIDTH = 64;

	const BIRDS = WIDTH * WIDTH;

	function BirdGeometry() {

		const triangles = BIRDS * 3;
		const points = triangles * 3;

		THREE.BufferGeometry.call(this);

		const vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
		const birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
		const references = new THREE.BufferAttribute(new Float32Array(points * 2), 2);
		const birdVertex = new THREE.BufferAttribute(new Float32Array(points), 1);

		this.setAttribute('position', vertices);
		this.setAttribute('birdColor', birdColors);
		this.setAttribute('reference', references);
		this.setAttribute('birdVertex', birdVertex);

		// this.setAttribute( 'normal', new Float32Array( points * 3 ), 3 );


		let v = 0;

		function verts_push() {
			for (let i = 0; i < arguments.length; i++) {
				vertices.array[v++] = arguments[i];
			}
		}

		// const wingsSpan = 20;

		for (let f = 0; f < BIRDS; f++) {
			// Down
			verts_push(
				-1, 0, -1,
				1, 0, 0,
				-1, 0, 1
			);

			// Left
			verts_push(
				-1, 0, -1,
				1, 0, 0,
				-1, 0.5, 0
			);

			// Right
			verts_push(
				1, 0, 0,
				-1, 0.5, 0,
				-1, 0, 1
			);
		}

		for (let v = 0; v < triangles * 3; v++) {
			const i = ~ ~(v / 3);
			const x = (i % WIDTH) / WIDTH;
			const y = ~ ~(i / WIDTH) / WIDTH;

			const c = new THREE.Color(
				v / (triangles * 3),
				(v * 3 + 1) / (triangles * 3 * 3),
				(v * 3 + 2) / (triangles * 3 * 3)
			);

			birdColors.array[v * 3 + 0] = c.r;
			birdColors.array[v * 3 + 1] = c.g;
			birdColors.array[v * 3 + 2] = c.b;

			references.array[v * 2] = x;
			references.array[v * 2 + 1] = y;

			birdVertex.array[v] = v % 9;

		}

		this.scale(5, 5, 5);
	}

	BirdGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
	
	let sound;
	let analyser;
	let data;

	let target;
	let birdMesh;

	const BOUNDS = 200, BOUNDS_HALF = BOUNDS / 2;

	let last = performance.now();

	let gpuCompute;
	let velocityVariable;
	let positionVariable;
	let positionUniforms;
	let velocityUniforms;
	let birdUniforms;

	const r = 500;
	let tempX, tempY, tempZ;
	let time = 0;


	init();

	function init() {
		initComputeRenderer();

		const effectController = {
			separation: 20.0,
			alignment: 20.0,
			cohesion: 20.0,
			freedom: 0.75
		};

		const valuesChanger = function () {

			velocityUniforms[ "separationDistance" ].value = effectController.separation;
			velocityUniforms[ "alignmentDistance" ].value = effectController.alignment;
			velocityUniforms[ "cohesionDistance" ].value = effectController.cohesion;
			velocityUniforms[ "freedomFactor" ].value = effectController.freedom;

		};

		valuesChanger();

		initBirds();
		initAudio();

	}

	function initComputeRenderer() {

		gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

		if (isSafari()) {

			gpuCompute.setDataType(THREE.HalfFloatType);

		}

		const dtPosition = gpuCompute.createTexture();
		const dtVelocity = gpuCompute.createTexture();

		both(dtPosition, dtVelocity)

		velocityVariable = gpuCompute.addVariable("textureVelocity", shaderVelocity, dtVelocity);
		positionVariable = gpuCompute.addVariable("texturePosition", shaderPosition, dtPosition);

		gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
		gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

		positionUniforms = positionVariable.material.uniforms;
		velocityUniforms = velocityVariable.material.uniforms;

		positionUniforms["time"] = { value: 0.0 };
		positionUniforms["delta"] = { value: 0.0 };
		velocityUniforms["time"] = { value: 1.0 };
		velocityUniforms["delta"] = { value: 0.0 };
		velocityUniforms["testing"] = { value: 1.0 };
		velocityUniforms["separationDistance"] = { value: 1.0 };
		velocityUniforms["alignmentDistance"] = { value: 1.0 };
		velocityUniforms["cohesionDistance"] = { value: 1.0 };
		velocityUniforms["freedomFactor"] = { value: 1.0 };
		velocityUniforms["target"] = { value: new THREE.Vector3() };
		velocityUniforms["predator"] = { value: new THREE.Vector3() };
		velocityUniforms["distortion"] = { value: 0.0 };
		velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2);

		velocityVariable.wrapS = THREE.RepeatWrapping;
		velocityVariable.wrapT = THREE.RepeatWrapping;
		positionVariable.wrapS = THREE.RepeatWrapping;
		positionVariable.wrapT = THREE.RepeatWrapping;

		const error = gpuCompute.init();

		if (error !== null) {

			console.error(error);

		}

	}

	function isSafari() {

		return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);

	}

	function initBirds() {

		const geometry = new BirdGeometry();
		// For Vertex and Fragment
		birdUniforms = {
			"sl": { value: new THREE.Vector2(0, 0) },
			"texturePosition": { value: null },
			"textureVelocity": { value: null },
			"time": { value: 1.0 },
			"delta": { value: 0.0 },
			"test": { value: 0.0 }
		};

		// THREE.ShaderMaterial
		const material = new THREE.ShaderMaterial({
			uniforms: birdUniforms,
			vertexShader: birdsVS,
			fragmentShader: birdsFS,
			side: THREE.DoubleSide

		});

		birdMesh = new THREE.Mesh(geometry, material);
		// birdMesh.rotation.y = Math.PI / 2;
		birdMesh.matrixAutoUpdate = false;
		birdMesh.updateMatrix();

		scene.add(birdMesh);

		// const box = new THREE.BoxHelper( birdMesh, 0x000 );
		// scene.add( box );


		const geo = new THREE.SphereGeometry(10, 10, 10);
		const mat = new THREE.MeshBasicMaterial({ color: 'red' });

		target = new THREE.Mesh(geo, mat);
		scene.add(target);
		console.log(birdMesh.geometry.attributes)


		const p = new Float32Array(12);
		// const vertex = new THREE.Vector3();


		/*
		TODO:
		Finish the following particle (just make them follow the mesh)
		Integrate the sound data (changing their elevation or color)

		*/

		p[0] = -1
		p[1] = 0
		p[2] = -1

		p[3] = 1
		p[4] = 0
		p[5] = 0

		p[6] = -1
		p[7] = 0
		p[8] = 1

		p[9] = -1
		p[10] = 0.5
		p[11] = 0

		const g = new THREE.BufferGeometry()
		g.setAttribute('position', new THREE.BufferAttribute(p, 3));

		const mp = new THREE.PointsMaterial({ size: 0.1, color: 'red' });
		const points = new THREE.Points(g, mp);
		scene.add(points)
	}

	function initAudio() {
		const listener = new THREE.AudioListener();
		camera.add(listener);

		// create an Audio source
		sound = new THREE.Audio(listener);

		// load a sound and set it as the Audio object's buffer
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load(main, function (buffer) {
			sound.setBuffer(buffer);
			sound.setLoop(true);
			sound.setVolume(0.5);
			sound.play()
		});

		// create an AudioAnalyser, passing in the sound and desired fftSize
		analyser = new THREE.AudioAnalyser(sound, 32);

		// get the average frequency of the sound
		data = analyser.getAverageFrequency();
		console.log(data)
	}

	function both(pos, vel) {
		const posArr = pos.image.data;
		const velArr = vel.image.data;

		for (let k = 0, kl = posArr.length; k < kl; k += 4) {
			if (kl < 5) {
				posArr[k + 0] = 0;
				posArr[k + 1] = 0;
				posArr[k + 2] = 0;
				posArr[k + 3] = 1;

				velArr[k + 0] = 1;
				velArr[k + 1] = 0;
				velArr[k + 2] = 0;
				velArr[k + 3] = 1;
				break;
			}
			const x = Math.random() * BOUNDS - BOUNDS_HALF;
			const y = Math.random() * BOUNDS - BOUNDS_HALF;
			const z = Math.random() * BOUNDS - BOUNDS_HALF;

			posArr[k + 0] = x;
			posArr[k + 1] = y;
			posArr[k + 2] = z;
			posArr[k + 3] = 1;

			velArr[k + 0] = x;
			velArr[k + 1] = y;
			velArr[k + 2] = z;
			velArr[k + 3] = 1;
		}
	}

	const update = function () {
		data = analyser.getAverageFrequency();

		tempX = r * Math.sin(time * Math.PI);
		tempY = 40 * Math.sin(tempX / r * Math.PI);
		tempZ = r * Math.cos(time * Math.PI);
		target.position.set(tempX, tempY, tempZ)

		const sl = new THREE.Vector2(1, data / 127.5);
		// col.setHSL( data/255, 1, 0.5 );
		const now = performance.now();
		let delta = (now - last) / 1000;
		time += .001;
		if (delta > 1) delta = 1; // safety cap on large deltas
		last = now;
		positionUniforms["time"].value = now;
		positionUniforms["delta"].value = delta;
		velocityUniforms["time"].value = now;
		velocityUniforms["delta"].value = delta;
		velocityUniforms["target"].value.set(target.position.x, target.position.y, target.position.z);
		if (now % 128 === 0) {
			velocityUniforms["distortion"].value = data * 10;
			// console.log(data)
		} else
			if (data > 10) {
				// console.log('yes')
				console.log(data)
				// console.log(analyser.getFrequencyData())
				velocityUniforms["distortion"].value = data * 2;
			} else {
				// console.log(data)
				velocityUniforms["distortion"].value = Math.pow(data, 1.5);
			}
		// velocityUniforms[ "distortion" ].value = Math.pow(data);
		console.log(Math.pow(data, 1.5))
		birdUniforms["time"].value = now;
		birdUniforms["delta"].value = delta;
		birdUniforms["test"].value = data;
		birdUniforms["sl"].value = sl;

		// mouseX = 10000;
		// mouseY = 10000;

		gpuCompute.compute();

		birdUniforms["texturePosition"].value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
		birdUniforms["textureVelocity"].value = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

	}

	return { update }
}