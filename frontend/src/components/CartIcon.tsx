import React, { useEffect, useState } from 'react'
import { IconButton, Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import axios from 'axios'

interface CartItem {
  id: number
  quantity: number
}

const CartIcon: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/guest-cart')
        setCartItems(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }

    fetchCartItems()
  }, [])

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0

  return (
    <IconButton color='inherit'>
      <Badge badgeContent={totalItems} color='secondary'>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  )
}

export default CartIcon
