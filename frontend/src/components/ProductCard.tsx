import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material'
import axios from 'axios'
import { useCart } from '../context/useCart'

interface CardProps {
  id: number
  name: string
  image: string
  description: string
  price: number
}

const Max_desc_length = 50

const ProductCard: React.FC<CardProps> = ({
  id,
  name,
  image,
  description,
  price
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { setCartItems } = useCart()

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const addToCart = async () => {
    const token = localStorage.getItem('token')
    const endpoint = token
      ? 'http://localhost:8080/cart/auth'
      : 'http://localhost:8080/cart/guest'
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    try {
      const response = await axios.post(
        endpoint,
        {
          product_id: id,
          quantity: 1
        },
        { headers }
      )

      if (token) {
        setCartItems(prevItems => [...prevItems, response.data])
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]')
        guestCart.push(response.data)
        localStorage.setItem('guestCart', JSON.stringify(guestCart))
      }

      alert(`${name} added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add to cart. Please try again.')
    }
  }

  const truncatedDescription =
    description.length > Max_desc_length
      ? description.slice(0, Max_desc_length) + '...'
      : description

  return (
    <Card sx={{ maxWidth: 380, marginBottom: 1.5, borderRadius: 3 }}>
      <CardMedia component='img' alt={name} height='auto' image={image} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {isExpanded ? description : truncatedDescription}
        </Typography>
        <Typography variant='h6' color='text.primary'>
          {price} kr
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={toggleDescription} size='small'>
          {isExpanded ? 'Done reading' : 'Read more '}
        </Button>
        <Button size='small' onClick={addToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
