import React, {FC} from "react";
import Modal from "../Modal/Modal";
import Button from "../../FormElements/Button/Button";

type ErrorModalType = {
  onClear: any,
  error: any,
}

const ErrorModal: FC<ErrorModalType> = ({onClear, error}) => {
  return (
    <Modal
      onCancel={onClear}
      show={!!error}
      header='An Error Occurred'
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  )
}

export default ErrorModal