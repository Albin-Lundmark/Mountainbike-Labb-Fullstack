import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class User extends Model {
  public id!: number
  public email!: string
  public password!: string
  public createdAt!: Date
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
      defaultValue: () => {
        const now = new Date()

        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hour = String(now.getHours()).padStart(2, '0')
        const minute = String(now.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hour}:${minute}`
      }
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
