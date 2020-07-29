// * CATCH ERRORS
export const catchErros = (err, res) => {
	let key = 'errors'
	let status = 400

	console.log(`Error name: ${err.name}`)

	switch (err.name) {
		case 'Error':
			err = err.mapped()
			break

		default:
			console.error(err)
			key = 'message'
			status = 500
			err = 'error in the server'
			break
	}

	res.status(status).json({
		[key]: err,
	})
}

export default {
	catchErros,
}
