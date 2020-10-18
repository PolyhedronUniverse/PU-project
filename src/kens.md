## Primitives
You can work with different kinds of 3D and 2D shapes.

First you need to create the **geometry**

| Object | Code |
| --- | --- |
| Spehre | THREE.SphereBufferGeometry( radius, widthSegments, heightSegments) |
| Box | THREE.BoxBufferGeometry( width, height, depth) |
| Plane | THREE.PlaneBufferGeometry( width, height, widthSegments, heightSegments) |

**Note**: [Differences with Geometry and BufferGeometry](https://stackoverflow.com/questions/54673268/difference-between-buffer-geometry-and-geometry)

**Note**: For more shapes check documentation or https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html

```
let geometry = new THREE.SphereBufferGeometry(5,32,32)
```
That would just create the data for the Mesh, to actually see the shape it is necessary to create a material, we'll use a basic material which doesn't need light to work.

There are different parameters that the material can take, such as color, opacity, alpha, [etc](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial). they need to be passed like

```
let material = new THREE.MeshBasicMaterial({color: 'red'})
```

The you'll need to create a `Mesh` object that will bind the geometry with the materials and then add it to the scene

```
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

## Textures

### Working with textures
First of all you need to import the file by placing on top

```
import *whateveryouwant* from `the\path\of\your\file`
```

You need to declare a variable `loader` that it'll be used to load the texture.

```
let loader = new THREE.TextureLoader();
```

To load a texture you need to pass the path of your file (png, jpg, ... etc.) through the function `load()` using the `loader` object storing it in another variable and passing the import variable .

```
let texture = loader.load(whateveryouwant)
```

### CubeTexture
If you want to create a **skybox** you'll need to use a new loader called `CubeTextureLoader` and use the `load()` function from that object but you'll need to pass an array of 6 images (previously imported).

```
let cubeLoader = new THREE.CubeTextureLoader()
let cubeTexture = cubeLoader.load([pos_x, neg_x, pos_y, neg_y, pos_z, neg_z])
```
