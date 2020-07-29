import dotenv from 'dotenv'

import config from '.'

dotenv.config()

const { NODE_ENV } = process.env

const { DB } = config

export default {
	[NODE_ENV]: {
		username: DB.username,
		password: DB.password,
		database: DB.database,
		host: DB.host,
		port: DB.port,
		dialect: DB.dialect,
	},
}
