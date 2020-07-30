import dotenv from 'dotenv'

dotenv.config()

// * CONFIGURATIONS OF DEVELOPMENT
export default {
	PORT: process.env.DEV_SERVER_PORT,
	DB: {
		username: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD,
		database: process.env.DEV_DB_NAME,
		host: process.env.DEV_DB_HOST,
		port: process.env.DEV_DB_PORT,
		dialect: process.env.DEV_DB_DIALECT,
	},
}
