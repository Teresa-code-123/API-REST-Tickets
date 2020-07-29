import { Model, DataTypes } from 'sequelize'

export default (sequelize) => {
	class Role extends Model {
		static associate(models) {
			this.hasMany(models.User, {
				foreignKey: 'roleId',
				as: 'users',
			})
		}
	}

	Role.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Role',
		}
	)

	return Role
}
