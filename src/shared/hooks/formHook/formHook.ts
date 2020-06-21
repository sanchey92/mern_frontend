import {useCallback, useReducer} from 'react';
import {formReducer, initialInputsType} from "../../reducers/formReducer";

const useForm = (initialInputs: initialInputsType, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id: string, value: string, isValid: boolean): void => {
    dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
  }, []);

  const setFormData = useCallback((inputData: initialInputsType, formValidity: boolean) => {
    dispatch({type: 'SET_DATA', inputs: inputData, formIsValid: formValidity})
  }, [])


  return [formState, inputHandler, setFormData]
}

export {
  useForm
}