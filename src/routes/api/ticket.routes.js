import express from 'express'
import { check } from 'express-validator'

import { validatorHelpers } from './../../helpers'
import { ticketController } from './../../controllers'

const router = express.Router()

// * THIS ROUTE ALLOWS TO CREATE A TICKET
router.post(
	'/create',
	[
		check('name')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('the name is required')
			.custom((value) => {
				return validatorHelpers.verifyNameTicket(value)
			}),
		check('description')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('the description is required'),
	],
	ticketController.create
)

export default router
