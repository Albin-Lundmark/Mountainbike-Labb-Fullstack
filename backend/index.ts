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
import auth from './authenticate/auth'

dotenv.config()

const app = express()
const port = process.env.PORT || 5173

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), 'dist')))

app.get('/', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

app.get('/home', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

app.get('/about', (_req, res) => {
  res.send()
})

app.get('/categories', async (_req, res) => {
  try {
    const categories = await Category.findAll()
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

app.get('/cart/auth', auth, async (req: CustomRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' })
  }
  const user_id = req.user.id

  try {
    const cartItems = await Cart.findAll({
      where: { user_id }
    })

    const response = await Promise.all(
      cartItems.map(async item => {
        const product = await Product.findByPk(item.product_id)
        return {
          id: item.id,
          name: product ? product.name : 'Unknown Product',
          quantity: item.quantity,
          price: product ? product.price : 0
        }
      })
    )

    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching cart items:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.get('/cart/guest', async (_req, res) => {
  try {
    const cartItemsStorage = localStorage.getItem('guestCart')
    if (!cartItemsStorage) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    const cartItems = JSON.parse(cartItemsStorage)
    res.json(cartItems)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/cart/guest', async (req, res) => {
  const { product_id, quantity } = req.body

  if (!product_id || !quantity) {
    return res
      .status(400)
      .json({ message: 'Product ID and quantity are required' })
  }

  try {
    const product = await Product.findByPk(product_id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    const cartItem = { product_id, quantity }
    res.status(200).json(cartItem)
  } catch (error) {
    console.error('Error adding to guest cart:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

interface CustomRequest extends express.Request {
  user?: { id: number }
}

app.post('/cart/auth', auth, async (req: CustomRequest, res) => {
  const { product_id, quantity } = req.body
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' })
  }
  const user_id = req.user.id

  if (!product_id || !quantity) {
    return res
      .status(400)
      .json({ message: 'Product ID and quantity are required' })
  }

  try {
    const product = await Product.findByPk(product_id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let cartItem = await Cart.findOne({ where: { user_id, product_id } })
    if (cartItem) {
      cartItem.quantity += quantity
      await cartItem.save()
    } else {
      cartItem = await Cart.create({ user_id, product_id, quantity })
    }

    res.status(200).json(cartItem)
  } catch (error) {
    console.error('Error adding to cart:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/checkout', auth, async (req: CustomRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' })
  }
  const user_id = req.user.id

  try {
    await Cart.destroy({ where: { user_id } })

    res.status(200).json({ message: 'TOrder has been sent successfully!' })
  } catch (error) {
    console.error('Error during checkout:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message:
        'Please fill out your email and password to register as a mountainbiker'
    })
  }

  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      return res
        .status(400)
        .json({ message: 'That email already has an account' })
    }
    const newUser = await User.create({
      email,
      password
    })
    const jwt_secret = process.env.JWT_SECRET

    if (!jwt_secret) {
      throw new Error('jwt_secret is not defined')
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      jwt_secret,
      { expiresIn: '1h' }
    )
    res.status(201).json({ token, message: 'User registered with a bang!' })
  } catch (err) {
    console.error('Could not register that awesome mountainbiker:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email, password } })
    const jwt_secret = process.env.JWT_SECRET

    if (!jwt_secret) {
      throw new Error('jwt_secret is not defined')
    }

    if (user) {
      const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret, {
        expiresIn: '1h'
      })
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
