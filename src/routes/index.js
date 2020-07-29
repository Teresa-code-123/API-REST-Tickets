import express from 'express'

const router = express.Router()

// * ROUTE TEST
router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the API RESTful with NodeJs',
	})
})

export default router
