import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'

interface CategoryAttributes {
  id: number
  name: string
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number
  public name!: string
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
