import React, {FC} from "react";
import ReactDOM from 'react-dom';
import './backdrop.css'

const Backdrop: FC<any> = ({onClick}) => {

  const CONTENT =  <div className='backdrop' onClick={onClick}></div>
  // @ts-ignore
  return ReactDOM.createPortal(CONTENT, document.getElementById('backdrop-hook'))
}

export default Backdrop