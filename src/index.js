import '@babel/polyfill'

import app from './server'
import { sequelize } from './dataBase'

// * STARTING
const init = async () => {
	try {
		await sequelize.authenticate()
		console.log(
			`The connection has been successfully established to the ${sequelize.getDatabaseName()} database.`
		)
		await app.listen(app.get('port'))
		console.log(`The initial server on port ${app.get('port')}`)
		console.log(`URL: http://127.0.0.1:${app.get('port')}`)
	} catch (err) {
		console.error(err)
	}
}

init()
