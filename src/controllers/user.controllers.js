import { errorsHelpers, userHelpers } from './../helpers'

export const getInfo = async (req, res) => {
	try {
		const { id } = req.authUser

		const user = await userHelpers.getUserFindByPk(id)

		res.status(200).json({
			user,
		})
	} catch (err) {
		errorsHelpers.catchErros(err, res)
	}
}

export default {
	getInfo,
}
