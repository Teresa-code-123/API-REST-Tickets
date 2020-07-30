import express from 'express'
import { check } from 'express-validator'

import { validatorHelpers } from './../../helpers'
import { authController } from './../../controllers'

const router = express.Router()

// * THIS ROUTE ALLOWS YOU TO SIGN UP IN THE APPLICATION
router.post(
	'/signup',
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
			.custom((value) => {
				return validatorHelpers.verifyEmail(value)
			}),
		check('password')
			.notEmpty()
			.withMessage('the password is required')
			.bail()
			.isLength({ min: 6 })
			.withMessage('very short password'),
		check('confirmPassword', 'passwords do not match')
			.notEmpty()
			.custom((value, { req }) => value === req.body.password),
	],
	authController.signUp
)

// * THIS ROUTE ALLOWS LOGGING FROM THE APP
router.post(
	'/login',
	[
		check('email')
			.notEmpty()
			.withMessage('the email is required')
			.bail()
			.normalizeEmail()
			.isEmail()
			.withMessage('very short email'),
		check('password').notEmpty().withMessage('the password is required'),
	],
	authController.logIn
)

export default router
