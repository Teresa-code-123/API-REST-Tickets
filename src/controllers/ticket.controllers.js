import { validationResult } from 'express-validator'
import { Ticket } from './../database'
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

export default {
	create,
}
