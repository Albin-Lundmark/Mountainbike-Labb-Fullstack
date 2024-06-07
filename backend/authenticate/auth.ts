import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../model/User'
import dotenv from 'dotenv'

dotenv.config()

interface CustomRequest extends express.Request {
  user?: { id: number }
}

const auth = async (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number
      }
      const user = await User.findByPk(decoded.id)
      if (user) {
        req.user = { id: user.id }
      }
    } catch (error) {
      console.error('Error verifying token:', error)
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
  next()
}

export default auth
