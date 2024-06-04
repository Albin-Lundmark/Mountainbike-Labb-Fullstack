import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class Category extends Model {
  public id!: number
  public name!: string
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
  }
)

export default Category
