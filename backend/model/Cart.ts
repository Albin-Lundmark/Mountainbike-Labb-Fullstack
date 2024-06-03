import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'
import User from './User'
import Product from './Product'
/* const User = require('./User')
const Product = require('./Product') */

class Cart extends Model {
  public id!: number
  public user_id!: number
  public product_id!: number
  public quantity!: number

  static associate(models: any) {
    Cart.belongsTo(models.User, { foreignKey: 'user_id' })
    Cart.belongsTo(models.Product, { foreignKey: 'product_id' })
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart',
    timestamps: false
  }
)

export default Cart
