import {useCallback, useReducer} from 'react';
import {formReducer, initialInputsType} from "../../reducers/formReducer";

const useForm = (initialInputs: initialInputsType, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id: string, value: string, isValid: boolean): void => {
    dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
  }, [])

  return [formState, inputHandler]
}

export {
  useForm
}