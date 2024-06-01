import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'
/* import User from './User'
import Product from './Product' */
const User = require('./User')
const Product = require('./Product')

class Cart extends Model {
  public id!: number
  public userId!: number
  public productId!: number
  public quantity!: number

  static associate(models: any) {
    Cart.belongsTo(models.User, { foreignKey: 'userId' })
    Cart.belongsTo(models.Product, { foreignKey: 'productId' })
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    productId: {
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
