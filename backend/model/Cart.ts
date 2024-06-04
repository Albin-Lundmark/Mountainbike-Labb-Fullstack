import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class Cart extends Model {
  public id!: number
  public user_id!: number
  public product_id!: number
  public quantity!: number
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
