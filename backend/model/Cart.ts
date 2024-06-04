import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class Cart extends Model {
  public id!: number
  public user_id!: number
  public product_id!: number
  public quantity!: number
  public total_price!: number
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
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0
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
