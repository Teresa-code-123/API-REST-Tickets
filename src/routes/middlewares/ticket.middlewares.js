import { Ticket } from './../../dataBase'
import { errorsHelpers } from './../../helpers'

/**
 * * checkRelationshipUser
 * - Verify that the ticket is not assigned to a user in order to be updated
 */
export const checkRelationshipUser = async (req, res, next) => {
	try {
		const { id } = req.params

		const ticket = await Ticket.findByPk(id)

		if (ticket.userId !== null) {
			return res.status(400).json({
				message:
					'this ticket is already assigned to a user and cannot be updated or deleted',
			})
		}

		next()
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export default {
	checkRelationshipUser,
}
