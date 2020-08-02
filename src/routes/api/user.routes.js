import express from 'express'
import { check } from 'express-validator'

import { userController } from './../../controllers'
import { validatorHelpers } from '../../helpers'
import { authMiddleware } from './../middlewares'

const router = express.Router()

// * RETURN THE LOGGED USER INFORMATION
router.get('/info', userController.getInfo)

// * UPDATE AND RETURN LOGGED USER DATA
router.put(
	'/update',
	[
		check('fullName')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('the fullname is required'),
		check('email')
			.notEmpty()
			.withMessage('the email is required')
			.bail()
			.normalizeEmail()
			.isEmail()
			.withMessage('very short email')
			.custom((value, { req }) => {
				return validatorHelpers.verifyEmail(value, req.authUser.id)
			}),
	],
	userController.update
)

// * SET THE LOGGED USER REQUEST FIELD SO THAT A TICKET CAN BE ASSIGNED AND RETURNED DATA
router.put('/request', userController.setRequest)

// * RETURN USERS WHO ARE REQUESTING A TICKET
router.get(
	'/applicants',
	[authMiddleware.isAdmin],
	userController.getApplicants
)

// * THIS ROUTE RETURNS ALL AUTHENTICATED USER TICKETS
router.get('/tickets', userController.getTickets)

export default router
