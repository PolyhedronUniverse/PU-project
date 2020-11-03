import React, {Component, useState,useEffect} from 'react'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { Mobile } from '../../components/mobile/Mobile'
import { Debug } from '../../components/debug/Debug'
import { Count } from '../../components/countdown/countdown'
import { Gui } from '../../components/gui/Gui'
import '../../index.css'
import threeEntryPoint from '../../components/canvas/main';

import MenuContainer from '../../components/slidingmenu/MenuContainer'
import {Labels} from '../../components/labels/labels'
import {MusicCel} from '../../components/musicCel/MusicCel'
//import Welcome from '../../components/SplashScreen/Welcome'

class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.three);
  }
  render () {
    return (
      <div id="canvas" ref={element => this.three = element}>
        <Labels/>
      </div>
    );
  }
}


export const Home = () => {
  const [visible,setVisible]=useState(false);

  function useWindowSize(){
    const [windowSize,setWindowSize]= useState({
      width: undefined,
      height: undefined
    });

    useEffect(()=> {
      function handleResize(){
        setWindowSize({
          width: window.innerWidth,
          height:window.innerHeight,
        });
      }

      window.addEventListener("resize",handleResize);

      handleResize();

      return () => window.removeEventListener("resize",handleResize);
    },[]);

    return windowSize;
  }

  const size = useWindowSize();
  const ancho = size.width;

  console.log("height: "+ size.height + " width: "+ size.width);

  if (ancho <= 600) {
    return(
      <div className="Home">
      <Header/>
      <Mobile/>
      <Count/>
      <MusicCel/>
      <Footer visible={visible} setVisible={setVisible}/>
      <MenuContainer visible={visible}/>
    </div>
    )
  }else{
    return(
      <div className="Home">
      <Header/>
      <ThreeContainer/>
      <Count/>
      <Gui/>
      {/* <Welcome/> */}
      <Footer visible={visible} setVisible={setVisible}/>
      <MenuContainer visible={visible}/>
    </div>
    )
  }
}
