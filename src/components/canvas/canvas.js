import React from 'react';
import './canvas.css'
import SceneManager from '../webgl/sceneManager'
// import Gui from '../gui/gui'

class CanvasWebgl extends React.Component {

  componentDidMount(){
    let scene = SceneManager(this.props.header*0.15, this.props.footer*0.075)
    this.mount.appendChild(scene.renderer.domElement);
    console.log(this)
    window.addEventListener('resize', scene.onResize, false)
  }

  render(){
    return(
      <div id='canvas-area' style={{ width: "100%", display: "none" }} ref={mount => {this.mount = mount}} />
    )
  }
}


export default function Canvas(){

  return(
    <>
      <CanvasWebgl footer={window.innerHeight} header={window.innerHeight}/>
    </>
  )
}
