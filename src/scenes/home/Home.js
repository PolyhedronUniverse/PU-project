import React, {Component} from 'react'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { Mobile } from '../../components/mobile/Mobile'
import { Debug } from '../../components/debug/Debug'
import { Count } from '../../components/countdown/countdown'
// import { Gui } from '../../components/gui/Gui'
import '../../index.css'
import threeEntryPoint from '../../components/canvas/main';
// import Hud from '../../components/canvas/hud'

class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.three);
  }
  render () {
    return (
      <div id="canvas" ref={element => this.three = element} />
    );
  }
}

class Image extends Component {
  render(){
    return (
      <div id="canvas"></div>
    )
  }
}


export const Home = () => {
  return (
    <>
      <Header/>
      <Footer/>
      <Debug/>
      <Count/>
      <ThreeContainer/>
    </>
  )
}
