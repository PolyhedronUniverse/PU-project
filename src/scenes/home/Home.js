import React, {Component} from 'react'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import '../../index.css'
import threeEntryPoint from '../../components/canvas/main';
// import Hud from '../../components/canvas/hud'

class ThreeContainer extends Component {
  componentDidMount() {
    console.log(this.threeRootElement);
    threeEntryPoint(this.threeRootElement);
  }
  render () {
      return (
        <div id="canvas"><div id="map" ref={element => this.threeRootElement = element} /> </div>
      );
  }
}


export const Home = () => {
    return (
        <div className="Home">
            <Header/>
              <ThreeContainer/>
          <Footer/>
        </div>
    )
}
