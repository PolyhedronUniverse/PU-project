export default function MyFlyControls(camera){

  console.log("me active - fly")
  // let thisCamera = camera
  let movementSpeed = 0;
  let update;
  let changeSpeed;
  const type = 'fly';

  update = function(){
    camera.position.z += movementSpeed;
    // console.log(movementSpeed)
  }

  changeSpeed = function(newSpeed){
    movementSpeed = newSpeed;
  }

  return {movementSpeed, update, changeSpeed, type};
}
