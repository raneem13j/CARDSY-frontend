import React from 'react'
import './PopupProfil.css';
import { AiOutlineClose } from "react-icons/ai";


const PopupProfil = (props) => {
 return props.trigger ? (
   <div className='popupRequest'>
     <div className='popup-inner'>
      
       <div
         onClick={() => props.setTrigger(!props.trigger)}
         className='close-popup-icon'
         >
        
        <AiOutlineClose/>
          
       </div>
       {props.children}
     </div>
   </div>
 ) : (
   ""
 );
}

export default PopupProfil