import ValidatorsEnum from "./validators.enum";

export const VALIDATOR_REQUIRE = () => ({type: ValidatorsEnum.VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_MINLENGTH = (val: any) => ({type: ValidatorsEnum.VALIDATOR_TYPE_MINLENGTH, val})
export const VALIDATOR_MAXLENGTH = (val: any) => ({type: ValidatorsEnum.VALIDATOR_TYPE_MAXLENGTH, val})
export const VALIDATOR_MIN = (val: any) => ({type: ValidatorsEnum.VALIDATOR_TYPE_MIN, val})
export const VALIDATOR_MAX = (val: any) => ({type: ValidatorsEnum.VALIDATOR_TYPE_MAX, val})
export const VALIDATOR_EMAIL = () => ({type: ValidatorsEnum.VALIDATOR_TYPE_EMAIL})
export const VALIDATOR_FILE = () => ({type: ValidatorsEnum.VALIDATOR_TYPE_FILE })