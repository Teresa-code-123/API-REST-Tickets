import '@babel/polyfill'
import app from './server'

// * STARTING
const init = async () => {
	try {
		await app.listen(app.get('port'))
		console.log(`Server is in port ${app.get('port')}`)
		console.log(`http://127.0.0.1:${app.get('port')}`)
	} catch (err) {
		console.error(err)
	}
}

init()
