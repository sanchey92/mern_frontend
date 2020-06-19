import React, {FC, FormEvent, useCallback, useReducer} from "react";
import './NewPlace.css'
import Input from "../../../shared/components/FormElements/Input/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../../shared/utils/validadors/actions.calidators";
import Button from "../../../shared/components/FormElements/Button/Button";
import {formReducer, initialState} from "../../../reducers/formReducer";

const NewPlace: FC = () => {

  const [formState, dispatch] = useReducer(formReducer, initialState)
  const inputHandler = useCallback((id: string, value: string, isValid: boolean): void => {
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