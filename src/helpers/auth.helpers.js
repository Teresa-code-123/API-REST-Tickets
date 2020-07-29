import { tokenServices } from '../services'

// * RESPONSE WHEN AUTHENTICATING OR REGISTERING
export const resAuth = ({ res, status = 200, message, instance }) => {
	const { id, fullName, email, request, Role, createdAt, updatedAt } = instance

	res.status(status).json({
		message,
		user: { id, fullName, email, request, Role, createdAt, updatedAt },
		accessToken: tokenServices.createToken(instance),
	})
}

export default {
	resAuth,
}
