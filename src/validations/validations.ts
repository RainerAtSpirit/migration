import { isEmail } from "validator"

export enum ValidatorNames {
  REQUIRED = "required",
  MUST_BE_NUMBER = "mustBeNumber",
  MIN_2_CHARS = "min2Chars",
  MIN_5_CHARS = "min5Chars",
  MAX_254_CHARS = "max254Chars",
  EMAIL = "email"
}

type TValidationMessageMap = {
  [key in ValidatorNames]: (label: string) => string
}

export const ValidationMessages: TValidationMessageMap = {
  required: label => `${label} shouldn't be empty`,
  mustBeNumber: label => "Must be a number",
  min2Chars: label => "Two characters minimum",
  min5Chars: label => "Five characters minimum",
  max254Chars: label => "254 characters maximimum",
  email: label => "Email address is not valid"
}

const required = value => (value ? undefined : ValidatorNames.REQUIRED)

const mustBeNumber = value =>
  isNaN(value) ? ValidatorNames.MUST_BE_NUMBER : null

const min2Chars = (value: string) =>
  required(value) || (value.length < 2 ? ValidatorNames.MIN_2_CHARS : null)

const min5Chars = (value: string) =>
  required(value) || (value.length < 5 ? ValidatorNames.MIN_5_CHARS : null)

const email = (value: string) =>
  required(value) || (!isEmail(value) ? ValidatorNames.EMAIL : null)

const max254Chars = (value: string) =>
  required(value) || (value.length > 140 ? ValidatorNames.MAX_254_CHARS : null)

type TValidatorMap = { [key in ValidatorNames]: any }

export const Validators: TValidatorMap = {
  required,
  mustBeNumber,
  max254Chars,
  min5Chars,
  min2Chars,
  email
}

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
