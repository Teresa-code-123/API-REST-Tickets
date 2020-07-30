import dotenv from 'dotenv'

dotenv.config()

// * CONFIGURATIONS OF PRODUCTION
export default {
	PORT: process.env.PRO_SERVER_PORT,
	DB: {
		username: process.env.PRO_DB_USERNAME,
		password: process.env.PRO_DB_PASSWORD,
		database: process.env.PRO_DB_NAME,
		host: process.env.PRO_DB_HOST,
		port: process.env.PRO_DB_PORT,
		dialect: process.env.PRO_DB_DIALECT,
	},
}
