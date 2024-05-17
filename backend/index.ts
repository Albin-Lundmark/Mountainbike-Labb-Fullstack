import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import sqlite from 'sqlite'
import sqlite3 from 'sqlite3'

dotenv.config()

const app = express()
const db = new sqlite3.Database(
  path.resolve(__dirname, 'mountainbikers.sqlite')
)
const port = process.env.PORT || 5173

app.use(cors())
app.use(express.json())

app.get('/products', (_req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(`Something went wrong with your request: ${err.message}`)
      res.status(500).send('Database error')
      return
    }
    res.json(rows)
  })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
