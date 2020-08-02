import auth from './auth.controllers'
import user from './user.controllers'
import ticket from './ticket.controllers'

export const authController = auth
export const userController = user
export const ticketController = ticket

export default {
	auth,
	user,
	ticket,
}
