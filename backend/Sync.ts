import sequelize from './db'
import User from './model/User'
import Cart from './model/Cart'
import Category from './model/Category'
import Product from './model/Product'

const syncDatabase = async () => {
  User.hasMany(Cart, { foreignKey: 'user_id' })
  Cart.belongsTo(User, { foreignKey: 'user_id' })

  Category.hasMany(Product, { foreignKey: 'category_id' })
  Product.belongsTo(Category, { foreignKey: 'category_id' })

  Product.hasMany(Cart, { foreignKey: 'product_id' })
  Cart.belongsTo(Product, { foreignKey: 'product_id' })

  await sequelize.sync({ alter: true })

  await Category.bulkCreate([
    { name: 'crosscountry' },
    { name: 'enduro' },
    { name: 'trail' },
    { name: 'freeride' }
  ])

  console.log('Database synced and categories added!')
}

syncDatabase().catch(error => {
  console.error('Failed to sync database:', error)
})
