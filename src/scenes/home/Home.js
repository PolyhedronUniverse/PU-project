import React, {Component, useState,useEffect} from 'react'
import { Footer } from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { Mobile } from '../../components/mobile/Mobile'
import { Gui } from '../../components/gui/Gui'
import '../../index.css'
import threeEntryPoint from '../../components/canvas/main';

import MenuContainer from '../../components/slidingmenu/MenuContainer'
import {Labels} from '../../components/labels/labels'
import {MusicCel} from '../../components/musicCel/MusicCel'
import Welcome from '../../components/SplashScreen/Welcome'
import {isMobile} from 'react-device-detect';

class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.three,this.props);
  }
  render () {
    return (
      <div id="canvas" ref={element => this.three = element}>
        <Gui/>
        <Labels/>
      </div>
    );
  }
}


export const Home = () => {
  const [visible,setVisible] = useState(false);
  const [overlay,setOverlay] = useState(false);


  // function useWindowSize(){
  //   const [windowSize,setWindowSize]= useState({
  //     width: undefined,
  //     height: undefined
  //   });

  //   useEffect(()=> {
  //     function handleResize(){
  //       setWindowSize({
  //         width: window.innerWidth,
  //         height:window.innerHeight,
  //       });
  //     }

  //     window.addEventListener("resize",handleResize);

  //     handleResize();

  //     return () => window.removeEventListener("resize",handleResize);
  //   },[]);

  //   return windowSize;
  // }

  // const size = useWindowSize();
  // const ancho = size.width;

  // console.log("height: "+ size.height + " width: "+ size.width);

  // if (ancho <= 900) {
  //   return(
  //     <div className="Home">
  //     {/* <Header/> */}
  //     <Mobile/>
  //     <MusicCel/>
  //     {/* <Footer visible={visible} setVisible={setVisible}/>
  //     <MenuContainer visible={visible}/> */}
  //   </div>
  //   )
  // }else{
  //   return(
  //     <div className="Home">
  //     <Header/>
  //     <ThreeContainer overlay={overlay} setOverlay={setOverlay}/>
  //     <Gui/>
  //     <Welcome overlay={overlay}/>
  //     <Footer visible={visible} setVisible={setVisible}/>
  //     <MenuContainer visible={visible}/>
  //   </div>
  //   )

  if (isMobile) {
  return(
    <div className="Home">
    {/* <Header/> */}
    <Mobile/>
    <MusicCel/>
    {/* <Footer visible={visible} setVisible={setVisible}/>
    <MenuContainer visible={visible}/> */}
  </div>
  )
  }else{
    return(
      <div className="Home">
      <Header/>
      <ThreeContainer overlay={overlay} setOverlay={setOverlay}/>
      <Welcome overlay={overlay}/>
      <Footer visible={visible} setVisible={setVisible}/>
      <MenuContainer visible={visible}/>
    </div>
    )
  }
}
