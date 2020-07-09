import React, {FC, FormEvent, useContext, useState} from "react";
import './Auth.css'
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../../shared/utils/validadors/actions.calidators";
import {useForm} from "../../../shared/hooks/formHook/formHook";
import Button from "../../../shared/components/FormElements/Button/Button";
import {AuthContext} from "../../../shared/context/authContext";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import {useHttpClient} from "../../../shared/hooks/httpHook/httpHook";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload/ImageUpload";

const Auth: FC = () => {

  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const {isLoading, error, sendRequest, clearError} = useHttpClient()

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false)

  const authSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    let responseData;

    if (isLoginMode) {
      try {
        responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',

          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {'Content-Type': 'application/json'},
        );
        auth.login(responseData.user.id)
      } catch (e) {
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        responseData = await sendRequest('http://localhost:5000/api/users/signup', 'POST', formData)
        auth.login(responseData.user.id)
      } catch (e) {
      }
    }
  }

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false)
    }

    setIsLoginMode(prevMode => !prevMode)
  }

  return (
    <>
      <ErrorModal onClear={clearError} error={error}/>
      <Card className='authentication'>
        {isLoading && <Spinner asOverlay/>}
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && <ImageUpload id='image' center onInput={inputHandler} errorText={'asd'}/>}
          {
            !isLoginMode &&
            <Input
              element='input'
              id='name'
              type='text'
              label='Your Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name'
              onInput={inputHandler}
            />
          }
          <Input
            element='input'
            id='email'
            type='email'
            label='E-mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid address'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {
              isLoginMode
                ? 'LOGIN'
                : 'SIGNUP'
            }
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
      </Card>
    </>
  )
}

export default Auth