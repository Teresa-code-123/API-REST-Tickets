import { User, Ticket } from './../database'

// * VERIFY THAT THE EMAIL IS NOT USE
export const verifyEmail = async (value, id = 0) => {
	const user = await User.findOne({
		where: {
			email: value,
		},
	})

	if (user && user.id !== id) {
		throw new Error('email already in use')
	}

	if (user && user.id === id) {
		return true
	}

	return true
}

// * VERIFY THAT THE TICKET NAME IS NOT USED
export const verifyNameTicket = async (value, id = 0) => {
	id = parseInt(id)

	const ticket = await Ticket.findOne({
		where: {
			name: value,
		},
	})

	if (ticket && ticket.id !== id) {
		throw new Error('this name is already in use')
	}

	if (ticket && ticket.id === id) {
		return true
	}

	return true
}

export default {
	verifyEmail,
	verifyNameTicket,
}
