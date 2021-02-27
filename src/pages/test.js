import React, {useState,useEffect} from 'react'

import {isMobile} from 'react-device-detect';

import Header from '../components/header/header.js'
import Footer from '../components/footer/footer.js'
// import Canvas from '../components/canvas/canvas'
// import LoadingScreen from '../components/loading-screen/loadingScreen'
// import SceneManager from '../components/webgl/sceneManager'

export default function Test() {
  // console.log(SceneManager())
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  if (isMobile) {
    return(
      <div className="Home">

      </div>
    )
  }else{
    return(
      <div className="Test">
        <Header/>
        <h1>TEST</h1>
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
        <Footer/>
      </div>
    )
  }
}
