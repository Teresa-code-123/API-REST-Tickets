import auth from './auth.routes'
import user from './user.routes'

export const authRoutes = auth
export const userRoutes = user

export default {
	auth,
	user,
}
