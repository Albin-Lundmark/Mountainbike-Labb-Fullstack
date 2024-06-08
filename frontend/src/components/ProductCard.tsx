import React, { useState } from 'react'
import {
  Alert,
  AlertProps,
  Snackbar,
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
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] =
    useState<AlertProps['severity']>('success')
  const { setCartItems } = useCart()

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const addToCart = async () => {
    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    try {
      if (token) {
        const response = await axios.post(
          'http://localhost:8080/cart',
          {
            product_id: id,
            quantity: 1
          },
          { headers }
        )
        setCartItems(prevItems => [...prevItems, response.data])
      } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]')
        guestCart.push({
          product_id: id,
          name: name,
          quantity: 1,
          price: price
        })
        localStorage.setItem('guestCart', JSON.stringify(guestCart))
        setCartItems(prevItems => [...prevItems, guestCart])
      }
      setOpen(true)
      setAlertSeverity('success')
      setAlertMessage(`${name} added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setOpen(true)
      setAlertSeverity('error')
      setAlertMessage('Failed to add to cart. Please try again.')
    }
  }

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const truncatedDescription =
    description.length > Max_desc_length
      ? description.slice(0, Max_desc_length) + '...'
      : description

  return (
    <>
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          textAlign: 'center',
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          width: '80vw',
          transform: 'translateX(-50%)',
          zIndex: 9999
        }}
      >
        <Alert
          variant='filled'
          onClose={handleClose}
          severity={alertSeverity}
          sx={{
            width: '100%',
            fontSize: '1.2rem',
            alignItems: 'center'
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ProductCard
