import jwt from 'jwt-simple'
import moment from 'moment'

import config from './../config'

// * CREATE TOKEN
export const createToken = (data) => {
	const payload = {
		id: data.id,
		roleId: data.Role.id,
		role: data.Role.name,
		fullName: data.fullName,
		email: data.email,
		createdAt: moment().unix(),
		expiredAt: moment().add(1, 'day').unix(),
	}

	return jwt.encode(payload, config.CRYPT_TOKEN)
}

// * DECODE TOKEN
export const decodeToken = (token) => {
	const decoded = new Promise((resolve, reject) => {
		try {
			// - the token is validated based on the CRYPT_TOKEN
			const payload = jwt.decode(token, config.CRYPT_TOKEN)

			// - token expiration time validation
			if (payload.expiredAt < moment().unix()) {
				reject({
					status: 401,
					message: 'the token has expired',
				})
			}

			resolve(payload)
		} catch (err) {
			reject({
				status: 500,
				message: 'invalid Token',
			})
		}
	})

	return decoded
}

export default {
	createToken,
	decodeToken,
}
