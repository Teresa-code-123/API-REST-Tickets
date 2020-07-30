import dotenv from 'dotenv'

import dev from './development.config'
import pro from './production.config'

dotenv.config()

const { NODE_ENV } = process.env

let currentEnv = {}

switch (NODE_ENV) {
	case 'production':
		currentEnv = pro
		break
	case 'development':
		currentEnv = dev
		break
	default:
		currentEnv = dev
		break
}

currentEnv.CRYPT_TOKEN = process.env.CRYPT_TOKEN

export default currentEnv
