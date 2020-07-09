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
import ImageUpload from "../../../shared/components/FormElements/ImageUpload/ImageUpload";

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
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false)

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value)
      formData.append('creator', auth.userId!);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData);
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
        <ImageUpload
          center
          id='image'
          onInput={inputHandler}
          errorText='please provide an image'
        />
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