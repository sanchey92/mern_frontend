import React, {CSSProperties, FC} from "react";
import './Card.css'

type Card = {
  className?: string,
  style?: CSSProperties
}

const Card: FC<Card> = ({className, style, children}) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  )
}

export default Card