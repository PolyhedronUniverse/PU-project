import React from 'react';
import MainScene from './mainScene'
// import Gui from '../gui/gui'
import Labels from '../../../labels/labels'
import Info from '../../../info/info'

class CanvasWebgl extends React.Component {

  componentDidMount(){
    let scene = MainScene(this.props.header*0.15, this.props.footer*0.075)
    this.mount.appendChild(scene.renderer.domElement);

    this.name = scene.name;

    // console.log('main')

    window.addEventListener('resize', scene.onResize, false)
  }

  render(){
    return(
      <>
        <Info />
        {/* <p id='sceneName'>main scene{window.devicePixelRatio}</p> */}
        <div id='canvas-area' style={{ width: "100%", display: "none" }} ref={mount => {this.mount = mount}}>
          <Labels />
        </div>
      </>
    )
  }
}


export default function MainCanvas(){

  return(
    <>
      <CanvasWebgl footer={window.innerHeight} header={window.innerHeight}/>
    </>
  )
}
