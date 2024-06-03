import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import User from './model/User'
import Product from './model/Product'
import Category from './model/Category'
import Cart from './model/Cart'
/* const User = require('./model/User')
const Product = require('./model/Product')
const Category = require('./model/Category')
const Cart = require('./model/Cart') */
import sequelize from './db'
import { Op } from 'sequelize'

dotenv.config()

const app = express()
const port = process.env.PORT || 5173

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), 'dist')))

app.get('/', (_req, res) => {
  console.log('API is working')
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

app.get('/home', (_req, res) => {
  res.send()
})

app.get('/about', (_req, res) => {})

app.get('/categories', async (req, res) => {
  try {
    const categories = Category.findAll()
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Error fetching categories', error })
  }
})

app.get('/products', async (req, res) => {
  try {
    const sortByCategory = req.query.categories
      ? (req.query.categories as string).split(',').map(Number)
      : []
    const whereClause = sortByCategory.length
      ? { category_id: sortByCategory }
      : {}

    const products = await Product.findAll({ where: whereClause })
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Error fetching products', error })
  }
})

app.get('/products/:id', async (req, res) => {
  console.log(`Trying to fetch product with id: ${req.params.id}`)
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error })
  }
})

app.get('/products/search/:name', async (req, res) => {
  try {
    const { name } = req.params
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })

    if (products.length > 0) {
      res.json(products)
    } else {
      res.status(404).json({ message: 'No products found with the given name' })
    }
  } catch (error) {
    console.error('Error searching for products:', error)
    res.status(500).json({ message: 'Error searching for products', error })
  }
})

app.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      msg: 'Please fill out your email and password to register as a mountainbiker'
    })
  }

  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      return res.status(400).json({ msg: 'That email already has an account' })
    }
    const newUser = await User.create({
      email,
      password
    })
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      'awesome_mountainbikers_ftw',
      { expiresIn: '1h' }
    )
    res.status(201).json({ token, msg: 'User registered with a bang!' })
  } catch (err) {
    console.error('Could not register that awesome mountainbiker:', err)
    res.status(500).json({ msg: 'Server error' })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email, password } })

    if (user) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        'awesome_mountainbikers_ftw',
        { expiresIn: '1h' }
      )
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Something might be wrong with our website, try again or come back later',
      error
    })
  }
})
;(async () => {
  try {
    await sequelize.sync()
    console.log('All models were synchronized successfully.')

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`)
    })
  } catch (error) {
    console.error('Unable to synchronize the models:', error)
  }
})()
