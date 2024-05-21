import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mountainbikers.sqlite'
})

class User extends Model {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public created_at!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false
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
;(async () => {
  await sequelize.sync({ alter: true })
})()

export default User
