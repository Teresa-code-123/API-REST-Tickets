import bcrypt from 'bcryptjs'

export default {
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkInsert('Users', [
			{
				roleId: 1,
				fullname: 'admin user',
				email: 'admin@user.com',
				password: bcrypt.hashSync('1234567890', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 2,
				fullname: 'basic user',
				email: 'basic@user.com',
				password: bcrypt.hashSync('1234567890', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkDelete('Users', null, {})
	},
}
