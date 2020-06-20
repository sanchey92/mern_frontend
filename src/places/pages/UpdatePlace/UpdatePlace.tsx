import React, {FC, FormEvent} from "react";
import {useParams} from 'react-router-dom';
import {TESTS_DATA} from "../UserPlaces/UserPlaces";
import {Places} from "../../components/PlaceList/PlaceList";
import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../../shared/utils/validadors/actions.calidators";
import Button from "../../../shared/components/FormElements/Button/Button";
import {useForm} from "../../../shared/hooks/formHook/formHook";
import '../NewPlace/NewPlace.css'


type urlParams = { placeId: string }

const UpdatePlace: FC = () => {

  const placeId = useParams<urlParams>().placeId
  const foundPlace = TESTS_DATA.find((item: Places) => item.id === placeId)

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: foundPlace!.title,
        isValid: true
      },
      description: {
        value: foundPlace!.description,
        isValid: true
      }
    },
    true)

  const updateHandler = (event: FormEvent): void => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  if (!foundPlace) {
    return (
      <div className='center'>
        <h2>Could not find place </h2>
      </div>
    )
  }
  return (
    <form className='place-form' onSubmit={updateHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='please enter a valid data'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='please enter a valid description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>UPDATED PLANET</Button>
    </form>
  )
}

export default UpdatePlace