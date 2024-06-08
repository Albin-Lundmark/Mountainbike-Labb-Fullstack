import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'
import Category from './Category'

interface ProductAttributes {
  id: number
  name: string
  image: string
  description?: string
  price: number
  created_at?: Date
  category_id?: number
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number
  public name!: string
  public image!: string
  public description?: string
  public price!: number
  public readonly created_at!: Date
  public category_id?: number
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
  }
)

export default Product
