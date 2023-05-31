import React from 'react'
import './PopupEdit.css';
import { AiOutlineClose } from "react-icons/ai";


const PopupEdit = (props) => {
 return props.trigger ? (
   <div className='popupRequest'>
     <div className='popup-inner1'>
      
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

export default PopupEdit