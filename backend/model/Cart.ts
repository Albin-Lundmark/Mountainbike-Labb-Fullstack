import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'
import User from './User'
import Product from './Product'

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
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
