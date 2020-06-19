import {Reducer} from "react";

export type inputProperty = {
  value: string,
  isValid: boolean
}

export interface IFormState {
  inputs: {
    title: inputProperty,
    address: inputProperty
    description: inputProperty
  },
  isValid: boolean
}

export const initialState: IFormState = {
  inputs: {
    title: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  },
  isValid: false
}

export const formReducer: Reducer<IFormState, any> = (state: IFormState, actions: any): IFormState => {
  switch (actions.type) {

    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === actions.inputId) {
          // @ts-ignore
          formIsValid = formIsValid && actions.isValid
        } else {
          // @ts-ignore
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [actions.inputId]: {value: actions.value, isValid: actions.isValid}
        },
        isValid: formIsValid
      }

    default:
      return state
  }
}