import {Reducer} from "react";

export type inputProperty = {
  value: string,
  isValid: boolean
}

export type initialInputsType = {
  title: inputProperty,
  address?: inputProperty
  description: inputProperty
}

export const formReducer: Reducer<any, any> = (state: any, actions: any) => {
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

    case 'SET_DATA':
      return {
        ...state,
        inputs: actions.inputs,
        isValid: actions.formIsValid
      }

    default:
      return state
  }
}