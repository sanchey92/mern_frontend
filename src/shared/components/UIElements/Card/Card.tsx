import React, {FC} from "react";
import './Card.css'

const Card: FC<any> = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  )
}

export default Card