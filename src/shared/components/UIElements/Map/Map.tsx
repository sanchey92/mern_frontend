import React, {CSSProperties, FC, useRef, useEffect} from "react";
import './Map.css'

interface IMap {
  className?: string,
  style?: CSSProperties,
  center?: any,
  zoom?: any
}

const Map: FC<IMap> = ({className, style, center, zoom}) => {

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    })
    // @ts-ignore
    new window.google.maps.Marker({position: center, map: map})

  }, [center, zoom])

  return <div ref={mapRef} className={`map ${className}`} style={style}/>
}

export default Map