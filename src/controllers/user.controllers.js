import { validationResult } from 'express-validator'
import { User, Role, Ticket } from './../database'
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

export const getApplicants = async (req, res) => {
	try {
		let users = await User.findAll({
			attributes: {
				exclude: ['RoleId', 'roleId', 'password'],
			},
			include: [
				{
					model: Role,
					attributes: ['id', 'name'],
				},
			],
			where: { request: true },
		})

		users = await users.map((user) => {
			return Object.assign({
				id: user.id,
				fullName: user.fullName,
				email: user.email,
				request: user.request,
				Role: user.Role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			})
		})

		res.status(200).json({
			users,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const getTickets = async (req, res) => {
	try {
		const { id } = req.authUser

		let tickets = await Ticket.findAll({
			attributes: {
				exclude: ['UserId', 'userId'],
			},
			where: { userId: id },
		})

		res.status(200).json({
			tickets,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export default {
	getInfo,
	update,
	setRequest,
	getApplicants,
	getTickets,
}
