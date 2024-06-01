import sequelize from '../db'
import '../model/User'
import '../model/Product'
import '../model/Category'
import '../model/Cart'

const syncDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync({ alter: true })
    console.log('Database synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
syncDatabase()
