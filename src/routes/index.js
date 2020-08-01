import express from 'express'

import { authRoutes, userRoutes, ticketRoutes } from './api/index'
import { authMiddleware } from './middlewares'

const router = express.Router()

// * ROUTE PREFIXES
router.use('/auth', authRoutes)
router.use('/users', [authMiddleware.isAuth], userRoutes)
router.use(
	'/tickets',
	[authMiddleware.isAuth, authMiddleware.isAdmin],
	ticketRoutes
)

export default router
