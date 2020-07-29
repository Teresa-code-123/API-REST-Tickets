import { User } from './../database'

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

export default {
	verifyEmail,
}
