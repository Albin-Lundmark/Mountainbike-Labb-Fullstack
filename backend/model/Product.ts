import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'
import Category from './Category'

class Product extends Model {
  public id!: number
  public name!: string
  public image!: string
  public description!: string | null
  public price!: number
  public created_at!: Date
  public category_id!: number

  static associate(models: any) {
    Product.belongsTo(models.Category, { foreignKey: 'category_id' })
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'This bike is missing a description for now.'
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
