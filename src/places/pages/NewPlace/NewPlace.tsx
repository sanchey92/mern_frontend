import React, {FC, useCallback} from "react";
import './NewPlace.css'
import Input from "../../../shared/components/FormElements/Input/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../../shared/utils/validadors/actions.calidators";

const NewPlace: FC = () => {

  const titleInputHandler = useCallback((id: string, value: string, isValid: boolean) => {}, [])
  const descriptionInputHandler = useCallback((id: string, value: string, isValid: boolean) => {}, [])

  return (
    <form className='place-form'>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='please enter a valid data'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={titleInputHandler}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='please enter a valid description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={descriptionInputHandler}
      />
    </form>
  )
}

export default NewPlace