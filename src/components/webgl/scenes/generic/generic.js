import React from 'react';
// import Labels from '../../../labels/labels'
// import Info from '../../../info/info'
import {MdScreenRotation} from 'react-icons/md'
export default function Generic() {

    return (
        <>
            {/* <p id='sceneName'>{'h:'+window.innerHeight+'\nw:'+window.innerWidth}</p> */}
            {/* <p id='sceneName'>main scene{window.devicePixelRatio}</p> */}
            <div id='generic' style={{}} >
                <div>
                    <p>Rotate the device.</p>
                    <MdScreenRotation id='rotate'/>
                </div>
                {/* <Info /> */}
                {/* <Labels /> */}
                {/* <canvas id='c-test'></canvas> */}
            </div>
        </>
    )
}