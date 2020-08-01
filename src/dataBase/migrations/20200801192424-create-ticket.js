export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Tickets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'users',
					},
					key: 'id',
				},
				allowNull: true,
			},
			name: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			requested: {
				allowNull: false,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Tickets')
	},
}
