import express from 'express'

import { userController } from './../../controllers'

const router = express.Router()

// * RETURN THE LOGGED USER INFORMATION
router.get('/info', userController.getInfo)

export default router
