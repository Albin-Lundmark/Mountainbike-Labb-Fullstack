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
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
    const user = await User.findByPk(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = { id: user.id }
    next()
  } catch (error) {
    console.error('Error verifying token:', error)
    res.status(401).json({ message: 'Invalid token' })
  }
}

export default auth
