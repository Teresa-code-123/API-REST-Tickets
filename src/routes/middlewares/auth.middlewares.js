import { tokenServices } from '../../services/'

/**
 * * isAuth
 * - Verify that you are authenticated
 */
export const isAuth = (req, res, next) => {
	// - it is verified that the user-token is arriving from the client through the headers
	if (!req.headers.authorization) {
		return res.status(400).json({
			message: 'you need a token to authenticate correctly',
		})
	}

	const token = req.headers.authorization.split(' ')[1]

	tokenServices
		.decodeToken(token)
		.then((response) => {
			req.authUser = response
			next()
		})
		.catch((response) => {
			res.status(response.status).json(response.message)
		})
}

/**
 * * isAdmin
 * - Verify that the user has an administrator role
 */
export const isAdmin = (req, res, next) => {
	// - validate that the logged in user has an administrator role
	if (req.authUser.role !== 'admin') {
		return res.status(403).json({
			message: 'access denied',
		})
	}

	next()
}

export default {
	isAuth,
	isAdmin,
}
