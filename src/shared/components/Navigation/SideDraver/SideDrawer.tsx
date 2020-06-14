import React, {FC} from "react";
import ReactDOM from 'react-dom';
import {CSSTransition} from "react-transition-group";
import './SideDrawer.css';

const SideDrawer: FC<any> = ({children, show, onClick}) => {

  const CONTENT =
    <CSSTransition
      in={show} timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={onClick}  className='side-drawer'>{children}</aside>
    </CSSTransition>
  // @ts-ignore
  return ReactDOM.createPortal(CONTENT, document.getElementById('drawer-hook'))
}

export default SideDrawer