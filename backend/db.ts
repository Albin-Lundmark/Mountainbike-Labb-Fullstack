import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mountainbikers.sqlite',
  logging: console.log
})

export default sequelize
