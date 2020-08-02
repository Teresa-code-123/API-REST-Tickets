import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'

export default (sequelize) => {
	class User extends Model {
		verifyPassword(password) {
			return bcrypt.compareSync(password, this.password)
		}

		static associate(models) {
			this.belongsTo(models.Role)
			this.hasMany(models.Ticket, {
				foreignKey: 'userId',
				as: 'tickets',
			})
		}
	}

	User.init(
		{
			roleId: {
				type: DataTypes.INTEGER,
				defaultValue: 2,
			},
			fullName: {
				type: DataTypes.STRING,
				set(value) {
					this.setDataValue('fullName', value.trim().toLowerCase())
				},
			},
			email: DataTypes.STRING,
			password: {
				type: DataTypes.STRING,
				set(value) {
					this.setDataValue('password', bcrypt.hashSync(value, 10))
				},
			},
			request: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return User
}
