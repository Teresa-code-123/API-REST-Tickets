import { validationResult } from 'express-validator'
import { User } from './../database'
import { errorsHelpers, userHelpers } from './../helpers'

export const getInfo = async (req, res) => {
	try {
		const { id } = req.authUser

		const user = await userHelpers.getUserFindByPk(id)

		res.status(200).json({
			user,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const update = async (req, res) => {
	try {
		validationResult(req).throw()

		const { id } = req.authUser

		const { fullName, email } = req.body

		let user = await User.update(
			{ fullName, email },
			{
				where: {
					id,
				},
			}
		)

		user = await userHelpers.getUserFindByPk(id)

		res.status(200).json({
			message: 'was updated correctly',
			user,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const setRequest = async (req, res) => {
	try {
		const { id } = req.authUser

		let user = await User.update(
			{
				request: true,
			},
			{
				where: {
					id,
				},
			}
		)

		user = await userHelpers.getUserFindByPk(id)

		res.status(200).json({
			message: 'request made correctly',
			user,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export default {
	getInfo,
	update,
	setRequest,
}
