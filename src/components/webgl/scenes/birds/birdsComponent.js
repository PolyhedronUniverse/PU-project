import React from 'react';
import Birds from './birds';

class CanvasWebgl extends React.Component {
    componentDidMount(){
        let scene = Birds();
        this.mount.appendChild(scene.renderer.domElement);

        scene.renderer.domElement.id = 'birds'
        this.name = scene.name;

        window.addEventListener('resize', scene.onResize, false)
    }

    render(){
        return(
            <div id='canvas-area' style={{width: "100%", display: "none"}} ref={mount => {this.mount = mount}}>

            </div>
        )
    }
}

export default function BirdsCanvas(){
    return(
        <CanvasWebgl/>
    )
}