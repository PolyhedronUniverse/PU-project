import React,{useState} from 'react'
import '../slidingmenu/slidingmenu.css'

export default function MenuContainer(props){
  const {visible} = props;
  let visibility ="hide";


  if(visible){
    visibility="show";
  }

  console.log("Valor de si es visible o no: "+ visible);


    return (
      <div id="flyoutMenu"
           className={visibility}>
        <h2><a href="#">Polyhedron</a></h2>
        <h2><a href="#">Universe</a></h2>
        <h2><a href="#">Team</a></h2>
        <h2><a href="#">Ahuevito</a></h2>
      </div>
    )
}
