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
    event.preventDefault()
    if (isLoginMode) {
      try {
        await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          {'Content-Type': 'application/json'},
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        );
        auth.login()
      } catch (e) {}
    } else {
      try {
        await sendRequest('http://localhost:5000/api/users/signup',
          'POST',
          {'Content-Type': 'application/json'},
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        )
        auth.login()
      } catch (e) {}
    }
    }

    const switchModeHandler = () => {
      if (!isLoginMode) {
        setFormData({
            ...formState.inputs,
            name: undefined
          },
          formState.inputs.email.isValid && formState.inputs.password.isValid)
      } else {
        setFormData({
            ...formState.inputs,
            name: {
              value: '',
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