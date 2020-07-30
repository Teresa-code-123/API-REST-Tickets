import auth from './auth.controllers'
import user from './user.controllers'

export const authController = auth
export const userController = user

export default {
	auth,
	user,
}
