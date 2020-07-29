import { validationResult } from 'express-validator'
import { User, Role } from './../database'
import { errorsHelpers, authHelpers } from './../helpers'

export const signUp = async (req, res) => {
	try {
		validationResult(req).throw()

		const { fullName, email, password } = req.body

		let user = await User.create({ fullName, email, password })

		user = await User.findByPk(user.id, {
			attributes: {
				exclude: ['roleId', 'password'],
			},
			include: [
				{
					model: Role,
					attributes: ['id', 'name'],
				},
			],
		})

		authHelpers.resAuth({
			res,
			status: 201,
			message: 'you have successfully sign up',
			instance: user,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const logIn = async (req, res) => {
	try {
		validationResult(req).throw()

		const { email, password } = req.body

		let user = await User.findOne({
			where: {
				email,
			},
			include: [
				{
					model: Role,
					attributes: ['id', 'name'],
				},
			],
		})

		const auth = user?.verifyPassword(password)

		if (!user || !auth) {
			return res.status(404).json({
				message: 'verify your email and / or password',
			})
		}

		authHelpers.resAuth({
			res,
			message: 'you have successfully authenticated',
			instance: user,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export default {
	signUp,
	logIn,
}
