import express from 'express'
import { check } from 'express-validator'

import { validatorHelpers } from './../../helpers'
import { ticketController } from './../../controllers'
import { ticketMiddleware } from './../middlewares'

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

// * THIS ROUTE UPDATES A TICKET IF AND ONLY IF IT IS NOT ASSIGNED TO A USER
router.put(
	'/update/:id',
	[
		ticketMiddleware.checkRelationshipUser,
		check('name')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('the name is required')
			.custom((value, { req }) => {
				return validatorHelpers.verifyNameTicket(value, req.params.id)
			}),
		check('description')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('the description is required'),
	],
	ticketController.update
)

// * THIS ROUTE ALLOWS TO DELETE A TICKET IF AND ONLY IF IT HAS NOT YET BEEN ASSIGNED
router.delete(
	'/delete/:id',
	[ticketMiddleware.checkRelationshipUser],
	ticketController.destroy
)

// * THIS ROUTE RETURNS ALL TICKETS CREATED
router.get('/all', ticketController.getAll)

// * THIS ROUTE RETURNS A SPECIFIC TICKET
router.get('/one/:id', ticketController.getOne)

export default router
