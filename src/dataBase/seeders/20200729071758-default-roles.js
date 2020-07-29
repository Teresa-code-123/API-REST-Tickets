export default {
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkInsert('Roles', [
			{
				name: 'admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'basic',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkDelete('Roles', null, {})
	},
}
