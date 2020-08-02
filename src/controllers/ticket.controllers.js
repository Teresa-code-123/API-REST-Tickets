import { validationResult } from 'express-validator'
import { Ticket, User } from './../database'
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

export default {
	create,
	update,
	destroy,
	getAll,
	getOne,
}
