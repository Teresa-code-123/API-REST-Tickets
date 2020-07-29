import { Sequelize } from 'sequelize'
import path from 'path'
import fs from 'fs'

import config from './../config'

const { DB } = config

const db = {}

const basename = path.basename(__filename)

const dir = __dirname.replace(path.basename(__dirname), 'models')

// * CONNECTION TO THE DATABASE
const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
	port: DB.port,
	host: DB.host,
	dialect: DB.dialect,
	database: DB.database,
	define: {
		timestamps: true,
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
})

try {
	fs.readdirSync(dir)
		.filter((file) => {
			return (
				file.indexOf('.') !== 0 &&
				file !== basename &&
				file.slice(-9) === 'models.js'
			)
		})
		.forEach((file) => {
			const model = require(path.join(dir, file))(sequelize)
			db[model.name] = model
		})

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db)
		}
	})
} catch (err) {
	console.error(err)
}

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
