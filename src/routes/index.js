import express from 'express'

import { authRoutes } from './api/index'

const router = express.Router()

// * ROUTE PREFIXES
router.use('/auth', authRoutes)

export default router
