import React, {ChangeEvent, FC, useEffect, useReducer} from "react";
import './Input.css'
import {inputReducer} from "../../../reducers/inputReducer";

interface IInput {
  id?: string,
  type?: string,
  element?: string
  placeholder?: string,
  rows?: any
  label?: string,
  errorText?: string,
  validators: any,
  initialValue? : string,
  valid?: boolean
  onInput: (id: string, value: string, isValid: boolean) => void
}

const Input: FC<IInput> = (props) => {
  const {id, type, element, placeholder, label, rows, errorText, validators, onInput, initialValue, valid} = props

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ||'',
    isTouched: false,
    isValid: valid || false
  })
  const {value, isTouched, isValid} = inputState

  useEffect(() => {
    onInput(id!, value, isValid)
  }, [id, value, isValid, onInput])

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators
    })
  }

  const touchHandler = (): void => {
    dispatch({type: 'TOUCH'})
  }

  const elementInput =
    element === 'input'
      ? <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeInputHandler}
        onBlur={touchHandler}
        value={value}
      />
      : <textarea
        id={id}
        rows={rows || 3}
        onChange={changeInputHandler}
        onBlur={touchHandler}
        value={value}
      />

  return (
    <div className={`form-control ${!isValid && isTouched && 'form-control--invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {elementInput}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  )
}

export default Input