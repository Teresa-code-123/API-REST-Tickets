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

export default {
	create,
	update,
}
