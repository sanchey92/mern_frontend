import React, {FC, FormEvent, useContext, useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../../shared/utils/validadors/actions.calidators";
import Button from "../../../shared/components/FormElements/Button/Button";
import {useForm} from "../../../shared/hooks/formHook/formHook";
import '../NewPlace/NewPlace.css'
import Card from "../../../shared/components/UIElements/Card/Card";
import {useHttpClient} from "../../../shared/hooks/httpHook/httpHook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import {AuthContext} from "../../../shared/context/authContext";

type urlParams = { placeId: string }

const UpdatePlace: FC = () => {

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams<urlParams>().placeId;
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: true
      },
      description: {
        value: '',
        isValid: true
      }
    },
    true)

  useEffect(() => {
    const fetchPlace = async (): Promise<any> => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
        setLoadedPlace(responseData.place)
        setFormData({
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.description,
              isValid: true
            }
          },
          true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPlace()
  }, [sendRequest, placeId, setFormData])


  const updateHandler = async (event: FormEvent): Promise<any> => {
    event.preventDefault()
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`
        },
      )
      history.push(`/${auth.userId}/places`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <ErrorModal onClear={clearError} error={error}/>
      {isLoading && !error && (
        <div className='center'>
          <Spinner/>
        </div>
      )}
      {!loadedPlace && (
        <div className='center'>
          <Card>
            <h2>Could not find place </h2>
          </Card>
        </div>
      )}
      {!isLoading && loadedPlace && (<form className='place-form' onSubmit={updateHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          errorText='please enter a valid data'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={loadedPlace.title}
          valid={true}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          errorText='please enter a valid description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          initialValue={loadedPlace.description}
          valid={true}
        />
        <Button type='submit' disabled={!formState.isValid}>UPDATED PLANET</Button>
      </form>)}
    </>
  )
}

export default UpdatePlace