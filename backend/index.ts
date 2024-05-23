import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import sqlite from 'sqlite'
import sqlite3 from 'sqlite3'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { Op } from 'sequelize'

import User from './model/user'

dotenv.config()

const app = express()
const db = new sqlite3.Database(
  path.resolve(__dirname, 'mountainbikers.sqlite')
)
const port = process.env.PORT || 5173

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.get('/home', (_req, res) => {})

app.get('/about', (_req, res) => {})

app.get('/products', async (_req, res) => {
  const response = await db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(`Something went wrong with your request: ${err.message}`)
      res.status(500).send('Database error')
      return
    }
    res.json(rows)
  })
})

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
      msg: 'Please fill out username, email and password to register as a mountainbiker'
    })
  }

  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    })
    if (user) {
      return res.status(400).json({ msg: 'That mountainbiker already exists' })
    }

    const newUser = await User.create({
      username,
      email,
      password
    })

    res.status(201).json({ msg: 'User registered with a bang!' })
  } catch (err) {
    console.error('Could not register that awesome mountainbiker:', err)
    res.status(500).json({ msg: 'Server error' })
  }
})

app.post('/login', async (req, res) => {
  const { identifier, password } = req.body

  if (!identifier || !password) {
    return res
      .status(400)
      .send(
        '<div style="display: grid; place-items: center; text-align: center;">Please enter both username/email and password</div>'
      )
  }

  try {
    //Letar igenom min User model så att man ska kunna logga in antingen med användarnamn eller email
    const user = await User.findOne({
      where: { [Op.or]: [{ email: identifier }, { username: identifier }] }
    })
    if (!user || user.password !== password) {
      return res
        .status(400)
        .send(
          '<div style="display: grid; place-items: center; text-align: center;">Unable to find an awesome mountainbiker with that name and/or password</div>'
        )
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      'awesome_mountainbikers_ftw',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error('Login Error:', err)
    res
      .status(500)
      .send(
        `Something seems to be wrong with the server, take a break and have a coffee or take your beautiful mountainbike for a ride while we take a look into what's wrong!`
      )
  }
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
