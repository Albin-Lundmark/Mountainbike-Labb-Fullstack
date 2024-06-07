import React, { useEffect, useState } from 'react'
import { IconButton, Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import axios from 'axios'
import Cart from './Cart'
import { useCart } from '../context/useCart'

const CartIcon: React.FC = () => {
  const { cartItems, setCartItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token')
      const endpoint = token
        ? 'http://localhost:8080/cart/auth'
        : 'http://localhost:8080/cart/guest'

      try {
        const response = await axios.get(endpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        console.log('Response data: ', response.data)
        setCartItems(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }
    fetchCartItems()
  }, [])

  useEffect(() => {
    console.log('Cart items:', cartItems)
    const totalItems = Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => {
          console.log('Item:', item)
          console.log('Quantity:', item.quantity)
          return total + item.quantity
        }, 0)
      : 0
    console.log('Total items:', totalItems)
    localStorage.setItem('cartItemCount', totalItems.toString())
  }, [cartItems])

  return (
    <>
      <IconButton onClick={handleCartClick}>
        <Badge badgeContent={localStorage.getItem('cartItemCount') || '0'}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default CartIcon
