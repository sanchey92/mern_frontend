import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import './ImageUpload.css'
import Button from "../Button/Button";

type ImageUploadType = {
  id: string,
  center?: any,
  onInput: Function,
  errorText: string
}

const ImageUpload: FC<ImageUploadType> = ({id, center, onInput, errorText}) => {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState<boolean>(false)
  const filePickerRef = useRef(null);

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid: boolean;
    if (event.target.files && event.target.files!.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false)
      fileIsValid = false
    }
    onInput(id, pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    // @ts-ignore
    filePickerRef.current.click()
  }

  return (
    <div className='form-control'>
      <input
        type='file'
        ref={filePickerRef}
        id={id}
        style={{display: 'none'}}
        accept='.jpeg,.png,.jpg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt="Preview"/>}
          {!previewUrl && <p>please pick an image</p>}
        </div>
        <Button
          type='button'
          onClick={pickImageHandler}
        >PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  )
}

export default ImageUpload