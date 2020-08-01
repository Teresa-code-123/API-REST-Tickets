import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
	class Ticket extends Model {
		static associate(models) {
			this.belongsTo(models.User)
		}
	}

	Ticket.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				defaultValue: null,
			},
			name: {
				type: DataTypes.STRING,
				set(value) {
					this.setDataValue('name', value.trim().toLowerCase())
				},
			},
			description: {
				type: DataTypes.TEXT,
				set(value) {
					this.setDataValue('description', value.trim())
				},
			},
			requested: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'Ticket',
		}
	)

	return Ticket
}
