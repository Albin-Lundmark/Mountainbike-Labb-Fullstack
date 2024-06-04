import sequelize from './db'
import User from './model/User'
import Product from './model/Product'
import Category from './model/Category'
import Cart from './model/Cart'

//Associations/relations in my tables
User.hasMany(Cart, { foreignKey: 'user_id' })
Product.belongsTo(Category, { foreignKey: 'category_id' })
Category.hasMany(Product, { foreignKey: 'category_id' })
Cart.belongsTo(User, { foreignKey: 'user_id' })
Cart.belongsTo(Product, { foreignKey: 'product_id' })

const syncDb = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Database synchronized')
  } catch (error) {
    console.error('Error synchronizing database:', error)
  }
}

syncDb()

export { sequelize, User, Product, Category, Cart }
