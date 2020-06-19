import React, {FC, FormEvent, Reducer, useCallback, useReducer} from "react";
import './NewPlace.css'
import Input from "../../../shared/components/FormElements/Input/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../../shared/utils/validadors/actions.calidators";
import Button from "../../../shared/components/FormElements/Button/Button";

type inputProperty = {
  value: string,
  isValid: boolean
}

interface IFormState {
  inputs: {
    title: inputProperty,
    address: inputProperty
    description: inputProperty
  },
  isValid: boolean
}

const initialState: IFormState = {
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

const formReducer: Reducer<IFormState, any> = (state = initialState, actions: any): IFormState => {
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

const NewPlace: FC = () => {

  const [formState, dispatch] = useReducer(formReducer, initialState)

  const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
  }, [])

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  return (
    <form className='place-form' onSubmit={formSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='please enter a valid data'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        type='text'
        label='Address'
        errorText='please enter a valid address'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='please enter a valid description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Button
        type='submit'
        disabled={!formState.isValid}
      >
        ADD PLACE
      </Button>
    </form>
  )
}

export default NewPlace