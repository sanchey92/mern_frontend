import React, {FC} from "react";
import './Spinner.css'

type SpinnerType = {
  asOverlay?: any
}

const Spinner: FC<SpinnerType> = ({asOverlay}) => {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className='lds-dual-ring'/>
    </div>
  )
}

export default Spinner
