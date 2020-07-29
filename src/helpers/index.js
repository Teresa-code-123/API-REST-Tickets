import validator from './validator.helpers'
import auth from './auth.helpers'
import errors from './errors.helpers'

export const validatorHelpers = validator
export const authHelpers = auth
export const errorsHelpers = errors

export default {
	validator,
	auth,
	errors,
}
