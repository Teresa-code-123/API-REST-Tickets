import { User, Role } from './../database'

export const getUserFindByPk = async (id) => {
	const user = await User.findByPk(id, {
		attributes: {
			exclude: ['roleId', 'password'],
		},
		include: [
			{
				model: Role,
				attributes: ['id', 'name'],
			},
		],
	})

	return {
		id: user.id,
		fullName: user.fullName,
		email: user.email,
		request: user.request,
		Role: user.Role,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}
}

export default {
	getUserFindByPk,
}
