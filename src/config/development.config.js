import dotenv from 'dotenv'

dotenv.config()

// * CONFIGURATIONS OF DEVELOPMENT
export default {
	PORT: process.env.DEV_SERVER_PORT,
}
