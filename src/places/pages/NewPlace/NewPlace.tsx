import React, {FC, FormEvent, useContext} from "react";
import {useHistory} from 'react-router-dom';
import './NewPlace.css';
import Input from "../../../shared/components/FormElements/Input/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../../shared/utils/validadors/actions.calidators";
import Button from "../../../shared/components/FormElements/Button/Button";
import {useForm} from "../../../shared/hooks/formHook/formHook";
import {useHttpClient} from "../../../shared/hooks/httpHook/httpHook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import {AuthContext} from "../../../shared/context/authContext";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";

const NewPlace: FC = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const history = useHistory()

  const [formState, inputHandler] = useForm({
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false)

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        {'Content-Type': 'application/json'},
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        })
      )
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <ErrorModal onClear={clearError} error={error}/>
      <form className='place-form' onSubmit={formSubmitHandler}>
        {isLoading && <Spinner asOverlay/>}
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
    </>

  )
}

export default NewPlace