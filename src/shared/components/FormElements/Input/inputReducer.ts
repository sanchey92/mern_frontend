import {validate} from "../../../utils/validadors/validators";
import {Reducer} from "react";

export interface IInputState {
  value: string,
  isValid: boolean,
  isTouched: boolean
}

export const initialState = {
  value: '',
  isValid: false,
  isTouched: false
}

export const inputReducer: Reducer<IInputState, any> = (state = initialState, actions: any): IInputState => {
  switch (actions.type) {

    case 'CHANGE':
      return {
        ...state,
        value: actions.val,
        isValid: validate(actions.val, actions.validators)
      }

    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      }

    default:
      return state
  }
}