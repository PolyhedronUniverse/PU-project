export default function MyFlyControls(camera){
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
