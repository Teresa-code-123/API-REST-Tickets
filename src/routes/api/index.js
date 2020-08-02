import auth from './auth.routes'
import user from './user.routes'
import ticket from './ticket.routes'

export const authRoutes = auth
export const userRoutes = user
export const ticketRoutes = ticket

export default {
	auth,
	user,
	ticket,
}
