import React, {FC} from "react";
import {useParams} from 'react-router-dom';
import {TESTS_DATA} from "../UserPlaces/UserPlaces";
import {Places} from "../../components/PlaceList/PlaceList";
import Input from "../../../shared/components/FormElements/Input/Input";
import {VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE} from "../../../shared/utils/validadors/actions.calidators";
import Button from "../../../shared/components/FormElements/Button/Button";
import '../NewPlace/NewPlace.css'

type urlParams = { placeId: any }

const UpdatePlace: FC = () => {

  const placeId = useParams<urlParams>().placeId
  const foundPlace = TESTS_DATA.find((item: Places) => item.id === placeId)

  if (!foundPlace) {
    return (
      <div className='center'>
        <h2>Could not find place </h2>
      </div>
    )
  }
  return (
    <form className='place-form'>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        errorText='please enter a valid data'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={() => {
        }}
        initialValue={foundPlace.title}
        valid={true}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        errorText='please enter a valid description'
        validators={[VALIDATOR_MAXLENGTH(5)]}
        onInput={() => {
        }}
        initialValue={foundPlace.description}
        valid={true}
      />
      <Button type='submit' disabled={true}>UPDATED PLANET</Button>
    </form>
  )
}

export default UpdatePlace