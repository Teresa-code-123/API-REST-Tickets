import { validationResult } from 'express-validator'
import { Ticket, User, sequelize } from './../database'
import { errorsHelpers } from './../helpers'

export const create = async (req, res) => {
	try {
		validationResult(req).throw()

		const { name, description } = req.body

		let ticket = await Ticket.create({ name, description })

		res.status(200).json({
			ticket,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const update = async (req, res) => {
	try {
		validationResult(req).throw()

		const { id } = req.params

		const { name, description } = req.body

		await Ticket.update(
			{ name, description },
			{
				where: { id },
			}
		)

		const ticket = await Ticket.findByPk(id, {
			attributes: {
				exclude: ['UserId', 'userId'],
			},
		})

		res.status(200).json({
			ticket,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const destroy = async (req, res) => {
	try {
		const { id } = req.params

		await Ticket.destroy({ where: { id } })

		res.status(200).json({
			message: `was delete correctly the ticket number ${id}`,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const getAll = async (req, res) => {
	try {
		let tickets = await Ticket.findAll({
			attributes: {
				exclude: ['UserId', 'userId'],
			},
			include: [
				{
					model: User,
					attributes: ['id', 'email'],
				},
			],
		})

		res.status(200).json({
			tickets,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const getOne = async (req, res) => {
	try {
		const { id } = req.params

		let ticket = await Ticket.findByPk(id, {
			attributes: {
				exclude: ['UserId', 'userId'],
			},
			include: [
				{
					model: User,
					attributes: ['id', 'email'],
				},
			],
		})

		res.status(200).json({
			ticket,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const getAssigned = async (req, res) => {
	try {
		let tickets = await Ticket.findAll({
			attributes: {
				exclude: ['UserId', 'userId'],
			},
			include: [
				{
					model: User,
					attributes: ['id', 'email'],
				},
			],
			where: { assigned: true },
		})

		res.status(200).json({
			tickets,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const getNotAssigned = async (req, res) => {
	try {
		let tickets = await Ticket.findAll({
			attributes: {
				exclude: ['UserId', 'userId'],
			},
			where: { assigned: false },
		})

		res.status(200).json({
			tickets,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export const toAssign = async (req, res) => {
	const transaction = await sequelize.transaction()
	try {
		validationResult(req).throw()

		const { id } = req.params

		const { userId } = req.body

		await Ticket.update(
			{ userId, assigned: true },
			{ where: { id }, transaction }
		)

		await User.update(
			{ request: false },
			{ where: { id: userId }, transaction }
		)

		await transaction.commit()

		res.status(200).json({
			message: 'ticket correctly assigned',
		})
	} catch (err) {
		if (transaction) {
			await transaction.rollback()
		}
		errorsHelpers.catchErros(err, res)
	}
}

export default {
	create,
	update,
	destroy,
	getAll,
	getOne,
	getAssigned,
	getNotAssigned,
	toAssign,
}
