import React, {Component} from 'react'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { Mobile } from '../../components/mobile/Mobile'
import { Debug } from '../../components/debug/Debug'
import { Gui } from '../../components/gui/Gui'
import '../../index.css'
import threeEntryPoint from '../../components/canvas/main';
// import Hud from '../../components/canvas/hud'

class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }
  render () {
    return (
      <div id="canvas" ref={element => this.threeRootElement = element} />
    );
  }
}


export const Home = () => {
  return (
    <div className="Home">
      <Header/>
      <ThreeContainer/>
      <Gui/>
      <Mobile/>
      <Footer/>
    </div>
  )
}
