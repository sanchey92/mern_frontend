import React, {CSSProperties, FC} from "react";
import './Avatar.css'

interface IAvatar {
  className?: string,
  style?: CSSProperties,
  image: string,
  alt: string,
  width?: string,
  height?: string
}

const Avatar: FC<IAvatar> = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{width: props.width, height: props.width}}
      />
    </div>
  )
}

export default Avatar