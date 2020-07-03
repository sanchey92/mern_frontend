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

const Auth: FC = () => {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

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

    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message)
        console.log(data)
        setIsLoading(false)

        auth.login()
      } catch (error) {
        setIsLoading(false)
        setError(error.message || 'Something went wrong')
      }

    } else {

      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message)

        setIsLoading(false)
        auth.login()
      } catch (error) {
        setIsLoading(false)
        setError(error.message || 'Something went wrong, please try again later')
      }
    }
    setIsLoading(false)
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


  const errorHandler = () => setError(null)

  return (
    <>
      <ErrorModal onClear={errorHandler} error={error}/>
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