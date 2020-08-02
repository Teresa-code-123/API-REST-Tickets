import auth from './auth.middlewares'
import ticket from './ticket.middlewares'

export const authMiddleware = auth
export const ticketMiddleware = ticket

export default {
	auth,
	ticket,
}
