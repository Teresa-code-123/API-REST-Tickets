import dotenv from 'dotenv'

dotenv.config()

// * CONFIGURATIONS OF PRODUCTION
export default {
	PORT: process.env.PRO_SERVER_PORT,
}
