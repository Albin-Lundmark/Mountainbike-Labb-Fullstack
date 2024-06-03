import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'
import Cart from './Cart'

class User extends Model {
  public id!: number
  public email!: string
  public password!: string
  public created_at!: Date

  static associate(models: any) {
    User.hasMany(models.Cart, { foreignKey: 'user_id' })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
)

export default User
