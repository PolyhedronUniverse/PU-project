import * as THREE from "three";
import inAudio from "../../assets/sounds/in.mp3";
import outAudio from "../../assets/sounds/out.mp3";

export default function MoveTest(scene, camera, nebulas, canvas) {
  // let keyCode;

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  let listener = new THREE.AudioListener();
  camera.add(listener);
  let sound = new THREE.Audio(listener);
  scene.add(sound);

  const nebulaName = document.querySelector("#nebula");

  let obj = [nebulas.length];

  // const tempV = new THREE.Vector3();
  let ids = [nebulas.length];

  for (let i = 0; i < nebulas.length; i++) {
    obj[i] = nebulas[i].cloud;
    const elem = document.createElement("div");
    elem.textContent = obj[i].name;
    nebulaName.appendChild(elem);
    elem.style.display = "none";
    elem.id = obj[i].id;
    elem.className = "lable";
    ids[i] = obj[i].id;
  }

  // console.log(nebulas.length)

  // console.log(obj)
  let audioLoader = new THREE.AudioLoader();

  function back(event) {
    event.preventDefault();

    // keyCode = event.which;

    if (camera.position.z < 3500) {
      camera.position.set(0, 0, -7000);

      audioLoader.load(outAudio, function (buffer) {
        sound.setBuffer(buffer);
        sound.play();
      });
      obj[0].callback(1);
      console.log(camera.position);
    }
  }

  function onDocumentMouseDown(event) {
    console.log("F");
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const pos = {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };

    mouse.x = (pos.x / canvas.width) * 2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(obj);

    if (event.which === 1) {
      if (mouse.y > -1.0 && mouse.y < 1.0 && Math.abs(mouse.x) < 0.7) {
        if (intersects.length > 0) {
          intersects[0].object.callback(-1);
          // camera.lookAt(intersects[0].object.position.x, intersects[0].object.position.y, -55000);
          // camera.object.setOrientation(  );
          audioLoader.load(inAudio, function (buffer) {
            sound.setBuffer(buffer);
            sound.play();
          });
          // camera.position.z = 0
        }
      }
    }
    // else if(event.which === 0) {
    //   if(camera.position.z < 3500) {
    //     camera.position.set(0,0,-7000)
    //     // camera.position.z = -7000;
    //     obj[0].callback(1);
    //
    //   }
    // }
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const pos = {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };

    mouse.x = (pos.x / canvas.width) * 2 - 1;
    mouse.y = (pos.y / canvas.height) * -2 + 1;

    if (document.querySelector("#debug")) {
      document.querySelector("#xt").textContent = mouse.x;
      document.querySelector("#yt").textContent = mouse.y;
    }

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(obj);

    if (mouse.y > -1.0 && mouse.y < 1.0 && camera.position.z > 0) {
      if (intersects.length > 0) {
        document.getElementById("canvas").style.cursor = "pointer";
        document.getElementById("n-name").textContent =
          intersects[0].object.name;
        document.getElementById("labels").style.left =
          event.clientX - rect.left + "px";
        document.getElementById("labels").style.top =
          event.clientY - rect.top + "px";
        if (document.querySelector("#debug")) {
          document.querySelector("#hover").textContent =
            intersects[0].object.name + " " + intersects[0].object.id;
        }
        // camera.position.z = 0
        document.getElementById("labels").style.display = "";
      } else {
        if (document.querySelector("#debug")) {
          document.querySelector("#hover").textContent = "none";
        }
        document.getElementById("labels").style.display = "none";
        document.getElementById("canvas").style.cursor = "default";
      }
    } else {
      if (document.querySelector("#debug")) {
        document.querySelector("#hover").textContent = "out";
      }

      if (document.querySelector("#labels")) {
        document.getElementById("labels").style.display = "none";
      }
    }
  }

  this.update = function () {
    obj.forEach((item, i) => {
      item.callback(0);
    });
  };

  document.getElementById("back").addEventListener("click", back, false);
  document.addEventListener("mousedown", onDocumentMouseDown, false);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
}
