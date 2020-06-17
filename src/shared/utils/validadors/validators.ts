import ValidatorsEnum from "./validators.enum";

export  const validate = (value: any, validators: any): boolean => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === ValidatorsEnum.VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === ValidatorsEnum.VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === ValidatorsEnum.VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === ValidatorsEnum.VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === ValidatorsEnum.VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === ValidatorsEnum.VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid
}