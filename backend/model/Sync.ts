import sequelize from '../db'
import User from '../model/User'
import Product from '../model/Product'
import Category from '../model/Category'
import Cart from '../model/Cart'

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
