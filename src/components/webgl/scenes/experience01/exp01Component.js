import React from 'react';
import Experience01 from './experience01'
// import Gui from '../gui/gui'

class CanvasWebgl extends React.Component {

  componentDidMount(){
    let scene = Experience01(this.props.header*0.15, this.props.footer*0.075)
    this.mount.appendChild(scene.renderer.domElement);

    this.name = scene.name;

    console.log('exp1')

    window.addEventListener('resize', scene.onResize, false)
  }

  render(){
    return(
      <>
        <p id='sceneName'>exp01</p>
        <div id='canvas-area' style={{ width: "100%", display: "none" }} ref={mount => {this.mount = mount}} />
      </>
    )
  }
}


export default function Exp01(){

  return(
    <>
      <CanvasWebgl footer={window.innerHeight} header={window.innerHeight}/>
    </>
  )
}
