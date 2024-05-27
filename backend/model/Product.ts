// product.model.ts
import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'
import Category from './Category'
import { NOW } from 'sequelize'

class Product extends Model {
  public id!: number
  public name!: string
  public image!: string
  public description!: string | null
  public price!: number
  public createdAt!: Date
  public categoryId!: number

  static associate(models: any) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
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
      allowNull: false,
      defaultValue: 'This bike is missing a description for now.'
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: () => {
        const now = new Date()

        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hour = String(now.getHours()).padStart(2, '0')
        const minute = String(now.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hour}:${minute}`
      }
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
