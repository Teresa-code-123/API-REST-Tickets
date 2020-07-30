import express from 'express'

import { authRoutes, userRoutes } from './api/index'
import { authMiddleware } from './middlewares'

const router = express.Router()

// * ROUTE PREFIXES
router.use('/auth', authRoutes)
router.use('/users', [authMiddleware.isAuth], userRoutes)

export default router
