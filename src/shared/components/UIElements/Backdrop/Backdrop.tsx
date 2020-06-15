import React, {FC} from "react";
import ReactDOM from 'react-dom';
import './backdrop.css'

type Backdrop = {
  onClick: any
}

const Backdrop: FC<Backdrop> = ({onClick}) => {

  const CONTENT =  <div className='backdrop' onClick={onClick}></div>
  // @ts-ignore
  return ReactDOM.createPortal(CONTENT, document.getElementById('backdrop-hook'))
}

export default Backdrop