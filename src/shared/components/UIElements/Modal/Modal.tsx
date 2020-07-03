import React, {CSSProperties, FC, ReactNode} from "react";
import Backdrop from "../Backdrop/Backdrop";
import {CSSTransition} from "react-transition-group";
import './Modal.css'
import ModalOverlay from "../ModalOverlay/ModelOverlay";

export interface IModal {
  show: boolean,
  header: string,
  footer: ReactNode,
  footerClass?: string,
  onSubmit?: () => void,
  onCancel?: () => void,
  style?: CSSProperties
  headerClass?: string,
  className?: string,
  contentClass?: string,
}

const Modal: FC<IModal> = (props) => {
  return (
    <>
      {
        props.show && <Backdrop onClick={props.onCancel}/>
      }
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
        <ModalOverlay {...props}/>
      </CSSTransition>
    </>
  )
}

export default Modal