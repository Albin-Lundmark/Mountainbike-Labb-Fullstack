import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', async (_req, res) => {
  await res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
