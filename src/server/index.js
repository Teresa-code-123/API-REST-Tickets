import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import config from './../config'
import apiRoutes from './../routes'

// * INITIALIZATION
const app = express()

// * SETTINGS
app.set('port', config.PORT)

// * MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

// * ROUTES
app.use('/api', apiRoutes)

export default app
